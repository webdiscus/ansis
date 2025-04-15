import { expect, describe, test } from 'vitest';
import { esc } from './utils/helpers.js';

// import env variables to simulate ANSI 256 colors
import './env/ansi256-colors.js';

//import { hex, ansi256 } from '../src/index.mjs'; // for debugging only
import { hex, ansi256 } from 'ansis';

describe('color level', () => {
  test(`convert truecolor to ANSI 256 colors`, () => {
    const received = hex('#00c200')`foo`;
    const expected = ansi256(40)`foo`;
    expect(esc(received)).toEqual(esc(expected));
  });
});