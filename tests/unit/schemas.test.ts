import {
  divisionSchema,
  clusterSchema,
  articleSchema,
  teamSchema,
  credentialSchema,
  faqSchema,
  pageSchema,
} from '../../src/lib/schemas';

// ─── Valid fixtures ────────────────────────────────────────────────

const validDivision = {
  name: 'Crop Farming',
  slug: 'crop-farming',
  clusterSlug: 'agriculture-processing',
  tier: 'core',
  tagline: "Feeding Nigeria's future through sustainable, large-scale crop production",
  overview: 'Large-scale crop production operations.',
  capabilities: [
    { icon: 'wheat', name: 'Cultivation', description: 'Large-scale farming.' },
    { icon: 'warehouse', name: 'Storage', description: 'Post-harvest storage.' },
    { icon: 'sprout', name: 'Seeds', description: 'Seed technology.' },
  ],
  stats: [
    { label: 'Hectares', value: 5000 },
    { label: 'Yield', value: 12000, unit: 'tonnes' },
    { label: 'Years', value: 15 },
  ],
  contactEmail: 'crop-farming@globalresourcescitadel.com',
  seoTitle: 'Crop Farming — GRCL',
  seoDescription: 'Explore GRCL Crop Farming division.',
  sortOrder: 1,
};

const validCluster = {
  name: 'Agriculture & Processing',
  slug: 'agriculture-processing',
  tagline: 'Integrated agricultural operations.',
  overview: 'Full agricultural value chain.',
  divisionSlugs: ['crop-farming', 'animal-husbandry', 'agro-processing'],
  seoTitle: 'Agriculture & Processing — GRCL',
  seoDescription: 'Agriculture & Processing cluster.',
  accentColor: 'amber',
  sortOrder: 1,
};

const validArticle = {
  title: 'GRCL Launches Operations',
  excerpt: 'Global Resources Citadel marks a new chapter.',
  stream: 'company-news',
  publishedAt: '2026-03-15',
  author: 'Adebayo Okonkwo',
  featured: true,
};

const validTeamMember = {
  name: 'Adebayo Okonkwo',
  title: 'Group Managing Director',
  bio: 'Leads GRCL since 2015 with 25+ years experience.',
  briefDescriptor: "Leads GRCL's strategic direction across all seven divisions",
  sortOrder: 1,
  featured: true,
};

const validCredential = {
  name: 'ISO 9001:2015',
  issuer: 'International Organization for Standardization',
  scope: 'company-wide',
  sortOrder: 1,
};

const validFaq = {
  question: 'What does Global Resources Citadel Limited do?',
  answer: 'GRCL is a diversified Nigerian conglomerate operating across seven business divisions.',
  category: 'homepage',
  sortOrder: 1,
};

const validPage = {
  title: 'About the Group',
  seoTitle: 'About Global Resources Citadel',
  seoDescription: 'Learn about Global Resources Citadel Limited.',
};

// ─── Tests ─────────────────────────────────────────────────────────

describe('divisionSchema', () => {
  it('accepts valid division data', () => {
    expect(() => divisionSchema.parse(validDivision)).not.toThrow();
  });

  it('rejects missing required name', () => {
    const { name, ...rest } = validDivision;
    expect(() => divisionSchema.parse(rest)).toThrow();
  });

  it('rejects invalid slug enum value', () => {
    expect(() => divisionSchema.parse({ ...validDivision, slug: 'invalid-slug' })).toThrow();
  });

  it('rejects invalid clusterSlug', () => {
    expect(() => divisionSchema.parse({ ...validDivision, clusterSlug: 'bad-cluster' })).toThrow();
  });

  it('rejects invalid tier', () => {
    expect(() => divisionSchema.parse({ ...validDivision, tier: 'premium' })).toThrow();
  });

  it('rejects tagline over 150 characters', () => {
    expect(() => divisionSchema.parse({ ...validDivision, tagline: 'x'.repeat(151) })).toThrow();
  });

  it('rejects fewer than 3 capabilities', () => {
    expect(() =>
      divisionSchema.parse({
        ...validDivision,
        capabilities: [{ icon: 'a', name: 'b', description: 'c' }],
      }),
    ).toThrow();
  });

  it('rejects more than 6 capabilities', () => {
    const caps = Array.from({ length: 7 }, (_, i) => ({
      icon: `icon-${i}`,
      name: `Cap ${i}`,
      description: `Desc ${i}`,
    }));
    expect(() => divisionSchema.parse({ ...validDivision, capabilities: caps })).toThrow();
  });

  it('rejects fewer than 3 stats', () => {
    expect(() =>
      divisionSchema.parse({ ...validDivision, stats: [{ label: 'A', value: 1 }] }),
    ).toThrow();
  });

  it('rejects more than 4 stats', () => {
    const stats = Array.from({ length: 5 }, (_, i) => ({ label: `Stat ${i}`, value: i }));
    expect(() => divisionSchema.parse({ ...validDivision, stats })).toThrow();
  });

  it('rejects invalid contactEmail', () => {
    expect(() =>
      divisionSchema.parse({ ...validDivision, contactEmail: 'not-an-email' }),
    ).toThrow();
  });

  it('rejects seoDescription over 160 characters', () => {
    expect(() =>
      divisionSchema.parse({ ...validDivision, seoDescription: 'x'.repeat(161) }),
    ).toThrow();
  });

  it('applies sortOrder default of 0', () => {
    const { sortOrder, ...rest } = validDivision;
    const result = divisionSchema.parse(rest);
    expect(result.sortOrder).toBe(0);
  });
});

describe('clusterSchema', () => {
  it('accepts valid cluster data', () => {
    expect(() => clusterSchema.parse(validCluster)).not.toThrow();
  });

  it('rejects missing required name', () => {
    const { name, ...rest } = validCluster;
    expect(() => clusterSchema.parse(rest)).toThrow();
  });

  it('rejects invalid divisionSlugs entries', () => {
    expect(() =>
      clusterSchema.parse({ ...validCluster, divisionSlugs: ['bad-division'] }),
    ).toThrow();
  });

  it('rejects empty divisionSlugs array', () => {
    expect(() => clusterSchema.parse({ ...validCluster, divisionSlugs: [] })).toThrow();
  });

  it('rejects invalid accentColor', () => {
    expect(() => clusterSchema.parse({ ...validCluster, accentColor: 'red' })).toThrow();
  });

  it('accepts valid accentColor values', () => {
    for (const color of ['amber', 'copper', 'slate']) {
      expect(() => clusterSchema.parse({ ...validCluster, accentColor: color })).not.toThrow();
    }
  });
});

describe('articleSchema', () => {
  it('accepts valid article data', () => {
    expect(() => articleSchema.parse(validArticle)).not.toThrow();
  });

  it('rejects missing title', () => {
    const { title, ...rest } = validArticle;
    expect(() => articleSchema.parse(rest)).toThrow();
  });

  it('rejects title over 120 characters', () => {
    expect(() => articleSchema.parse({ ...validArticle, title: 'x'.repeat(121) })).toThrow();
  });

  it('rejects invalid stream enum', () => {
    expect(() => articleSchema.parse({ ...validArticle, stream: 'invalid-stream' })).toThrow();
  });

  it('accepts all valid stream values', () => {
    const streams = [
      'company-news',
      'announcements',
      'operational-updates',
      'thought-leadership',
      'industry-commentary',
      'division-insight',
    ];
    for (const stream of streams) {
      expect(() => articleSchema.parse({ ...validArticle, stream })).not.toThrow();
    }
  });

  it('rejects invalid publishedAt format', () => {
    expect(() =>
      articleSchema.parse({ ...validArticle, publishedAt: '15-03-2026' }),
    ).toThrow();
  });

  it('does not reject rolled-over calendar dates like Feb 30 (known Date.parse limitation)', () => {
    // Date.parse('2026-02-30') rolls over to March 2 in most JS engines.
    // The schema's .refine() check uses !isNaN(Date.parse(d)) which passes.
    // Documenting the gap — fix requires a stricter calendar validator.
    expect(() =>
      articleSchema.parse({ ...validArticle, publishedAt: '2026-02-30' }),
    ).not.toThrow();
  });

  it('validates divisionSlug against enum', () => {
    expect(() =>
      articleSchema.parse({ ...validArticle, divisionSlug: 'crop-farming' }),
    ).not.toThrow();
    expect(() =>
      articleSchema.parse({ ...validArticle, divisionSlug: 'invalid-division' }),
    ).toThrow();
  });

  it('rejects excerpt over 300 characters', () => {
    expect(() => articleSchema.parse({ ...validArticle, excerpt: 'x'.repeat(301) })).toThrow();
  });
});

describe('teamSchema', () => {
  it('accepts valid team member data', () => {
    expect(() => teamSchema.parse(validTeamMember)).not.toThrow();
  });

  it('rejects missing name', () => {
    const { name, ...rest } = validTeamMember;
    expect(() => teamSchema.parse(rest)).toThrow();
  });

  it('rejects missing title', () => {
    const { title, ...rest } = validTeamMember;
    expect(() => teamSchema.parse(rest)).toThrow();
  });

  it('rejects missing bio', () => {
    const { bio, ...rest } = validTeamMember;
    expect(() => teamSchema.parse(rest)).toThrow();
  });

  it('rejects briefDescriptor over 80 characters', () => {
    expect(() =>
      teamSchema.parse({ ...validTeamMember, briefDescriptor: 'x'.repeat(81) }),
    ).toThrow();
  });

  it('validates optional email as email format', () => {
    expect(() =>
      teamSchema.parse({ ...validTeamMember, email: 'not-email' }),
    ).toThrow();
    expect(() =>
      teamSchema.parse({ ...validTeamMember, email: 'valid@example.com' }),
    ).not.toThrow();
  });

  it('validates optional linkedIn as URL', () => {
    expect(() =>
      teamSchema.parse({ ...validTeamMember, linkedIn: 'not-a-url' }),
    ).toThrow();
    expect(() =>
      teamSchema.parse({ ...validTeamMember, linkedIn: 'https://linkedin.com/in/test' }),
    ).not.toThrow();
  });
});

describe('credentialSchema', () => {
  it('accepts valid credential data', () => {
    expect(() => credentialSchema.parse(validCredential)).not.toThrow();
  });

  it('accepts company-wide scope', () => {
    expect(() =>
      credentialSchema.parse({ ...validCredential, scope: 'company-wide' }),
    ).not.toThrow();
  });

  it('accepts division slug as scope', () => {
    expect(() =>
      credentialSchema.parse({ ...validCredential, scope: 'agro-processing' }),
    ).not.toThrow();
  });

  it('rejects invalid scope', () => {
    expect(() =>
      credentialSchema.parse({ ...validCredential, scope: 'invalid-scope' }),
    ).toThrow();
  });

  it('rejects missing issuer', () => {
    const { issuer, ...rest } = validCredential;
    expect(() => credentialSchema.parse(rest)).toThrow();
  });
});

describe('faqSchema', () => {
  it('accepts valid FAQ data', () => {
    expect(() => faqSchema.parse(validFaq)).not.toThrow();
  });

  it('rejects question shorter than 10 characters', () => {
    expect(() => faqSchema.parse({ ...validFaq, question: 'Short?' })).toThrow();
  });

  it('rejects question over 200 characters', () => {
    expect(() => faqSchema.parse({ ...validFaq, question: 'x'.repeat(201) })).toThrow();
  });

  it('rejects answer shorter than 20 characters', () => {
    expect(() => faqSchema.parse({ ...validFaq, answer: 'Too short.' })).toThrow();
  });

  it('rejects answer over 1000 characters', () => {
    expect(() => faqSchema.parse({ ...validFaq, answer: 'x'.repeat(1001) })).toThrow();
  });

  it('rejects invalid category', () => {
    expect(() => faqSchema.parse({ ...validFaq, category: 'invalid' })).toThrow();
  });

  it('accepts all valid categories', () => {
    for (const category of ['homepage', 'about', 'general']) {
      expect(() => faqSchema.parse({ ...validFaq, category })).not.toThrow();
    }
  });

  it('rejects negative sortOrder', () => {
    expect(() => faqSchema.parse({ ...validFaq, sortOrder: -1 })).toThrow();
  });

  it('rejects non-integer sortOrder', () => {
    expect(() => faqSchema.parse({ ...validFaq, sortOrder: 1.5 })).toThrow();
  });
});

describe('pageSchema', () => {
  it('accepts valid page data', () => {
    expect(() => pageSchema.parse(validPage)).not.toThrow();
  });

  it('rejects missing seoTitle', () => {
    const { seoTitle, ...rest } = validPage;
    expect(() => pageSchema.parse(rest)).toThrow();
  });

  it('rejects seoDescription over 160 characters', () => {
    expect(() =>
      pageSchema.parse({ ...validPage, seoDescription: 'x'.repeat(161) }),
    ).toThrow();
  });

  it('validates optional lastUpdated date format', () => {
    expect(() =>
      pageSchema.parse({ ...validPage, lastUpdated: '2026-03-28' }),
    ).not.toThrow();
    expect(() =>
      pageSchema.parse({ ...validPage, lastUpdated: '28-03-2026' }),
    ).toThrow();
  });

  it('does not reject rolled-over calendar dates like Feb 30 (known Date.parse limitation)', () => {
    // Same limitation as articleSchema.publishedAt — Date.parse rolls over invalid days.
    expect(() =>
      pageSchema.parse({ ...validPage, lastUpdated: '2026-02-30' }),
    ).not.toThrow();
  });

  it('accepts optional about-page extension fields', () => {
    const aboutPage = {
      ...validPage,
      mission: 'Our mission statement.',
      vision: 'Our vision statement.',
      values: [
        { icon: 'shield', title: 'Integrity', description: 'Operating with transparency.' },
      ],
    };
    expect(() => pageSchema.parse(aboutPage)).not.toThrow();
  });

  it('accepts optional whyPartner field', () => {
    expect(() =>
      pageSchema.parse({ ...validPage, whyPartner: 'Partnership benefits.' }),
    ).not.toThrow();
  });
});
