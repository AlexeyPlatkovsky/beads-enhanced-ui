# Changes

## 0.1.1

- [`b2d5d19`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b2d5d197bcbc694380b27a5802c0e37d2a5c9d7f)
  update skills for validate
- [`ca78205`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/ca782055e6b1397eea04ac442a5c8826dd3de1ce)
  fix prettier
- [`34bf9e6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/34bf9e6356c9d3ae718681aab0b85ad57d86d90c)
  fix nav test
- [`201e00f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/201e00f298fb496938faed1566647b7c27c8dffb)
  increase branch covearage
- [`b8a4c65`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b8a4c65fafd4412a97dce3322f6d67508d14ec12)
  fix tests
- [`510c010`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/510c0108f60753fbac184d06dba69692d909384a)
  fix lint issues
- [`fe665a6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fe665a679ac39d1c9b7c48df24f47dec1f094972)
  revert versions
- [`45b2e2e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/45b2e2e0e6fedfe3156db9e4a06a483b2b88675e)
  update README.md
- [`e963657`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e963657ee2f0e9856084bc2c5da04feb7ee66397)
  update package-lock.json
- [`d16f4e3`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d16f4e314077e0d103d98d58e72f977b1d1ace10)
  ci: add npm publish workflow
- [`49ad01a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/49ad01aef9481d16a7dfcdff0d0c7f483b27a131)
  Fix installation command for beads-enhanced-ui
- [`657d5f8`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/657d5f8a90dde737670515bf07861219fc7d7e8d)
  Update package.json to fix formatting and add bugs URL
- [`b150b6a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b150b6aa4f7de48c3a24442f1d17c587fb7b5c6e)
  Update package.json with new version and author
- [`dcea9fa`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/dcea9fa06983e97af654313648f3e0463e6a04d1)
  Rename project from beads-ui to beads-enhanced-ui
- [`25df794`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/25df794473562c37f7cc815d9056bf7fb9e18bb2)
  untrack
- [`18d7d97`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/18d7d974e6c0eaa47c1f59a3898fc3d57d69ad07)
  chore: add pre-push checklist hook to settings.json
    >
    > PreToolUse hook on Bash(git push:*) injects a two-item checklist into
    > the AI's context before every push:
    > 1. Was code-reviewer subagent run on this diff?
    > 2. Was the branch decision explicitly confirmed with the user?
    >
    > Applies to all AIs that read .claude/settings.json (Claude Code,
    > Cursor, etc.). Complements the existing AGENTS.md rule — makes the
    > requirement fire structurally, not just when the AI remembers to check.
    >
    > Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
    >
- [`5b729a9`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/5b729a99ff5b279a53bedc96c74d0c6905ad77d2)
  update settings
- [`8fc7a3d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/8fc7a3ddf828085dd2d423dd59c2cc35b1356ba9)
  fix(tests): address code-reviewer findings in E2E suite
    >
    > - interactions: use waitFor() instead of isVisible({ timeout }) which
    >   was silently ignored; replace tautological expect with a real assertion
    >   on the board column header
    > - interactions: strengthen search filter test to assert list-empty is
    >   visible and list-table is not (previous comma-selector passed on either)
    > - smoke: replace waitForTimeout(1_000) flake with deterministic WS-ready
    >   signal (workspace-picker-loading hidden)
    >
    > Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
    >
- [`e10c7c9`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e10c7c9ca2a0da3c22a13151439d425752fafd50)
  feat(tests): add protocol contract tests and Playwright E2E suite
    >
    > Closes epics beads-enhanced-ui-13 and beads-enhanced-ui-17.
    >
    > Protocol contracts (epic-13):
    > - app/protocol.contract.test.js: 32 tests locking all 24 MESSAGE_TYPES,
    >   RequestEnvelope shape, ok/error ReplyEnvelope shape, and broadcast
    >   event types
    > - server/ws.workspace.test.js: 17 contract tests for get-workspace,
    >   list-workspaces, set-workspace handlers and error envelope invariants
    >
    > Playwright E2E suite (epic-17):
    > - playwright.config.js: webServer on port 3999, Chromium, report output
    > - e2e/fixtures.js: appPage + wsConnectedPage fixtures with shell/WS wait
    > - e2e/smoke.test.js: 14 tests for boot, routing, workspace, connection
    > - e2e/interactions.test.js: 21 tests for new-issue dialog, list filters,
    >   search, epics, board, and theme toggle
    > - vitest.config.mjs: exclude e2e/ from Vitest projects
    > - validate skill: E2E row in decision table + local run requirements
    >
    > Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
    >
- [`c6b8d16`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c6b8d163f15f42f1286d9d519fe0db888e40c6f3)
  fix issues with beads ID cell in the table
- [`d655b4b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d655b4b6860e11cb39689c54c2b11f02fa6cdbd3)
  Add failure-path regression coverage
- [`e0d906c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e0d906cc2ac55889af6dab147c1afc560a61ba8a)
  update threshold
- [`2fc027e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2fc027ec7377530b2307611d36b839b781293644)
  github ignore
- [`7043ed7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7043ed722df77949129ef823af72cc61f10f00ba)
  chore: ignore local beads runtime files
- [`325ac28`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/325ac28a4ce4e2e8049b242e3ccd1cbbb2663bee)
  chore: close beads-enhanced-ui-5 tracking
- [`4df4ded`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/4df4ded9c260ea1061006d39c043026f7f7dc27c)
  update AGENTS.md
- [`c2d44d6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c2d44d66b835db0084c00aa38bdf258f9be9fa3f)
  add code reviewer subagent
- [`c7102d9`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c7102d9177d570d43d9517bfc57c4ca3dc9a89dc)
  fix test problems
- [`1658ef0`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/1658ef09d14cf2343945dfc7ee1d40919748da21)
  update tests
- [`df1b039`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/df1b0390fce2a29056219ce94dcd23875bcca978)
  commit test coverage
- [`03b54ab`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/03b54ab7d8b36b8248a8606d04f9a23d61582ab4)
  add test coverage
- [`4dba185`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/4dba185c52a7d7b35a7d668f3f13ed8a09755a7d)
  finalize deads
- [`bfa5bcb`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/bfa5bcb9ed95d9d5be9f109f80b321df9afccf26)
  bd init: initialize beads issue tracking
- [`9985b80`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/9985b80bcffb45b144fda17e0ff6a605adb1660b)
  fix ci.yml
- [`f585c03`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f585c037a323f54ffb52f0f3c212b3bc93cf7fed)
  update coverage
- [`633596a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/633596a8cec1d3eac9bbb3622447dd485b77fe75)
  ci add coverage and comment
- [`2fe0a83`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2fe0a832d9f9a600478b93e2b6bd77ea25662c70)
  update git worklof instructions
- [`c8a878a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c8a878aff3d61e764e9e09b01907fe384a14380e)
  Add Vitest coverage reporting with thresholds
    >
    > - Install @vitest/coverage-v8
    > - Configure coverage in vitest.config.mjs: v8 provider, text/lcov/html/json-summary
    >   reporters, scoped to app/**/*.js, thresholds at 65/65/55/65
    > - Add test:coverage npm script (runs jsdom project with coverage)
    > - Wire test:coverage into the all script
    > - Add /coverage to .gitignore
    >
    > Baseline: statements 70.66%, branches 61.91%, functions 71.07%, lines 71.07%
    >
    > Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
    >
- [`2954ea4`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2954ea47b202235e73cafd11fdfe1bd69322c150)
  fix Epics page UI behaviour
- [`95711a7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/95711a795265dc01be1a317be9ada29af3836a04)
  Fix issue ID display and update Beads policy
- [`8cd7019`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/8cd7019a4db7e61c243ae61b89ae643adb2e9ec9)
  add gemini skills
- [`a3398e2`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a3398e2885d223be3518133e5af125d0c11cd04a)
  update epics page items list UI
- [`5727100`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/57271000b49d2dcc204d06efbe92426ce8b34d5b)
  update muted for epic child
- [`f3b17c2`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f3b17c24529e5ffea48cfca5fff0398e9f5def8e)
  adjust title column width for Epics
- [`5c5dfc3`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/5c5dfc3a0cf99dea9b7cc94b007d95d430338661)
  make epic tab le rows only 50px
- [`22fd15c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/22fd15cea4ad60bf1227779cc9d2ffe16b2bbfe7)
  fix sort issues
- [`3a23568`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3a23568dd671f3abfd3750ddd5156f9536f3a9ab)
  udpate skills and docs, delete agents
- [`2549790`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2549790e3475ad79ccfab3f772584925f92e3486)
  added stable data-testid hooks across the main frontend surface
- [`bd19131`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/bd19131d0c211525150b462dd5e6892c43b0c2ac)
  update github CI yml
- [`25f72f1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/25f72f1c03c79dbefb1b7347ca4912167d530875)
  finalize EPic tab view
- [`2c45683`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2c4568356bd6a0a51d5c41f8b992c5398e514381)
  adjust implementation of Epics
- [`398e1ff`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/398e1ff6bf41fddde7a33b63c6ecba75e2ed41ed)
  fix epics status column alignment
    >
    > Status badge was inside the name cell (flex), so it floated with title
    > length. Moved it to its own grid cell (epic-header__cell--status) to
    > align with the STATUS column header. CSS grid and cell class were
    > already correct; this was a JS template-only fix.
    >
    > Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
    >
- [`fcd6212`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fcd62125d13509df8908508ba3fc8d40efe4408b)
  apply EpicsPage design to frontend
    >
    > Update dark theme CSS tokens to match design spec (bg, panel-bg,
    > border, muted and 10 new tokens: surface-raised, control-bg, button-bg,
    > border-row, border-tab, button-border, fg-strong, fg-mid, fg-dim,
    > progress-track). Update header, tabs, new-issue button, theme toggle,
    > epics list header, and epic rows to use new tokens. Replace sort
    > direction text labels with inline SVG icons (arrow-up-down / arrow-up /
    > arrow-down) in epics.js.
    >
    > Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
    >
- [`bdffc53`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/bdffc533fc05f94acd6fdbd4e72670b1ceaef62d)
  consolidate color variables from 22 to 16 tokens
    >
    > Merged near-identical surface/text/control shades: surface→panel-bg,
    > fg-id/fg-tab/fg-label→fg-mid or fg, control-knob→button-bg,
    > control-border→button-border. Updated EpicsPage.pen nodes and replaced
    > variable set. Updated brand-book.md token table and added palette
    > constraint rules to ui-design.md to prevent future drift.
    >
    > Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
    >
- [`63b27a4`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/63b27a4e65d3bac589edbf50990d8b7450834a0d)
  update Pencil design
- [`1992eb2`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/1992eb29eaf61a4d13bba781f32383399d013a87)
  update designer rules
- [`82a0a9b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/82a0a9bc3074dcf0e70c88ad11c58cc3783740ff)
  update Epic tab design
- [`4b1b788`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/4b1b788952038f35f6f16b722bad11ad142366e0)
  update pen file
- [`889b361`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/889b3611d88e514a3349dc0c5732063afe141d94)
  add brand book
- [`86e2126`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/86e2126f8264830320887822c32862658d8cc023)
  update skills
- [`7392f63`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7392f63281e0df49fdcdf3847e345e76881a40aa)
  update some docs
- [`f2a0229`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f2a0229d51e82a47943cb0efe8c5160eaac0cc42)
  update pencil skills
- [`10e1862`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/10e186205fe5f427e595637849fbb0166246d8ef)
  change vertical positins
- [`39103a6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/39103a67ba026cd2545a562d2cd37aad855468d0)
  init beads
- [`f1c9501`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f1c950111157706b61e6c1863058788b2080ef63)
  update pen file
- [`c0f1bfd`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c0f1bfdcfec9789f03cbb763e51aeef070fd9ca9)
  chore: save all current workspace changes
- [`3bfde7c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3bfde7cfcd1aacc09d644834fdbcfab08471a48a)
  enrich project with AI skills
- [`903b70f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/903b70fd3ef3c8cd2815871c385fdbe30a66d862)
  0.11.3 (Maximilian Antoni)
- [`47261a7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/47261a7a95d5a17b480ae56c4a10b5eeb49d1007)
  feat: show close reason in issue detail view (#63) (Tom Preece)
- [`c56b336`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c56b3363945ccce5a65ddd8511fe028d65fb1824)
  0.11.2 (Maximilian Antoni)
- [`929a15d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/929a15da79ead6819044e50580093e3cbe87758b)
  Fix beads setup (Maximilian Antoni)
- [`b354aa6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b354aa63a7d04abe50b0da74c5c0e62077f44b69)
  fix: apply --port/--host overrides before workspace registration (Ryan Peterson)
    >
    > When the server is already running and `bdui start --port <N>` is
    > called from a second repo, the port/host env vars were set after the
    > "already running" early-return branch. This caused getConfig() to
    > default to port 3000, sending the workspace registration POST to the
    > wrong port. The registration silently failed and the new workspace
    > never appeared in the picker dropdown.
    >
    > Move the env var assignments before readPidFile() so getConfig()
    > reflects CLI overrides in all code paths.
    >
- [`c38ea78`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c38ea78818d84bd8abc8850e9a86380737555348)
  0.11.1 (Maximilian Antoni)
- [`0fc2df7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/0fc2df7cbaeb6f0500900ce2bf87e6b3fa8e8ac0)
  style: fix prettier formatting in list-adapters test (Leon Letto)
- [`e00ddfc`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e00ddfc9b9d421dc31b7d7703f4bfbc9790546f8)
  fix: add --tree=false to bd list calls for bd 0.59.0 compat (Leon Letto)
    >
    > bd 0.59.0 changed `bd list --json` to emit tree output by default.
    > This broke JSON parsing in bdui's list-based subscriptions. Adding
    > `--tree=false` ensures flat JSON output regardless of bd version.
    >
- [`f08e319`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f08e31988c2db45488effd914a85a97a7ddcd3ba)
  0.11.0 (Maximilian Antoni)
- [`fc00b87`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fc00b87cfd1b6600a9b9088a9f62c2f6e8fc919e)
  fix(ui): harden daemon restart workspace registration (Leon Letto)
    >
    > Verify daemon startup, recover from early exit, and register current workspace reliably under port/start races.
    >
- [`2ea0dd0`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2ea0dd08eb71625fa3ae51e64ea6501b4d058154)
  perf(ui): reduce list latency by default sandbox bd calls (Leon Letto)
    >
    > Run bd commands with --sandbox in UI request paths by default, with env opt-out for diagnostics.
    >
- [`f700f20`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f700f20223f6d8a5f6a0d5dc62c0d12ee12b89bd)
  0.10.1 (Maximilian Antoni)
- [`62017f7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/62017f74fadb439c7270160ac03866d3554f36a3)
  fix: clipboard copy fallback for non-secure contexts (Rodrigo Blasi)
    >
    > The Clipboard API (navigator.clipboard) is unavailable on non-secure
    > contexts (HTTP served from non-localhost addresses). Previously, the
    > "Copied" feedback was shown unconditionally even when writeText was
    > never called, giving false confirmation.
    >
    > - Only show "Copied" when the copy operation actually succeeds
    > - Add execCommand('copy') fallback for non-secure contexts
    > - Append fallback textarea inside open <dialog> to avoid top-layer
    >   inertness from showModal()
    >
    > Fixes #37
    >
- [`6acaa3f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6acaa3f5b232dd028f17444900a2b3e771282bf1)
  0.10.0 (Maximilian Antoni)
- [`998f256`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/998f2562b3ad3203c9dd1f627d44b1c2d5ef03a4)
  Do not wrap issue IDs (Maximilian Antoni)
- [`e3c3345`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e3c3345db41cd874db8e33ec79c904cc314e6bf8)
  Improve workspace resolution and fallback db (Maximilian Antoni)
- [`6de4652`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6de4652c336f77c8d8ec9cc13f5a47e9ba1b3857)
  Avoid concurrent DB access to work around dolt panic (Maximilian Antoni)
- [`011fe9e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/011fe9e3dfaa475f744b69ff6b44c3cc23283ad1)
  Support dolt backend (Maximilian Antoni)
- [`63ed3c3`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/63ed3c3f3f98aa2c6d621537887d98701289dac6)
  Update beads (Maximilian Antoni)
- [`cd0a4c5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/cd0a4c59fcfe2c9a655ed2079a2a059a242906c5)
  docs: highlight multi-workspace feature in README (#47) (Pablo LION)
- [`e49ab61`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e49ab61c2450336223090e259402995f80737dbd)
  0.9.3 (Maximilian Antoni)
- [`2e04bc1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2e04bc1eeb5c43e6934d858cd017d80f745a38bb)
  Add -v/—version flag to CLI (#46) (Brent Traut)
- [`3c92047`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3c920472c6f13a54c43735c9f4f5e79b5a4c1245)
  0.9.2 (Maximilian Antoni)
- [`ffa376c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/ffa376cab432b0e321232e8bc0de2caca20a6b17)
  Filter tombstone epics in list adapter (#44) (Brent Traut)
- [`fa8cb99`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fa8cb99227bf2df8a738b891963383d0a75cd43a)
  0.9.1 (Maximilian Antoni)
- [`bd6f412`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/bd6f412570a6cb774a683106f9b6efa6ee0e318b)
  Add dependency/dependent counts to issues list view (#35) (Enan Srivastava)
- [`c6391d1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c6391d1b4ea98ae06ea5bc0c251da57123370ef4)
  Fix stuck loading indicator during view switching (#28) (Ofer Shaal)
- [`127859c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/127859cc9faf437318dcb1169dae527e382bbd7b)
  0.9.0 (Maximilian Antoni)
- [`21fdde2`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/21fdde230713a58001974db29caf288deeedb371)
  Fix eslint warnings (Maximilian Antoni)
- [`5fa7fea`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/5fa7fead5359aa8f01d4e12a9432464af7276e33)
  Remove accidental bundle commit (Maximilian Antoni)
- [`56819d3`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/56819d321b35a77da690cf028672825752b45544)
  Add drag and drop to boards view (#30) (Brendan O'Leary)
- [`1c52c6f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/1c52c6f2a30b7d37439f291b1a3b1d4c26510396)
  Feature/filter toggles v2 (#20) (Frederic Haddad)
- [`b4c7ae6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b4c7ae62fd93d7bbaee936e0f8b659beb774122d)
  fix: add windowsHide to prevent console flash on Windows (#29) (Titusz)
- [`63a269e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/63a269ec1f580728bc8977d00b150d69bc1ce535)
  feat: add multi-project workspace switching (#24) (Ofer Shaal)
- [`e4a7d00`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e4a7d008dba495e1ba0376989a0db49e4a400e86)
  0.8.1 (Maximilian Antoni)
- [`59715e8`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/59715e8eb7834e6fb6ee8f63f2257da33831d705)
  Fix DB watch loop firing every second (Maximilian Antoni)
- [`7cf9edc`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7cf9edcf517ef76bd9f885106827e1e5beae3804)
  0.8.0 (Maximilian Antoni)
- [`2cfcd2d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2cfcd2d4d4aa670b67f7798ecf7dfebaf5d2383c)
  Feature/delete issue from detail (#15) (Frederic Haddad)
- [`57386c3`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/57386c339d027bf36b72e675e661afd410adc2db)
  0.7.0 (Maximilian Antoni)
- [`255845f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/255845fd49a1e830dd56404d4d49d71c4f3bd18f)
  feat: add comments to issue detail view (Frederic Haddad)
    >
    > - Add get-comments and add-comment WebSocket handlers
    > - Display comments with author and timestamp in detail view
    > - Add comment input form with Ctrl+Enter submit
    > - Auto-fill author from git config user.name
    > - Fetch comments when loading issue details
    >
    > 🤖 Generated with [Claude Code](https://claude.com/claude-code)
    >
    > Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
    >
- [`a296e98`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a296e98dadb59d989cf2acac15666c0d38c635d6)
  Add CHANGES.md to prettier ignore (Maximilian Antoni)
- [`07a103b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/07a103b3d053e01ab59983d15f6807d0adb08e39)
  0.6.0 (Maximilian Antoni)
- [`2e25941`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2e259418ab24367468daa4449833550f1e9cb297)
  feat(cli): add --host and --port options (cc-vps)
    >
    > Add CLI options to configure the server bind address and port,
    > making it easier to expose the UI on different network interfaces
    > or run multiple instances on different ports.
    >
    > - Add --host <addr> option (default: 127.0.0.1)
    > - Add --port <num> option (default: 3000)
    > - Support HOST and PORT environment variables
    > - Parse --host/--port in server/index.js for dev workflow
    > - Add test coverage for new options
    >
    > Co-authored-by: Christian Catalan <crcatala@gmail.com>
    >
- [`6327f77`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6327f779f7b6ad7d274a37168320442bf013b4e0)
  Fix GitHub action commands (Maximilian Antoni)
- [`4b9b68b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/4b9b68b9a0998671592d58f1be3f67e86a639567)
  0.5.0 (Maximilian Antoni)
- [`76964c1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/76964c1daf133dded6b8f335cfe9d3184ac96a18)
  Show badge with number of cards per column (Maximilian Antoni)
- [`155316c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/155316c975a93edc806379e769b538c213ee5ed8)
  Add loading indicator (Maximilian Antoni)
- [`80a837a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/80a837a0ef9702fbb7cbbf168526a5a5e3e80d54)
  Show fatal errors in UI (Maximilian Antoni)
- [`06e8fd9`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/06e8fd9293b226c88d8b395c7bc28b9c7f4c9610)
  Beads metadata (Maximilian Antoni)
- [`233c70a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/233c70aa9b6ed6e2d7fef487c7b241ffe721cecd)
  npm audit (Maximilian Antoni)
- [`37b3476`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/37b3476bc7a0061484de913bee00f285a073ea24)
  Upgrade marked (Maximilian Antoni)
- [`a1362c9`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a1362c97fc770cb18764305453b18f71830bdbef)
  Update express and types (Maximilian Antoni)
- [`8efc40d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/8efc40dadc051a826c64474a1254641294337a81)
  Update vitest, jsdom and esbuild (Maximilian Antoni)
- [`89cac0f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/89cac0ff438a7f1d8b790f339064f2b49ef8ab13)
  Update eslint and plugins (Maximilian Antoni)
- [`0d7e33e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/0d7e33e55259d11c39820c1576db74b7fec26b5e)
  Update prettier and format files (Maximilian Antoni)
- [`356a201`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/356a201af8cfce75d82a7f942b5d04698400715c)
  Rename npm scripts for prettier and tsc (Maximilian Antoni)
- [`31b25d4`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/31b25d42d23e60c4b30b29281c392179104bf813)
  Upgrade @trivago/prettier-plugin-sort-imports (Maximilian Antoni)
- [`164ac73`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/164ac7345eabaa86b57aff694a7349d00dc389ef)
  0.4.4 (Maximilian Antoni)
- [`d0f8d1d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d0f8d1d088eda78da14d35ac4fd898cbeb68b534)
  Make labels a separate section in the sidebar (Maximilian Antoni)
- [`c44fd34`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c44fd3484ade8ef7ea56eb608d11bb07ebbf665b)
  Fix flaky board test due to time-sensitive closed filter (Nikolai Prokoschenko)
    >
    > The board view filters closed issues to show only those closed "today"
    > (since midnight). The test was using `now - 60*60*1000` (1 hour ago)
    > for C-1's closed_at timestamp. If the test runs shortly after midnight,
    > this timestamp falls on the previous day and gets filtered out.
    >
    > Changed to `now - 1000` (1 second ago) to ensure both test items
    > reliably fall within the "today" window.
    >
    > 🤖 Generated with [Claude Code](https://claude.com/claude-code)
    >
    > Co-Authored-By: Claude <noreply@anthropic.com>
    >
- [`fee8671`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fee8671b28a4ad5b98cdca585d4855b5aa1405d7)
  0.4.3 (Maximilian Antoni)
- [`4a5b4cd`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/4a5b4cda8b22437eac2636c0a5556d0b52897f5f)
  Add author (ignore in changes) (Maximilian Antoni)
- [`a34855e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a34855ea26304554df2056ac6ed5224db25d795a)
  Ignore tsconfig.tsbuildinfo (Maximilian Antoni)
- [`a7ebbc1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a7ebbc1ba8538107f0ec106638115c4d78c48711)
  Add logging instead of ignoring issues (Maximilian Antoni)
- [`54c9488`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/54c94885c28a9bbdaaa60de6eaf8b91eac567bec)
  Mention `npm link` for development (Maximilian Antoni)
- [`a137db0`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a137db02386457b7277f9566b5f6fc0079581bf7)
  Display beads issue ID as is (Maximilian Antoni)
- [`ee343ee`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/ee343ee39cc5ef9c7d7ec7df0a4f2b2f0e4b51ba)
  Remove try-catch around localStorage access (Maximilian Antoni)
- [`619a107`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/619a107948b47bcfa6c7102ca0e90f3d575ac3a8)
  Upgrade vitest to v4 (Maximilian Antoni)
- [`caed1b5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/caed1b5005645c2cf566ac3c3eddc4b5b73a4f74)
  Use vitest restoreMocks config (Maximilian Antoni)
- [`0a28b5b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/0a28b5bf5cc278a6775a051c712ff560dfab2b81)
  Fix: Use BEADS_DB env var instead of --db flag (Nikolai Prokoschenko)
    >
    > The bd CLI removed support for --db flag in commit 7dcde13, causing all
    > bd commands spawned by beads-ui to fail with "unknown flag: --db".
    > This prevented any data from loading in the UI.
    >
    > Fix: Use BEADS_DB environment variable when spawning bd processes,
    > which is the proper way to specify database location.
    >
    > Changes:
    > - server/bd.js: Set BEADS_DB env var instead of adding --db args
    > - Remove obsolete withDbArg() helper function
    > - Format long line and remove trailing newline
    > - Add .beads/issues.jsonl to .gitignore
    >
    > Validation:
    > - All 206 tests pass
    > - Typecheck and lint pass
    > - Issue list now populates correctly in dev mode
    >
    > 🤖 Generated with [Claude Code](https://claude.com/claude-code)
    >
    > Co-Authored-By: Claude <noreply@anthropic.com>
    >
- [`47f6978`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/47f69788a7ee10246e6379a8cae0acf9f2648597)
  0.4.2 (Maximilian Antoni)
- [`66e31ff`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/66e31ff0e053f3691657ce1175fd9b02155ca699)
  Fix pre-bundled app: Check for bundle instead of NODE_ENV (Maximilian Antoni)
- [`dbaecac`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/dbaecac199dc55736fc89205c9bd0c3e4d6dd0af)
  0.4.1 (Maximilian Antoni)
- [`03d3477`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/03d34774cd35bf03d142d2869633327cbe4902bd)
  Fix missing protocol.js in bundle (Maximilian Antoni)
- [`3abf366`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3abf366099723a08cb6aca58076b3b924954d638)
  0.4.0 (Maximilian Antoni)
- [`20a787c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/20a787c248225b4959b18b703894daf483f380b6)
  Refine and apply coding standards (Maximilian Antoni)
- [`aedc73f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/aedc73f0c494dd391fcc9ec7ecbf19b01b37e69a)
  Invert CLI option from no_open to open (Maximilian Antoni)
- [`03a2a4f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/03a2a4f0ddb93df717e9f12b0c4600be12b390b5)
  Add debug-based logging across codebase (Maximilian Antoni)
- [`eed2d5c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/eed2d5c71c45131023d1ec047a9f84e84d057fdb)
  Pre-bundle frontend for npm package (Maximilian Antoni)
- [`d07f743`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d07f7437c67bfdbded470c6ccea556a78b3452b3)
  Remove obsolete BDUI_NO_OPEN (Maximilian Antoni)
- [`1c1a003`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/1c1a0035fd069d030430d56713e64fbaf0224db8)
  Improve project description (Maximilian Antoni)
- [`a7f737b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a7f737bd9c34e4fa4ad4f3802a247fec104a4873)
  0.3.1 (Maximilian Antoni)
- [`3912ae5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3912ae552b1cc97e61fbaaa0815ca77675c542e4)
  Status filter intermittently not applied on Issues screen (Maximilian Antoni)
- [`a160484`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a16048479d1d7d61ed4ad4e53365a5736eb053af)
  Upgrade eslint-plugin-jsdoc and switch config (Maximilian Antoni)
- [`1ae22d7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/1ae22d79b08c961c20ad9bad545a98c3e24b9189)
  0.3.0 (Maximilian Antoni)
- [`6695620`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/669562026783b7a45d9894536e44ef1a5697497a)
  Improve help and README (Maximilian Antoni)
- [`60b7646`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/60b7646d225be2e44a445d922f5ccc5192af4662)
  Replace custom markdown parser with "marked" (Maximilian Antoni)
- [`2478309`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2478309ef5427aed879d5ffa42dba3a15ebdea25)
  Bug: duplicate 'subscribe-list' for 'tab:issues' on issue click (Maximilian Antoni)
- [`33479be`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/33479beec1b31384a2691e4a5bb8681ae4dd8b00)
  Docs: Update protocol and architecture to push‑only (v2) (Maximilian Antoni)
- [`48b021c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/48b021cd3280d7e65dcbea770f8c1cda5080beb8)
  Replace unsupported ‘issues-for-epic’ subscription with epic detail + dependents (Maximilian Antoni)
- [`5c29ca4`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/5c29ca47061383dce5b2699d7e644441883ba9eb)
  Epics tab shows empty due to bd 'epic status' JSON shape (Maximilian Antoni)
- [`af1ad62`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/af1ad62948bf11120e565698b1c278e7e7d6ba3e)
  Remove `show-issue` RPC and UI fallback (Maximilian Antoni)
- [`a60a4df`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a60a4df9e8710736492b425c0eb454c8debf5efb)
  Centralize and reuse issue sort comparators (Maximilian Antoni)
- [`d0182c0`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d0182c08e91e3f8c2d768057bfd7a41f21983c71)
  Fix: Server rejects `subscribe-list` for `issue-detail` (Maximilian Antoni)
- [`019fcdc`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/019fcdc3183d953d6224ec4420eb209c6bd55cee)
  Sort lists by priority→created_at; closed by closed_at only (Maximilian Antoni)
- [`8376982`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/8376982fe70d7cbea6a94d8e1789a2eb6189a8d9)
  Remove SubscriptionSchema (Maximilian Antoni)
- [`3d652e5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3d652e500d5b851c4b2ab8fc116df60e174e90f8)
  Remove 'issues-changed' flow; switch detail to subscription push (Maximilian Antoni)
- [`9e9b7b1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/9e9b7b111216d0280b22d03eec524d442c18214e)
  Remove legacy WS subscriptions (Maximilian Antoni)
- [`3105d13`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3105d13d75dcaeb86ffd378b0854597e514fd178)
  Docs: Update developer docs and diagrams (Maximilian Antoni)
- [`da1b620`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/da1b620117f6a65654bc2aa086d29ba28ca1ab20)
  Server: batching and revision sequencing for issue pushes (Maximilian Antoni)
- [`a2a4525`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a2a45258563cf156760cefcef5e40277058d9004)
  Add E2E test and cleanup JSDoc types (Maximilian Antoni)
- [`42c5dac`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/42c5dac915eea416ef94f70a3be981d2ab5ca78f)
  Server: Push protocol sends full issue payloads per subscription (Maximilian Antoni)
- [`a7b9f80`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a7b9f80fab2cf166fbccd04ff8f439e18a2f11fe)
  Cleanup: Remove central issue store and delta fan-out (Maximilian Antoni)
- [`5eccd4e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/5eccd4ef91497405602ba35404c04d4f65621565)
  UI: Wire push client to per-subscription stores (Maximilian Antoni)
- [`77d4ab8`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/77d4ab808f4e26a1b50083a531e993dedc5dbf56)
  UI: Implement `SubscriptionIssueStore` abstraction (Maximilian Antoni)
- [`44e4c3a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/44e4c3a4b72e65a147b990a9277e74c5885d8be4)
  ADR: Per-subscription stores and full-issue push payloads (Maximilian Antoni)
- [`e98117b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e98117b9d37a2a9b46e03da4d0ff18727e2f9e82)
  Epic: Simplify push protocol — one store per subscription (Maximilian Antoni)
- [`2985673`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2985673840c8e4a887e8d0a0640e2bc53c961408)
  UI-151: Fix board/epics push-only regressions (Maximilian Antoni)
- [`91a76c6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/91a76c667315dc5459bcedb7025741db3b118b36)
  Server: Remove read RPCs after migration (Maximilian Antoni)
- [`72e09c6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/72e09c6bd32c09a4fa013fdbcc5443ef4415e32f)
  UI: Wire up createListSelectors for list rendering (Maximilian Antoni)
- [`f940751`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f940751ee0f5dad186c77f2f8de17e45fdb5ec61)
  Cleanup: Remove data/providers list reads; keep mutations (Maximilian Antoni)
- [`8bd33cf`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/8bd33cf54d4fcdbd3d327af04963a6a2e5b0beee)
  Client: List selectors utility (ids → entities + sort) (Maximilian Antoni)
- [`da87d8f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/da87d8fdc0e78e88c17396c5b78da68701b7e6db)
  ADR: Push‑only lists architecture and migration plan (Maximilian Antoni)
- [`128ba38`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/128ba38545df88af1b0e0c79c022539f2ba29a9a)
  Tests: Convert list/board/epics tests to push fixtures (no RPC stubs) (Maximilian Antoni)
- [`7c6774f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7c6774fa6006f8762636af8443dcb8264b01c96a)
  Epics/Board views: fix reload and view-switch behavior (Maximilian Antoni)
- [`626f862`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/626f862b45b05523aa2c31e07269a33046d99851)
  Fix: Call `bd epic status --json` for epic tab (Maximilian Antoni)
- [`d9bf76d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d9bf76daa579bd27ef5bdfec8a4373272c3c4df4)
  Client: Epics view derives groups from issues; live children via subscriptions (Maximilian Antoni)
- [`7a3f73b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7a3f73b7d8d13aab4fa44c17619a8efebda038c9)
  Fix: Ready column shows empty on board (Maximilian Antoni)
- [`071efd3`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/071efd33b622fde4d561c06439c3a231e4ad239e)
  Client: Board renders from subscriptions + issues store (Maximilian Antoni)
- [`b264e8a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b264e8a464f78b5ae4c56277441edcdb8a9367a6)
  Client: List view renders from subscriptions + issues stores (Maximilian Antoni)
- [`4348c76`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/4348c767690be9239309c34fe983a0389b0f4c58)
  Plan push‑only lists end‑to‑end (Maximilian Antoni)
- [`187e99a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/187e99af5e37a5697295b11cf56aae12c42d02aa)
  Implement pure push-based issue updates (Maximilian Antoni)
- [`8476f9f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/8476f9f58209d0d9c94d7e6e3588043240bb06e5)
  Plan pure push-based issue updates (Maximilian Antoni)
- [`9501b20`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/9501b20e7b8df98d1ccc2ab6bf8da20da18a2570)
  Use `bd ready` for ready board column (Maximilian Antoni)
- [`66e2e2b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/66e2e2b01c16c7090cb2d99ec6b2045f16c2d8c7)
  Remove unused `subscribed` flag (Maximilian Antoni)
- [`b6a94dc`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b6a94dc27a68409533aadda3ed98b51b5b3fed7b)
  Update data exchange subscription plan (Maximilian Antoni)
- [`ea546cb`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/ea546cb89a6f38a5777d3090c03a2a7d89e978a3)
  Client: UI integration for tabs and epic expansion (Maximilian Antoni)
- [`a23ca15`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a23ca15c5945cea92cab797171a98222bf5c19fe)
  Security: explicit mutation ops and param validation (Maximilian Antoni)
- [`c5eac51`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c5eac5164a185c9b3a8b8c859b80b750bac489b4)
  Client: subscription store and delta application (Maximilian Antoni)
- [`0bd09fe`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/0bd09feb6445ee77bd7ce84f72e6d2840dd48024)
  Server: mutation window and once-listener gating (Maximilian Antoni)
- [`d63842f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d63842f3a12bc64c8aade0f4a0538ebca517761f)
  Server: diff engine and closed-issues pre-filter (Maximilian Antoni)
- [`91973d2`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/91973d28a912609409e9523cdc256f68f0b79d37)
  Server: subscription registry and lifecycle management (Maximilian Antoni)
- [`e8e3cc7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e8e3cc754d802431b2adab85ce6679665dcc337e)
  Server: bd list adapters for subscription types (Maximilian Antoni)
- [`743e23d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/743e23d16714f1f6341e48976f6f15c1ba746a83)
  Server: subscription registry and lifecycle management (Maximilian Antoni)
- [`6469eb7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6469eb77aa5643a57a22ce32379d8eb087e83250)
  Plan data exchange model refactor (Maximilian Antoni)
- [`f33e02e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f33e02e351618a30e3c21f4ba1db3efc1aa2980b)
  Improve AGENTS.md (Maximilian Antoni)
- [`30e5b4e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/30e5b4ec8181e0c59705a7a9b3b6cdf01ce9d997)
  Markdown: support ordered lists (Maximilian Antoni)
- [`872e4f9`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/872e4f9566f61b6c807484bf28f5ffa54fc5f306)
  Fix test (hard coded date) (Maximilian Antoni)
- [`b075ea4`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b075ea4c9947227da0e58d647ce203285c0dc6ce)
  Fix: Always resolve db from cwd (Maximilian Antoni)
- [`b36635b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b36635b66a70f32bde7b84c70bd0a4ee05fba8d0)
  Log resolved db on start/restart (Maximilian Antoni)
- [`f9ab1df`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f9ab1dfb6e35af1622b0dc38bb00941759b0c20d)
  Cleanup stylesheet (Maximilian Antoni)
- [`883d5e6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/883d5e656f45cb6cf62f6069da92d310bdd35e46)
  0.2.0 (Maximilian Antoni)
- [`33c89b9`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/33c89b92cdf93e46076c6f6d6d6a308d81a31491)
  Remove --limit 10 when fetching closed issues (Maximilian Antoni)
- [`f38d390`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f38d3907099c11ca810244d852f7b41cd33b4f6e)
  Add "Blocked" column to board (Maximilian Antoni)
- [`526b72d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/526b72d6323fc244b8664d0203299185f009c0ac)
  Support `design` in issue details (Maximilian Antoni)
- [`a4158dd`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a4158dd619d3af7796af5a3b57fe7e7989a35f1a)
  Add filter to closed column and improve sorting (Maximilian Antoni)
- [`30009a8`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/30009a8bf901882097f9dd4ce9805910f21db389)
  Unblock issue description editing (Maximilian Antoni)
- [`59e2f68`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/59e2f68380e95ce0925bdcef18cdec0b22617cc3)
  CLI: require --open to launch browser, also on restart (Maximilian Antoni)
- [`efcc55e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/efcc55ee5e9e48d4919a646283d8e6c6ba0ad864)
  Events: coalesce issues-changed to avoid redundant full refresh (Maximilian Antoni)
- [`d355886`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d3558866668eece4c711d94c6fda570af414eb30)
  Up/down/left/right keyboard navigation on board (Maximilian Antoni)
- [`58dbb94`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/58dbb949de662093925f4e4ed1fc170d06487252)
  Up/down keyboard navigation on issues list (Maximilian Antoni)
- [`d790387`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d79038725326edab11f674bd9713a59191112efa)
  CLI: require --open to launch browser (Maximilian Antoni)
- [`bfb2727`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/bfb2727df296bd12d4c166915484773521f498ed)
  Make issue notes editable (Maximilian Antoni)
- [`3a48009`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3a4800919bfa4ccd5eace557ae965269e0ea6e16)
  Update issues (Maximilian Antoni)
- [`46b2a34`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/46b2a344e9ac95bc8c4944a8277ea12a373c1b9a)
  Align callback function naming (Maximilian Antoni)
- [`7fcab6f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7fcab6fb26b1f2ac1a32515c2874161bc175b7dc)
  Show toast on disconnect/reconnect (Maximilian Antoni)
- [`48cfaff`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/48cfaff2d554cc7b4ae38d47277025bf6c298a84)
  Support creating a new issue via "New" dialog (Maximilian Antoni)
- [`5244153`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/524415312c4268e7e9b0dfa5355e04f03f9d95f5)
  Copy issue IDs to clipboard (Maximilian Antoni)
- [`c451963`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c451963c2c0dc22119ef17fe8486f507ea518b9a)
  Improve README (Maximilian Antoni)
- [`a60fb4a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a60fb4a08b4baea0352c408a08abd245e6b9f4be)
  Open issue details in dialog (Maximilian Antoni)
- [`796995d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/796995d4406b6450c189b4f1cdff401cc8d0f372)
  Add package description, homepage and repo (Maximilian Antoni)
- [`5ee08bf`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/5ee08bfac5bb1535e244ef36ed61f1e6492b1a3a)
  0.1.2 (Maximilian Antoni)
- [`05f06f1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/05f06f10cee04283ab75bfaeee24e7e337f702af)
  Specify files to package (Maximilian Antoni)
- [`9fa2dec`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/9fa2dec4a2cdb49c17cf9f572a61b489f67caf56)
  0.1.1 (Maximilian Antoni)
- [`40efeb5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/40efeb5beaf1fe90c364859eb36799ee289d9cfa)
  Make screenshot src absolute and add license (Maximilian Antoni)
- [`6ec912c`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6ec912c2899302b93c500d6e60f8d1fd6efc703d)
  0.1.0 (Maximilian Antoni)
- [`014df46`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/014df463836f8059c50133d6b0bfd3e00413a984)
  Use @studio/changes for changelog (Maximilian Antoni)
- [`87b3964`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/87b3964482a65f1772fe0e2dfe5a9cbe0c4c9bd3)
  Improve README (Maximilian Antoni)
- [`5fcca41`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/5fcca411654a39aad0e9c745d6fe793f0959ca88)
  Add UI/UX refinement issues (Maximilian Antoni)
- [`56da312`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/56da31203b7bb9e967b28629035ae606c87c4106)
  Agents should assign issues to "agent" (Maximilian Antoni)
- [`f5052bd`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f5052bdf81c95d30110b8152ffc27fafb0b1586c)
  Add support for labels (Maximilian Antoni)
- [`7a44b02`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7a44b02509e9515009474e2799f8c5c3db150d97)
  Update README and quickstart (Maximilian Antoni)
- [`41afd98`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/41afd989baad416bc4b14c8eff3de5d572ef494a)
  Add tests for start|stop|restart and PID handling (Maximilian Antoni)
- [`9a428d0`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/9a428d0d3bad0070e4b493c1c3db4901f1296441)
  bdui: Auto-open default browser on start (Maximilian Antoni)
- [`3155935`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/31559350a750c4411e4caea0fd0dbab656157dc0)
  bdui: Daemonize server with PID management (Maximilian Antoni)
- [`aceaff1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/aceaff17f19ce8736e26df2d36b7a98211af18be)
  bdui: Package binary and local linking (Maximilian Antoni)
- [`081d477`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/081d47738b73685585f4d9f9051dc3a3f10bf196)
  Implemented CLI scaffold for `bdui` (Maximilian Antoni)
- [`011ea22`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/011ea22b6c70150315a6753736248fd7e823ba91)
  Add issues for `bdui` command (Maximilian Antoni)
- [`7f6641a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7f6641a213a09bac31de6f1d75dd92f9026e1e4f)
  Refresh views on updates (Maximilian Antoni)
- [`61f774b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/61f774b32e95a4ddb344eed549add937f09b6c72)
  Push updates to subscribed clients (Maximilian Antoni)
- [`daef2f7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/daef2f7daaa59081a4412134dac2d48950b5c518)
  Display "no epics found" placeholder (Maximilian Antoni)
- [`b42654a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b42654af8f721036b5edc1b82481bc961d13f878)
  Filter issues by type (Maximilian Antoni)
- [`6361a1e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6361a1e9109f4f79eac0491047845002b8b1d57a)
  Add client view test (Maximilian Antoni)
- [`5e3f6fa`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/5e3f6fa78d12b3192a6ac33f1ee7e29ac75db2c8)
  Add protocol tests (Maximilian Antoni)
- [`16b83dc`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/16b83dcbb56ece4e709908b3a4e410261f61188a)
  Style tweaks and cleanup (Maximilian Antoni)
- [`c3c8ce1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c3c8ce1039dc40eb5c2c41b3f3c081d95e80c70c)
  Improve details screen (Maximilian Antoni)
- [`60aab6a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/60aab6a2cd3e02c4858765ba3946be9e63c1711b)
  Support editing issue assignee (Maximilian Antoni)
- [`f76707f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f76707f4fda5bf26e1da6fdfc7a524b6dca0641c)
  Fix same issue showing in "open" and "in progress" columns (Maximilian Antoni)
- [`6e8444d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6e8444de65de67212f0aef6234c2cd4c54a8c044)
  Fix regression on UI-84 (Maximilian Antoni)
- [`c832502`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c832502db87df64a8b4bb5a9d9901d50e16de54f)
  Merge tabs into header (Maximilian Antoni)
- [`49e89f1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/49e89f1b955a90428a42dc9fab9ef2637c03e24e)
  Board cards styling (Maximilian Antoni)
- [`ab8c2da`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/ab8c2da55909dd1c35a1783248ab100159ff546a)
  Fix board persists when switching views (Maximilian Antoni)
- [`81c5a5d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/81c5a5ddef181876785f4e4201098be0d2eca257)
  Remove redundant board title (Maximilian Antoni)
- [`d83676f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d83676f0713255acb528044252e4b450795c903d)
  Make board column fill available vertical space (Maximilian Antoni)
- [`1be97b5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/1be97b5efb70fd59e9c1b5235524455ad6852a63)
  Add "Open" column to board screen (Maximilian Antoni)
- [`b870c44`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b870c44c5b1a84127ba0d5825e6d1bdc1a28f301)
  Fix "Closed" column on board screen (Maximilian Antoni)
- [`05af890`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/05af890ef1349933667c81325d2f4c75beaae4b3)
  Align issues and epic screens (Maximilian Antoni)
- [`90ab2f7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/90ab2f7c65198902506a9d8a839c29cb6e880b0c)
  Fix status and priority in details (Maximilian Antoni)
- [`739077f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/739077f59852ff461fa4813f34700323783adb17)
  Colors (Maximilian Antoni)
- [`ff02205`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/ff02205f4cfe347df29576f9800d3a33005ddef6)
  Remove type editing (not supported by bd) (Maximilian Antoni)
- [`599d9b8`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/599d9b8d2c70231e076395aa7e25afe4e258da0c)
  Styling (Maximilian Antoni)
- [`d7fce36`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d7fce360c47dc022aacfd8e74fa965f24586e0a0)
  Epic screen improvements (Maximilian Antoni)
- [`549646d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/549646d72acdccf2087a744faf8dcf0a10900b86)
  UI consistency: IDs, translations, and epic inline editing (Maximilian Antoni)
- [`f5ab436`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f5ab4361342c80ade346dbc5e81cef2d071582f2)
  Fix showing issues (Maximilian Antoni)
- [`fd23e20`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fd23e20ae5cd9d00ebab8326ca5e50d03896cfe6)
  Improve styling (Maximilian Antoni)
- [`fe3cf9b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fe3cf9bfb6915a16a65bf37dbaa4dc24f7ac1534)
  Add board view (Maximilian Antoni)
- [`66caaa5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/66caaa56085983d04cc064a19d5ad01511a0bda3)
  Tests, typing, and docs for new UI (Maximilian Antoni)
- [`e71c155`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e71c1550c49774d8c84c3297897920260e69c308)
  Switch default port to 3000 (Maximilian Antoni)
- [`c4edee5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c4edee573e2d1334387d5637c83fe3f89490de3b)
  Top navigation and routing: Issues, Epics, Board (Maximilian Antoni)
- [`e2a4e1b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e2a4e1b37831a61a120dd3ddd4c7837145784d3d)
  Add build workflow (Maximilian Antoni)
- [`c917edf`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c917edf0f637bd576d12c02e73cd51f512ce7b91)
  Add data layer (Maximilian Antoni)
- [`639d05a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/639d05a5ae8c96ac81dfa0c7465eaecaa1172e26)
  Plan new design (Maximilian Antoni)
- [`e2e43ca`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/e2e43ca7433525c856e4b27ac44399571252f34b)
  Supress lit dev-mode warning in tests (Maximilian Antoni)
- [`fd51c2e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fd51c2ed457e1b884451da0abb9bcbc7e7291b16)
  Render with lit-html (Maximilian Antoni)
- [`d96260f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d96260f089f31b0b3e1395f50c629482ca165e58)
  Editing description not supported (Maximilian Antoni)
- [`647409a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/647409a5450e9177fc20384ab931ed1a3eeabdcc)
  Layout (Maximilian Antoni)
- [`4cafdd7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/4cafdd725c1853472e08a4c300952dfc06d9cfec)
  Fix status filter issue (Maximilian Antoni)
- [`58b6a8d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/58b6a8d4c6dd9868435ac942e01ac657c04c795a)
  Fix restore selected issue on reload (Maximilian Antoni)
- [`6045c59`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6045c59fc81d2247427b7153fba86a0ec77e3202)
  Fix restore filter on reload (Maximilian Antoni)
- [`2b81d3f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2b81d3f498071036930272b8847ecf2ac42f0d1f)
  Styling improvements and dark mode toggle (Maximilian Antoni)
- [`fa1ed07`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fa1ed07f4061204d82d583f1a51a96b5c67edb00)
  Issue type badges (Maximilian Antoni)
- [`f1599eb`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/f1599eb7a99a13937006f2750e48d52410653f60)
  Improve dependencies and dependents (Maximilian Antoni)
- [`ebc5dd9`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/ebc5dd9908095d7555f051a1c7f4c37733a62e21)
  Add "ready" filter (Maximilian Antoni)
- [`add9cc5`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/add9cc52e96231cc8094341f1d938fcc00aec3e0)
  Adjust prettier settings and re-format (Maximilian Antoni)
- [`428d912`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/428d91270aa633e20fb73afe4fe479283352d76e)
  Add README.md and docs/architecture.md (Maximilian Antoni)
- [`cdd6221`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/cdd6221d1dbffd5346a8a8c6dd9c7b0871a157fc)
  Cleanup (Maximilian Antoni)
- [`0af0810`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/0af08108baeab7b55b1613f9184127cb83129901)
  Adding Quickstart docs (Maximilian Antoni)
- [`7f169f4`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/7f169f4125bd31e3928d94e3d478927d50c57bb0)
  Add more issues (Maximilian Antoni)
- [`8e10473`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/8e10473f8a083458f5f16b2769476a208e9da66d)
  Remove unused "/src" (Maximilian Antoni)
- [`eb8b6c1`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/eb8b6c11405bcce7a6f941af04d2d462fc2476c6)
  Fix Blocks / Blocked by in UI (Maximilian Antoni)
- [`0ba7f12`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/0ba7f1226f63d5d96a4d811d7667c2aa42c5ead3)
  Add npm "all" script (Maximilian Antoni)
- [`6ffb8ed`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6ffb8edb92c33450f5c1e21b8e01dc5f1f572c17)
  No console.warn in tests (Maximilian Antoni)
- [`84ce2e7`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/84ce2e7caf3caf841fdde10814526b850c9eeb8b)
  Watch SQLite DB instead of issues.jsonl (Maximilian Antoni)
- [`2e27fb2`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/2e27fb2a3dfe104469d8b1b2ac61ce59b0d05629)
  Add unit tests for markdown util (Maximilian Antoni)
- [`6247b47`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/6247b475d46986b7a2d1fd2b3e39a8e2c8d48073)
  Markdown rendering and inline editing (Maximilian Antoni)
- [`a82b390`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a82b390c8b3e5607838332f09a93dfec9946dec9)
  Add more issues (Maximilian Antoni)
- [`22b3f89`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/22b3f898ba47479c929ab1a47d5bc83e3d9b4ba4)
  Client state store and router (Maximilian Antoni)
- [`0530c05`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/0530c0567383e9985fb4991fe266e19988104b4a)
  Vitest setup (Maximilian Antoni)
- [`77e4cb4`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/77e4cb421251a5f188ba44e0cfcf4a39e9c27cce)
  Client edit interactions (Maximilian Antoni)
- [`384d7a6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/384d7a6ddd2104e7da9005ba377305fc18558485)
  WebSocket client (Maximilian Antoni)
- [`0de5784`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/0de5784c13f55a327f039a057a6267394d3eb448)
  Issue detail view (Maximilian Antoni)
- [`b06f87a`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b06f87afb29842d6457ee165a74dc090af670097)
  Issues list view (Maximilian Antoni)
- [`992d11e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/992d11ec6ca8c6166f7125014b06ffc9b09a0844)
  App scaffolding and base styles (Maximilian Antoni)
- [`d366071`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/d36607132cd1e81558302133219c8411cdc66733)
  File watcher on .beads/issues.jsonl (Maximilian Antoni)
- [`a80a3ee`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/a80a3ee178040ffe2379c8bf49a83b6c9ba7ba2f)
  WS handlers for update/edit (Maximilian Antoni)
- [`b95cc6b`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/b95cc6bfa489121d7b3ce98cae509272be413d72)
  WS handlers for list/show (Maximilian Antoni)
- [`1dc6395`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/1dc6395259c4ec310f2329f42dfb73f4f871a6be)
  bd command runner wrapper (Maximilian Antoni)
- [`c4facf8`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c4facf8c9d257b13e56ed3326711b5323b50ffd2)
  WebSocket server with ws (Maximilian Antoni)
- [`29e9093`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/29e9093d5a219ea320b92ff4b9f5113d16172e65)
  Define WebSocket protocol and message schema (Maximilian Antoni)
- [`c774781`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/c774781035b32ed6ae87189a85f5c3faf1967584)
  Express server skeleton in /server (Maximilian Antoni)
- [`1d4c8bf`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/1d4c8bfc3558a1fe361db64bfeee165df036d7c0)
  Bootstrap Node project and tooling (Maximilian Antoni)
- [`921c8d8`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/921c8d8aa64c3c7fa12f7d3616b9c67641561286)
  Initial beads issues (Maximilian Antoni)
- [`fb6a42e`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/fb6a42edec0ba5f69436150896fb36d834a0a174)
  Add AGENTS.md (Maximilian Antoni)
- [`57d026f`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/57d026fd368b5052467a9a211a62ef5f958bdfab)
  Configure tsc (Maximilian Antoni)
- [`3268f6d`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/3268f6d9f06bca228591de237ca139b7730c8215)
  Configure prettier (Maximilian Antoni)
- [`28bc666`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/28bc6667bbdf1923a559823a20b4854f738ec383)
  Configure eslint (Maximilian Antoni)
- [`ee7e3b6`](https://github.com/AlexeyPlatkovsky/beads-enhanced-ui/commit/ee7e3b69f99e99252266cc4ebc0a46dbbaaade6b)
  Inception (Maximilian Antoni)

_Released by [Alexey Platkovsky](https://github.com/AlexeyPlatkovsky) on 2026-04-02._
