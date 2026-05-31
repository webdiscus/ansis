import { expect, describe, test } from 'vitest';

// import env variables to simulate 256 colors (auto detecting)
import '../../env/ansi256-colors.js';

//import ansis from '../../../src/index.mjs'; // for debugging only
import ansis from 'ansis';

describe('color level', () => {
  test(`ansis.level`, () => {
    const received = ansis.level;
    const expected = 2;
    expect(received).toEqual(expected);
  });

  test(`use 256 colors`, () => {
    const received = ansis.hex('#00c200')`foo`;
    const expected = '\x1b[38;5;40mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });
});
