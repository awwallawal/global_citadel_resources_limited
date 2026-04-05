import { vi } from 'vitest';

export const mockDivisions = [
  {
    id: 'crop-farming',
    data: {
      name: 'Crop Farming',
      slug: 'crop-farming',
      clusterSlug: 'agriculture-processing',
      tier: 'core',
      tagline: "Feeding Nigeria's future",
      contactEmail: 'crop-farming@globalresourcescitadel.com',
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
      contactEmail: 'animal-husbandry@globalresourcescitadel.com',
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
      contactEmail: 'agro-processing@globalresourcescitadel.com',
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
      contactEmail: 'commodity-marketing@globalresourcescitadel.com',
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
      contactEmail: 'import-export@globalresourcescitadel.com',
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
      contactEmail: 'real-estate@globalresourcescitadel.com',
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
      contactEmail: 'oil-gas@globalresourcescitadel.com',
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
      divisionSlugs: ['crop-farming', 'animal-husbandry', 'agro-processing'],
      sortOrder: 1,
    },
  },
  {
    id: 'trade-markets',
    data: {
      name: 'Trade & Markets',
      slug: 'trade-markets',
      divisionSlugs: ['commodity-marketing', 'import-export'],
      sortOrder: 2,
    },
  },
  {
    id: 'built-environment-energy',
    data: {
      name: 'Built Environment & Energy',
      slug: 'built-environment-energy',
      divisionSlugs: ['real-estate', 'oil-gas'],
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
