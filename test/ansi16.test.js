import { expect, describe, test } from 'vitest';
import { esc } from './utils/helpers.js';

// import env variables to simulate ANSI 16 colors
import './env/ansi16-colors.js';

//import { hex, green } from '../src/index.mjs'; // for debugging only
import { hex, green } from 'ansis';

describe('color level', () => {
  test(`convert truecolor to ANSI 16 colors`, () => {
    const received = hex('#00c200')`foo`;
    const expected = green`foo`;
    console.log('=> Should be green: ', received);
    expect(esc(received)).toEqual(esc(expected));
  });
});