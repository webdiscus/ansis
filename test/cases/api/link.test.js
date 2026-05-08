import { describe, expect, test } from 'vitest';

import '../../env/truecolor.js';

import ansis, { blue, link } from 'ansis';

describe('link', () => {
  test(`ansis.link('https://example.com')`, () => {
    const received = ansis.link('https://example.com');
    const expected = ']8;;https://example.comhttps://example.com]8;;';
    expect(received).toEqual(expected);
  });

  test(`ansis.link('https://example.com', 'Click here')`, () => {
    const received = ansis.link('https://example.com', 'Click here');
    const expected = ']8;;https://example.comClick here]8;;';
    expect(received).toEqual(expected);
  });

  test(`ansis.blue.link('https://example.com', 'Click here')`, () => {
    const received = ansis.blue.link('https://example.com', 'Click here');
    const expected = '[34m]8;;https://example.comClick here]8;;[39m';
    expect(received).toEqual(expected);
  });

  test(`link('https://example.com')`, () => {
    const received = link('https://example.com');
    const expected = ']8;;https://example.comhttps://example.com]8;;';
    expect(received).toEqual(expected);
  });

  test(`blue.link('https://example.com', 'Click here')`, () => {
    const received = blue.link('https://example.com', 'Click here');
    const expected = '[34m]8;;https://example.comClick here]8;;[39m';
    expect(received).toEqual(expected);
  });
});
