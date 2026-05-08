import { describe, expect, test } from 'vitest';
import { esc } from '../../utils/helpers.js';

import '../../env/truecolor.js';

import ansis, { gray, green, italic, red, underline, yellow } from 'ansis';

describe('escape sequences in template literals', () => {
  test(`Newline escape`, () => {
    const received = ansis.red`foo\nbar`;
    const expected = ansis.red(`foo\nbar`);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Newline not escape, prev\nnext`, () => {
    const received = ansis.red`prev\nnext`;
    const expected = ansis.red('prev\nnext');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Newline escape, prev\\next`, () => {
    const received = ansis.red`prev\\next`;
    const expected = ansis.red('prev\\next');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Newline escape, \\north`, () => {
    const received = ansis.red`\\north`;
    const expected = ansis.red(`\\north`);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Tab escape`, () => {
    const received = ansis.red`foo\tbar`;
    const expected = ansis.red(`foo\tbar`);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Identity (pointless) escape`, () => {
    const received = ansis.red`\p`;
    const expected = ansis.red(`\p`);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Backslash escape`, () => {
    const received = ansis.red`\\`;
    const expected = ansis.red(`\\`);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Escape Sequence`, () => {
    const received = ansis.green`\\new\\next\\tab`;
    const expected = '\x1b[32m\\new\\next\\tab\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Not Escape Sequence`, () => {
    const received = ansis.green`\nnew\nnext\ttab`;
    const expected = '\x1b[32m\x1b[39m\n' +
      '\x1b[32mnew\x1b[39m\n' +
      '\x1b[32mnext\ttab\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('template literals', () => {
  test('ansis.red`red`', () => {
    const received = ansis.red`red`;
    const expected = '\x1b[31mred\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('red.underline`foo`', () => {
    const received = red.underline`foo`;
    const expected = '\x1b[31m\x1b[4mfoo\x1b[24m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('red`red ${green`green`} red`', () => {
    const received = red`red ${green`green`} red`;
    const expected = '\x1b[31mred \x1b[32mgreen\x1b[31m red\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('red`red ${yellow`yellow ${green`green`} yellow`} red`', () => {
    const received = red`red ${yellow`yellow ${green`green`} yellow`} red`;
    const expected = '\x1b[31mred \x1b[33myellow \x1b[32mgreen\x1b[33m yellow\x1b[31m red\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('nested gray.underline and gray', () => {
    const received = red`red ${gray.underline`gray ${yellow`yellow ${gray.italic`gray ${green`green`} gray`} yellow`} gray`} red`;
    const expected = '\x1b[31mred \x1b[90m\x1b[4mgray \x1b[33myellow \x1b[90m\x1b[3mgray \x1b[32mgreen\x1b[90m gray\x1b[23m\x1b[33m yellow\x1b[90m gray\x1b[24m\x1b[31m red\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('nested underline.gray and gray', () => {
    const received = red`red ${underline.gray`gray ${yellow`yellow ${italic.gray`gray ${green`green`} gray`} yellow`} gray`} red`;
    const expected = '\x1b[31mred \x1b[4m\x1b[90mgray \x1b[33myellow \x1b[3m\x1b[90mgray \x1b[32mgreen\x1b[90m gray\x1b[33m\x1b[23m yellow\x1b[90m gray\x1b[31m\x1b[24m red\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`visible with template literal`, () => {
    const received = ansis.visible`foo ${green`bar ${red`baz`} bar`} foo`;
    const expected = 'foo \x1b[32mbar \x1b[31mbaz\x1b[32m bar\x1b[39m foo';
    expect(esc(received)).toEqual(esc(expected));
  });
});
