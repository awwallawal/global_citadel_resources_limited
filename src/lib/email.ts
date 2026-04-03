interface NotificationParams {
  to: string;
  inquiryType: string;
  fromName: string;
  fromEmail: string;
  fields: Record<string, string>;
  sourcePage: string;
  submittedAt: string;
}

interface ConfirmationParams {
  to: string;
  name: string;
  routingContext: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .replace('enquiry Type', 'Enquiry Type')
    .replace('inquiry Type', 'Inquiry Type')
    .replace('title Role', 'Title / Role');
}

function buildFieldRows(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;vertical-align:top;white-space:nowrap;">${formatFieldLabel(k)}</td><td style="padding:8px 12px;color:#1F2937;">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
}

async function getResendClient() {
  const { Resend } = await import('resend');
  return new Resend(import.meta.env.RESEND_API_KEY);
}

function getFromEmail(): string {
  return import.meta.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
}

export async function sendInquiryNotification(params: NotificationParams) {
  const resend = await getResendClient();
  const { data, error } = await resend.emails.send({
    from: getFromEmail(),
    to: params.to,
    subject: `[${params.inquiryType}] New enquiry from ${escapeHtml(params.fromName)}`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;font-family:Inter,Arial,sans-serif;background:#F9FAFB;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;">
  <h1 style="font-size:18px;color:#14532D;margin:0 0 4px;">Global Resources Citadel</h1>
  <p style="font-size:12px;color:#6B7280;margin:0 0 24px;">New Inquiry Notification</p>
  <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:24px;">
    <h2 style="font-size:16px;color:#1F2937;margin:0 0 16px;">New enquiry from ${escapeHtml(params.fromName)}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">From</td><td style="padding:8px 12px;color:#1F2937;">${escapeHtml(params.fromName)} &lt;${escapeHtml(params.fromEmail)}&gt;</td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">Type</td><td style="padding:8px 12px;color:#1F2937;">${escapeHtml(params.inquiryType)}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">Source</td><td style="padding:8px 12px;color:#1F2937;">${escapeHtml(params.sourcePage)}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;color:#374151;">Submitted</td><td style="padding:8px 12px;color:#1F2937;">${escapeHtml(params.submittedAt)}</td></tr>
    </table>
    <hr style="border:none;border-top:1px solid #E5E7EB;margin:16px 0;">
    <h3 style="font-size:14px;color:#374151;margin:0 0 8px;">Form Fields</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${buildFieldRows(params.fields)}
    </table>
  </div>
  <p style="font-size:11px;color:#9CA3AF;margin:24px 0 0;text-align:center;">This is an automated notification from the GRCL website contact system.</p>
</div>
</body></html>`,
  });

  if (error) throw error;
  return data;
}

export async function sendConfirmationEmail(params: ConfirmationParams) {
  const resend = await getResendClient();
  const { data, error } = await resend.emails.send({
    from: getFromEmail(),
    to: params.to,
    subject: "We've received your enquiry — Global Resources Citadel",
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;font-family:Inter,Arial,sans-serif;background:#F9FAFB;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;">
  <h1 style="font-size:18px;color:#14532D;margin:0 0 24px;">Global Resources Citadel</h1>
  <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:24px;">
    <h2 style="font-size:16px;color:#1F2937;margin:0 0 12px;">Thank you, ${escapeHtml(params.name)}</h2>
    <p style="font-size:14px;color:#4B5563;line-height:1.6;margin:0 0 16px;">We have received your enquiry and it has been forwarded to the appropriate team.</p>
    <p style="font-size:14px;color:#4B5563;line-height:1.6;margin:0 0 16px;">${escapeHtml(params.routingContext)}</p>
    <p style="font-size:14px;color:#4B5563;line-height:1.6;margin:0;">If you need to reach us urgently, please contact us at <a href="mailto:info@globalresourcescitadel.com" style="color:#15803D;">info@globalresourcescitadel.com</a>.</p>
  </div>
  <p style="font-size:11px;color:#9CA3AF;margin:24px 0 0;text-align:center;">Global Resources Citadel Limited &bull; Victoria Island, Lagos, Nigeria</p>
</div>
</body></html>`,
  });

  if (error) throw error;
  return data;
}
