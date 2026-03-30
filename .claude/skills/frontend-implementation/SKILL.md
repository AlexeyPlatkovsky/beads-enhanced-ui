---
name: frontend-implementation
description:
  Implementing or updating browser UI code under app/ and app/views/ for this
  project. Use when changing rendered markup, interactive controls, dialogs,
  view composition, or frontend-facing behavior in the Beads UI. Do not use
  for Pencil design-only work.
---

## Scope

Use this skill for code changes in:

- `app/views/**`
- `app/main.js`
- `app/router.js`
- `app/state.js`
- `app/ws.js`
- closely related `app/utils/**` helpers that directly support rendered UI

Do not use it for:

- Pencil-only design work; use `designer`
- non-trivial shared refactors without also using `refactor-code`
- test-only work without frontend code changes

## Workflow

1. Read the existing view/module and the nearest colocated tests before editing.
2. Preserve existing lit-html, vanilla JS, and view composition patterns unless
   the task explicitly changes them.
3. Keep changes local to the affected view or shared renderer when possible.
4. If the change is non-trivial, also use `refactor-code`.
5. If tests are added or updated, also use `write-test`.
6. After edits, use `validate` to pick the narrowest meaningful checks.
7. If the change can affect visible UI, finish with `playwright-cli`
   verification against the affected view or interaction as the last step
   before handoff.

## Test IDs

Add stable `data-testid` attributes to significant rendered elements and
primary controls in any frontend code you add or materially change.

Use these rules:

- Use `data-testid`, never `testid`, `test-id`, or new alternate forms.
- Prefer view-scoped kebab-case names such as `list-view`,
  `detail-status-select`, `board-column-ready`.
- For repeated or dynamic entities, include the entity id in the value, such as
  `issue-row-UI-12`, `board-card-UI-12`, `epic-group-UI-12`.
- Cover significant structure and user-facing controls:
  view roots, tables, headers, rows/cards, dialogs, forms, key inputs, primary
  actions, sort/filter controls, and expandable sections.
- Do not add IDs to every decorative wrapper. Favor stable test surfaces over
  noisy markup.
- When touching an older area that uses `testid` or `test-id`, prefer moving
  the changed code toward `data-testid` instead of extending the older pattern.

## Accessibility And Interaction

- Preserve existing keyboard and focus behavior.
- Keep ARIA labels and roles aligned with visible controls.
- Avoid introducing test IDs in a way that changes semantics or event flow.

## Tests

- Update existing view tests when new `data-testid` hooks are intended to be
  stable test surfaces.
- Prefer assertions against the new stable hooks over brittle selector chains
  when the element is a primary interaction point.

## Table Layout: Header-Row Alignment

For any view that renders grouped rows inside a `table-layout: fixed` table
(e.g., Epics), always use **actual `<td>` cells** on the grouped row — never a
single `<td colspan="N">` containing an internal CSS grid.

### Why

A `colspan` + CSS grid requires manual width mirroring between `<colgroup>`
values and grid-template-columns. Any column-width change breaks the other side
silently. Using real cells lets the table engine handle alignment — the same
engine that positions the `<thead>` cells.

### How

Match the `<thead>` column-span structure exactly in the grouped row:

```html
<!-- thead -->
<tr>
  <th>Id</th>                          <!-- col 1 -->
  <th colspan="2">Name</th>            <!-- cols 2+3 -->
  <th>Status</th>                      <!-- col 4 -->
  <th colspan="2">Progress</th>        <!-- cols 5+6 -->
</tr>

<!-- grouped epic row — same spans, guaranteed alignment -->
<tr class="epic-header-row" tabindex="0" aria-expanded="false" @click="...">
  <td class="epic-header-row__cell epic-header-row__cell--id">…</td>
  <td class="epic-header-row__cell epic-header-row__cell--name" colspan="2">…</td>
  <td class="epic-header-row__cell epic-header-row__cell--status">…</td>
  <td class="epic-header-row__cell epic-header-row__cell--progress" colspan="2">…</td>
</tr>
```

### Card appearance with `border-collapse: separate`

The table already uses `border-collapse: separate`. With that, apply borders
selectively so adjacent cells form a seamless card:

```css
.epic-header-row__cell {
  border-top: 1px solid var(--border-row);
  border-bottom: 1px solid var(--border-row);
  /* no left/right on interior cells — border-spacing: 0 keeps them flush */
}
.epic-header-row__cell:first-child {
  border-left: 1px solid var(--border-row);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.epic-header-row__cell:last-child {
  border-right: 1px solid var(--border-row);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
/* Flatten bottom radius when a children row follows */
.epic-group.is-open .epic-header-row__cell:first-child { border-bottom-left-radius: 0; }
.epic-group.is-open .epic-header-row__cell:last-child  { border-bottom-right-radius: 0; }
```

### Interactive row

Put `@click`, `@keydown`, `tabindex="0"`, and `aria-expanded` on the `<tr>`.
Do **not** add `role="button"` — it removes the native `row` semantics. The
`cursor: pointer` CSS communicates interactivity.

Flex content inside a cell (e.g., chevron + title) goes in an inner `<span>`
with `display: flex; align-items: center` — not on the `<td>` itself, which
must stay `display: table-cell`.

### Verify class names before making CSS tweaks

Before making any targeted CSS change to the epic header row, **read the JS
first** and verify the class names in `epics.js` match the BEM names documented
here (`epic-header-row`, `epic-header-row__cell`, `epic-header-row__cell--*`).
If the JS uses stale class names (e.g., `epic-header`, `epic-header__cell`,
`epic-header__meta`), rename them to match the canonical BEM names first — then
make the CSS change. Skipping this step means the CSS selector targets nothing
and the visual fix silently has no effect.

## Coordination

- `designer`: design-only work in Pencil; no code.
- `refactor-code`: required for non-trivial shared frontend changes.
- `write-test`: how to structure and place tests.
- `validate`: what checks to run.
- `playwright-cli`: required as the last verification step for any change that
  can affect visible UI; otherwise use it when browser verification is needed.
