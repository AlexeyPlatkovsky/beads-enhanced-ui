# Changes

## 0.1.2

Released April 15, 2026

### Fixed

- Reduced Dolt workspace lock contention by skipping `bd --sandbox` where it does not help and by coalescing watcher-triggered refreshes during backend file churn.

## 0.1.1

Released April 02, 2026

### Changed

- Refined the Epics experience with a redesigned layout, updated spacing, and clearer title and status alignment across the view.
- Tightened issue ID rendering across the UI so Beads IDs display consistently in lists, rows, and issue dialogs.
- Rebranded the fork as `beads-enhanced-ui` and updated package metadata for publishing and installation under the new name.

### Fixed

- Fixed Epics sorting, row sizing, and column width regressions that made the page harder to scan.
- Fixed the issues table ID cell rendering so Beads identifiers stay readable and aligned in the main list view.
