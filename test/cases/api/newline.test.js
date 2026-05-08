import { describe, expect, test } from 'vitest';
import { esc } from '../../utils/helpers.js';

import '../../env/truecolor.js';

import ansis from 'ansis';

describe('using newline', () => {
  test(`new line CRLF, windows`, () => {
    const received = ansis.green('Hello\r\nWorld');
    const expected = '\x1b[32mHello\x1b[39m\r\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`newline LF, linux `, () => {
    const received = ansis.green('Hello\nWorld');
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`newline LF in template string`, () => {
    const received = ansis.green`Hello
World`;
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`newline in template string`, () => {
    const received = ansis.green`Hello\nWorld`;
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`newline in function used template string`, () => {
    const received = ansis.green(`Hello\nWorld`);
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`newline as expression in template string`, () => {
    const received = ansis.green`Hello${'\n'}World`;
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`linux new line LF, background`, () => {
    const received = ansis.bgGreen(' Hello \n World ');
    const expected = '\x1b[42m Hello \x1b[49m\n\x1b[42m World \x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`multiple new line`, () => {
    const received = ansis.bgGreen(`\nHello\nNew line\nNext new line.\n`);
    const expected = `\x1b[42m\x1b[49m
\x1b[42mHello\x1b[49m
\x1b[42mNew line\x1b[49m
\x1b[42mNext new line.\x1b[49m
\x1b[42m\x1b[49m`;
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`multiple new line, template strings`, () => {
    const received = ansis.bgGreen`\nHello\nNew line\nNext new line.\n`;
    const expected = `\x1b[42m\x1b[49m
\x1b[42mHello\x1b[49m
\x1b[42mNew line\x1b[49m
\x1b[42mNext new line.\x1b[49m
\x1b[42m\x1b[49m`;
    expect(esc(received)).toEqual(esc(expected));
  });
});
