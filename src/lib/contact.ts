import { z } from 'zod';

export const generalFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().trim().min(1, 'Please enter a subject'),
  message: z.string().trim().min(20, 'Message must be at least 20 characters'),
});

export const divisionFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  message: z.string().trim().min(20, 'Message must be at least 20 characters'),
});

export const strategicFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().trim().min(1, 'Please enter your organization'),
  titleRole: z.string().trim().min(1, 'Please enter your title or role'),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters'),
});

export const contactEnvelopeSchema = z.object({
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

export const fieldsSchemaMap = {
  'general-corporate': generalFormSchema,
  'division-business': divisionFormSchema,
  'strategic-partnership': strategicFormSchema,
  'investor-institutional': strategicFormSchema,
} satisfies Record<string, z.ZodObject<z.ZodRawShape>>;

export interface DivisionContact {
  slug: string;
  name: string;
  contactEmail: string;
}

export function getRoutingContext(inquiryType: string, divisionName?: string): string {
  if (inquiryType === 'division-business' && divisionName) {
    return `Our ${divisionName} team will respond within 2 business days.`;
  }
  if (inquiryType === 'strategic-partnership' || inquiryType === 'investor-institutional') {
    return 'Our strategic team will respond within 3 business days. All enquiries are handled confidentially.';
  }
  return 'We aim to respond within 2 business days.';
}

export function getRecipientEmail(
  inquiryType: string,
  divisionSlug: string | null | undefined,
  divisions: DivisionContact[],
  defaultEmail: string,
) {
  if (inquiryType !== 'division-business' || !divisionSlug) {
    return { recipientEmail: defaultEmail, divisionName: undefined };
  }

  const division = divisions.find((entry) => entry.slug === divisionSlug);
  if (!division) {
    return { recipientEmail: defaultEmail, divisionName: undefined };
  }

  return {
    recipientEmail: division.contactEmail,
    divisionName: division.name,
  };
}
