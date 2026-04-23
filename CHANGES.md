# Changes

## 0.1.4

Released April 23, 2026

### Changed

- Changed the default local UI server port from `3000` to `3050` to reduce collisions with other dev servers.

## 0.1.3

Released April 22, 2026

### Added

- Header banner warns when the active workspace uses Dolt embedded mode, where occasional lock conflicts with external `bd` processes may occur.

### Fixed

- `bd` invocations that fail with a Dolt embedded-mode exclusive-lock error are now automatically retried with jittered backoff (up to 5 seconds), reducing transient failures during concurrent access.
- Watcher cooldown for Dolt embedded-mode increased from 5 s to 30 s to prevent lock-storm cascades after a write.

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
