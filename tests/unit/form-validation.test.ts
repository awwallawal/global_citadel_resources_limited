import {
  generalFormSchema,
  divisionFormSchema,
  strategicFormSchema,
  contactEnvelopeSchema,
  fieldsSchemaMap,
} from '../../src/lib/contact';

const validGeneral = {
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '+234 800 000 0000',
  subject: 'General enquiry',
  message: 'I would like to learn more about GRCL operations and services.',
};

const validDivision = {
  fullName: 'Jane Smith',
  email: 'jane@example.com',
  company: 'Acme Corp',
  phone: '+234 800 000 0001',
  enquiryType: 'product-service',
  message: 'I am interested in crop farming services and partnerships.',
};

const validStrategic = {
  fullName: 'Bob Partner',
  email: 'bob@investment.com',
  organization: 'Strategic Investments Ltd',
  titleRole: 'Managing Director',
  phone: '+234 800 000 0002',
  inquiryType: 'strategic-partnership',
  description: 'We are interested in exploring investment opportunities with GRCL.',
};

describe('generalFormSchema', () => {
  it('accepts valid general form data', () => {
    expect(() => generalFormSchema.parse(validGeneral)).not.toThrow();
  });

  it('rejects missing fullName', () => {
    const { fullName, ...rest } = validGeneral;
    expect(() => generalFormSchema.parse(rest)).toThrow();
  });

  it('rejects fullName shorter than 2 characters', () => {
    const result = generalFormSchema.safeParse({ ...validGeneral, fullName: 'J' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    expect(generalFormSchema.safeParse({ ...validGeneral, email: 'not-email' }).success).toBe(false);
  });

  it('rejects empty subject', () => {
    expect(() => generalFormSchema.parse({ ...validGeneral, subject: '' })).toThrow();
  });

  it('rejects message shorter than 20 characters', () => {
    expect(generalFormSchema.safeParse({ ...validGeneral, message: 'Too short.' }).success).toBe(false);
  });

  it('allows optional phone', () => {
    const { phone, ...rest } = validGeneral;
    expect(() => generalFormSchema.parse(rest)).not.toThrow();
  });
});

describe('divisionFormSchema', () => {
  it('accepts valid division form data', () => {
    expect(() => divisionFormSchema.parse(validDivision)).not.toThrow();
  });

  it('rejects missing enquiryType', () => {
    expect(() => divisionFormSchema.parse({ ...validDivision, enquiryType: '' })).toThrow();
  });

  it('allows optional company', () => {
    const { company, ...rest } = validDivision;
    expect(() => divisionFormSchema.parse(rest)).not.toThrow();
  });

  it('rejects invalid email', () => {
    expect(() => divisionFormSchema.parse({ ...validDivision, email: 'bad' })).toThrow();
  });

  it('rejects message shorter than 20 characters', () => {
    expect(() => divisionFormSchema.parse({ ...validDivision, message: 'Short' })).toThrow();
  });
});

describe('strategicFormSchema', () => {
  it('accepts valid strategic form data', () => {
    expect(() => strategicFormSchema.parse(validStrategic)).not.toThrow();
  });

  it('rejects missing organization', () => {
    expect(() => strategicFormSchema.parse({ ...validStrategic, organization: '' })).toThrow();
  });

  it('rejects missing titleRole', () => {
    expect(() => strategicFormSchema.parse({ ...validStrategic, titleRole: '' })).toThrow();
  });

  it('rejects missing inquiryType', () => {
    expect(() => strategicFormSchema.parse({ ...validStrategic, inquiryType: '' })).toThrow();
  });

  it('rejects description shorter than 20 characters', () => {
    expect(() => strategicFormSchema.parse({ ...validStrategic, description: 'Short' })).toThrow();
  });
});

describe('contactEnvelopeSchema', () => {
  const validEnvelope = {
    inquiryType: 'general-corporate',
    destinationTeam: 'corporate',
    divisionSlug: null,
    sourcePage: '/contact/general/',
    submittedAt: '2026-04-01T12:00:00Z',
    honeypot: '',
    fields: { fullName: 'John', email: 'john@test.com' },
  };

  it('accepts valid envelope', () => {
    expect(() => contactEnvelopeSchema.parse(validEnvelope)).not.toThrow();
  });

  it('rejects invalid inquiryType enum', () => {
    expect(() => contactEnvelopeSchema.parse({ ...validEnvelope, inquiryType: 'invalid-type' })).toThrow();
  });

  it('accepts all valid inquiryType values', () => {
    for (const type of [
      'general-corporate',
      'division-business',
      'strategic-partnership',
      'investor-institutional',
    ]) {
      expect(() => contactEnvelopeSchema.parse({ ...validEnvelope, inquiryType: type })).not.toThrow();
    }
  });

  it('rejects empty destinationTeam', () => {
    expect(() => contactEnvelopeSchema.parse({ ...validEnvelope, destinationTeam: '' })).toThrow();
  });

  it('allows null divisionSlug', () => {
    expect(() => contactEnvelopeSchema.parse({ ...validEnvelope, divisionSlug: null })).not.toThrow();
  });
});

describe('discriminated field validation', () => {
  it('selects generalFormSchema for general-corporate', () => {
    const schema = fieldsSchemaMap['general-corporate'];
    expect(() => schema.parse(validGeneral)).not.toThrow();
    expect(() => schema.parse(validDivision)).toThrow();
  });

  it('selects divisionFormSchema for division-business', () => {
    expect(() => fieldsSchemaMap['division-business'].parse(validDivision)).not.toThrow();
  });

  it('selects strategicFormSchema for strategic-partnership', () => {
    expect(() => fieldsSchemaMap['strategic-partnership'].parse(validStrategic)).not.toThrow();
  });

  it('selects strategicFormSchema for investor-institutional', () => {
    expect(() => fieldsSchemaMap['investor-institutional'].parse(validStrategic)).not.toThrow();
  });

  it('returns undefined for unknown inquiryType', () => {
    expect(fieldsSchemaMap['unknown-type' as keyof typeof fieldsSchemaMap]).toBeUndefined();
  });
});
