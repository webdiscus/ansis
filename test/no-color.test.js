import { expect, describe, test } from 'vitest';

// import env variables to simulate no color (auto detecting)
import './env/no-color.js';

//import ansis, { red } from '../src/index.mjs'; // for debugging only
import ansis, { red } from 'ansis';

describe('color level', () => {
  test(`ansis.isSupported()`, () => {
    const received = ansis.isSupported();
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`ansis.level`, () => {
    const received = ansis.level;
    const expected = 0;
    expect(received).toEqual(expected);
  });

  test(`red('foo')`, () => {
    const received = red`foo`;
    const expected = 'foo';
    console.log('=> Should be w/o color: ', received);
    expect(received).toEqual(expected);
  });
});

describe('link without color support', () => {
  test(`link('https://example.com')`, () => {
    const received = ansis.link('https://example.com');
    const expected = 'https://example.com';
    expect(received).toEqual(expected);
  });

  test(`link('Click here', 'https://example.com')`, () => {
    const received = ansis.link('Click here', 'https://example.com');
    const expected = 'Click here (​https://example.com​)';
    expect(received).toEqual(expected);
  });

  test(`blue.link('Click here', 'https://example.com')`, () => {
    const received = ansis.blue.link('Click here', 'https://example.com');
    const expected = 'Click here (​https://example.com​)';
    expect(received).toEqual(expected);
  });
});