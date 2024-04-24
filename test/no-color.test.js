import { expect, describe, test } from 'vitest';

// import env variables to simulate no color
import './env/color-space.mono.js';

import ansis, { red } from '../src/index.mjs';

describe('color space', () => {
  test(`ansis.isSupported()`, () => {
    const received = ansis.isSupported();
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`red('foo')`, () => {
    const received = red`foo`;
    const expected = 'foo';
    expect(received).toEqual(expected);
  });
});