import { describe, expect, test } from 'vitest';
import {
  bumpVersion,
  extractReleaseEntry,
  hasMeaningfulReleaseNotes,
  validateReleaseNotes
} from './check-release-notes.js';

describe('check-release-notes', () => {
  test('bumps semantic versions for patch minor and major releases', () => {
    expect(bumpVersion('0.1.1', 'patch')).toBe('0.1.2');
    expect(bumpVersion('0.1.1', 'minor')).toBe('0.2.0');
    expect(bumpVersion('0.1.1', 'major')).toBe('1.0.0');
  });

  test('extracts a single release entry by version heading', () => {
    const markdown = `# Changes

## 0.1.2

Released April 15, 2026

### Fixed

- Tightened board refresh logic.

## 0.1.1

Released April 14, 2026

### Added

- Added epics layout refinements.
`;

    const entry = extractReleaseEntry(markdown, '0.1.2');
    expect(entry).toContain('Released April 15, 2026');
    expect(entry).not.toContain('## 0.1.1');
  });

  test('treats entries without bullets as empty release notes', () => {
    const entry = `## 0.1.2

Released April 15, 2026

### Added`;

    expect(hasMeaningfulReleaseNotes(entry)).toBe(false);
  });

  test('fails when target release notes are missing', () => {
    const markdown = `# Changes

## 0.1.1

Released April 15, 2026

### Fixed

- Improved issue ID rendering.
`;

    expect(() => validateReleaseNotes('patch', '0.1.1', markdown)).toThrow(
      'Release notes missing for 0.1.2 in CHANGES.md. Run the prepare-release-notes skill first.'
    );
  });

  test('passes when current release notes exist and contain bullets', () => {
    const markdown = `# Changes

## 0.1.1

Released April 15, 2026

### Changed

- Refined the epics layout.
`;

    expect(() =>
      validateReleaseNotes('current', '0.1.1', markdown)
    ).not.toThrow();
  });
});
