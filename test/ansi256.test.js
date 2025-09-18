import { expect, describe, test } from 'vitest';

// import env variables to simulate 256 colors (auto detecting)
import './env/ansi256-colors.js';

//import ansis, { Ansis } from '../src/index.mjs'; // for debugging only
import ansis, { Ansis } from 'ansis';

describe('color level', () => {
  test(`ansis.level`, () => {
    const received = ansis.level;
    const expected = 2;
    expect(received).toEqual(expected);
  });

  test(`fallback to 256 colors`, () => {
    const received = ansis.hex('#00c200')`foo`;
    const expected = '[38;5;40mfoo[39m';
    expect(received).toEqual(expected);
  });

  test(`force use truecolor`, () => {
    const ansis = new Ansis(3);

    const received = ansis.hex('#00c200')`foo`;
    const expected = '[38;2;0;194;0mfoo[39m';
    expect(received).toEqual(expected);
  });

  test(`force use 256 colors`, () => {
    const ansis = new Ansis(2);

    const received = ansis.hex('#00c200')`foo`;
    const expected = '[38;5;40mfoo[39m';
    expect(received).toEqual(expected);
  });

  test(`force use 16 colors`, () => {
    const ansis = new Ansis(1);

    const received = ansis.hex('#00c200')`foo`;
    const expected = '[32mfoo[39m';
    expect(received).toEqual(expected);
  });

  test(`force disable colors`, () => {
    const ansis = new Ansis(0);

    const received = ansis.hex('#00c200')`foo`;
    const expected = 'foo';
    expect(received).toEqual(expected);
  });

  test(`many color levels at the same time`, () => {
    const ansis0 = new Ansis(0); // no color
    const ansis1 = new Ansis(1); // 16 colors
    const ansis2 = new Ansis(2); // 256 colors
    const ansis3 = new Ansis(3); // truecolor

    expect(ansis0.hex('#00c200')`foo`).toEqual('foo');
    expect(ansis1.hex('#00c200')`foo`).toEqual('[32mfoo[39m');
    expect(ansis2.hex('#00c200')`foo`).toEqual('[38;5;40mfoo[39m');
    expect(ansis3.hex('#00c200')`foo`).toEqual('[38;2;0;194;0mfoo[39m');
  });
});