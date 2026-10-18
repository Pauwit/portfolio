# Portfolio — Handoff / Status

Read this first in a new session. Then read [`docs/specs/2026-07-25-portfolio-design.md`](specs/2026-07-25-portfolio-design.md), the original design spec (palette, typography, page plans, component sourcing). The spec is "what we set out to build"; this file is "what's true right now", including where the site has since deviated from the spec (see *Deviations from the spec*).

## Current state

- **Built and merged.** The `rebuild/midnight-editorial` rebuild is merged into `main` (and pushed). All 5 pages (Home, Me, Projects, Interests, Contact) plus 404, navbar, and footer exist. The deploy workflow (`.github/workflows/deploy.yml`) triggers on push to `main`, runs `npm run build`, and publishes to GitHub Pages at paulwitkowski.com.
- **Live.** The Astro 7 upgrade, test fix, and ML/DL/CV content refocus described below are merged to `main`, pushed, and deployed (deploy run green; home, Me, Projects, and the CV download verified on paulwitkowski.com). No feature branches are open.
- **Verified before the last commit:** `npm run build` (includes `astro check`) passes with 0 errors; `npm test` passes 3/3; `npm audit` reports 0 vulnerabilities; every page returns 200 in `npm run dev` and Paul confirmed the pages work by hand.

## Positioning (changed from the original spec)

The site now leads with **machine learning, deep learning, and computer vision**; Python and C++ are mentioned lightly as the main languages. Systems work (compiler, shell, data pipeline) stays on the site as proof of depth but is no longer the headline.

- Hero headline: "Hi, I'm Paul. I teach machines to see and learn." plus a one-line paragraph and a visible internship line ("Open to a 6-month internship from February 2027 in Machine Learning / Computer Vision"). Both live in `src/site.config.ts` (`tagline`, `description`, `availability`).
- **Degree wording is "Data Science & AI" (SCIA major)**, matching the CV and the track's real name: a five-year engineering degree equivalent to an MSc, first three years general systems/software, last two on AI. Do not write "AI & Systems Engineering" or "AI and Data Engineering" — both were deliberately dropped.
- Flagship grid (home page), in order: EyeSegmentation, C++ Diffeomorphic Demons, Neural Network From Scratch, StockAI, InsightEd. Tiger, 42sh, forest-fire, and DealBoard are no longer flagship (still on the Projects page). The grid expects exactly 5 flagships (`spanByOrder` in `FlagshipGrid.tsx`).
- Me bio mentions the Thales win and Prologin competitions only briefly; the numbers (805 images, Dice 0.939, 1,000+ entrants, etc.) live in the timeline entries, not the bio.

## Decisions and conventions (condensed — see spec for full detail)

- **Node:** Astro 7 requires Node >=22.22.0. The deploy workflow pins `node-version: 22`; an older Node in CI fails the build with "Node.js … is not supported by Astro".
- **Stack:** Astro 7 static output, React 19 islands (`client:load` for above-the-fold/interactive-critical, `client:visible` for below-the-fold), Tailwind v4, content collections for `projects`/`timeline`/`interests`/`links`.
- **Content schema** is in `src/content.config.ts` and imports `z` from `astro/zod` (Astro 7's bundled Zod 4; `astro:content`'s `z` is deprecated). The contact form still uses the project's own `zod@3` + `@hookform/resolvers@3` — don't mix the two.
- **Tokens:** `src/styles/global.css` — `--color-background/surface/foreground/accent`, light is the default `:root`, `:root.dark` overrides. `--radius-panel` (12px) vs `--radius-control` (8px). Single accent `#95122C` in both themes, never for small body text.
- **Theme toggle:** class on `<html>`, persisted to `localStorage`, inline no-flash script in `BaseLayout.astro` (script string exported from `src/lib/theme.ts`). Also re-applied on `astro:before-swap` — View Transitions keeps the same `document`, so without it the theme resets on every navigation.
- **View Transitions:** `<ClientRouter fallback="animate">` site-wide; `transition:animate="fade"` is scoped to `<main>` only. Link prefetching is **disabled** (`prefetch: false` in `astro.config.mjs`) because default prefetching saturated Firefox's per-origin connection cap.
- **Spotlight background:** one `position: fixed` layer in `BaseLayout.astro`; `<main>` and `<Footer>` are explicitly `relative z-10` to paint above it (fixed elements otherwise paint over static content regardless of DOM order).
- **Sourced components** (Aceternity / Motion Primitives / Kokonut UI) live in `src/components/ui/` and `src/components/kokonutui/`, recolored to the CSS-variable tokens — never left with their original hardcoded colors.
- **Projects page grid:** true CSS masonry (`columns-1 sm:columns-2 lg:columns-3`, `break-inside-avoid`), not CSS Grid. **Home flagship grid:** CSS Grid with `items-start`.
- **Private-repo cards** (`CardFlip`) have a scrollable back face (`.thin-scrollbar`) with a fade + chevron that only shows when content overflows. Private projects: Tiger, 42sh, EpiTweet, PING, InsightEd, forest-fire, Sovereign AI Factory.
- **Timeline:** entries sorted by `startDate`; single-date entries (`startDate === endDate`) render as a point, not a range; passed entries highlight on scroll. `kind` is one of education/work/teaching/volunteer/hackathon (the Thales contest uses `hackathon`; there is no "competition" kind).
- **Me page layout:** portrait is vertically centered against the whole right column (`md:items-center`); buttons are Download CV then Contact.
- **`docs/` gitignore:** `docs/*.md`, `docs/*.pdf`, `docs/*.jpg/.jpeg/.png` are ignored (loose personal reference material). `docs/specs/` and `docs/HANDOFF.md` are the tracked exceptions.
- **Tests:** `npm test` (vitest + jsdom). `tests/setup.ts` installs an in-memory `localStorage` when the runtime's is missing — Node 26 ships an experimental global `localStorage` that is undefined without `--localstorage-file` and shadows jsdom's.
- **Dev server (Astro 7):** `npm run dev` starts a background daemon. If it says "Another astro dev server is already running", use `npx astro dev stop` (or `npm run dev -- --force`). `astro dev status` / `astro dev logs` also exist.

## Real bugs found and fixed — don't reintroduce

- **Theme toggle unclickable at desktop width:** the navbar's `NavItems` is `position: absolute; inset: 0`, covering the whole bar. Anything sharing that space needs `position: relative` (done in `ThemeToggle.tsx`).
- **Mobile nav hamburger not accessible:** the sourced toggle was a bare `<svg onClick>`; it's now a real `<button>` with `aria-label`/`aria-expanded` in `resizable-navbar.tsx`.
- **Firefox slow navigations:** default link prefetching; fixed with `prefetch: false`.
- **View-transition fallback never animated:** `<ClientRouter fallback="animate">` needs an explicit `transition:animate` directive on an element (now on `<main>`).
- **Dev-only "Failed to fetch dynamically imported module" after nav clicks:** a Vite dev-server artifact (breaks hydration in `npm run dev` only); confirmed not present in a production build + `astro preview`. Left alone deliberately.
- **Deploy failing after the Astro 7 upgrade:** `deploy.yml` was on Node 20; fixed by pinning Node 22 (see *Decisions*).
- **Theme tests failing on Node 26:** fixed by the `localStorage` polyfill in `tests/setup.ts` (see above).

## What's left

**Assets / content only Paul can provide:**
- Real photography set for the Interests page. The page is currently a "Coming soon" placeholder; the parallax implementation (`InterestsParallax.tsx`, `ui/parallax-scroll.tsx`, `interests.json` with picsum placeholders) is built and commented out in `src/pages/interests.astro` — restore it once real photos exist.
- Project screenshots: every project has `image: null`, so every card shows the abstract motif placeholder.
- Paul's personal contribution to the Cloud Temple (PFEE) work: the timeline entry and project card are written at team level because the repo is a team of six.

**Open content questions:**
- The hackathon dates in the consolidated `hackathons-checkpoint.md` timeline entry (Nov 2025 – May 2026) are approximate.
- Whether `jangu` and the NetLogo `SMA` coursework should stay off the Projects page (excluded earlier as not polished enough; never explicitly confirmed).
- Whether forest-fire / Tiger / 42sh should be made public so their cards can link out (forest-fire's own text says it will be).

**CI housekeeping (non-blocking warnings in the deploy log):**
- `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4` target the deprecated Node 20 runtime and are being forced onto Node 24; bump them to newer majors when convenient.
- GitHub's `ubuntu-latest` label migrates to Ubuntu 26 from 2026-10-19; if a deploy fails after that, check there first.

**Deliberately not done:**
- No real Formspree submission test (code path verified, never sent to the live inbox).
- No final human read-through of all drafted copy beyond what Paul has already edited (hero, bio, degree wording, Prologin/Thales sentence are his or approved by him).
- Minor `ts(6133)`/`ts(6385)` warnings remain in the sourced `ui/` components (unused `e`/`onClose`, deprecated `staggerChildren`); they don't fail the build.

## Deviations from the spec

The spec (`docs/specs/2026-07-25-portfolio-design.md`) is otherwise accurate, but note:
- **Categories:** the schema's `category` enum is Hackathons / Medical & Research / Systems / From-scratch / Tools / Fun Stuff / Private Projects. There is no standalone "Flagship" category — `flagship` is a boolean only.
- **Flagship set and order** differ from the spec's draft (see *Positioning*).
- **Tests exist** (vitest, theme + reduced-motion), though the spec lists an automated suite as out of scope.
- **Stack versions:** Astro 7 (not 5) and `@astrojs/react` 7; `shadcn` is no longer a dependency (use `npx shadcn@latest add …` when installing components).
- **Hero** carries a headline/availability line instead of the spec's original tagline.
- **Contact details:** the public CV (`public/cv/paul-witkowski-cv.pdf`) deliberately has no email or phone, consistent with the site never exposing an email.

## Key file paths

- `docs/specs/2026-07-25-portfolio-design.md` — original design spec
- `src/site.config.ts` — site name, tagline, description, internship availability line, CV path, Formspree endpoint, OG defaults
- `src/content.config.ts` — content collection schemas (Zod via `astro/zod`)
- `src/content/projects/*.md`, `src/content/timeline/*.md`, `src/content/interests.json`, `src/content/links.json` — the actual content
- `src/layouts/BaseLayout.astro` — SEO/OG meta, theme script, View Transitions, Spotlight background, page shell
- `src/styles/global.css` — design tokens, reduced-motion overrides, `.thin-scrollbar`
- `src/components/ui/`, `src/components/kokonutui/` — sourced third-party components (recolored)
- `src/components/` (top level) — own components (`Navbar`, `Hero`, `ProjectCard3D`, `ProjectsGrid`, `FlagshipGrid`, `MeTimeline`, `InterestsParallax`, `ContactForm`, `ThemeToggle`, `Footer`)
- `src/pages/` — one file per route
- `public/cv/paul-witkowski-cv.pdf`, `src/assets/me/portrait.jpg`, `public/og-image.png`, `public/favicon.svg`, `public/fonts/` — real assets
- `astro.config.mjs` — `prefetch: false`, React integration, Tailwind v4 Vite plugin
- `tests/` — vitest tests and setup

## Verification commands

```bash
npx astro check   # type + content-collection schema check
npm run build     # full production build (the real CI gate; runs astro check first)
npm test          # vitest (theme, reduced-motion)
npm run dev       # local dev server (background daemon on Astro 7; stop with `npx astro dev stop`)
npm run preview   # serves the production build, for things that differ from dev
npm audit         # currently 0 vulnerabilities
```
