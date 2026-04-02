import { getCollection, getEntry } from 'astro:content';
import type { DivisionSlug, ClusterSlug } from '@/content/config';

/** Emoji icons keyed by division slug. Shared across hub and cluster pages. */
export const DIVISION_ICONS: Record<string, string> = {
  'crop-farming': '\u{1F33E}',
  'animal-husbandry': '\u{1F404}',
  'agro-processing': '\u{2699}\u{FE0F}',
  'commodity-marketing': '\u{1F4CA}',
  'import-export': '\u{1F30D}',
  'real-estate': '\u{1F3D7}\u{FE0F}',
  'oil-gas': '\u{26FD}',
};

/** Human-readable labels for insight stream slugs. Shared across cluster and division pages. */
export const STREAM_LABELS: Record<string, string> = {
  'company-news': 'Company News',
  announcements: 'Announcements',
  'operational-updates': 'Operational Updates',
  'thought-leadership': 'Thought Leadership',
  'industry-commentary': 'Industry Commentary',
  'division-insight': 'Division Insight',
};

export async function getDivisionBySlug(slug: DivisionSlug) {
  return await getEntry('divisions', slug);
}

export async function getClusterDivisions(clusterSlug: ClusterSlug) {
  const divisions = await getCollection('divisions');
  return divisions.filter((d) => d.data.clusterSlug === clusterSlug);
}

export async function getDivisionsByCluster() {
  const divisions = await getCollection('divisions');
  const clusters = await getCollection('clusters');
  return clusters.map((cluster) => ({
    cluster: cluster.data,
    divisions: divisions.filter(
      (d) => d.data.clusterSlug === cluster.data.slug,
    ),
  }));
}
