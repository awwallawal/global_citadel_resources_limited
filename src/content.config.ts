import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import {
  divisionSchema,
  clusterSchema,
  articleSchema,
  teamSchema,
  credentialSchema,
  faqSchema,
  pageSchema,
} from '@/lib/schemas';

// Re-export all schemas, enums, and types for consumers importing from @/content/config
export {
  divisionSlugEnum,
  clusterSlugEnum,
  divisionTierEnum,
  sectionEnum,
  audienceEnum,
  insightStreamEnum,
  contactRouteEnum,
  faqCategoryEnum,
  divisionSchema,
  clusterSchema,
  articleSchema,
  teamSchema,
  credentialSchema,
  faqSchema,
  pageSchema,
} from '@/lib/schemas';

export type {
  Division,
  Cluster,
  Article,
  TeamMember,
  Credential,
  Page,
  DivisionSlug,
  ClusterSlug,
  DivisionTier,
  Section,
  Audience,
  InsightStream,
  ContactRoute,
  ClusterAccentColor,
} from '@/lib/schemas';

// ─── Collection Definitions ─────────────────────────────────────────

const divisions = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/divisions' }),
  schema: divisionSchema,
});

const clusters = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/clusters' }),
  schema: clusterSchema,
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: articleSchema,
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/team' }),
  schema: teamSchema,
});

const credentials = defineCollection({
  loader: file('./src/content/credentials/credentials.yaml'),
  schema: credentialSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: pageSchema,
});

const faqs = defineCollection({
  loader: file('./src/content/faqs/faqs.yaml'),
  schema: faqSchema,
});

export const collections = { divisions, clusters, articles, team, credentials, pages, faqs };
