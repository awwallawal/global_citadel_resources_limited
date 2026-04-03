import { useState, useRef, type FormEvent, type FocusEvent } from 'react';
import { z } from 'zod';
import { cn } from '@/lib/utils';

// ─── Enquiry type options per variant ────────────────────────────────

const DIVISION_ENQUIRY_TYPES = [
  { value: '', label: 'Select enquiry type...' },
  { value: 'product-service', label: 'Product/Service Inquiry' },
  { value: 'business-opportunity', label: 'Business Opportunity' },
  { value: 'general-question', label: 'General Question' },
];

const STRATEGIC_INQUIRY_TYPES = [
  { value: '', label: 'Select inquiry type...' },
  { value: 'strategic-partnership', label: 'Strategic Partnership' },
  { value: 'investment-discussion', label: 'Investment Discussion' },
  { value: 'institutional-enquiry', label: 'Institutional Enquiry' },
  { value: 'other', label: 'Other' },
];

// ─── Validation schemas ─────────────────────────────────────────────

const generalFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().trim().min(1, 'Please enter a subject'),
  message: z.string().trim().min(20, 'Message must be at least 20 characters'),
});

const divisionFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  message: z.string().trim().min(20, 'Message must be at least 20 characters'),
});

const strategicFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().trim().min(1, 'Please enter your organization'),
  titleRole: z.string().trim().min(1, 'Please enter your title or role'),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters'),
});

// ─── Form data type (superset of all variants) ─────────────────────

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  company: string;
  enquiryType: string;
  organization: string;
  titleRole: string;
  inquiryType: string;
  message: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

// ─── Props ──────────────────────────────────────────────────────────

interface InquiryFormProps {
  variant: 'general' | 'division' | 'strategic';
  divisionSlug?: string;
  divisionName?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

function getSchema(variant: InquiryFormProps['variant']) {
  if (variant === 'general') return generalFormSchema;
  if (variant === 'strategic') return strategicFormSchema;
  return divisionFormSchema;
}

function getFormData(variant: InquiryFormProps['variant']): Record<string, string> {
  if (variant === 'general') {
    return { fullName: '', email: '', phone: '', subject: '', message: '' };
  }
  if (variant === 'strategic') {
    return { fullName: '', email: '', organization: '', titleRole: '', phone: '', inquiryType: '', description: '' };
  }
  return { fullName: '', email: '', company: '', phone: '', enquiryType: '', message: '' };
}

// ─── Component ──────────────────────────────────────────────────────

export default function InquiryForm({
  variant,
  divisionSlug,
}: InquiryFormProps) {
  const schema = getSchema(variant);
  const [formData, setFormData] = useState<Record<string, string>>(() => getFormData(variant));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validateField(name: string, value: string): string | undefined {
    const fieldSchema = (schema.shape as Record<string, z.ZodTypeAny>)[name];
    if (!fieldSchema) return undefined;
    const result = fieldSchema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        (next as Record<string, string>)[name] = error;
      } else {
        delete (next as Record<string, string | undefined>)[name];
      }
      return next;
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if ((errors as Record<string, string | undefined>)[name]) {
      const error = validateField(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          (next as Record<string, string>)[name] = error;
        } else {
          delete (next as Record<string, string | undefined>)[name];
        }
        return next;
      });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof FormFields;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    // Check honeypot — bots fill hidden fields
    if (formRef.current) {
      const honeypot = new FormData(formRef.current).get('website');
      if (honeypot) return;
    }

    const validatedData = result.data;

    // Submission logic will be added in Story 4.4 — use validatedData (trimmed)
    void validatedData;
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  }

  const inputClasses =
    'block w-full min-h-11 rounded-lg border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

  const labelClasses = 'block text-sm font-medium text-neutral-700';

  function fieldBorderClass(fieldName: string): string {
    return (errors as Record<string, string | undefined>)[fieldName]
      ? 'border-error-600'
      : 'border-neutral-300';
  }

  function renderError(fieldName: keyof FormFields) {
    const error = errors[fieldName];
    if (!error) return null;
    return (
      <p id={`${fieldName}-error`} className="mt-1.5 text-sm text-error-600" aria-live="polite">
        {error}
      </p>
    );
  }

  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundSize: '1rem',
    backgroundPosition: 'right 1rem center',
    backgroundRepeat: 'no-repeat',
  };

  const submitLabel = variant === 'strategic' ? 'Submit Inquiry' : 'Submit Enquiry';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Full Name — all variants */}
      <div>
        <label htmlFor="fullName" className={labelClasses}>
          Full Name <span className="text-error-600" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          aria-invalid={!!errors.fullName}
          autoComplete="name"
          placeholder="Your full name"
          className={cn(inputClasses, fieldBorderClass('fullName'), 'mt-1.5')}
        />
        {renderError('fullName')}
      </div>

      {/* Email — all variants */}
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email <span className="text-error-600" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          autoComplete="email"
          placeholder="you@example.com"
          className={cn(inputClasses, fieldBorderClass('email'), 'mt-1.5')}
        />
        {renderError('email')}
      </div>

      {/* Organization — strategic only (required) */}
      {variant === 'strategic' && (
        <div>
          <label htmlFor="organization" className={labelClasses}>
            Organization <span className="text-error-600" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-describedby={errors.organization ? 'organization-error' : undefined}
            aria-invalid={!!errors.organization}
            autoComplete="organization"
            placeholder="Your organization"
            className={cn(inputClasses, fieldBorderClass('organization'), 'mt-1.5')}
          />
          {renderError('organization')}
        </div>
      )}

      {/* Title / Role — strategic only (required) */}
      {variant === 'strategic' && (
        <div>
          <label htmlFor="titleRole" className={labelClasses}>
            Title / Role <span className="text-error-600" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="titleRole"
            name="titleRole"
            value={formData.titleRole}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-describedby={errors.titleRole ? 'titleRole-error' : undefined}
            aria-invalid={!!errors.titleRole}
            autoComplete="organization-title"
            placeholder="Your title or role"
            className={cn(inputClasses, fieldBorderClass('titleRole'), 'mt-1.5')}
          />
          {renderError('titleRole')}
        </div>
      )}

      {/* Company / Organization — division only (optional) */}
      {variant === 'division' && (
        <div>
          <label htmlFor="company" className={labelClasses}>
            Company / Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="organization"
            placeholder="Your company or organisation"
            className={cn(inputClasses, fieldBorderClass('company'), 'mt-1.5')}
          />
        </div>
      )}

      {/* Phone — all variants (optional) */}
      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="tel"
          placeholder="+234 XXX XXX XXXX"
          className={cn(inputClasses, fieldBorderClass('phone'), 'mt-1.5')}
        />
      </div>

      {/* Subject — general only (required) */}
      {variant === 'general' && (
        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject <span className="text-error-600" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            aria-invalid={!!errors.subject}
            placeholder="What is your enquiry about?"
            className={cn(inputClasses, fieldBorderClass('subject'), 'mt-1.5')}
          />
          {renderError('subject')}
        </div>
      )}

      {/* Enquiry Type dropdown — division variant */}
      {variant === 'division' && (
        <div>
          <label htmlFor="enquiryType" className={labelClasses}>
            Enquiry Type <span className="text-error-600" aria-hidden="true">*</span>
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-describedby={errors.enquiryType ? 'enquiryType-error' : undefined}
            aria-invalid={!!errors.enquiryType}
            className={cn(inputClasses, fieldBorderClass('enquiryType'), 'mt-1.5 appearance-none pr-10')}
            style={selectStyle}
          >
            {DIVISION_ENQUIRY_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''} hidden={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
          {renderError('enquiryType')}
        </div>
      )}

      {/* Inquiry Type dropdown — strategic variant */}
      {variant === 'strategic' && (
        <div>
          <label htmlFor="inquiryType" className={labelClasses}>
            Inquiry Type <span className="text-error-600" aria-hidden="true">*</span>
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-describedby={errors.inquiryType ? 'inquiryType-error' : undefined}
            aria-invalid={!!errors.inquiryType}
            className={cn(inputClasses, fieldBorderClass('inquiryType'), 'mt-1.5 appearance-none pr-10')}
            style={selectStyle}
          >
            {STRATEGIC_INQUIRY_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''} hidden={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
          {renderError('inquiryType')}
        </div>
      )}

      {/* Message — general + division variants */}
      {variant !== 'strategic' && (
        <div>
          <label htmlFor="message" className={labelClasses}>
            Message <span className="text-error-600" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={!!errors.message}
            placeholder="Tell us about your enquiry (minimum 20 characters)"
            className={cn(inputClasses, fieldBorderClass('message'), 'mt-1.5 resize-y')}
          />
          {renderError('message')}
        </div>
      )}

      {/* Brief Description — strategic variant */}
      {variant === 'strategic' && (
        <div>
          <label htmlFor="description" className={labelClasses}>
            Brief Description <span className="text-error-600" aria-hidden="true">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-describedby={errors.description ? 'description-error' : undefined}
            aria-invalid={!!errors.description}
            placeholder="Briefly describe your inquiry (minimum 20 characters)"
            className={cn(inputClasses, fieldBorderClass('description'), 'mt-1.5 resize-y')}
          />
          {renderError('description')}
        </div>
      )}

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Hidden context */}
      {variant === 'division' && divisionSlug && (
        <>
          <input type="hidden" name="divisionSlug" value={divisionSlug} />
          <input type="hidden" name="variant" value="division" />
        </>
      )}
      {variant === 'general' && <input type="hidden" name="variant" value="general" />}
      {variant === 'strategic' && <input type="hidden" name="variant" value="strategic" />}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-sm motion-safe:transition-all motion-safe:duration-200 hover:bg-primary-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-500"
      >
        {isSubmitting ? 'Sending...' : submitLabel}
      </button>
    </form>
  );
}
