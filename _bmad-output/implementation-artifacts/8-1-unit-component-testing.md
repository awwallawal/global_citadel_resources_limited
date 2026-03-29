# Story 8.1: Unit & Component Testing

Status: ready-for-dev

## Story

As a **developer**,
I want comprehensive automated tests for core logic and interactive components,
So that regressions are caught before deployment.

## Acceptance Criteria

1. Zod schema tests validate all 6 content collection schemas (valid data passes, invalid data fails with correct errors)
2. Utility function tests cover `formatDate()`, `cn()`, and division/cluster lookup helpers (`getDivisionBySlug`, `getClusterDivisions`, `getDivisionsByCluster`)
3. Email routing logic tests verify correct destination team selection for all inquiry types (general, 7 divisions, strategic)
4. Contact form validation tests verify all Zod schemas for all 3 form variants (general, division, strategic)
5. InquiryForm component tests cover: all 3 form variants rendering correctly, inline validation on blur, submission flow (loading/success/error states), division selector pre-selection
6. MobileNav component tests cover: toggle open/close, accordion expand/collapse, accessibility (focus trap, escape close)
7. All tests pass locally via `npm test` (CI pipeline is Story 8.4)

## Tasks / Subtasks

- [ ] Task 1: Set up Vitest for Astro project (AC: #7)
  - [ ] 1.1 Install Vitest: `npm install -D vitest`
  - [ ] 1.2 Configure `vitest.config.ts` using Astro's `getViteConfig` helper
  - [ ] 1.3 Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to package.json
  - [ ] 1.4 Install Testing Library for React: `npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
  - [ ] 1.5 Configure `test.environment: 'jsdom'` for component tests

- [ ] Task 1.5: Extract content collection schemas for testability (prerequisite for AC: #1)
  - [ ] 1.5.1 Create `src/lib/schemas.ts` with all 6 Zod schemas exported as named exports
  - [ ] 1.5.2 Update `src/content.config.ts` (or `src/content/config.ts`) to import schemas from `src/lib/schemas.ts` instead of defining inline
  - [ ] 1.5.3 Verify `npm run build` still passes after refactor
  - [ ] 1.5.4 This decouples schemas from Astro's runtime so Vitest can import them directly

- [ ] Task 2: Write Zod schema unit tests (AC: #1)
  - [ ] 2.1 Create `tests/unit/schemas.test.ts`
  - [ ] 2.2 Test divisionSchema: valid division passes, missing required fields fail, invalid slug enum fails
  - [ ] 2.3 Test clusterSchema: valid cluster passes, invalid divisionSlugs array fails
  - [ ] 2.4 Test articleSchema: valid article passes, missing title fails, invalid stream enum fails, divisionSlug validates against enum
  - [ ] 2.5 Test teamSchema: valid team member passes, missing name/title fails
  - [ ] 2.6 Test credentialSchema: valid credential passes, invalid scope fails
  - [ ] 2.7 Test pageSchema: valid page passes, missing seoTitle fails

- [ ] Task 3: Write utility function unit tests (AC: #2)
  - [ ] 3.1 Create `tests/unit/utils.test.ts`
  - [ ] 3.2 Test `formatDate()`: ISO string → "27 March 2026", Date object → formatted string, various date formats
  - [ ] 3.3 Test `cn()`: single class, multiple classes, conditional classes, conflicting Tailwind classes merged correctly

- [ ] Task 4: Write division helper unit tests (AC: #2)
  - [ ] 4.1 Create `tests/unit/divisions.test.ts`
  - [ ] 4.2 Test `getDivisionBySlug()`: returns correct division, returns undefined for invalid slug
  - [ ] 4.3 Test `getClusterDivisions()`: returns correct divisions for each cluster, empty array for invalid cluster
  - [ ] 4.4 Test `getDivisionsByCluster()`: returns all 3 clusters with their divisions grouped correctly
  - [ ] 4.5 Mock `getCollection`/`getEntry` from `astro:content` for test isolation

- [ ] Task 5: Write email routing logic tests (AC: #3)
  - [ ] 5.1 Create `tests/unit/email.test.ts`
  - [ ] 5.2 Test `getRecipientEmail()`: general → CONTACT_EMAIL_DEFAULT, strategic → CONTACT_EMAIL_DEFAULT, each division slug → division contactEmail
  - [ ] 5.3 Test all 7 division routing paths (crop-farming through oil-gas)
  - [ ] 5.4 Test fallback to default when division email missing
  - [ ] 5.5 Test email template generation: general inquiry produces correct subject/body structure
  - [ ] 5.6 Test email template generation: division inquiry includes division name and context in body
  - [ ] 5.7 Test email template generation: strategic inquiry includes organization and role in body

- [ ] Task 6: Write form validation tests (AC: #4)
  - [ ] 6.1 Create `tests/unit/form-validation.test.ts`
  - [ ] 6.2 Test generalFormSchema: valid data passes, missing fullName fails, invalid email fails, message too short fails
  - [ ] 6.3 Test divisionFormSchema: valid data passes, missing enquiryType fails, company optional works
  - [ ] 6.4 Test strategicFormSchema: valid data passes, missing organization fails, missing titleRole fails
  - [ ] 6.5 Test contactEnvelopeSchema: valid envelope passes, invalid inquiryType enum fails
  - [ ] 6.6 Test discriminated field validation: correct schema selected per inquiryType

- [ ] Task 7: Write InquiryForm component tests (AC: #5)
  - [ ] 7.1 Create `tests/component/InquiryForm.test.tsx`
  - [ ] 7.2 Test division variant: renders correct fields (Full Name, Email, Company, Phone, Enquiry Type, Message)
  - [ ] 7.3 Test general variant: renders Subject instead of Enquiry Type dropdown
  - [ ] 7.4 Test strategic variant: renders Organization and Title/Role fields
  - [ ] 7.5 Test inline validation: blur on empty required field shows error, correcting field clears error
  - [ ] 7.6 Test submission loading state: button shows "Sending..." and disables on submit
  - [ ] 7.7 Test success state: form replaced by success confirmation component
  - [ ] 7.8 Test error state: error banner displayed, form data preserved
  - [ ] 7.9 Test division pre-selection: divisionSlug prop pre-fills context
  - [ ] 7.10 Test honeypot: honeypot field present but hidden

- [ ] Task 8: Write MobileNav component tests (AC: #6)
  - [ ] 8.1 Create `tests/component/MobileNav.test.tsx`
  - [ ] 8.2 Test: hamburger button renders, clicking opens Sheet
  - [ ] 8.3 Test: all 6 L1 nav items visible in Sheet
  - [ ] 8.4 Test: Divisions accordion expands to show 3 clusters
  - [ ] 8.5 Test: cluster accordion expands to show member divisions
  - [ ] 8.6 Test: clicking nav link calls close handler
  - [ ] 8.7 Test: Escape key triggers close (if testable with Testing Library)
  - [ ] 8.8 Test: focus trap — Tab key cycles within open Sheet, does not escape to background content
  - [ ] 8.9 Test: accessibility — `aria-label` on nav, `aria-expanded` on accordions

- [ ] Task 9: Write SearchOverlay component tests (architecture requirement)
  - [ ] 9.1 Create `tests/component/SearchOverlay.test.tsx`
  - [ ] 9.2 Test: renders search input with placeholder text
  - [ ] 9.3 Test: typing in input updates search query state
  - [ ] 9.4 Test: results display matching content when query is entered
  - [ ] 9.5 Test: empty state shows appropriate message when no results match
  - [ ] 9.6 Test: loading state displays while search is processing
  - [ ] 9.7 Test: Escape key closes the overlay
  - [ ] 9.8 Test: keyboard navigation — arrow keys cycle through results
  - [ ] 9.9 Test: accessibility — `aria-label` on search input, `role="dialog"` on overlay, focus moves to input on open

- [ ] Task 10: Verify all tests pass (AC: #7)
  - [ ] 10.1 Run `npm test` — all tests green
  - [ ] 10.2 Fix any failures
  - [ ] 10.3 Verify test output is clean (no warnings)

## Dev Notes

### Vitest Configuration for Astro

```typescript
// vitest.config.ts
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
});
```

```typescript
// tests/setup.ts
import '@testing-library/jest-dom';
```

### Mocking `astro:content`

Vitest needs mocks for `getCollection` and `getEntry` since they're Astro-specific:

```typescript
// tests/mocks/astro-content.ts
import { vi } from 'vitest';

const mockDivisions = [
  { id: 'crop-farming', data: { name: 'Crop Farming', slug: 'crop-farming', clusterSlug: 'agriculture-processing', tier: 'core', tagline: '...', contactEmail: 'crop-farming@globalresourcescitadel.com', sortOrder: 1 } },
  // ... other divisions
];

const mockClusters = [
  { id: 'agriculture-processing', data: { name: 'Agriculture & Processing', slug: 'agriculture-processing', divisionSlugs: ['crop-farming', 'animal-husbandry', 'agro-processing'], sortOrder: 1 } },
  // ... other clusters
];

vi.mock('astro:content', () => ({
  getCollection: vi.fn((name: string) => {
    if (name === 'divisions') return Promise.resolve(mockDivisions);
    if (name === 'clusters') return Promise.resolve(mockClusters);
    return Promise.resolve([]);
  }),
  getEntry: vi.fn((collection: string, id: string) => {
    if (collection === 'divisions') return Promise.resolve(mockDivisions.find(d => d.id === id));
    if (collection === 'clusters') return Promise.resolve(mockClusters.find(c => c.id === id));
    return Promise.resolve(undefined);
  }),
}));
```

### Test File Organization

```
tests/
├── setup.ts                          # Testing Library setup
├── mocks/
│   └── astro-content.ts              # Mock astro:content
├── unit/
│   ├── schemas.test.ts               # Zod schema validation
│   ├── utils.test.ts                 # formatDate, cn helpers
│   ├── divisions.test.ts             # Division/cluster lookup
│   ├── email.test.ts                 # Email routing + template generation
│   └── form-validation.test.ts       # Form Zod schemas
└── component/
    ├── InquiryForm.test.tsx           # Form variants, validation, submission
    ├── MobileNav.test.tsx             # Navigation toggle, accordion, a11y
    └── SearchOverlay.test.tsx         # Search input, results, keyboard nav, a11y
```

### Schema Test Pattern

```typescript
// tests/unit/schemas.test.ts
// Note: describe, it, expect are globally available via vitest.config.ts globals: true
// Import schemas from src/lib/schemas.ts (extracted in Task 1.5)

describe('divisionSchema', () => {
  it('accepts valid division data', () => {
    const valid = {
      name: 'Crop Farming',
      slug: 'crop-farming',
      clusterSlug: 'agriculture-processing',
      tier: 'core',
      tagline: 'Feeding Nigeria\'s future',
      overview: 'Long description...',
      capabilities: [{ icon: 'wheat', name: 'Cultivation', description: 'Large-scale...' }],
      stats: [{ label: 'Hectares', value: 5000 }],
      contactEmail: 'crop@grcl.com',
      seoTitle: 'Crop Farming — GRCL',
      seoDescription: 'Description here',
      sortOrder: 1,
    };
    expect(() => divisionSchema.parse(valid)).not.toThrow();
  });

  it('rejects missing required name', () => {
    const invalid = { slug: 'crop-farming' }; // missing name + others
    expect(() => divisionSchema.parse(invalid)).toThrow();
  });

  it('rejects invalid slug enum value', () => {
    const invalid = { ...validDivision, slug: 'invalid-slug' };
    expect(() => divisionSchema.parse(invalid)).toThrow();
  });
});
```

### Component Test Pattern (InquiryForm)

```tsx
// tests/component/InquiryForm.test.tsx
// Note: describe, it, expect, vi are globally available via globals: true
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InquiryForm from '../../src/components/contact/InquiryForm';

describe('InquiryForm — division variant', () => {
  it('renders division-specific fields', () => {
    render(<InquiryForm variant="division" divisionSlug="crop-farming" divisionName="Crop Farming" />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/enquiry type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows validation error on blur with empty required field', async () => {
    render(<InquiryForm variant="division" divisionSlug="crop-farming" divisionName="Crop Farming" />);
    const nameInput = screen.getByLabelText(/full name/i);
    await userEvent.click(nameInput);
    await userEvent.tab(); // blur
    await waitFor(() => {
      expect(screen.getByText(/name must be at least/i)).toBeInTheDocument();
    });
  });

  it('shows loading state on submit', async () => {
    // Mock fetch
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true }) }));
    render(<InquiryForm variant="division" divisionSlug="crop-farming" divisionName="Crop Farming" />);
    // Fill all required fields...
    // Submit
    // Expect "Sending..." button text
  });
});

describe('InquiryForm — general variant', () => {
  it('renders Subject field instead of Enquiry Type dropdown', () => {
    render(<InquiryForm variant="general" />);
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/enquiry type/i)).not.toBeInTheDocument();
  });
});

describe('InquiryForm — strategic variant', () => {
  it('renders Organization and Title/Role fields', () => {
    render(<InquiryForm variant="strategic" />);
    expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  });
});
```

### Email Routing Test Pattern

```typescript
// tests/unit/email.test.ts
// Note: describe, it, expect are globally available via globals: true

const divisionEmails: Record<string, string> = {
  'crop-farming': 'crop-farming@globalresourcescitadel.com',
  'animal-husbandry': 'animal-husbandry@globalresourcescitadel.com',
  // ... all 7
};

describe('getRecipientEmail', () => {
  it('routes general inquiry to default email', () => {
    const result = getRecipientEmail('general-corporate', 'corporate', divisionEmails);
    expect(result).toBe('info@globalresourcescitadel.com');
  });

  it('routes division inquiry to division email', () => {
    const result = getRecipientEmail('division-business', 'crop-farming', divisionEmails);
    expect(result).toBe('crop-farming@globalresourcescitadel.com');
  });

  it('routes strategic inquiry to default email', () => {
    const result = getRecipientEmail('strategic-partnership', 'strategic', divisionEmails);
    expect(result).toBe('info@globalresourcescitadel.com');
  });

  // Test all 7 division routes
  Object.entries(divisionEmails).forEach(([slug, email]) => {
    it(`routes ${slug} to ${email}`, () => {
      expect(getRecipientEmail('division-business', slug, divisionEmails)).toBe(email);
    });
  });
});
```

### Schema Import Strategy

Content collection schemas are defined in `src/content.config.ts` (Astro 6). Vitest cannot import from this file without Astro's runtime. **Task 1.5 extracts all Zod schemas into `src/lib/schemas.ts`** as named exports. Both `src/content.config.ts` and test files import from this shared location. This is a prerequisite — schema tests will fail without it.

### Previous Story Intelligence

**Story 1.1** installs the project. Vitest is listed in verified packages (4.1.2) but may not be installed yet — this story installs it.

**Story 1.3** creates all content collection schemas. Tests validate these schemas.

**Story 1.2** creates `formatDate()` and `cn()` utilities. Tests validate these.

**Story 4.2-4.4** creates InquiryForm.tsx and form validation schemas. Tests validate these.

**Story 1.6** creates MobileNav.tsx. Tests validate this.

**Story 4.4** creates email routing logic in `src/lib/email.ts`. Tests validate this.

### What This Story Does NOT Include

- No E2E tests (Story 8.2)
- No accessibility audit (Story 8.2)
- No performance testing (Story 8.3)
- No CI/CD pipeline (Story 8.4)
- No visual regression testing
- No snapshot testing

### Project Structure Notes

Files this story creates:
- **Creates:** `vitest.config.ts`
- **Creates:** `tests/setup.ts`
- **Creates:** `tests/mocks/astro-content.ts`
- **Creates:** `tests/unit/schemas.test.ts`
- **Creates:** `tests/unit/utils.test.ts`
- **Creates:** `tests/unit/divisions.test.ts`
- **Creates:** `tests/unit/email.test.ts`
- **Creates:** `tests/unit/form-validation.test.ts`
- **Creates:** `tests/component/InquiryForm.test.tsx`
- **Creates:** `tests/component/MobileNav.test.tsx`
- **Creates:** `tests/component/SearchOverlay.test.tsx`
- **Creates:** `src/lib/schemas.ts` — extracted Zod schemas for testability (Task 1.5)
- **Modifies:** `src/content.config.ts` — imports schemas from `src/lib/schemas.ts` instead of defining inline
- **Modifies:** `package.json` — adds test scripts + dev dependencies

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 8, Story 8.1 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/architecture.md — Testing strategy: Vitest unit/component, test file organization]
- [Source: _bmad-output/implementation-artifacts/4-2-contact-by-division-directory-division-inquiry-forms.md — InquiryForm props, Zod schemas]
- [Source: _bmad-output/implementation-artifacts/4-4-form-submission-validation-email-processing.md — Email routing, server validation schemas]
- [Source: _bmad-output/implementation-artifacts/1-6-mobile-navigation.md — MobileNav component]
- [Source: _bmad-output/implementation-artifacts/1-3-content-collections-seed-data.md — Content collection schemas]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
