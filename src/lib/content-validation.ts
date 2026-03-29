import { getCollection } from 'astro:content';

let validated = false;

/**
 * Validates cross-collection content integrity at build time.
 * Call from a layout or page frontmatter to ensure every build checks consistency.
 * Throws on failure — breaking the build if content relationships are invalid.
 * Runs once per build — subsequent calls are no-ops.
 */
export async function validateContentIntegrity() {
  if (validated) return;
  validated = true;
  const divisions = await getCollection('divisions');
  const clusters = await getCollection('clusters');
  const errors: string[] = [];

  // D2: Division slug must match its filename-derived entry ID
  for (const division of divisions) {
    if (division.id !== division.data.slug) {
      errors.push(
        `Division "${division.id}" has slug "${division.data.slug}" — slug must match filename`,
      );
    }
  }

  // D1: Bi-directional cluster↔division consistency
  for (const cluster of clusters) {
    for (const slug of cluster.data.divisionSlugs) {
      const division = divisions.find((d) => d.data.slug === slug);
      if (!division) {
        errors.push(
          `Cluster "${cluster.data.name}" lists division "${slug}" but no matching division file exists`,
        );
      } else if (division.data.clusterSlug !== cluster.data.slug) {
        errors.push(
          `Cluster "${cluster.data.name}" claims division "${slug}" but that division's clusterSlug is "${division.data.clusterSlug}"`,
        );
      }
    }
  }

  // Reverse check: every division's clusterSlug must appear in that cluster's divisionSlugs
  for (const division of divisions) {
    const cluster = clusters.find(
      (c) => c.data.slug === division.data.clusterSlug,
    );
    if (!cluster) {
      errors.push(
        `Division "${division.data.name}" references cluster "${division.data.clusterSlug}" which does not exist`,
      );
    } else if (!cluster.data.divisionSlugs.includes(division.data.slug)) {
      errors.push(
        `Division "${division.data.name}" belongs to cluster "${cluster.data.name}" but is not listed in its divisionSlugs`,
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Content integrity validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`,
    );
  }
}
