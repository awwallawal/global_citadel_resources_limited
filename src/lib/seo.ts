export interface SeoMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

import { COMPANY } from '@/lib/company';

const SITE_URL = (import.meta.env.SITE ?? COMPANY.siteUrl).replace(/\/$/, '');
const SITE_NAME = COMPANY.tradingName;

export function generateMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: string;
}): SeoMetadata {
  return {
    title: `${page.title} — ${SITE_NAME}`,
    description: page.description,
    canonical: `${SITE_URL}${page.path}`,
    ogImage: page.ogImage || '/og-default.png',
    ogType: page.type || 'website',
  };
}

export function generateOrganizationJsonLd(): Record<string, unknown> {
  const ng = COMPANY.offices.nigeria;
  const uk = COMPANY.offices.unitedKingdom;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: COMPANY.defaultEmail,
    telephone: ng.phone.display,
    description:
      'A pan-African conglomerate headquartered in Lagos, Nigeria, with a UK office in Bromley, operating across agriculture, trade, real estate, and energy verticals with operations spanning West Africa.',
    identifier: {
      '@type': 'PropertyValue',
      name: 'RC Number',
      value: COMPANY.rcNumber,
    },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: `${ng.address.lines[0]}, ${ng.address.lines[1]}`,
        addressLocality: ng.address.city,
        addressCountry: 'NG',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: uk.address.lines[0],
        addressLocality: uk.address.city,
        addressRegion: 'England',
        postalCode: 'BR1 3RB',
        addressCountry: 'GB',
      },
    ],
  };
}

export function generateWebSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}
