# paulwitkowski.com

Personal portfolio site for Paul Witkowski. Astro, static output, deployed to GitHub Pages at the custom domain paulwitkowski.com.

## Orientation

- **Design spec:** `docs/specs/2026-07-25-portfolio-design.md` — every content, visual, and tech decision. Read this first in a new session; it needs no other context.
- **Implementation plans:** `docs/plans/YYYY-MM-DD-<phase>.md`, one per build phase. Each plan is self-contained (constraints copied in, complete code per task).
- **Build phases:** 1. Foundation (done) → 2. Home + Projects → 3. Me + Timeline → 4. Interests parallax → 5. Contact + polish. Update this list's status as phases complete.
- `context/` holds raw source material (LinkedIn export, project recap, repo list) used to write real copy — never committed, gitignored.

## Git conventions

- Conventional Commits format (`type: description`), **single-line subject only, no body, no co-author trailer.**
- Never commit `.superpowers/`, `.claude/`, or `.impeccable/` — all gitignored (tool scratch directories).
- Create new commits rather than amending, except for unpushed commits made earlier in the same session when the user asks for a cleanup.

## Content-as-data

Projects, timeline entries, interests, and links live in Astro content collections (`src/content/`), never hardcoded in markup. Schema lives in `src/content/config.ts`.
