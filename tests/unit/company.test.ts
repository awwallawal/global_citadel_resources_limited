import { COMPANY } from '../../src/lib/company';
import type { CompanyInfo, Office } from '../../src/lib/company';

describe('COMPANY constant', () => {
  it('exports an object matching the CompanyInfo shape', () => {
    const info: CompanyInfo = COMPANY;
    expect(info).toBeDefined();
    expect(info.legalName).toBe('Global Resources Citadel Limited');
    expect(info.tradingName).toBe('Global Resources Citadel');
    expect(info.acronym).toBe('GRCL');
    expect(info.monogram).toBe('GRC');
  });

  it('has correct RC number', () => {
    expect(COMPANY.rcNumber).toBe('1801787');
  });

  it('has correct domain and email addresses', () => {
    expect(COMPANY.domain).toBe('global-resources.org');
    expect(COMPANY.siteUrl).toBe('https://global-resources.org');
    expect(COMPANY.defaultEmail).toBe('info@global-resources.org');
    expect(COMPANY.noreplyEmail).toBe('noreply@global-resources.org');
  });

  it('has a non-empty tagline', () => {
    expect(COMPANY.tagline.length).toBeGreaterThan(0);
  });

  describe('Nigeria office', () => {
    let office: Office;
    beforeAll(() => {
      office = COMPANY.offices.nigeria;
    });

    it('is the HQ', () => {
      expect(office.label).toContain('HQ');
      expect(office.country).toBe('NG');
    });

    it('has valid phone formats', () => {
      expect(office.phones.length).toBeGreaterThanOrEqual(1);
      for (const phone of office.phones) {
        expect(phone.display).toMatch(/^\+234/);
        expect(phone.tel).toMatch(/^\+234\d+$/);
      }
    });

    it('lists both confirmed HQ numbers', () => {
      const tels = office.phones.map((p) => p.tel);
      expect(tels).toContain('+2347041008192');
      expect(tels).toContain('+2349154109225');
      expect(tels).not.toContain('+2348111912174');
    });

    it('has address with lines and full string', () => {
      expect(office.address.lines.length).toBeGreaterThanOrEqual(2);
      expect(office.address.full).toContain('Lagos');
      expect(office.address.full).toContain('Ogba');
      expect(office.address.country).toBe('Nigeria');
    });

    it('has business hours', () => {
      expect(office.hours).toBeDefined();
      expect(office.hoursLong).toBeDefined();
    });
  });

  describe('United Kingdom office', () => {
    let office: Office;
    beforeAll(() => {
      office = COMPANY.offices.unitedKingdom;
    });

    it('has correct country code', () => {
      expect(office.country).toBe('GB');
    });

    it('has valid UK phone format', () => {
      expect(office.phones.length).toBeGreaterThanOrEqual(1);
      expect(office.phones[0].display).toMatch(/^\+44/);
      expect(office.phones[0].tel).toMatch(/^\+44\d+$/);
    });

    it('has address with Bromley', () => {
      expect(office.address.lines.length).toBeGreaterThanOrEqual(2);
      expect(office.address.full).toContain('Bromley');
      expect(office.address.full).toContain('BR1 3RB');
      expect(office.address.country).toBe('United Kingdom');
    });

    it('does not require business hours', () => {
      // UK office has no hours defined (virtual/correspondence office)
      expect(office.hours).toBeUndefined();
    });
  });
});
