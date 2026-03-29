// Re-export types and enums from the content config for convenient imports
// via @/content/config throughout the project.
//
// The actual collection definitions live in src/content.config.ts (Astro 6 convention).

export type {
  Division,
  Cluster,
  Article,
  TeamMember,
  Credential,
  Page,
  DivisionSlug,
  ClusterSlug,
  ClusterAccentColor,
  DivisionTier,
  Section,
  Audience,
  InsightStream,
  ContactRoute,
} from '../content.config';

export {
  divisionSlugEnum,
  clusterSlugEnum,
  divisionTierEnum,
  sectionEnum,
  audienceEnum,
  insightStreamEnum,
  contactRouteEnum,
} from '../content.config';
