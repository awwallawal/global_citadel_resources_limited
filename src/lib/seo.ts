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

const SITE_URL = (import.meta.env.SITE ?? 'https://globalresourcescitadel.com').replace(/\/$/, '');
const SITE_NAME = 'Global Resources Citadel';

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
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Global Resources Citadel Limited',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      'A Nigerian conglomerate operating across agriculture, trade, real estate, and energy verticals.',
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
