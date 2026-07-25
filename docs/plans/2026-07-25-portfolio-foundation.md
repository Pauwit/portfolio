# Portfolio Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Astro project skeleton, design tokens, content-collection schemas, shared page chrome (layout, navbar, footer, theme toggle), and the GitHub Pages deploy pipeline, so a minimal but fully-styled, fully-deployed site is live at paulwitkowski.com before any page content is built.

**Architecture:** Astro static site (`output: 'static'`) with Tailwind CSS v4 (via `@tailwindcss/vite`) and React islands for interactive components. Content lives in Zod-validated Astro content collections, never hardcoded in markup. GitHub Actions builds and deploys to GitHub Pages on every push to `main`.

**Tech Stack:** Astro 5, React 19 (islands only), Tailwind CSS v4, TypeScript (strict), Vitest + jsdom (unit tests for non-visual logic), GitHub Actions, GitHub Pages.

This is Phase 1 of 5. Later phases (Home+Projects, Me+Timeline, Interests parallax, Contact+404+polish) build on top of what this phase produces and will be planned separately once this phase is reviewed and executed.

## Global Constraints

(Copied verbatim from `docs/specs/2026-07-25-portfolio-design.md` — every task below implicitly inherits these.)

- Static output only, deployable as plain files on GitHub Pages, served at the domain root (no base path). `CNAME` must contain `paulwitkowski.com` and live at `public/CNAME`.
- Palette — dark: bg `#100C08`, surface `#1C1712`, text `#EFECE8`, accent `#95122C`. Light: bg `#F7F5F4`, surface `#ECE8E6`, text `#100C08`, accent `#95122C` (same accent both themes, never used for small body text).
- Typography — Clash Display (headlines) + Switzer (body), self-hosted, no CDN, no Google Fonts, no Inter, no monospace anywhere.
- Radius system — 12px default (cards/panels/images-in-cards), 8px small (buttons/chips/nav pills). No other radius values.
- Theme toggle — whole-page swap via a `data-theme` attribute on `<html>`, persisted in `localStorage`, applied by an inline `<head>` script before first paint (no flash of wrong theme).
- `prefers-reduced-motion` — every animated component needs a static fallback; nothing essential depends on motion.
- Responsive down to ~360px, desktop-first.
- Content-as-data — projects, timeline, interests, links live in Astro content collections, never hardcoded in markup.
- No analytics wired yet, but the layout should have one clear insertion point for later.
- Commit convention — Conventional Commits, single-line subject only, no body, no co-author trailer.
- CI must run `astro check` before `astro build`, so malformed content fails the build loudly.

---

## File Structure

```
package.json
astro.config.mjs
tsconfig.json
vitest.config.ts
.github/workflows/deploy.yml
public/
  CNAME
  fonts/
    ClashDisplay-Semibold.woff2
    ClashDisplay-Bold.woff2
    Switzer-Regular.woff2
    Switzer-Medium.woff2
src/
  content/
    config.ts          — Zod schemas for all collections (projects/timeline/interests seeded in later phases; links + site config seeded here)
    links.json          — GitHub/LinkedIn links, real data
  site.config.ts        — site name, tagline, CV path, Formspree endpoint, OG defaults
  styles/
    global.css           — Tailwind import, @theme tokens, @font-face, dark-mode variant
  lib/
    theme.ts              — theme persistence logic (pure, unit-tested)
    reducedMotion.ts       — prefers-reduced-motion helper (pure, unit-tested)
  components/
    ThemeToggle.tsx        — React island
    Navbar.tsx              — React island
    Footer.astro
  layouts/
    BaseLayout.astro        — head/meta/SEO/OG scaffold, no-flash theme script, wraps Navbar + slot + Footer
  pages/
    index.astro              — minimal placeholder home page (real content in Phase 2)
    404.astro
tests/
  theme.test.ts
  reducedMotion.test.ts
```

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/pages/index.astro`

**Interfaces:**
- Produces: a working `npm run build`, `npm run dev`, and `npm run test` command, for every later task to build on.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "portfolio",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^5.1.0",
    "@astrojs/react": "^4.1.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0",
    "jsdom": "^25.0.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://paulwitkowski.com',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
```

- [ ] **Step 5: Create a placeholder `src/pages/index.astro`**

```astro
---
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Paul Witkowski</title>
  </head>
  <body>
    <p>Scaffolding placeholder — replaced in Task 10 and Phase 2.</p>
  </body>
</html>
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `package-lock.json`.

- [ ] **Step 7: Verify the build works**

Run: `npm run build`
Expected: `astro check` reports no errors, `astro build` completes, `dist/index.html` exists.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src/pages/index.astro
git commit -m "chore: scaffold astro project"
```

---

### Task 2: GitHub Pages deploy pipeline

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `public/CNAME`

**Interfaces:**
- Consumes: `npm run build` from Task 1 (must succeed for this to work).
- Produces: a live deployment at paulwitkowski.com on every push to `main`.

- [ ] **Step 1: Create `public/CNAME`**

```
paulwitkowski.com
```

(No trailing newline needed — a single line is standard for this file.)

- [ ] **Step 2: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Verify the workflow file is valid YAML**

Run: `npm run build` (still passes locally, confirming nothing in Task 1 broke)
Expected: same as Task 1 Step 7.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml public/CNAME
git commit -m "ci: add github pages deploy workflow"
```

- [ ] **Step 5: Manual follow-up (after this plan is fully executed and pushed)**

In the GitHub repo settings, under Pages, set the source to "GitHub Actions" (one-time manual setting, not scriptable). Confirm the first workflow run succeeds and paulwitkowski.com resolves. This step can't be verified until the branch is actually pushed — note it as outstanding rather than marking it done prematurely.

---

### Task 3: Design tokens — palette, radius, self-hosted fonts

**Files:**
- Create: `src/styles/global.css`
- Create: `public/fonts/` (font files — manual download, see Step 1)

**Interfaces:**
- Produces: Tailwind utilities `bg-bg`, `bg-surface`, `text-ink`, `bg-accent`/`text-accent`, `font-display`/`font-body`, `rounded-card` (12px) and `rounded-chip` (8px) — every later component uses these instead of raw color/radius values.

- [ ] **Step 1: Download the font files from Fontshare's CDN**

These are licensed but freely-distributed binary assets, fetched directly from Fontshare's CDN (discovered via their public CSS API at `https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=switzer@400,500&display=swap`):

```bash
mkdir -p public/fonts
curl -sL "https://cdn.fontshare.com/wf/FPDAZ2S6SW4QMSRIIKNNGTPM6VIXYMKO/5HNPQ453FRLIQWV2FNOBUU3FKTDZQVSG/Z3MGHFHX6DCTLQ55LJYRJ5MDCZPMFZU6.woff2" -o public/fonts/ClashDisplay-Semibold.woff2
curl -sL "https://cdn.fontshare.com/wf/BFBSY7LX5W2U2EROCLVVTQP4VS7S4PC3/IIUX4FGTMD2LK2VWD3RVTAS4SSMUN7B5/53RZKGODFYDW3QHTIL7IPOWTBCSUEZK7.woff2" -o public/fonts/ClashDisplay-Bold.woff2
curl -sL "https://cdn.fontshare.com/wf/BLNB4FAQFNK56DWWNF7PMGTCOTZHOEII/ST3WKSSDMBK2MIQQO3MAVYWLF4FTOLFV/6IN5WOLRCYP4G4MOCOHOMXNON6Q7MDAR.woff2" -o public/fonts/Switzer-Regular.woff2
curl -sL "https://cdn.fontshare.com/wf/OYB4CXKJQXKTNSLJMTDQOIVUL2V5EL7S/WYO2P7DQVV5RNXGMCUO2HL4RJP4VFUAS/6XPIMU23OJVRY676OG5YVJMWEHWICATX.woff2" -o public/fonts/Switzer-Medium.woff2
```

Verify each file downloaded correctly (should be a real WOFF2 binary, not an HTML error page — a valid file is at least a few KB):

```bash
ls -la public/fonts/
```

Expected: four `.woff2` files, each non-trivially sized (tens of KB, not 0 bytes and not suspiciously small like an error page would be).

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import "tailwindcss";

@theme {
  --color-bg: #F7F5F4;
  --color-surface: #ECE8E6;
  --color-ink: #100C08;
  --color-accent: #95122C;
  --radius-card: 12px;
  --radius-chip: 8px;
  --font-display: "Clash Display", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Switzer", ui-sans-serif, system-ui, sans-serif;
}

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

[data-theme="dark"] {
  --color-bg: #100C08;
  --color-surface: #1C1712;
  --color-ink: #EFECE8;
}

@font-face {
  font-family: "Clash Display";
  src: url("/fonts/ClashDisplay-Semibold.woff2") format("woff2");
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: "Clash Display";
  src: url("/fonts/ClashDisplay-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: "Switzer";
  src: url("/fonts/Switzer-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Switzer";
  src: url("/fonts/Switzer-Medium.woff2") format("woff2");
  font-weight: 500;
  font-display: swap;
}

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-body);
}
```

Note on radius tokens: named as `--radius-card`/`--radius-chip` rather than overriding Tailwind's bare `rounded`/`rounded-sm` defaults, since Tailwind v4's exact variable name for the unsuffixed default radius isn't something to guess at — a named `--radius-*` key always deterministically produces a matching `rounded-*` utility (`rounded-card`, `rounded-chip`), regardless of what the built-in default maps to. Every component below uses `rounded-card` for cards/panels/images-in-cards and `rounded-chip` for buttons/chips/nav pills, per the spec's radius system — never the bare `rounded`/`rounded-sm`.

- [ ] **Step 3: Import the stylesheet in the placeholder page**

Edit `src/pages/index.astro`:

```astro
---
import '../styles/global.css';
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Paul Witkowski</title>
  </head>
  <body class="font-body bg-bg text-ink">
    <p class="font-display text-2xl">Scaffolding placeholder — replaced in Task 9 and Phase 2.</p>
  </body>
</html>
```

- [ ] **Step 4: Verify the build works and fonts/colors apply**

Run: `npm run build`
Expected: succeeds. Then run `npm run dev` and open the local URL — confirm the placeholder text renders in Clash Display, page background is `#F7F5F4`, and adding `data-theme="dark"` to the `<html>` tag via devtools flips background to `#100C08` and text to `#EFECE8`.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/pages/index.astro public/fonts
git commit -m "feat: add design tokens and self-hosted fonts"
```

---

### Task 4: Theme persistence logic

**Files:**
- Create: `src/lib/theme.ts`
- Test: `tests/theme.test.ts`

**Interfaces:**
- Produces: `getStoredTheme(): Theme | null`, `getPreferredTheme(): Theme`, `setTheme(theme: Theme): void`, and the `Theme` type (`'light' | 'dark'`) — consumed by Task 6 (ThemeToggle) and Task 7 (BaseLayout's no-flash script logic).

- [ ] **Step 1: Write the failing tests**

Create `tests/theme.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getStoredTheme, getPreferredTheme, setTheme } from '../src/lib/theme';

describe('theme persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('returns null when nothing is stored', () => {
    expect(getStoredTheme()).toBeNull();
  });

  it('returns the stored theme when present', () => {
    localStorage.setItem('theme', 'dark');
    expect(getStoredTheme()).toBe('dark');
  });

  it('ignores garbage values in storage', () => {
    localStorage.setItem('theme', 'blue');
    expect(getStoredTheme()).toBeNull();
  });

  it('falls back to system preference when nothing is stored', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('dark'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    expect(getPreferredTheme()).toBe('dark');
    vi.unstubAllGlobals();
  });

  it('prefers the stored theme over system preference', () => {
    localStorage.setItem('theme', 'light');
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: true,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    expect(getPreferredTheme()).toBe('light');
    vi.unstubAllGlobals();
  });

  it('setTheme persists to localStorage and sets the data-theme attribute', () => {
    setTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `Cannot find module '../src/lib/theme'`.

- [ ] **Step 3: Write `src/lib/theme.ts`**

```ts
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function getStoredTheme(): Theme | null {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : null;
}

export function getPreferredTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS — all 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/lib/theme.ts tests/theme.test.ts
git commit -m "feat: add theme persistence logic"
```

---

### Task 5: `prefers-reduced-motion` helper

**Files:**
- Create: `src/lib/reducedMotion.ts`
- Test: `tests/reducedMotion.test.ts`

**Interfaces:**
- Produces: `prefersReducedMotion(): boolean` — consumed by every animated component built in later phases (Navbar's shrink transition in Task 8 is the first consumer).

- [ ] **Step 1: Write the failing test**

Create `tests/reducedMotion.test.ts`:

```ts
import { describe, it, expect, vi, afterEach } from 'vitest';
import { prefersReducedMotion } from '../src/lib/reducedMotion';

describe('prefersReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns true when the media query matches', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    expect(prefersReducedMotion()).toBe(true);
  });

  it('returns false when the media query does not match', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    expect(prefersReducedMotion()).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `Cannot find module '../src/lib/reducedMotion'`.

- [ ] **Step 3: Write `src/lib/reducedMotion.ts`**

```ts
export function prefersReducedMotion(): boolean {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS — all 8 tests green (6 from Task 4 + 2 here).

- [ ] **Step 5: Commit**

```bash
git add src/lib/reducedMotion.ts tests/reducedMotion.test.ts
git commit -m "feat: add reduced-motion helper"
```

---

### Task 6: `ThemeToggle` component

**Files:**
- Create: `src/components/ThemeToggle.tsx`

**Interfaces:**
- Consumes: `getPreferredTheme`, `setTheme`, `Theme` from `src/lib/theme.ts` (Task 4).
- Produces: `<ThemeToggle />` React component, default export — consumed by `Navbar.tsx` in Task 8.

- [ ] **Step 1: Write `src/components/ThemeToggle.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { getPreferredTheme, setTheme, type Theme } from '../lib/theme';

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    setThemeState(getPreferredTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="flex h-8 w-8 items-center justify-center rounded-chip text-ink/85 transition-colors hover:text-accent"
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run build`
Expected: `astro check` passes (component isn't used on a page yet, but it must still type-check standalone — Astro's checker type-checks all `.tsx` files under `src/`).

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeToggle.tsx
git commit -m "feat: add theme toggle component"
```

---

### Task 7: Content collections config + site links data

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/links.json`
- Create: `src/site.config.ts`

**Interfaces:**
- Produces: the `links` collection (schema + seeded data) and `siteConfig` export — consumed by `Footer.astro` (Task 9) and `BaseLayout.astro` (Task 10). Also produces empty-but-schema-defined `projects`, `timeline`, and `interests` collections that later phases populate — defining them now means `astro check` validates their shape from the start even before content exists.

- [ ] **Step 1: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    githubUrl: z.string().url().nullable(),
    visibility: z.enum(['public', 'private']),
    category: z.enum([
      'Flagship',
      'Hackathons',
      'Medical CV & Research',
      'Systems & From-scratch',
      'Tools',
      'Fun Stuff',
      'Private & Team',
    ]),
    flagship: z.boolean().default(false),
    flagshipOrder: z.number().optional(),
    image: z.string().optional(),
  }),
});

const timeline = defineCollection({
  type: 'content',
  schema: z.object({
    startDate: z.string(),
    endDate: z.string().nullable(),
    title: z.string(),
    org: z.string(),
    kind: z.enum(['education', 'work', 'teaching', 'volunteer', 'project-checkpoint']),
    description: z.string(),
  }),
});

const links = defineCollection({
  type: 'data',
  schema: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
  }),
});

export const collections = { projects, timeline, links };
```

Note: `interests` is intentionally left out of `collections` here — its shape (ordered beats with column targeting) is more naturally a single structured JSON file consumed directly rather than a Zod-validated Astro collection, and gets added in the Interests-page phase once that structure is finalized in code, not just in the spec.

- [ ] **Step 2: Create `src/content/links.json`**

```json
{
  "github": "https://github.com/Pauwit",
  "linkedin": "https://www.linkedin.com/in/paul-stanislas-witkowski"
}
```

- [ ] **Step 3: Create `src/site.config.ts`**

```ts
export const siteConfig = {
  name: 'Paul Witkowski',
  tagline: 'AI & Systems engineer building end to end, from model to shell.',
  cvPath: '/cv/paul-witkowski-cv.pdf',
  formspreeEndpoint: 'https://formspree.io/f/mvzbdjny',
  ogImagePath: '/og-image.png',
};
```

- [ ] **Step 4: Verify it type-checks and the collection loads**

Run: `npm run build`
Expected: `astro check` passes with no schema errors.

- [ ] **Step 5: Commit**

```bash
git add src/content/config.ts src/content/links.json src/site.config.ts
git commit -m "feat: add content collections config and links data"
```

---

### Task 8: `Navbar` component

**Files:**
- Create: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 6), `prefersReducedMotion` (Task 5).
- Produces: `<Navbar />` React component, default export — consumed by `BaseLayout.astro` in Task 10.

- [ ] **Step 1: Write `src/components/Navbar.tsx`**

```tsx
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { prefersReducedMotion } from '../lib/reducedMotion';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/me', label: 'Me' },
  { href: '/projects', label: 'Projects' },
  { href: '/interests', label: 'Interests' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());

    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={[
        'fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-6',
        'rounded-chip border border-ink/10 bg-surface/70 backdrop-blur-md',
        reduced ? '' : 'transition-[padding] duration-300',
        scrolled && !reduced ? 'px-4 py-2' : 'px-6 py-3',
      ].join(' ')}
    >
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="font-body text-sm text-ink/85 transition-colors hover:text-accent"
        >
          {link.label}
        </a>
      ))}
      <ThemeToggle />
    </nav>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run build`
Expected: `astro check` passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add navbar component"
```

---

### Task 9: `Footer` component

**Files:**
- Create: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `links` collection (Task 7), `siteConfig` (Task 7).
- Produces: `<Footer />` Astro component — consumed by `BaseLayout.astro` in Task 10.

- [ ] **Step 1: Write `src/components/Footer.astro`**

```astro
---
import { getEntry } from 'astro:content';
import { siteConfig } from '../site.config';

const links = await getEntry('links', 'links');
const year = new Date().getFullYear();
---
<footer class="border-t border-ink/10 px-6 py-8 text-sm text-ink/70">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <p>&copy; {year} {siteConfig.name}. Built with Astro.</p>
    <div class="flex gap-4">
      <a href={links?.data.github} class="transition-colors hover:text-accent">GitHub</a>
      <a href={links?.data.linkedin} class="transition-colors hover:text-accent">LinkedIn</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Create the links data entry file expected by `getEntry`**

`getEntry('links', 'links')` looks up an entry with id `links` inside the `links` collection. Rename the file from Task 7 so its id matches:

```bash
mkdir -p src/content/links
git mv src/content/links.json src/content/links/links.json
```

No change needed in `src/content/config.ts` — Astro data collections use the filename (minus extension) as the entry id, so `links/links.json` yields id `"links"`, matching the `getEntry('links', 'links')` call above.

- [ ] **Step 3: Verify it type-checks and builds**

Run: `npm run build`
Expected: passes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/content/config.ts src/content/links
git commit -m "feat: add footer component"
```

---

### Task 10: `BaseLayout.astro`

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Navbar` (Task 8), `Footer` (Task 9), `siteConfig` (Task 7), `global.css` (Task 3).
- Produces: `<BaseLayout title=... description=...>` Astro component with a default `<slot />` — every page in every later phase wraps its content in this.

- [ ] **Step 1: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.astro';
import { siteConfig } from '../site.config';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
const ogImageUrl = new URL(siteConfig.ogImagePath, Astro.site);
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImageUrl} />
    <script is:inline>
      (function () {
        var stored = localStorage.getItem('theme');
        var theme = stored === 'light' || stored === 'dark'
          ? stored
          : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>
    <!-- Analytics insertion point: no script wired yet. When adding a cookie-less
         analytics tool later (e.g. Plausible/Umami), its script tag goes here. -->
  </head>
  <body class="font-body bg-bg text-ink">
    <Navbar client:load />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

Note on the inline script: this deliberately duplicates the priority logic from `src/lib/theme.ts` (Task 4) in plain JS rather than importing that module, because it must run synchronously before Astro's bundled scripts load — that's what prevents the flash-of-wrong-theme. Keeping it a few lines of plain JS here is the correct tradeoff, not a DRY violation to fix later.

- [ ] **Step 2: Update `src/pages/index.astro` to use the layout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Paul Witkowski — AI & Systems Engineer"
  description="Portfolio of Paul Witkowski, AI & Systems Engineering student at EPITA."
>
  <p class="p-10 font-display text-2xl">Home page — real content lands in Phase 2.</p>
</BaseLayout>
```

- [ ] **Step 3: Verify the build and manually check the no-flash behavior**

Run: `npm run build`
Expected: succeeds.

Run: `npm run dev`, open the page. Expected: navbar renders (frosted, centered, links, theme toggle), page background/text match the light or dark palette depending on your OS setting, clicking the theme toggle swaps instantly and persists across a page reload with no flash of the other theme.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: add base layout with seo and no-flash theme script"
```

---

### Task 11: 404 page

**Files:**
- Create: `src/pages/404.astro`

**Interfaces:**
- Consumes: `BaseLayout` (Task 10).

- [ ] **Step 1: Write `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Page not found — Paul Witkowski"
  description="This page doesn't exist."
>
  <div class="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
    <h1 class="font-display text-4xl">Page not found.</h1>
    <p class="text-ink/70">The page you're looking for doesn't exist.</p>
    <a href="/" class="rounded-chip border border-ink/20 px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">
      Back home
    </a>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: `dist/404.html` exists (GitHub Pages automatically serves this file for unmatched routes on a custom domain).

- [ ] **Step 3: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add custom 404 page"
```

---

### Task 12: Placeholder favicon (OG image deferred to Phase 2)

**Files:**
- Create: `public/favicon.svg`

**Interfaces:**
- Produces: the favicon asset `BaseLayout.astro` (Task 10) already references. `og-image.png` remains referenced-but-missing until Phase 2 (see Step 2).

- [ ] **Step 1: Create a placeholder `public/favicon.svg`**

A simple monogram placeholder, in the accent color, swapped for a circular portrait crop once Paul provides the photo (tracked in the spec's pre-launch action items — do not treat this substitution as part of this plan):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#100C08" />
  <text x="16" y="22" font-family="sans-serif" font-size="16" font-weight="700" fill="#95122C" text-anchor="middle">PW</text>
</svg>
```

- [ ] **Step 2: Defer the real OG image to Phase 2**

`og-image.png` is a designed binary asset (name + tagline typographic card on the Midnight Editorial palette) — it depends on final hero copy, which doesn't exist until Phase 2 writes the Home page. Building a placeholder PNG here would mean redoing it immediately after, so this task explicitly does not create the file yet. Confirm the reference in `BaseLayout.astro` doesn't break the build without it:

Run: `npm run build`
Expected: succeeds — Astro doesn't validate that meta-tag URLs resolve to real files, only that the HTML output is well-formed. `og-image.png` is a tracked gap, owned by Phase 2's Home page task, not a silently-forgotten one.

- [ ] **Step 3: Commit**

```bash
git add public/favicon.svg
git commit -m "feat: add placeholder favicon"
```

(No commit for `og-image.png` in this task since it wasn't created — Phase 2 handles it for real.)

---

### Task 13: Final verification pass

**Files:** none (verification only).

- [ ] **Step 1: Run the full check suite**

Run: `npm run test`
Expected: PASS, 8 tests (Task 4 + Task 5).

Run: `npm run build`
Expected: PASS, no `astro check` errors, `dist/` contains `index.html`, `404.html`, and the fonts/CNAME copied from `public/`.

- [ ] **Step 2: Manual browser verification checklist**

Run `npm run dev` and confirm, at both 1280px and 360px viewport widths:
- Navbar is centered, frosted, shrinks slightly on scroll past ~24px, links present (they 404 for now except `/`, which is expected until later phases).
- Theme toggle swaps the whole page between the light and dark palettes from §3 of the spec, with no flash on reload.
- With OS-level "reduce motion" enabled, the navbar's shrink-on-scroll no longer transitions smoothly (snaps instantly instead) — confirms the `prefersReducedMotion` wiring in Task 8 works.
- 404 page renders correctly at `/some-nonexistent-page`.

- [ ] **Step 3: Push and confirm the live deploy**

```bash
git push
```

Then, in the GitHub repo, confirm the "Deploy to GitHub Pages" Action run succeeds (Task 2's workflow), and that https://paulwitkowski.com loads the placeholder home page with working navbar, theme toggle, and 404 page. This is the first point in the whole project where the site is actually live — everything from here is additive.

---

### Task 14: Migrate content collections to the Content Layer API

**Added after the final whole-branch review** flagged that `src/content/config.ts` uses Astro 5's legacy `defineCollection({ type: ... })` shape rather than the current Content Layer API (`loader:` + `glob()`/`file()` from `astro/loaders`). It works either way today since `projects`/`timeline` are still empty, but migrating now — before any real content is authored against the old shape in Phase 2/3 — is strictly cheaper than migrating later.

**Files:**
- Create: `src/content.config.ts` (replaces `src/content/config.ts`)
- Delete: `src/content/config.ts`
- Modify: `src/content/links/links.json` → moved back to `src/content/links.json` with restructured content

**Interfaces:**
- Consumes: nothing new.
- Produces: the same `projects`/`timeline`/`links` collections with the same schemas and the same `getEntry('links', 'links')` call site in `Footer.astro` — this migration must not require changing `Footer.astro`.

- [ ] **Step 1: Create `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    githubUrl: z.string().url().nullable(),
    visibility: z.enum(['public', 'private']),
    category: z.enum([
      'Flagship',
      'Hackathons',
      'Medical CV & Research',
      'Systems & From-scratch',
      'Tools',
      'Fun Stuff',
      'Private & Team',
    ]),
    flagship: z.boolean().default(false),
    flagshipOrder: z.number().optional(),
    image: z.string().optional(),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    startDate: z.string(),
    endDate: z.string().nullable(),
    title: z.string(),
    org: z.string(),
    kind: z.enum(['education', 'work', 'teaching', 'volunteer', 'project-checkpoint']),
    description: z.string(),
  }),
});

const links = defineCollection({
  loader: file('./src/content/links.json'),
  schema: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
  }),
});

export const collections = { projects, timeline, links };
```

Note: `interests` is still intentionally excluded — same reasoning as the original Task 7 (a structured JSON beat/column shape suits direct consumption better than a Zod-validated collection, revisited when the Interests page phase is planned).

- [ ] **Step 2: Restructure and relocate the links data**

The `file()` loader treats each top-level key of the JSON object as one entry id, with that key's value as the entry's data. To keep `getEntry('links', 'links')` resolving exactly as before (one entry with id `"links"`), wrap the existing data under a `"links"` key and move the file up one level:

```bash
mkdir -p src/content
cat > src/content/links.json << 'EOF'
{
  "links": {
    "github": "https://github.com/Pauwit",
    "linkedin": "https://www.linkedin.com/in/paul-stanislas-witkowski"
  }
}
EOF
git rm -r src/content/links
```

- [ ] **Step 3: Remove the old config file**

```bash
git rm src/content/config.ts
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: `astro check` passes with no schema errors, the build completes. It's fine if `projects`/`timeline` still warn or report zero entries (no content authored yet) — that matches current behavior, not a regression.

- [ ] **Step 5: Verify the Footer still resolves the links entry correctly**

Run `npm run dev`, load the home page, and confirm the footer's GitHub/LinkedIn links still render with the correct `href` values (same check as Task 9, re-run because the data source moved).

- [ ] **Step 6: Commit**

```bash
git add src/content.config.ts src/content/links.json
git commit -m "refactor: migrate content collections to astro content layer api"
```

Note: `git rm` in Steps 2-3 already stages the deletions; a single commit covering the add + moves + deletes is correct here since they're one atomic change, not several unrelated ones.

---

## What Phase 2 picks up

Home page real content (hero copy, flagship project grid with the 3D Card effect and Spotlight background, real OG image), and the Projects page (full grid, Card Flip for private repos). Both get their own plan once this phase is reviewed and merged.
