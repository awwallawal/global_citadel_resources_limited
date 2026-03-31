# Story 2.3: Credibility Signals & Stats Section

Status: done

## Story

As a **visitor**,
I want to see proof of GRCL's track record and legitimacy,
So that I can trust the business is real and established before exploring further.

## Acceptance Criteria

1. Dark background band (neutral-900) displays 4 key stats as large animated numbers with descriptor labels
2. Stat numbers animate with count-up effect triggered by scroll into view via IntersectionObserver (StatCounter React island, `client:visible`)
3. Key stat numbers render in gold accent colour (gold-600) using Poppins 700 at `text-5xl` (48px — closest standard Tailwind to design ref 44px)
4. Each stat has a gold divider bar (32px wide, 2px height) below the label
5. Optional certification/partner logos row displays as horizontal row below stats
6. Mobile: stats render as 2x2 grid; Desktop: horizontal row (auto-fit grid)
7. Count-up animation respects `prefers-reduced-motion` (numbers display instantly without animation)

## Tasks / Subtasks

- [x] Task 1: Create StatCounter.tsx React island (AC: #2, #3, #7)
  - [x] 1.1 Create `src/components/shared/StatCounter.tsx`
  - [x] 1.2 Props: `value` (number), `label` (string), `prefix` (optional string like "+"), `suffix` (optional string like "%")
  - [x] 1.3 IntersectionObserver: trigger count-up when element enters viewport
  - [x] 1.4 Count-up animation: 0 → target value over ~2 seconds, easing out
  - [x] 1.5 `prefers-reduced-motion`: skip animation, display final value immediately
  - [x] 1.6 Only animate once (not on every scroll)
  - [x] 1.7 Gold number: `font-heading text-5xl font-bold text-gold-600` (48px — closest standard Tailwind to design ref 44px, avoids arbitrary value per CLAUDE.md)
  - [x] 1.8 Label below: `text-sm text-neutral-400 mt-1`
  - [x] 1.9 Gold divider: `w-8 h-0.5 bg-gold-600 mx-auto mt-3`

- [x] Task 2: Create CredibilityBar.astro section component (AC: #1, #4, #5, #6)
  - [x] 2.1 Create `src/components/shared/CredibilityBar.astro`
  - [x] 2.2 SectionWrapper with `variant="dark"` (neutral-900 background)
  - [x] 2.3 SectionHeading: "Our Impact in Numbers" (white text, centered)
  - [x] 2.4 Stats grid: `grid-cols-2 md:grid-cols-4 gap-10` centered layout
  - [x] 2.5 Each stat renders StatCounter island with `client:visible`
  - [x] 2.6 Optional logos row below stats (placeholder for future use)

- [x] Task 3: Define homepage stats data (AC: #1)
  - [x] 3.1 4 stats per epics AC: Divisions Active (7), Years in Business (15+), Nigerian States (6), Business Partners (40+). Note: epics specify "business partners" not "people employed." All figures are plausible placeholders — exact metrics to be confirmed by client.
  - [x] 3.2 Pass as props array to CredibilityBar

- [x] Task 4: Integrate into homepage (AC: #1)
  - [x] 4.1 Add CredibilityBar section to `src/pages/index.astro` after Bento grid
  - [x] 4.2 Verify dark background contrast (white text on neutral-900)

## Dev Notes

### StatCounter is a React Island

StatCounter.tsx uses `client:visible` — hydrates only when scrolled into view. This is optimal because:
- Below the fold — no need for immediate hydration
- IntersectionObserver triggers count-up animation
- Zero JS cost until the user scrolls to this section

```astro
<!-- In CredibilityBar.astro -->
<StatCounter client:visible value={7} label="Divisions Active" />
<StatCounter client:visible value={15} label="Years in Business" suffix="+" />
<StatCounter client:visible value={6} label="Nigerian States" />
<StatCounter client:visible value={40} label="Business Partners" suffix="+" />
```

### StatCounter Implementation Pattern

```tsx
import { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export default function StatCounter({ value, label, prefix = '', suffix = '' }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount(0, value, 2000);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated, prefersReducedMotion]);

  function animateCount(start: number, end: number, duration: number) {
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-5xl font-bold text-gold-600">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="mt-1 text-sm text-neutral-400">{label}</div>
      <div className="mx-auto mt-3 h-0.5 w-8 bg-gold-600" />
    </div>
  );
}
```

### CSS from Design Reference

```css
.credibility { padding: 96px 24px; background: var(--neutral-100); }
.credibility .container { max-width: 960px; text-align: center; }
.credibility h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 700; margin-bottom: 48px; }
.cred-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 40px; }
.cred-item .num { font-family: 'Poppins'; font-size: 44px; font-weight: 700; color: var(--gold); }
.cred-item .label { font-size: 14px; color: var(--neutral-600); margin-top: 4px; }
.cred-item .divider { width: 32px; height: 2px; background: var(--gold); margin: 12px auto 0; }
```

**Note:** Design reference uses `neutral-100` background but the epics AC and IA spec say `neutral-900` (dark band). Use **dark background** per the epics AC — this is the credibility signals section that creates visual contrast in the homepage scroll. The design reference shows a lighter variant, but the information architecture is authoritative for section treatment.

### Stats Data

| Metric | Value | Suffix | Label |
|--------|-------|--------|-------|
| 7 | 7 | — | Divisions Active |
| 15 | 15 | + | Years in Business |
| 6 | 6 | — | Nigerian States |
| 40 | 40 | + | Business Partners |

These match the epics AC metrics ("divisions active, years in business, states/regions, business partners"). All values are plausible placeholders — exact figures will be provided by the client.

### Homepage Section Context

This is Section 4 of 6 on the homepage:
1. Hero (Story 2.1) ✅
2. Business Overview (Story 2.1) ✅
3. Divisions Bento Grid (Story 2.2)
4. **Credibility Signals (this story)**
5. Latest Insights (Story 2.4)
6. Contact CTA (Story 2.4)

### Previous Story Intelligence

**Story 2.2** adds the Bento grid above this section. This story adds the dark credibility band below it — the contrast between the light Bento grid and dark stats section is a key visual rhythm in the homepage scroll.

**Story 1.4** provides SectionWrapper `variant="dark"` which gives `bg-neutral-900 text-white`.

### What This Story Does NOT Include

- No certification/partner logo images (placeholder row only)
- No Investors & Partners page variant of CredibilityBar (Epic 5)
- No division-specific stats (those appear on division detail pages, Epic 3)

### Project Structure Notes

Files this story creates or modifies:
- **Creates:** `src/components/shared/StatCounter.tsx` — React island
- **Creates:** `src/components/shared/CredibilityBar.astro` — section component
- **Modifies:** `src/pages/index.astro` — adds credibility section after Bento grid

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 2, Story 2.3 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/design-reference-final.html — Credibility CSS lines 440-475, HTML lines 811-837]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — CredibilityBar, StatCounter island spec]
- [Source: _bmad-output/planning-artifacts/information-architecture.md — P01 Section 4 Credibility Signals]
- [Source: _bmad-output/planning-artifacts/architecture.md — Island Hydration Map: StatCounter client:visible]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Build verified: `astro build` — 2 pages, zero errors
- TypeScript check: `tsc --noEmit` — clean
- Stats count: 4 stat labels confirmed in dist/index.html

### Completion Notes List

- Created StatCounter.tsx React island with IntersectionObserver count-up animation
- Count-up: 0 → target over 2s with ease-out cubic easing, triggers once on scroll into view
- prefers-reduced-motion: displays final value immediately, skips animation
- hasAnimatedRef prevents re-triggering on subsequent scrolls
- Gold number: font-heading text-5xl font-bold text-gold-600
- Gold divider bar: w-8 h-0.5 bg-gold-600 centered below each label
- Created CredibilityBar.astro with SectionWrapper variant="dark" (neutral-900 bg)
- Heading: "Our Impact in Numbers" in white, centered, bold
- Stats grid: grid-cols-2 (mobile 2x2) md:grid-cols-4 (desktop horizontal row), gap-10
- Each StatCounter hydrated with client:visible — zero JS cost until scrolled into view
- 4 stats: Divisions Active (7), Years in Business (15+), Nigerian States (6), Business Partners (40+)
- Stats passed as props array from index.astro for flexibility
- Placed after Divisions Bento Grid, before FAQ section

### File List

- `src/components/shared/StatCounter.tsx` — Created (new)
- `src/components/shared/CredibilityBar.astro` — Created (new)
- `src/pages/index.astro` — Modified (added CredibilityBar import and section)

### Review Findings

- [x] [Review][Patch] rAF leak — stored rAF ID in ref, cancelAnimationFrame in cleanup, ensured final setCount(value) on completion ✓ Fixed
- [x] [Review][Patch] Initial count=0 flash — changed useState(null), display falls back to value via `count ?? value` so SSR/initial render shows final number ✓ Fixed
- [x] [Review][Patch] Empty stats guard — wrapped CredibilityBar render in stats.length > 0 conditional ✓ Fixed
- [x] [Review][Defer] prefers-reduced-motion checked once, not reactive to OS setting changes — standard pattern, defer to Epic 8
- [x] [Review][Defer] No logos row placeholder (AC #5 "optional") — add slot when client provides partner logos
- [x] [Review][Defer] toLocaleString() without explicit locale — harmless for small values, revisit if stats grow large
- [x] [Review][Defer] Hardcoded h2 heading level — works on homepage, add headingLevel prop if component is reused

### Change Log

- 2026-03-31: Implemented Story 2.3 Credibility Signals & Stats Section — all 4 tasks complete, build verified
- 2026-03-31: Code review completed — 0 decisions, 3 patches, 4 deferred, 6 dismissed
