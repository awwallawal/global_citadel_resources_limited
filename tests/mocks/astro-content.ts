import { vi } from 'vitest';

const defaultCapabilities = [
  { icon: 'briefcase', name: 'Operations', description: 'Core operational capability' },
  { icon: 'target', name: 'Strategy', description: 'Strategic planning and execution' },
  { icon: 'users', name: 'Partnership', description: 'Collaborative partnerships' },
];

const defaultStats = [
  { label: 'Years Active', value: 5 },
  { label: 'Projects', value: 12 },
  { label: 'Partners', value: 8 },
];

export const mockDivisions = [
  {
    id: 'crop-farming',
    data: {
      name: 'Crop Farming',
      slug: 'crop-farming',
      clusterSlug: 'agriculture-processing',
      tier: 'core',
      tagline: "Feeding Nigeria's future",
      overview: 'Large-scale sustainable crop production across Nigeria.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'crop-farming@global-resources.org',
      seoTitle: 'Crop Farming — GRCL',
      seoDescription: 'Sustainable crop production and farming operations.',
      sortOrder: 1,
    },
  },
  {
    id: 'animal-husbandry',
    data: {
      name: 'Animal Husbandry',
      slug: 'animal-husbandry',
      clusterSlug: 'agriculture-processing',
      tier: 'core',
      tagline: 'Livestock operations',
      overview: 'Comprehensive livestock management and production.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'animal-husbandry@global-resources.org',
      seoTitle: 'Animal Husbandry — GRCL',
      seoDescription: 'Livestock management and animal husbandry operations.',
      sortOrder: 2,
    },
  },
  {
    id: 'agro-processing',
    data: {
      name: 'Agro-Processing',
      slug: 'agro-processing',
      clusterSlug: 'agriculture-processing',
      tier: 'core',
      tagline: 'Processing operations',
      overview: 'Agricultural product processing and value addition.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'agro-processing@global-resources.org',
      seoTitle: 'Agro-Processing — GRCL',
      seoDescription: 'Agricultural processing and value chain operations.',
      sortOrder: 3,
    },
  },
  {
    id: 'commodity-marketing',
    data: {
      name: 'Commodity Marketing',
      slug: 'commodity-marketing',
      clusterSlug: 'trade-services',
      tier: 'supporting',
      tagline: 'Commodity trading',
      overview: 'Strategic commodity marketing and trade facilitation.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'commodity-marketing@global-resources.org',
      seoTitle: 'Commodity Marketing — GRCL',
      seoDescription: 'Commodity trading and market facilitation services.',
      sortOrder: 4,
    },
  },
  {
    id: 'import-export',
    data: {
      name: 'Import & Export',
      slug: 'import-export',
      clusterSlug: 'trade-services',
      tier: 'supporting',
      tagline: 'International trade',
      overview: 'International trade and cross-border commerce solutions.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'import-export@global-resources.org',
      seoTitle: 'Import & Export — GRCL',
      seoDescription: 'International trade and import-export operations.',
      sortOrder: 5,
    },
  },
  {
    id: 'travel-mobility',
    data: {
      name: 'Travel & Mobility',
      slug: 'travel-mobility',
      clusterSlug: 'trade-services',
      tier: 'supporting',
      tagline: 'Moving people across borders',
      overview: 'Full-service travel and mobility services for corporate, leisure, religious, educational, and relocation needs.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'travel-mobility@global-resources.org',
      seoTitle: 'Travel & Mobility — GRCL',
      seoDescription: 'Travel and mobility services across Africa and beyond.',
      sortOrder: 6,
    },
  },
  {
    id: 'real-estate',
    data: {
      name: 'Real Estate',
      slug: 'real-estate',
      clusterSlug: 'built-environment-energy',
      tier: 'aspirational',
      tagline: 'Property development',
      overview: 'Property development and real estate investment.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'real-estate@global-resources.org',
      seoTitle: 'Real Estate — GRCL',
      seoDescription: 'Property development and real estate services.',
      sortOrder: 7,
    },
  },
  {
    id: 'oil-gas',
    data: {
      name: 'Oil & Gas',
      slug: 'oil-gas',
      clusterSlug: 'built-environment-energy',
      tier: 'aspirational',
      tagline: 'Energy operations',
      overview: 'Downstream oil and gas operations and energy services.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'oil-gas@global-resources.org',
      seoTitle: 'Oil & Gas — GRCL',
      seoDescription: 'Oil and gas operations and energy services.',
      sortOrder: 8,
    },
  },
];

export const mockClusters = [
  {
    id: 'agriculture-processing',
    data: {
      name: 'Agriculture & Processing',
      slug: 'agriculture-processing',
      tagline: 'From farm to market',
      overview: 'Integrated agriculture and processing operations.',
      divisionSlugs: ['crop-farming', 'animal-husbandry', 'agro-processing'],
      seoTitle: 'Agriculture & Processing — GRCL',
      seoDescription: 'Agriculture and processing cluster operations.',
      sortOrder: 1,
    },
  },
  {
    id: 'trade-services',
    data: {
      name: 'Trade & Services',
      slug: 'trade-services',
      tagline: 'Connecting markets and people globally',
      overview: 'Trade facilitation, market access, and travel & mobility services.',
      divisionSlugs: ['commodity-marketing', 'import-export', 'travel-mobility'],
      seoTitle: 'Trade & Services — GRCL',
      seoDescription: 'Trade, mobility, and market facilitation cluster.',
      sortOrder: 2,
    },
  },
  {
    id: 'built-environment-energy',
    data: {
      name: 'Built Environment & Energy',
      slug: 'built-environment-energy',
      tagline: 'Building the future',
      overview: 'Real estate development and energy sector operations.',
      divisionSlugs: ['real-estate', 'oil-gas'],
      seoTitle: 'Built Environment & Energy — GRCL',
      seoDescription: 'Built environment and energy cluster operations.',
      sortOrder: 3,
    },
  },
];

vi.mock('astro:content', () => ({
  getCollection: vi.fn((name: string) => {
    if (name === 'divisions') return Promise.resolve(mockDivisions);
    if (name === 'clusters') return Promise.resolve(mockClusters);
    return Promise.resolve([]);
  }),
  getEntry: vi.fn((collection: string, id: string) => {
    if (collection === 'divisions') return Promise.resolve(mockDivisions.find((d) => d.id === id));
    if (collection === 'clusters') return Promise.resolve(mockClusters.find((c) => c.id === id));
    return Promise.resolve(undefined);
  }),
}));
