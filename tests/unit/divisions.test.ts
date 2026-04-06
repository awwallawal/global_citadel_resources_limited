import '../mocks/astro-content';
import { mockDivisions } from '../mocks/astro-content';
import {
  getDivisionBySlug,
  getClusterDivisions,
  getDivisionsByCluster,
} from '../../src/lib/divisions';
import type { DivisionSlug, ClusterSlug } from '../../src/lib/schemas';

describe('getDivisionBySlug', () => {
  it('returns correct division for valid slug', async () => {
    const result = await getDivisionBySlug('crop-farming' as DivisionSlug);
    expect(result).toBeDefined();
    expect(result?.data.name).toBe('Crop Farming');
  });

  it('returns correct division for each slug', async () => {
    for (const division of mockDivisions) {
      const result = await getDivisionBySlug(division.data.slug as DivisionSlug);
      expect(result?.data.name).toBe(division.data.name);
    }
  });

  it('returns undefined for invalid slug', async () => {
    const result = await getDivisionBySlug('nonexistent' as DivisionSlug);
    expect(result).toBeUndefined();
  });
});

describe('getClusterDivisions', () => {
  it('returns agriculture-processing divisions', async () => {
    const result = await getClusterDivisions('agriculture-processing' as ClusterSlug);
    expect(result).toHaveLength(3);
    const slugs = result.map((d) => d.data.slug);
    expect(slugs).toContain('crop-farming');
    expect(slugs).toContain('animal-husbandry');
    expect(slugs).toContain('agro-processing');
  });

  it('returns trade-markets divisions', async () => {
    const result = await getClusterDivisions('trade-markets' as ClusterSlug);
    expect(result).toHaveLength(2);
    const slugs = result.map((d) => d.data.slug);
    expect(slugs).toContain('commodity-marketing');
    expect(slugs).toContain('import-export');
  });

  it('returns built-environment-energy divisions', async () => {
    const result = await getClusterDivisions('built-environment-energy' as ClusterSlug);
    expect(result).toHaveLength(2);
    const slugs = result.map((d) => d.data.slug);
    expect(slugs).toContain('real-estate');
    expect(slugs).toContain('oil-gas');
  });

  it('returns empty array for invalid cluster', async () => {
    const result = await getClusterDivisions('nonexistent' as ClusterSlug);
    expect(result).toHaveLength(0);
  });
});

describe('getDivisionsByCluster', () => {
  it('returns all 3 clusters with their divisions grouped', async () => {
    const result = await getDivisionsByCluster();
    expect(result).toHaveLength(3);
  });

  it('groups agriculture-processing correctly', async () => {
    const result = await getDivisionsByCluster();
    const agri = result.find((g) => g.cluster.slug === 'agriculture-processing');
    expect(agri).toBeDefined();
    expect(agri!.divisions).toHaveLength(3);
  });

  it('groups trade-markets correctly', async () => {
    const result = await getDivisionsByCluster();
    const trade = result.find((g) => g.cluster.slug === 'trade-markets');
    expect(trade).toBeDefined();
    expect(trade!.divisions).toHaveLength(2);
  });

  it('groups built-environment-energy correctly', async () => {
    const result = await getDivisionsByCluster();
    const built = result.find((g) => g.cluster.slug === 'built-environment-energy');
    expect(built).toBeDefined();
    expect(built!.divisions).toHaveLength(2);
  });

  it('includes all 7 divisions across all groups', async () => {
    const result = await getDivisionsByCluster();
    const totalDivisions = result.reduce((sum, g) => sum + g.divisions.length, 0);
    expect(totalDivisions).toBe(7);
  });
});
