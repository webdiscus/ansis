import { describe, expect, test } from 'vitest';
import { esc } from '../utils/helpers.js';

import '../env/truecolor.js';

import ansis from 'ansis';

describe('custom theme', () => {
  const theme = {
    info: ansis.green,
    warn: ansis.yellow,
    error: ansis.red,
  };

  test(`theme.info('info')`, () => {
    const received = theme.info('info');
    const expected = '\x1b[32minfo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`theme.warn('warn')`, () => {
    const received = theme.warn('warn');
    const expected = '\x1b[33mwarn\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`theme.error('error')`, () => {
    const received = theme.error('error');
    const expected = '\x1b[31merror\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});
