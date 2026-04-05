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
      contactEmail: 'crop-farming@globalresourcescitadel.com',
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
      contactEmail: 'animal-husbandry@globalresourcescitadel.com',
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
      contactEmail: 'agro-processing@globalresourcescitadel.com',
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
      clusterSlug: 'trade-markets',
      tier: 'supporting',
      tagline: 'Commodity trading',
      overview: 'Strategic commodity marketing and trade facilitation.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'commodity-marketing@globalresourcescitadel.com',
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
      clusterSlug: 'trade-markets',
      tier: 'supporting',
      tagline: 'International trade',
      overview: 'International trade and cross-border commerce solutions.',
      capabilities: defaultCapabilities,
      stats: defaultStats,
      contactEmail: 'import-export@globalresourcescitadel.com',
      seoTitle: 'Import & Export — GRCL',
      seoDescription: 'International trade and import-export operations.',
      sortOrder: 5,
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
      contactEmail: 'real-estate@globalresourcescitadel.com',
      seoTitle: 'Real Estate — GRCL',
      seoDescription: 'Property development and real estate services.',
      sortOrder: 6,
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
      contactEmail: 'oil-gas@globalresourcescitadel.com',
      seoTitle: 'Oil & Gas — GRCL',
      seoDescription: 'Oil and gas operations and energy services.',
      sortOrder: 7,
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
    id: 'trade-markets',
    data: {
      name: 'Trade & Markets',
      slug: 'trade-markets',
      tagline: 'Connecting markets globally',
      overview: 'Trade facilitation and market access operations.',
      divisionSlugs: ['commodity-marketing', 'import-export'],
      seoTitle: 'Trade & Markets — GRCL',
      seoDescription: 'Trade and market facilitation cluster.',
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
