import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getCollection } from 'astro:content';
import { sendInquiryNotification, sendConfirmationEmail } from '@/lib/email';

export const prerender = false;

// ─── Rate limiting ──────────────────────────────────────────────────

const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimit.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimit.set(ip, timestamps);
  return false;
}

// ─── Validation schemas (mirror client-side) ────────────────────────

const baseFieldsSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

const generalFieldsSchema = baseFieldsSchema.extend({
  subject: z.string().trim().min(1),
  message: z.string().trim().min(20),
});

const divisionFieldsSchema = baseFieldsSchema.extend({
  company: z.string().optional(),
  enquiryType: z.string().min(1),
  message: z.string().trim().min(20),
});

const strategicFieldsSchema = baseFieldsSchema.extend({
  organization: z.string().trim().min(1),
  titleRole: z.string().trim().min(1),
  inquiryType: z.string().min(1),
  description: z.string().trim().min(20),
});

const contactEnvelopeSchema = z.object({
  inquiryType: z.enum([
    'general-corporate',
    'division-business',
    'strategic-partnership',
    'investor-institutional',
  ]),
  destinationTeam: z.string().min(1),
  divisionSlug: z.string().nullable().optional(),
  sourcePage: z.string().min(1),
  submittedAt: z.string().optional(),
  honeypot: z.string().optional(),
  fields: z.record(z.string(), z.unknown()),
});

const fieldsSchemaMap: Record<string, z.ZodObject<z.ZodRawShape>> = {
  'general-corporate': generalFieldsSchema,
  'division-business': divisionFieldsSchema,
  'strategic-partnership': strategicFieldsSchema,
  'investor-institutional': strategicFieldsSchema,
};

// ─── Routing context messages ───────────────────────────────────────

function getRoutingContext(inquiryType: string, divisionName?: string): string {
  if (inquiryType === 'division-business' && divisionName) {
    return `Our ${divisionName} team will respond within 2 business days.`;
  }
  if (inquiryType === 'strategic-partnership' || inquiryType === 'investor-institutional') {
    return 'Our strategic team will respond within 3 business days. All enquiries are handled confidentially.';
  }
  return 'We aim to respond within 2 business days.';
}

// ─── Helper ─────────────────────────────────────────────────────────

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ─── Endpoint ───────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limit
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

  // Parse envelope
  const envelopeResult = contactEnvelopeSchema.safeParse(body);
  if (!envelopeResult.success) {
    return jsonResponse(
      { success: false, message: 'Invalid request format.' },
      400,
    );
  }

  const envelope = envelopeResult.data;

  // Honeypot — silently fake success
  if (envelope.honeypot) {
    return jsonResponse(
      { success: true, message: 'Inquiry submitted successfully', routingContext: '' },
      200,
    );
  }

  // Validate fields based on inquiry type
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

  // Resolve division name + recipient email
  let recipientEmail = import.meta.env.CONTACT_EMAIL_DEFAULT || 'info@globalresourcescitadel.com';
  let divisionName: string | undefined;

  if (envelope.inquiryType === 'division-business' && envelope.divisionSlug) {
    const divisions = await getCollection('divisions');
    const division = divisions.find((d) => d.data.slug === envelope.divisionSlug);
    if (division) {
      recipientEmail = division.data.contactEmail;
      divisionName = division.data.name;
    }
  }

  const routingContext = getRoutingContext(envelope.inquiryType, divisionName);

  // Send emails independently — partial success still returns 200 to the user
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

  // Fail only if both emails failed — user should see success if at least one was sent
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
