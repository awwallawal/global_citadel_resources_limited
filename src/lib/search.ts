import { getCollection } from 'astro:content';

export interface SearchItem {
  id: string;
  slug: string;
  title: string;
  type: 'page' | 'division' | 'insight' | 'contact';
  section: string;
  summary: string;
  url: string;
  division?: string;
  stream?: string;
  publishedAt?: string;
}

export async function buildSearchIndex(): Promise<SearchItem[]> {
  const divisions = await getCollection('divisions');
  const clusters = await getCollection('clusters');
  const articles = await getCollection('articles');

  const index: SearchItem[] = [];

  // Divisions
  divisions.forEach((d) =>
    index.push({
      id: d.id,
      slug: d.data.slug,
      title: d.data.name,
      type: 'division',
      section: 'Divisions',
      summary: d.data.tagline,
      url: `/divisions/${d.data.slug}/`,
    }),
  );

  // Clusters
  clusters.forEach((c) =>
    index.push({
      id: c.id,
      slug: c.data.slug,
      title: c.data.name,
      type: 'page',
      section: 'Divisions',
      summary: c.data.tagline,
      url: `/divisions/${c.data.slug}/`,
    }),
  );

  // Articles
  articles.forEach((a) =>
    index.push({
      id: a.id,
      slug: a.id,
      title: a.data.title,
      type: 'insight',
      section: 'Insights',
      summary: a.data.excerpt,
      url: `/insights/${a.id}/`,
      division: a.data.divisionSlug,
      stream: a.data.stream,
      publishedAt: a.data.publishedAt,
    }),
  );

  // Static pages
  index.push(
    {
      id: 'home',
      slug: 'home',
      title: 'Home',
      type: 'page',
      section: 'Home',
      summary: 'Global Resources Citadel — a pan-African conglomerate across agriculture, trade, real estate, and energy.',
      url: '/',
    },
    {
      id: 'divisions-hub',
      slug: 'divisions',
      title: 'Our Divisions',
      type: 'page',
      section: 'Divisions',
      summary: 'Explore all seven business divisions of Global Resources Citadel.',
      url: '/divisions/',
    },
    {
      id: 'insights-hub',
      slug: 'insights',
      title: 'Insights',
      type: 'page',
      section: 'Insights',
      summary: 'News, updates, and thought leadership from Global Resources Citadel.',
      url: '/insights/',
    },
    {
      id: 'insights-latest',
      slug: 'insights-latest',
      title: 'Latest Insights',
      type: 'page',
      section: 'Insights',
      summary: 'All articles sorted by most recent.',
      url: '/insights/latest/',
    },
    {
      id: 'insights-news',
      slug: 'insights-news',
      title: 'News & Updates',
      type: 'page',
      section: 'Insights',
      summary: 'Company news, announcements, and operational updates.',
      url: '/insights/news/',
    },
    {
      id: 'insights-thought-leadership',
      slug: 'insights-thought-leadership',
      title: 'Thought Leadership',
      type: 'page',
      section: 'Insights',
      summary: 'Expert analysis, industry perspectives, and strategic commentary.',
      url: '/insights/thought-leadership/',
    },
    {
      id: 'insights-divisions',
      slug: 'insights-divisions',
      title: 'Insights by Division',
      type: 'page',
      section: 'Insights',
      summary: 'Browse insights from each of our seven business divisions.',
      url: '/insights/divisions/',
    },
    {
      id: 'about',
      slug: 'about',
      title: 'About the Group',
      type: 'page',
      section: 'The Group',
      summary: 'Our story, mission, leadership, and credentials.',
      url: '/about/',
    },
    {
      id: 'investors',
      slug: 'investors-partners',
      title: 'Investors & Partners',
      type: 'page',
      section: 'The Group',
      summary: 'Partnership and investment opportunities.',
      url: '/investors-partners/',
    },
    {
      id: 'contact',
      slug: 'contact',
      title: 'Contact',
      type: 'contact',
      section: 'Contact',
      summary: 'Get in touch with Global Resources Citadel.',
      url: '/contact/',
    },
    {
      id: 'contact-general',
      slug: 'contact-general',
      title: 'General Enquiries',
      type: 'contact',
      section: 'Contact',
      summary: 'Send a general enquiry.',
      url: '/contact/general/',
    },
    {
      id: 'contact-strategic',
      slug: 'contact-strategic',
      title: 'Partner & Investor Contact',
      type: 'contact',
      section: 'Contact',
      summary: 'Strategic partnerships and investment discussions.',
      url: '/contact/strategic/',
    },
    {
      id: 'contact-locations',
      slug: 'contact-locations',
      title: 'Our Locations',
      type: 'contact',
      section: 'Contact',
      summary: 'Find our offices and operational locations.',
      url: '/contact/locations/',
    },
  );

  // Division contact pages
  divisions.forEach((d) =>
    index.push({
      id: `contact-${d.data.slug}`,
      slug: d.data.slug,
      title: `${d.data.name} Enquiry`,
      type: 'contact',
      section: 'Contact',
      summary: `Contact our ${d.data.name} team.`,
      url: `/contact/divisions/${d.data.slug}/`,
      division: d.data.slug,
    }),
  );

  return index;
}
