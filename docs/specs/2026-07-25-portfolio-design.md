# Personal Portfolio Website — Design Spec

Date: 2026-07-25
Owner: Paul Witkowski
Live domain: paulwitkowski.com (GitHub Pages, custom domain via `CNAME`)

## 1. Goals

A multi-page personal portfolio for Paul Witkowski (AI & Systems Engineering student, EPITA SCIA), built to read as credible to both a non-technical recruiter skimming and an engineer digging into technical depth. Visual direction: "Midnight Editorial" — near-black canvas, one wine-red accent, big display type, dramatic-but-restrained motion. Beautiful and unique, not templated; editorial restraint over decoration.

## 2. Tech architecture

- **Framework:** Astro, static output (`output: 'static'`). React islands via `@astrojs/react` for components sourced from the component libraries (Aceternity, Magic UI, Motion Primitives, Kokonut UI, shadcn/ui) — each hydrates independently (`client:visible`/`client:load` as appropriate), so static content ships zero JS.
- **Styling:** Tailwind CSS.
- **Content-as-data** via Astro content collections (Zod-validated frontmatter), so content edits never touch layout code:
  - `src/content/projects/*.md` — one file per project. Frontmatter: `title`, `summary`, `stack[]`, `githubUrl` (nullable), `visibility: "public" | "private"`, `category` (Flagship / Hackathons / Medical CV & Research / Systems & From-scratch / Tools / Fun Stuff / Private & Team), `flagship: boolean`, `flagshipOrder`, `image` (nullable).
  - `src/content/timeline/*.md` — one file per Me-page entry. Frontmatter: `startDate`, `endDate` (nullable = present), `title`, `org`, `kind: "education" | "work" | "teaching" | "volunteer" | "project-checkpoint"`, `description`.
  - `src/content/interests.json` — ordered list of interests, each an ordered list of "beats" (`title` or `subtitle`, optional `paragraph` + target column, `images[]`). JSON rather than per-file Markdown since the data is a structured beat/column array, not prose.
  - `src/content/links.json` — GitHub/LinkedIn/etc., reused across Home/Contact/footer.
  - `src/site.config.ts` — site name, tagline, CV path, Formspree endpoint, OG defaults.
- **Deployment:** GitHub Actions on push to `main` → `astro build` → `actions/deploy-pages`. `CNAME` lives at `public/CNAME` so it ships with the build output. Serves at domain root (no base path).
- **i18n readiness:** content collections are keyed by slug now (English only). Adding French/German later means adding parallel collection entries or locale-keyed frontmatter fields, layered on Astro's built-in i18n routing — no restructuring needed.
- **Analytics:** none wired now. Left as a single script-tag insertion point for a future EU/GDPR-friendly, cookie-less tool (e.g. Plausible/Umami).
- **CI gate:** `astro check` runs before build (type + content-collection schema validation) so malformed frontmatter fails the build loudly rather than shipping broken pages.
- **Component sourcing caveat:** the component picks in §3 (Aceternity/Magic UI/Motion Primitives/Kokonut UI/shadcn) were proposed from trained knowledge of these libraries, since live browsing of their sites was blocked during this design session (org-level policy, not a per-site prompt the user could approve). Exact current props/APIs get verified against each library's docs when the package is actually installed during implementation — if a named component has since been renamed or removed, the fallback is to hand-build the same visual behavior rather than block on it.

## 3. Visual system — "Midnight Editorial"

### Palette

| | Dark (default, follows system preference) | Light |
|---|---|---|
| Background | `#100C08` | `#F7F5F4` |
| Surface (cards/panels) | `#1C1712` | `#ECE8E6` |
| Text | `#EFECE8` | `#100C08` |
| Accent (single, both themes) | `#95122C` | `#95122C` |

One accent color used consistently in both themes, reserved for large text, borders, icons, and accent-backed elements — not used for small body text (contrast).

### Typography

- **Clash Display** (headlines, titles, editorial moments) + **Switzer** (body, nav, labels) — both free, self-hosted (no CDN, no Google Fonts, no Inter).
- No monospace anywhere.

### Shape system

One consistent radius family: 12px for cards/panels/images-in-cards, 8px for buttons/chips/nav pills.

### Layout system — grid-locked asymmetry

A 12-column grid underlies every page. Content spans vary in width (hero splits ~7/5, not 6/6; project cards mix exactly three reusable span-widths — flagship-wide, medium, narrow), but every block shares one consistent left margin ("the spine"). No mechanical left-right alternation between sections — asymmetry follows content weight, not a zigzag pattern. This system applies to Home, Me, Projects, and Contact. The Interests page is the one exception (see §5).

### Motion inventory (final)

Every row below is a real, named component with a real install command — none of these get hand-built from a description. If an install command turns out stale by the time a phase implements it, stop and ask for a current one rather than reconstructing the component from memory.

| Where | Component/effect | Source | Install command |
|---|---|---|---|
| Hero headline | Text Effect (word/blur reveal) | Motion Primitives | `npx shadcn@latest add "https://motion-primitives.com/c/text-effect.json"` |
| Hero/section background | Spotlight (cursor-following radial light) | Aceternity | `npx shadcn@latest add @aceternity/spotlight-demo` |
| Navbar | Resizable Navbar (shrinks on scroll; ships with translucent/frosted background by default) | Aceternity | `npx shadcn@latest add @aceternity/resizable-navbar-demo` |
| Project cards (public) | 3D Card Effect (perspective tilt on hover) | Aceternity | `npx shadcn@latest add @aceternity/3d-card-demo` |
| Private-repo cards | Card Flip (front = teaser, back = case-study text) | Kokonut UI | `npx shadcn@latest add @kokonutui/card-flip` |
| Scroll reveals | Fade+slide-up (single elements), staggered-lines (grouped content) | Motion Primitives (Animated Group) | `npx shadcn@latest add "https://motion-primitives.com/c/animated-group.json"` |
| Project images | Plain scale + shadow-lift on hover (no color treatment) | Hand-built (CSS) | n/a — intentionally not a library component |
| Me-page timeline | Timeline (sticky label, connecting line) | Aceternity | `npx shadcn@latest add @aceternity/timeline-demo` |
| Interests page | Parallax Scroll (3-column masonry, independently-speed columns) with embedded text — see §5 | Aceternity, extended | `npx shadcn@latest add @aceternity/parallax-scroll-demo` |
| Contact form | Form/Input/Textarea/Button primitives, deliberately un-animated | shadcn/ui, with **React Hook Form** + Zod resolver | `npx shadcn@latest add form input textarea button` |

All installs use npm (project convention). Components may be modified to match the Midnight Editorial palette/tokens and moved to fit this project's file structure — that's expected, not a deviation. If a component's shadcn install pulls in dependencies beyond what's needed, it's fine to install it into a scratch/temporary project first, copy over only the component code actually used, and skip adding the unused dependencies here.

### `prefers-reduced-motion` fallback (every item above has one; nothing essential depends on motion)

- Spotlight → static soft glow, no cursor tracking
- Text Effect → text appears instantly
- Resizable Navbar → skips shrink-on-scroll, stays one size (frosted blur is not motion, stays)
- 3D Card tilt → static card, hover shows a border/glow instead of rotation
- Card Flip → cross-fade instead of 3D rotation
- Scroll reveals → instant, no transition
- Parallax Scroll → columns become a static equal-speed grid, no scroll-linked translateY

## 4. Pages

### Home
Frosted resizable navbar → asymmetric hero (one-line who/what, links, CV download button, Contact button) → flagship projects grid (5 projects, 3D Card effect, mixed span-widths) → button to Projects.

Flagship order (draft, locked unless later revised): EyeSegmentation (medical CV, widest), DealBoard AI Copilot, forest-fire data pipeline, Tiger Compiler, 42sh.

### Me
Portrait (circular crop reused for favicon) → bio (drafted from context material, Paul edits) → CV download → full-history Aceternity Timeline: EPITA (2022–2027), Boston University exchange (2024), LFA Buc (2015–2022), CNRS internship (Sept 2025–Jan 2026), EPITA TA role (Sept 2024–Jul 2025), Prologin volunteering (Jan 2026–present), Landauer Europe (2022, 2023), deltacity.NET (2019), interleaved chronologically with project checkpoints (Tiger, 42sh, EpiTweet, hackathons).

### Projects
Full project set (everything in the projects recap; Paul will prune manually later). Filterable by category: Flagship, Hackathons, Medical CV & Research, Systems & From-scratch, Tools, Fun Stuff, Private & Team. Public repos use the 3D Card effect and link out; private repos (Tiger, 42sh, EpiTweet, PING) use Card Flip (front = teaser, back = case-study) since there's no external link.

### Interests
One continuous Aceternity Parallax Scroll page, extended with embedded text cells:
- Three independently-speed masonry columns.
- Interest titles and sub-chapter subtitles (e.g. Drums → "Band") always render in the **middle column**.
- Paragraphs may render in any column.
- Every title/subtitle row leaves its immediate left/right neighbors blank (a "quiet zone") to read as a section break between interests.
- Content: Photography (gallery beat, placeholder images until Paul provides the set), Drums ("why I started" → "formed a band"), Tennis ("weekly matches").
- **This structure fully replaces the earlier "simple blurb + photo per interest" plan.**
- **Mobile (< ~768px):** collapses to a single vertical column (title → paragraph → images in sequence). The quiet-zone rule becomes moot since single-column spacing separates sections naturally.
- Known tradeoff: because the three columns scroll at different speeds, the quiet-zone alignment drifts slightly the further down the page — accepted as part of the effect's character rather than corrected with re-anchoring logic.
- Grid-locked asymmetry (§3) does not apply to this page — its layout identity is the parallax grid itself.

### Contact
Links, CV download, contact form (shadcn/ui primitives, intentionally un-animated) posting to Formspree (`https://formspree.io/f/mvzbdjny`) plus a hidden honeypot field. No email address anywhere in the markup or rendered output; delivery is configured on the Formspree dashboard.

### 404 (custom, not in nav)
Simple message + link home, using the same fade+slide-up reveal as the rest of the site.

### Footer
Copyright + current year, "built with Astro," GitHub/LinkedIn links.

### Nav
Home / Me / Projects / Interests / Contact + light/dark theme toggle. No CV link in the nav (already present on three pages; a fourth would be redundant).

## 5. Assets checklist

| Asset | Source | Path |
|---|---|---|
| CV PDF | Paul provides | `public/cv/paul-witkowski-cv.pdf` |
| Portrait | Paul provides | `src/assets/me/portrait.jpg` |
| Favicon | Circular crop of the portrait (replaces the earlier monogram plan) | `public/favicon.svg` or `.png` |
| Photography set | Placeholder (picsum.photos) until Paul provides | `src/assets/interests/photography/` |
| Project screenshots | Mix — real where available, clean text/code-motif placeholder card where not (no fabricated screenshots) | `src/assets/projects/<slug>/` |
| OG preview image | Designed as a typographic card (name + tagline, Midnight Editorial palette), 1200×630 | `public/og-image.png` |

## 6. Accessibility, responsive, SEO

- Theme toggle: whole-page swap via a class on `<html>`, persisted in `localStorage`; inline `<head>` script reads the stored preference before first paint to avoid a flash of the wrong theme.
- `prefers-reduced-motion` respected everywhere per the fallback table in §3.
- Responsive down to ~360px, desktop-first. Below ~768px the grid-locked asymmetric layout collapses to a single stacked column (same left spine, full-width spans). The Interests page has its own mobile fallback (§4).
- SEO: per-page `<title>` and meta description, Open Graph + Twitter card tags, favicon, the OG image above.
- Formspree's built-in spam filtering plus a client-side honeypot field; no additional anti-spam UI.

## 7. Pre-launch action items (not part of the build itself)

- Paul provides: CV PDF, portrait photo, Formspree confirmation (already done), photography set (can follow later).
- Paul flips the `introduction-au-data-engineering` GitHub repo from private to public before or shortly after launch, so its Projects/Home card can link out like the other public repos (currently built as a case-study card with no link, matching the private-repo treatment, since it's still private as of this spec).
- Paul reviews and edits all drafted copy (hero tagline, bio, project descriptions) before launch, since it's drafted from context material rather than final voice.

## 8. Out of scope for this build

- Analytics (structural hook left, not wired).
- FR/DE language toggle (content structured to allow it later, not built now).
- A blog/writing section (not in the brief; would be scope creep for v1).
- Automated test suite — not proportionate for a static content site. `astro check` in CI is the correctness gate; manual QA before launch covers theme toggle, reduced-motion, responsive breakpoints, and a real Formspree submission test.
