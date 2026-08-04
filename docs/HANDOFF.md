# Portfolio — Handoff / Status

Read this first in a new session. Then read [`docs/specs/2026-07-25-portfolio-design.md`](specs/2026-07-25-portfolio-design.md) — the full design spec (palette, typography, every page's content plan, component sourcing table with install commands, asset checklist). This file is the "what's true right now" companion to that spec; the spec is the "what we're building toward" reference and needs no other context.

**Branch:** `rebuild/midnight-editorial` — NOT merged to `main`, no PR open yet. Everything below lives on this branch. `main` is untouched (still the old pre-rebuild site).

## Current state

The site was rebuilt from scratch on this branch (wiped `src/`, kept `docs/specs/`, `context/`, fonts, CNAME, favicon) following the design spec exactly. All 5 pages (Home, Me, Projects, Interests, Contact) + 404 + footer/nav are built and working. `astro check` and `npm run build` both pass with 0 errors as of the last commit on this branch. Not deployed anywhere yet — deploy workflow (`.github/workflows/deploy.yml`, triggers on push to `main`) is unchanged from before the rebuild and untested since nothing's been merged.

## Decisions and conventions (condensed — see spec for full detail)

- **Stack:** Astro static output, React islands (`client:load` for above-the-fold/interactive-critical, `client:visible` for below-the-fold), Tailwind v4, content collections (Zod-validated) for `projects`/`timeline`/`interests`/`links`.
- **Tokens:** `src/styles/global.css` — `--color-background/surface/foreground/accent`, light is the default `:root`, `:root.dark` overrides. `--radius-panel` (12px, cards/panels) vs `--radius-control` (8px, buttons/chips/nav). Single accent color (`#95122C`) in both themes, never used for small body text.
- **Theme toggle:** class on `<html>`, persisted to `localStorage`, inline no-flash script in `BaseLayout.astro` (`src/lib/theme.ts` exports the script string). Also re-applied on the `astro:before-swap` event — required because View Transitions keeps the same `document` across client-side navigations, so without this the theme class would silently reset to default on every page change.
- **View Transitions:** `astro:transitions` `<ClientRouter fallback="animate">` is enabled site-wide. `transition:animate="fade"` is scoped to `<main>` only (nav/footer/spotlight background stay static across page changes, only the content area fades). Link prefetching is **disabled** (`prefetch: false` in `astro.config.mjs`) — Astro's default `prefetchAll` was saturating Firefox's per-origin connection pool and causing slow/failed navigations there.
- **Spotlight background:** single `position: fixed` layer in `BaseLayout.astro`, pinned to the *viewport* (not the page), so it stays put while content scrolls over it. `<main>` and `<Footer>` are explicitly `relative z-10` to paint above it — fixed-position elements paint above static content by default regardless of DOM order, this bit us once (see below).
- **Sourced components** (Aceternity / Motion Primitives / Kokonut UI) live in `src/components/ui/` and are always recolored to the site's CSS-variable tokens (`bg-surface`, `text-foreground`, `bg-accent`, etc.) — never left with their original hardcoded neutral/brand colors. `TextEffect` and `AnimatedGroup` are the real Motion Primitives source (the registry endpoint was behind bot-mitigation during the initial build, so hand-built stand-ins were used temporarily, then swapped for the real source once supplied).
- **Projects page grid:** true CSS masonry (`columns-1 sm:columns-2 lg:columns-3`, not CSS Grid) — deliberate: cards have naturally different heights, only the first row is top-aligned, everything after stacks independently per column with `break-inside-avoid`.
- **Home flagship grid:** stays CSS Grid (spec'd asymmetric spans: wide/medium/narrow), with `items-start` so uneven card heights stagger at the bottom instead of vertically centering/misaligning within a stretched row.
- **Private-repo cards** (`CardFlip`, back face) have a scrollable content area (`.thin-scrollbar` utility in `global.css`) with a fade + chevron indicator that only renders when content actually overflows, and disappears once scrolled to the bottom.
- **`docs/` gitignore:** `docs/*.md`, `docs/*.pdf`, `docs/*.jpg/.jpeg/.png` are ignored by default (loose personal reference material — CV drafts, raw photos, source PDFs Paul drops in for context). `docs/specs/`, `docs/plans/`, and this file (`docs/HANDOFF.md`, explicitly negated) are the exceptions that stay tracked.

## Real bugs found and fixed this session — don't reintroduce

- **Theme toggle unclickable at desktop width:** the navbar's `NavItems` (centered nav links, from the sourced Aceternity component) renders as `position: absolute; inset: 0`, covering the *entire* navbar width, not just the visible link text. Anything sharing that space needs `position: relative` to escape being covered underneath it — the logo had this already; the theme toggle didn't. Fixed in `src/components/ThemeToggle.tsx`.
- **Mobile nav hamburger not keyboard/screen-reader accessible:** the sourced `MobileNavToggle` rendered a bare `<svg onClick>` instead of a real `<button>`. Fixed in `src/components/ui/resizable-navbar.tsx`.
- **Firefox slow/hard-reloading navigations:** caused by Astro's default link prefetching saturating Firefox's 6-connection-per-origin cap. Fixed by setting `prefetch: false`.
- **View-transition fallback animation never actually played:** `<ClientRouter fallback="animate">` alone does nothing — its CSS only binds to elements with an explicit `transition:animate` directive. Fixed by adding `transition:animate="fade"` to `<main>`.
- **Dev-mode-only "Failed to fetch dynamically imported module" after client-side nav:** breaks React hydration (so mouse-driven interactions like the 3D card tilt or the card flip silently stop working) after navigating via a nav-link click in `npm run dev`. Confirmed via a real production build + `astro preview` that this does **not** happen in production — it's a Vite dev-server-only artifact. Left alone by request; don't chase it further unless it starts happening in production too.

## What's left

**Assets only Paul can provide:**
- Real photography set for the Interests page (currently `picsum.photos` placeholders)
- Flip `introduction-au-data-engineering` to public on GitHub so its Projects card can link out instead of showing as private

**Content decisions still open:**
- Two estimated hackathon dates on the Me timeline (DealBoard, Fine Print checkpoints) — only the YAKAP hackathon had an exact date in the source material, the other two are guesses worth double-checking
- Whether `jangu` and the NetLogo `SMA` coursework should really stay off the Projects page (excluded because Paul's own `PROJECTS_RECAP.md` flags both as not polished enough — never explicitly confirmed)

**Can't produce myself:**
- `public/og-image.png` (1200×630 social-preview card) — no raster image-generation tool available in-session. `site.config.ts` already points at this path; the file just doesn't exist yet.

**Deliberately not done yet:**
- No real Formspree submission test (code path verified, never actually sent to Paul's live inbox)
- No final human read-through of the drafted copy (bio, hero tagline, project descriptions) — most of it has been cross-checked against Paul's real CV/internship report/hackathon paper this session, but it's still fundamentally AI-drafted prose

**Not merged:** branch is fully committed and pushed, `main` untouched, no PR open.

## Key file paths

- `docs/specs/2026-07-25-portfolio-design.md` — the design spec (read this next)
- `src/site.config.ts` — site name, tagline, CV path, Formspree endpoint, OG defaults
- `src/content.config.ts` — content collection schemas (Zod)
- `src/content/projects/*.md`, `src/content/timeline/*.md`, `src/content/interests.json`, `src/content/links.json` — the actual content
- `src/layouts/BaseLayout.astro` — SEO/OG meta, theme script, View Transitions, Spotlight background, page shell
- `src/styles/global.css` — design tokens, reduced-motion overrides, `.thin-scrollbar` utility
- `src/components/ui/` — sourced third-party components (recolored)
- `src/components/` (top level) — this project's own components (`Navbar`, `Hero`, `ProjectCard3D`, `ProjectsGrid`, `FlagshipGrid`, `MeTimeline`, `InterestsParallax`, `ContactForm`, `Footer`)
- `src/pages/` — one file per route
- `public/cv/paul-witkowski-cv.pdf`, `src/assets/me/portrait.jpg` — real assets already wired in
- `astro.config.mjs` — `prefetch: false`, React integration, Tailwind v4 Vite plugin

## Verification commands

```bash
npx astro check   # type + content-collection schema check
npm run build     # full production build (the real CI gate)
npm run dev       # local dev server
npm run preview   # serves the production build, for testing things that behave
                   # differently in dev (e.g. the Firefox/prefetch bug above)
```
