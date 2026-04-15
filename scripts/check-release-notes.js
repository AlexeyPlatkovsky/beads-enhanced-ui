#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const PACKAGE_JSON = path.join(ROOT, 'package.json');
const CHANGES_MD = path.join(ROOT, 'CHANGES.md');

/**
 * @param {string} version
 */
export function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version.trim());
  if (!match) {
    throw new Error(`Unsupported version format: ${version}`);
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3])
  };
}

/**
 * @param {string} version
 * @param {'patch'|'minor'|'major'} releaseType
 */
export function bumpVersion(version, releaseType) {
  const parsed = parseVersion(version);
  if (releaseType === 'patch') {
    return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
  }
  if (releaseType === 'minor') {
    return `${parsed.major}.${parsed.minor + 1}.0`;
  }
  if (releaseType === 'major') {
    return `${parsed.major + 1}.0.0`;
  }
  throw new Error(`Unsupported release type: ${releaseType}`);
}

/**
 * @param {string} markdown
 * @param {string} version
 */
export function extractReleaseEntry(markdown, version) {
  const lines = markdown.split(/\r?\n/);
  const heading = `## ${version}`;
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start === -1) {
    return null;
  }

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (lines[i].startsWith('## ')) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

/**
 * @param {string | null} entry
 */
export function hasMeaningfulReleaseNotes(entry) {
  if (!entry) {
    return false;
  }
  return entry.split(/\r?\n/).some((line) => /^- /.test(line.trim()));
}

/**
 * @param {string} mode
 * @param {string} currentVersion
 */
export function resolveTargetVersion(mode, currentVersion) {
  if (mode === 'current') {
    return currentVersion;
  }
  if (mode === 'patch' || mode === 'minor' || mode === 'major') {
    return bumpVersion(currentVersion, mode);
  }
  throw new Error(`Unsupported mode: ${mode}`);
}

/**
 * @param {string} mode
 * @param {string} currentVersion
 * @param {string} changesText
 */
export function validateReleaseNotes(mode, currentVersion, changesText) {
  const targetVersion = resolveTargetVersion(mode, currentVersion);
  const entry = extractReleaseEntry(changesText, targetVersion);
  if (!entry) {
    throw new Error(
      `Release notes missing for ${targetVersion} in CHANGES.md. Run the prepare-release-notes skill first.`
    );
  }
  if (!hasMeaningfulReleaseNotes(entry)) {
    throw new Error(
      `Release notes are empty for ${targetVersion} in CHANGES.md. Run the prepare-release-notes skill first.`
    );
  }
}

function main() {
  const mode = process.argv[2];
  if (!mode) {
    process.stderr.write(
      'Usage: node scripts/check-release-notes.js <current|patch|minor|major>\n'
    );
    process.exitCode = 1;
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  const currentVersion = String(packageJson.version || '').trim();
  const changesText = fs.readFileSync(CHANGES_MD, 'utf8');

  try {
    validateReleaseNotes(mode, currentVersion, changesText);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Release notes validation failed';
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
