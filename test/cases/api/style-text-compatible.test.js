import { describe, expect, test } from 'vitest';
import { esc } from '../../utils/helpers.js';

import '../../env/truecolor.js';

import ansis from 'ansis';

describe('styleText syntax', () => {
  const styleText = (format, text) =>
    (Array.isArray(format)
        ? format.reduce((style, name) => style[name], ansis)
        : ansis[format]
    )(text);

  test(`single style`, () => {
    const received = styleText('red', 'foo');
    const expected = '\x1b[31mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`single style as array`, () => {
    const received = styleText(['red'], 'foo');
    const expected = '\x1b[31mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`multiple style`, () => {
    const received = styleText(['red', 'bold'], 'foo');
    const expected = '\x1b[31m\x1b[1mfoo\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});
