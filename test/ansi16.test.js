import { expect, describe, test } from 'vitest';
import { esc } from './utils/helpers.js';

// import env variables to simulate ANSI 16 color space
import './env/color-space.ansi16.js';

//import { hex, green } from '../src/index.mjs'; // for debugging only
import { hex, green } from 'ansis';

describe('color space', () => {
  test(`convert truecolor to ANSI 16 color space`, () => {
    const received = hex('#00c200')`foo bar`;
    const expected = green`foo bar`;
    expect(esc(received)).toEqual(esc(expected));
  });
});