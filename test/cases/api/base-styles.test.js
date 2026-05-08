import { describe, expect, test } from 'vitest';
import { esc } from '../../utils/helpers.js';

import '../../env/truecolor.js';

import ansis from 'ansis';

describe('base styles', () => {
  test(`dim`, () => {
    const received = ansis.dim('foo');
    const expected = '\x1b[2mfoo\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`bold`, () => {
    const received = ansis.bold('foo');
    const expected = '\x1b[1mfoo\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`nesting dim and bold`, () => {
    const received = ansis.bold('bold ' + ansis.dim('bold and dim') + ' bold');
    const expected = '\x1b[1mbold \x1b[2mbold and dim\x1b[1m bold\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`italic`, () => {
    const received = ansis.italic('foo');
    const expected = '\x1b[3mfoo\x1b[23m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`underline`, () => {
    const received = ansis.underline('foo');
    const expected = '\x1b[4mfoo\x1b[24m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`strikethrough`, () => {
    const received = ansis.strikethrough('foo');
    const expected = '\x1b[9mfoo\x1b[29m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`inverse`, () => {
    const received = ansis.inverse('foo');
    const expected = '\x1b[7mfoo\x1b[27m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`visible`, () => {
    const received = ansis.visible('foo');
    const expected = 'foo';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`hidden`, () => {
    const received = ansis.hidden('foo');
    const expected = '\x1b[8mfoo\x1b[28m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`reset fn`, () => {
    const received = ansis.reset();
    const expected = '\x1b[0m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`reset in middle`, () => {
    const received = ansis.red('red ' + ansis.reset.underline('underline') + ' text');
    const expected = '\x1b[31mred \x1b[0m\x1b[4munderline\x1b[24m\x1b[0m text\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`reset in middle only`, () => {
    const { red } = ansis;
    const received = red`red ${red.reset.underline`underline`} red`;
    const expected = '\x1b[31mred \x1b[31m\x1b[0m\x1b[4munderline\x1b[24m\x1b[0m\x1b[31m red\x1b[39m';

    expect(received).toEqual(expected);
  });
});
