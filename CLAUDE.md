# paulwitkowski.com

Personal portfolio site for Paul Witkowski. Astro 7, static output, React islands, Tailwind v4, deployed to GitHub Pages at the custom domain paulwitkowski.com.

## Orientation

- **Handoff/status:** `docs/HANDOFF.md` — current build state, decisions made, bugs already fixed (don't reintroduce), what's left, key file paths. Read this first in a new session.
- **Design spec:** `docs/specs/2026-07-25-portfolio-design.md` — the original content, visual, and tech decisions. Read this second; `docs/HANDOFF.md` lists where the site has since deviated from it (positioning, categories, flagship set, stack versions).
- **Implementation plans:** `docs/plans/YYYY-MM-DD-<phase>.md`, one per build phase, when phases are planned individually. None exist right now: the site was rebuilt in one pass on `rebuild/midnight-editorial` (single branch, no per-phase worktrees), and later work has been small content/dependency branches.
- **Build phases:** superseded. The full rebuild is merged into `main`; all 5 pages are built. The Interests page is a "Coming soon" placeholder until real photos exist. See `docs/HANDOFF.md` for current status and open items.
- `context/` holds raw source material (LinkedIn export, project recap, repo list) used to write real copy — never committed, gitignored.

## Commands

- `npm run dev` — dev server. Astro 7 runs it as a background daemon; stop it with `npx astro dev stop`.
- `npm run build` — `astro check` + production build (the CI gate). `npm test` — vitest. `npm audit` should stay at 0 vulnerabilities.

## Git conventions

- Conventional Commits format (`type: description`), **single-line subject only, no body, no co-author trailer.**
- Never commit `.superpowers/`, `.claude/`, or `.impeccable/` — all gitignored (tool scratch directories).
- Create new commits rather than amending, except for unpushed commits made earlier in the same session when the user asks for a cleanup.

## Content-as-data

Projects, timeline entries, interests, and links live in Astro content collections (`src/content/`), never hardcoded in markup. Schema lives in `src/content.config.ts` (Content Layer API — `loader: glob(...)`/`file(...)` from `astro/loaders`, not the legacy `type: 'content' | 'data'` shape). Import `z` from `astro/zod`, not `astro:content`.

## Build pipeline

Each phase is planned and executed in its own isolated worktree, branched fresh from `main`. Full sequence per phase:

1. **Plan.** `superpowers:writing-plans` writes `docs/plans/YYYY-MM-DD-<phase>.md` against the current state of `main` (not a prediction of it) — read the design spec plus whatever earlier phases actually shipped.
2. **Isolate.** `EnterWorktree` (or `superpowers:using-git-worktrees` if unavailable) creates a fresh worktree/branch for the phase. Never implement directly on `main`.
3. **Execute.** `superpowers:subagent-driven-development` runs the plan task-by-task: a fresh implementer subagent per task, then a task-reviewer subagent (spec compliance + code quality) before moving on. Fix-and-re-review loops until each task is clean. Plan bugs found mid-execution (missing dependency, spec/code mismatch, etc.) get fixed in the plan file itself, not silently patched around.
4. **Final review.** Once all tasks pass, a whole-branch review (most capable model) checks the full diff against the plan and spec before merge. Address Critical/Important findings; log Minor findings for later.
5. **Finish.** `superpowers:finishing-a-development-branch`: verify tests, merge to `main` locally, push, then clean up the worktree and delete the branch (`ExitWorktree action: "remove"` if it was created that way).

Update the phase status list in Orientation above as each phase completes.
