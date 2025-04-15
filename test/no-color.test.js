import { expect, describe, test } from 'vitest';

// import env variables to simulate no color
import './env/mono-color.js';

//import ansis, { red } from '../src/index.mjs'; // for debugging only
import ansis, { red } from 'ansis';

describe('color level', () => {
  test(`ansis.isSupported()`, () => {
    const received = ansis.isSupported();
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`red('foo')`, () => {
    const received = red`foo`;
    const expected = 'foo';
    console.log('=> Should be w/o color: ', received);
    expect(received).toEqual(expected);
  });
});