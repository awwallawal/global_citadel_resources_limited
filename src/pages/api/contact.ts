import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  contactEnvelopeSchema,
  fieldsSchemaMap,
  getRecipientEmail,
  getRoutingContext,
} from '@/lib/contact';
import { sendInquiryNotification, sendConfirmationEmail } from '@/lib/email';

export const prerender = false;

const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimit.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimit.set(ip, timestamps);
  return false;
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (isRateLimited(clientAddress)) {
    return jsonResponse(
      { success: false, message: 'Too many requests. Please try again later.' },
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, message: 'Invalid request body.' }, 400);
  }

  const envelopeResult = contactEnvelopeSchema.safeParse(body);
  if (!envelopeResult.success) {
    return jsonResponse({ success: false, message: 'Invalid request format.' }, 400);
  }

  const envelope = envelopeResult.data;

  if (envelope.honeypot) {
    return jsonResponse(
      { success: true, message: 'Inquiry submitted successfully', routingContext: '' },
      200,
    );
  }

  const fieldSchema = fieldsSchemaMap[envelope.inquiryType];
  if (!fieldSchema) {
    return jsonResponse({ success: false, message: 'Unknown inquiry type.' }, 400);
  }

  const fieldsResult = fieldSchema.safeParse(envelope.fields);
  if (!fieldsResult.success) {
    const errors: Record<string, string> = {};
    for (const issue of fieldsResult.error.issues) {
      const fieldName = String(issue.path[0]);
      if (!errors[fieldName]) {
        errors[fieldName] = issue.message;
      }
    }
    return jsonResponse({ success: false, errors }, 400);
  }

  const validatedFields = fieldsResult.data as Record<string, string>;
  const defaultEmail = import.meta.env.CONTACT_EMAIL_DEFAULT || 'info@globalresourcescitadel.com';
  const divisions = envelope.inquiryType === 'division-business'
    ? (await getCollection('divisions')).map((division) => ({
        slug: division.data.slug,
        name: division.data.name,
        contactEmail: division.data.contactEmail,
      }))
    : [];
  const { recipientEmail, divisionName } = getRecipientEmail(
    envelope.inquiryType,
    envelope.divisionSlug,
    divisions,
    defaultEmail,
  );
  const routingContext = getRoutingContext(envelope.inquiryType, divisionName);
  const serverTimestamp = new Date().toISOString();

  const [notificationResult, confirmationResult] = await Promise.allSettled([
    sendInquiryNotification({
      to: recipientEmail,
      inquiryType: envelope.inquiryType,
      fromName: validatedFields.fullName,
      fromEmail: validatedFields.email,
      fields: validatedFields,
      sourcePage: envelope.sourcePage,
      submittedAt: serverTimestamp,
    }),
    sendConfirmationEmail({
      to: validatedFields.email,
      name: validatedFields.fullName,
      routingContext,
    }),
  ]);

  if (notificationResult.status === 'rejected') {
    console.error('Internal notification email failed:', notificationResult.reason);
  }
  if (confirmationResult.status === 'rejected') {
    console.error('User confirmation email failed:', confirmationResult.reason);
  }

  if (notificationResult.status === 'rejected' && confirmationResult.status === 'rejected') {
    return jsonResponse(
      { success: false, message: 'Unable to process your request. Please try again.' },
      500,
    );
  }

  return jsonResponse(
    { success: true, message: 'Inquiry submitted successfully', routingContext },
    200,
  );
};

export const ALL: APIRoute = () => {
  return jsonResponse({ success: false, message: 'Method not allowed.' }, 405);
};
