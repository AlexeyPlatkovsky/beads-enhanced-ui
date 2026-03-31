import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getConfig } from './config.js';

describe('server/config', () => {
  const originalCwd = process.cwd;

  beforeEach(() => {
    delete process.env.PORT;
    delete process.env.HOST;
  });

  afterEach(() => {
    process.cwd = originalCwd;
  });

  test('uses defaults when env vars are missing or invalid', () => {
    process.env.PORT = 'nope';
    process.cwd = () => '/repo';

    const config = getConfig();

    expect(config.host).toBe('127.0.0.1');
    expect(config.port).toBe(3000);
    expect(config.root_dir).toBe('/repo');
    expect(config.url).toBe('http://127.0.0.1:3000');
    expect(path.basename(config.app_dir)).toBe('app');
  });

  test('uses HOST and PORT from the environment when valid', () => {
    process.env.HOST = '0.0.0.0';
    process.env.PORT = '4567';

    const config = getConfig();

    expect(config.host).toBe('0.0.0.0');
    expect(config.port).toBe(4567);
    expect(config.url).toBe('http://0.0.0.0:4567');
  });
});
