import { expect, describe, test } from 'vitest';

// import env variables to simulate truecolor (auto detecting)
import '../../env/truecolor.js';

//import ansis from '../../../src/index.mjs'; // for debugging only
import ansis from 'ansis';

describe('color level', () => {
  test(`ansis.isSupported()`, () => {
    const received = ansis.isSupported();
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`ansis.level`, () => {
    const received = ansis.level;
    const expected = 3;
    expect(received).toEqual(expected);
  });

  test(`use truecolor`, () => {
    const received = ansis.hex('#00c200')`foo`;
    const expected = '\x1b[38;2;0;194;0mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });
});
