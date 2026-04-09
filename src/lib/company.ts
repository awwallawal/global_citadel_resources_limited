/**
 * company.ts — Single source of truth for GRCL corporate information.
 *
 * Every page, component, API route, and email template imports from here.
 * Never hardcode company contact details, addresses, or legal identifiers elsewhere.
 */

export interface Office {
  /** Display label (e.g., "Nigeria · HQ") */
  label: string;
  /** ISO country code */
  country: 'NG' | 'GB';
  phone: {
    /** Formatted for display (e.g., "+234-811-191-2174") */
    display: string;
    /** tel: URI format (e.g., "+2348111912174") */
    tel: string;
  };
  address: {
    /** Individual address lines for multi-line rendering */
    lines: string[];
    /** Full single-line address for JSON-LD / compact rendering */
    full: string;
    /** City */
    city: string;
    /** Country name */
    country: string;
  };
  /** Short-format business hours (e.g., "Mon–Fri, 8am–5pm WAT") */
  hours?: string;
  /** Long-format hours for locations page */
  hoursLong?: string;
}

export interface CompanyInfo {
  legalName: string;
  tradingName: string;
  acronym: string;
  monogram: string;
  rcNumber: string;
  tagline: string;
  defaultEmail: string;
  noreplyEmail: string;
  domain: string;
  siteUrl: string;
  offices: {
    nigeria: Office;
    unitedKingdom: Office;
  };
}

export const COMPANY: CompanyInfo = {
  legalName: 'Global Resources Citadel Limited',
  tradingName: 'Global Resources Citadel',
  acronym: 'GRCL',
  monogram: 'GRC',
  rcNumber: '1801787',
  tagline: "Building Africa's Future From Nigeria's Strongest Foundations",
  defaultEmail: 'info@global-resources.org',
  noreplyEmail: 'noreply@global-resources.org',
  domain: 'global-resources.org',
  siteUrl: 'https://global-resources.org',

  offices: {
    nigeria: {
      label: 'Nigeria · HQ',
      country: 'NG',
      phone: {
        display: '+234-811-191-2174',
        tel: '+2348111912174',
      },
      address: {
        lines: [
          '1st Floor, Gbemisola House',
          'Opp. Omole Phase I, Ogba',
          'Lagos, Nigeria',
        ],
        full: '1st Floor, Gbemisola House, Opp. Omole Phase I, Ogba, Lagos, Nigeria',
        city: 'Lagos',
        country: 'Nigeria',
      },
      hours: 'Mon\u2013Fri, 8am\u20135pm WAT',
      hoursLong: 'Monday \u2013 Friday, 8:00am \u2013 5:00pm WAT',
    },

    unitedKingdom: {
      label: 'United Kingdom',
      country: 'GB',
      phone: {
        display: '+44 7404 138 158',
        tel: '+447404138158',
      },
      address: {
        lines: [
          'Office 1249, 12 Farwig Lane',
          'Bromley, BR1 3RB',
          'England, United Kingdom',
        ],
        full: 'Office 1249, 12 Farwig Lane, Bromley, BR1 3RB, England, United Kingdom',
        city: 'Bromley',
        country: 'United Kingdom',
      },
    },
  },
};
