import '../mocks/astro-content';
import { mockDivisions } from '../mocks/astro-content';
import { getRecipientEmail, getRoutingContext } from '../../src/lib/contact';

const DEFAULT_EMAIL = 'info@global-resources.org';
const divisions = mockDivisions.map((division) => ({
  slug: division.data.slug,
  name: division.data.name,
  contactEmail: division.data.contactEmail,
}));

describe('getRecipientEmail', () => {
  it('routes general inquiry to default email', () => {
    const result = getRecipientEmail('general-corporate', 'corporate', divisions, DEFAULT_EMAIL);
    expect(result.recipientEmail).toBe(DEFAULT_EMAIL);
  });

  it('routes strategic inquiry to default email', () => {
    const result = getRecipientEmail('strategic-partnership', 'strategic', divisions, DEFAULT_EMAIL);
    expect(result.recipientEmail).toBe(DEFAULT_EMAIL);
  });

  it('routes investor inquiry to default email', () => {
    const result = getRecipientEmail('investor-institutional', null, divisions, DEFAULT_EMAIL);
    expect(result.recipientEmail).toBe(DEFAULT_EMAIL);
  });

  it('routes division inquiry to division email and name', () => {
    const result = getRecipientEmail('division-business', 'crop-farming', divisions, DEFAULT_EMAIL);
    expect(result.recipientEmail).toBe('crop-farming@global-resources.org');
    expect(result.divisionName).toBe('Crop Farming');
  });

  it('falls back to default when division slug is missing', () => {
    const result = getRecipientEmail('division-business', null, divisions, DEFAULT_EMAIL);
    expect(result.recipientEmail).toBe(DEFAULT_EMAIL);
  });

  it('falls back to default when division email not found', () => {
    const result = getRecipientEmail('division-business', 'nonexistent', divisions, DEFAULT_EMAIL);
    expect(result.recipientEmail).toBe(DEFAULT_EMAIL);
  });

  const expectedRoutes: [string, string][] = [
    ['crop-farming', 'crop-farming@global-resources.org'],
    ['animal-husbandry', 'animal-husbandry@global-resources.org'],
    ['agro-processing', 'agro-processing@global-resources.org'],
    ['commodity-marketing', 'commodity-marketing@global-resources.org'],
    ['import-export', 'import-export@global-resources.org'],
    ['real-estate', 'real-estate@global-resources.org'],
    ['oil-gas', 'oil-gas@global-resources.org'],
  ];

  it.each(expectedRoutes)('routes %s to %s', (slug, email) => {
    expect(getRecipientEmail('division-business', slug, divisions, DEFAULT_EMAIL).recipientEmail).toBe(email);
  });
});

describe('getRoutingContext', () => {
  it('returns general routing message for general inquiry', () => {
    expect(getRoutingContext('general-corporate')).toBe('We aim to respond within 2 business days.');
  });

  it('returns division-specific message with division name', () => {
    const result = getRoutingContext('division-business', 'Crop Farming');
    expect(result).toContain('Crop Farming');
    expect(result).toContain('2 business days');
  });

  it('returns strategic message for strategic partnership', () => {
    const result = getRoutingContext('strategic-partnership');
    expect(result).toContain('strategic team');
    expect(result).toContain('3 business days');
    expect(result).toContain('confidentially');
  });

  it('returns strategic message for investor institutional', () => {
    expect(getRoutingContext('investor-institutional')).toContain('strategic team');
  });

  it('returns general message for division inquiry without division name', () => {
    expect(getRoutingContext('division-business')).toBe('We aim to respond within 2 business days.');
  });
});
