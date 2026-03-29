import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'zod';

// ─── Controlled Taxonomy Enums (Task 1) ─────────────────────────────

export const divisionSlugEnum = z.enum([
  'crop-farming',
  'animal-husbandry',
  'agro-processing',
  'commodity-marketing',
  'import-export',
  'real-estate',
  'oil-gas',
]);

export const clusterSlugEnum = z.enum([
  'agriculture-processing',
  'trade-markets',
  'built-environment-energy',
]);

export const divisionTierEnum = z.enum(['core', 'supporting', 'aspirational']);

export const sectionEnum = z.enum([
  'home',
  'about',
  'divisions',
  'insights',
  'investors-partners',
  'contact',
  'search',
]);

export const audienceEnum = z.enum([
  'investor-partner',
  'prospect-customer',
  'general-public',
  'internal-editor',
]);

export const insightStreamEnum = z.enum([
  'company-news',
  'announcements',
  'operational-updates',
  'thought-leadership',
  'industry-commentary',
  'division-insight',
]);

export const contactRouteEnum = z.enum([
  'general-corporate',
  'division-business',
  'strategic-partnership',
  'investor-institutional',
]);

// ─── Collection Schemas ─────────────────────────────────────────────

export const divisionSchema = z.object({
  name: z.string(),
  slug: divisionSlugEnum,
  clusterSlug: clusterSlugEnum,
  tier: divisionTierEnum,
  tagline: z.string().max(150),

  overview: z.string(),
  capabilities: z
    .array(
      z.object({
        icon: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .min(3)
    .max(6),

  stats: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
        unit: z.string().optional(),
        prefix: z.string().optional(),
      }),
    )
    .min(3)
    .max(4),

  contactEmail: z.string().email(),

  seoTitle: z.string(),
  seoDescription: z.string().max(160),

  heroImage: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  testimonial: z.string().optional(),

  sortOrder: z.number().default(0),
});

export const clusterSchema = z.object({
  name: z.string(),
  slug: clusterSlugEnum,
  tagline: z.string(),
  overview: z.string(),
  divisionSlugs: z.array(divisionSlugEnum).min(1),

  seoTitle: z.string(),
  seoDescription: z.string().max(160),

  heroImage: z.string().optional(),
  accentColor: z.enum(['amber', 'copper', 'slate']).optional(),
  sortOrder: z.number().default(0),
});

export const articleSchema = z.object({
  title: z.string().max(120),
  excerpt: z.string().max(300),
  stream: insightStreamEnum,
  publishedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD format')
    .refine((d) => !isNaN(Date.parse(d)), 'Invalid calendar date'),

  author: z.string().optional(),
  divisionSlug: divisionSlugEnum.optional(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),

  heroImage: z.string().optional(),
  thumbnailImage: z.string().optional(),
  heroImageCaption: z.string().optional(),

  seoTitle: z.string().optional(),
  seoDescription: z.string().max(160).optional(),
});

export const teamSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  briefDescriptor: z.string().max(80),
  photo: z.string().optional(),
  email: z.string().email().optional(),
  linkedIn: z.string().url().optional(),
  sortOrder: z.number().default(0),
  featured: z.boolean().default(false),
});

export const credentialSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  logo: z.string().optional(),
  scope: z.union([z.literal('company-wide'), divisionSlugEnum]),
  sortOrder: z.number().default(0),
});

export const pageSchema = z.object({
  title: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string().max(160),
  lastUpdated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD format')
    .refine((d) => !isNaN(Date.parse(d)), 'Invalid calendar date')
    .optional(),
});

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

export const collections = { divisions, clusters, articles, team, credentials, pages };

// ─── Inferred Types ─────────────────────────────────────────────────

export type Division = z.infer<typeof divisionSchema>;
export type Cluster = z.infer<typeof clusterSchema>;
export type Article = z.infer<typeof articleSchema>;
export type TeamMember = z.infer<typeof teamSchema>;
export type Credential = z.infer<typeof credentialSchema>;
export type Page = z.infer<typeof pageSchema>;
export type DivisionSlug = z.infer<typeof divisionSlugEnum>;
export type ClusterSlug = z.infer<typeof clusterSlugEnum>;
export type DivisionTier = z.infer<typeof divisionTierEnum>;
export type Section = z.infer<typeof sectionEnum>;
export type Audience = z.infer<typeof audienceEnum>;
export type InsightStream = z.infer<typeof insightStreamEnum>;
export type ContactRoute = z.infer<typeof contactRouteEnum>;
export type ClusterAccentColor = 'amber' | 'copper' | 'slate';
