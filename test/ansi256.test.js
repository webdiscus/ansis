import { expect, describe, test } from 'vitest';
import { esc } from './utils/helpers.js';

// import env variables to simulate ANSI 256 color space
import './env/color-space.ansi256.js';

//import { hex, ansi256 } from '../src/index.mjs'; // for debugging only
import { hex, ansi256 } from 'ansis';

describe('color space', () => {
  test(`convert truecolor to ANSI 256 color space`, () => {
    const received = hex('#00c200')`foo bar`;
    const expected = ansi256(40)`foo bar`;
    expect(esc(received)).toEqual(esc(expected));
  });
});