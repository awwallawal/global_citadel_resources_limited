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

// ─── Validation schema ──────────────────────────────────────────────

const divisionFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  message: z.string().trim().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof divisionFormSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── Props ──────────────────────────────────────────────────────────

interface InquiryFormProps {
  variant: 'general' | 'division' | 'strategic';
  divisionSlug?: string;
  divisionName?: string;
}

// ─── Component ──────────────────────────────────────────────────────

export default function InquiryForm({
  variant,
  divisionSlug,
  divisionName,
}: InquiryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    enquiryType: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validateField(name: keyof FormData, value: string): string | undefined {
    const result = divisionFormSchema.shape[name].safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    const error = validateField(fieldName, value);

    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[fieldName] = error;
      } else {
        delete next[fieldName];
      }
      return next;
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[fieldName] = error;
        } else {
          delete next[fieldName];
        }
        return next;
      });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    const result = divisionFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof FormData;
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

    // Submission logic will be added in Story 4.4
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  }

  const inputClasses =
    'block w-full min-h-11 rounded-lg border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

  const labelClasses = 'block text-sm font-medium text-neutral-700';

  function fieldBorderClass(fieldName: keyof FormData): string {
    return errors[fieldName] ? 'border-error-600' : 'border-neutral-300';
  }

  const enquiryTypes = DIVISION_ENQUIRY_TYPES;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Full Name */}
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
        {errors.fullName && (
          <p id="fullName-error" className="mt-1.5 text-sm text-error-600" aria-live="polite">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
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
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-error-600" aria-live="polite">
            {errors.email}
          </p>
        )}
      </div>

      {/* Company / Organization */}
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

      {/* Phone */}
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

      {/* Enquiry Type */}
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
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundSize: '1rem',
            backgroundPosition: 'right 1rem center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {enquiryTypes.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''} hidden={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.enquiryType && (
          <p id="enquiryType-error" className="mt-1.5 text-sm text-error-600" aria-live="polite">
            {errors.enquiryType}
          </p>
        )}
      </div>

      {/* Message */}
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
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-error-600" aria-live="polite">
            {errors.message}
          </p>
        )}
      </div>

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

      {/* Hidden division context */}
      {variant === 'division' && divisionSlug && (
        <>
          <input type="hidden" name="divisionSlug" value={divisionSlug} />
          <input type="hidden" name="variant" value="division" />
        </>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-sm motion-safe:transition-all motion-safe:duration-200 hover:bg-primary-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-500"
      >
        {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
      </button>
    </form>
  );
}
