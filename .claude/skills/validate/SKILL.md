---
name: validate
description:
  Select and run the right verification steps based on what changed. Use after
  making code, docs, config, or skill changes to confirm the result is coherent.
---

Inspect what changed first, then run the smallest meaningful verification and
broaden to the full project gate whenever the work is intended to be complete,
releaseable, or must satisfy preversion/version checks.

## Decision Table

| What changed                                     | Commands to run                                                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Single test file only                            | `npm test -- <file>` (narrowest target)                                                             |
| Logic in `app/` or `server/` only                | Narrowest matching test file, then `npm test` if shared behavior                                    |
| Server/client protocol or WebSocket schema       | `npm test` (full suite — protocol changes ripple across both sides)                                 |
| Types in `types/`                                | `npm run tsc`                                                                                       |
| `.claude/**` only                                | No app test run; verify referenced paths, commands, and conventions                                 |
| Docs only (`docs/**`, `AGENTS.md`, `CHANGES.md`) | Review for accuracy and path/command consistency                                                    |
| Mixed code + tests                               | Protecting test first, then narrowest `npm test` target, then full suite if shared behavior changed |
| UI/view or routing changes                       | `npm run test:e2e` after `npm test` (needs live server + built bundle)                              |
| Any change that must pass release/version gates  | `npm run all`                                                                                       |

## Common Commands

```sh
npm test                  # full Vitest suite (unit + integration)
npm test -- app/views/    # narrowed to a directory
npm run tsc               # TypeScript type check
npm run lint              # ESLint
npm run prettier:write    # format
npm run test:e2e          # Playwright E2E suite (requires: npm run build first)
```

## E2E Local Requirements

The Playwright E2E suite (`e2e/`) requires:

1. **Browser binaries**: `npx playwright install chromium` (one-time, ~175 MB)
2. **Built bundle**: `npm run build` before running (generates
   `app/main.bundle.js`)
3. **Live workspace**: The server starts from `process.cwd()` — run from the
   repo root so the project's `.beads/` workspace is discoverable

The E2E webServer auto-starts on port 3999 and reuses an existing server on that
port (unless `CI=true`).

## Rules

- Run the smallest protecting test first whenever behavior is changing.
- Prefer targeted test invocations over full-suite runs unless the change is
  broad.
- After any code change, do not stop at a partial green check if any validation
  finding remains. Fix all findings, including formatting, typing, lint, test,
  and coverage failures.
- If server/client protocol, WebSocket message schema, or view state shape
  changed, run the full suite — these changes ripple across boundaries.
- If the user is preparing a release, running `npm version`, or otherwise needs
  the repo to satisfy the same gate as `preversion`, run `npm run all`.
- For `.claude/**` changes, verify that referenced paths, commands, and
  conventions exist in the repo before calling the work complete.
- If the target code does not exist yet and the change is documentation or
  orchestration only, do not invent runtime validation; state that the
  verification was a consistency review.
- If full validation cannot run, say exactly what was skipped and why.
