---
name: prepare-release-notes
description:
  Curate a `CHANGES.md` entry and run the release command to bump the version.
  Use when asked to bump the version, prepare a release, or curate a release entry.
---

Use this skill to maintain `CHANGES.md` as the single canonical release log. The
skill edits only `CHANGES.md`.

## Outcome

Produce a curated release entry with:

- version heading
- `Released <Month> <D>, <YYYY>` line using the current date
- 1-5 bullets grouped into non-empty sections such as `Added`, `Changed`,
  `Fixed`, `Internal`

## Commit Selection

- Prefer the latest matching git tag as the start of the range.
- If no suitable tag exists, fall back to the latest version heading already
  present in `CHANGES.md`.
- Summarize commits only; do not inspect PR metadata.
- Only consider code commits that touch `app/`, `server/`, or `bin/`.
- Ignore commits that touch only docs, tests, `.claude/`, `AGENTS.md`, release
  plumbing, or other non-code paths.
- Mixed commits are valid; summarize only the Beads UI-relevant code changes.

## Writing Rules

- Put the newest release entry at the top of `CHANGES.md`.
- Keep only valuable product or release information.
- Do not dump raw commit lists, hashes, or author attributions.
- Omit empty sections.
- Prefer concise, user-facing language over implementation detail.
- If asked to clean up an existing release, rewrite only the requested release
  entry unless explicitly told to rewrite older entries too.

## Release Gate Expectations

- Before a release command runs, `CHANGES.md` must already contain a non-empty
  entry for the target next version.
- The release gate will fail if the heading is missing or the entry has no
  bullets.

## Suggested Workflow

1. Determine the target version.
2. Compute the commit range from the latest tag, or `CHANGES.md` fallback if no
   tag exists.
3. Filter commits to `app/`, `server/`, and `bin/`, ignoring test-only and
   non-code commits.
4. Group the meaningful changes into 1-5 bullets under non-empty sections.
5. Prepend or rewrite the target version entry in `CHANGES.md`.
6. Run `npm run release:patch` (or `:minor` / `:major` as appropriate) to bump
   `package.json`, commit, tag, push, and publish. Do not stop after writing
   `CHANGES.md` — the version bump is the goal; the release notes are a gate.
