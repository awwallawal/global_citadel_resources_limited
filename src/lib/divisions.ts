import { getCollection, getEntry } from 'astro:content';
import type { DivisionSlug, ClusterSlug } from '@/content/config';

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
