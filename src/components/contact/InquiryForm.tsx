import { useState, useRef, type FormEvent, type FocusEvent } from 'react';
import { z } from 'zod';
import {
  generalFormSchema,
  divisionFormSchema,
  strategicFormSchema,
} from '@/lib/contact';
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

function getInitialData(variant: InquiryFormProps['variant']): Record<string, string> {
  if (variant === 'general') {
    return { fullName: '', email: '', phone: '', subject: '', message: '' };
  }
  if (variant === 'strategic') {
    return { fullName: '', email: '', organization: '', titleRole: '', phone: '', inquiryType: '', description: '' };
  }
  return { fullName: '', email: '', company: '', phone: '', enquiryType: '', message: '' };
}

function getInquiryType(variant: InquiryFormProps['variant']): string {
  if (variant === 'general') return 'general-corporate';
  if (variant === 'strategic') return 'strategic-partnership';
  return 'division-business';
}

function getDestinationTeam(variant: InquiryFormProps['variant'], divisionSlug?: string): string {
  if (variant === 'division' && divisionSlug) return divisionSlug;
  if (variant === 'strategic') return 'strategic';
  return 'corporate';
}

// ─── Success Confirmation ───────────────────────────────────────────

function SuccessConfirmation({
  routingContext,
  onReset,
}: {
  routingContext: string;
  onReset: () => void;
}) {
  return (
    <div
      className="rounded-xl border border-success-100 bg-success-100/50 p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <svg
        className="mx-auto h-12 w-12 text-success-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <h3 className="mt-4 font-heading text-xl font-semibold text-neutral-900">
        Your enquiry has been received
      </h3>
      <p className="mt-2 text-neutral-600">{routingContext}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Submit another enquiry
        </button>
        <a
          href="/contact/"
          className="min-h-11 text-sm font-semibold text-neutral-600 hover:text-neutral-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Return to Contact
        </a>
      </div>
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────

export default function InquiryForm({
  variant,
  divisionSlug,
  divisionName,
}: InquiryFormProps) {
  const schema = getSchema(variant);
  const [formData, setFormData] = useState<Record<string, string>>(() => getInitialData(variant));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successContext, setSuccessContext] = useState<string | null>(null);
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setServerError(null);

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

    // Check honeypot
    let honeypotValue = '';
    if (formRef.current) {
      honeypotValue = (new FormData(formRef.current).get('website') as string) || '';
      if (honeypotValue) return;
    }

    const validatedData = result.data as Record<string, string>;

    setIsSubmitting(true);

    try {
      const payload = {
        inquiryType: getInquiryType(variant),
        destinationTeam: getDestinationTeam(variant, divisionSlug),
        divisionSlug: variant === 'division' ? divisionSlug : null,
        sourcePage: window.location.pathname,
        submittedAt: new Date().toISOString(),
        honeypot: honeypotValue,
        fields: validatedData,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessContext(data.routingContext);
        return;
      }

      if (response.status === 400 && data.errors) {
        // Server-side field validation errors
        setErrors(data.errors as FormErrors);
      } else if (response.status === 429) {
        setServerError(data.message || 'Too many requests. Please try again later.');
      } else {
        setServerError(data.message || 'Unable to process your request. Please try again.');
      }
    } catch {
      setServerError('Unable to reach our servers. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData(getInitialData(variant));
    setErrors({});
    setServerError(null);
    setSuccessContext(null);
    setIsSubmitting(false);
  }

  // Show success confirmation
  if (successContext !== null) {
    return <SuccessConfirmation routingContext={successContext} onReset={handleReset} />;
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
      {/* Server error banner */}
      {serverError && (
        <div
          className="rounded-lg border border-error-100 bg-error-100/50 p-4"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm font-medium text-error-600">{serverError}</p>
        </div>
      )}

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
