import { expect, describe, test } from 'vitest';

// import env variables to simulate 16 colors (auto detecting)
import './env/ansi16-colors.js';

//import { hex, green } from '../src/index.mjs'; // for debugging only
import ansis, { hex } from 'ansis';

describe('color level', () => {
  test(`ansis.level`, () => {
    const received = ansis.level;
    const expected = 1;
    expect(received).toEqual(expected);
  });

  test(`convert truecolor to ANSI 16 colors`, () => {
    const received = hex('#FFAB40')`foo`;
    const expected = '[93mfoo[39m';
    console.log('=> Should be bright yellow: ', received);
    expect(received).toEqual(expected);
  });
});