import { describe, expect, test } from 'vitest';
import { esc } from '../../utils/helpers.js';

import '../../env/truecolor.js';

import ansis, { hex } from 'ansis';

describe('color functions', () => {
  test(`ansis.rgb(80, 100, 150)`, () => {
    const received = ansis.rgb(80, 100, 150)('foo');
    const expected = '\x1b[38;2;80;100;150mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.bgRgb(80, 100, 150)`, () => {
    const received = ansis.bgRgb(80, 100, 150)('foo');
    const expected = '\x1b[48;2;80;100;150mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.hex('#ABC')`, () => {
    const received = ansis.hex('#ABC')('foo');
    const expected = '\x1b[38;2;170;187;204mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.bgHex('#ABC123')`, () => {
    const received = ansis.bgHex('#ABC123')('foo');
    const expected = '\x1b[48;2;171;193;35mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`hex() Truecolor samples`, () => {
    const received = `${hex('#FF701F')`Orange`}, ${hex('#FF007F')`Rose`}, ${hex('#5C0120')`Bordeaux`}`;
    const expected = '\x1b[38;2;255;112;31mOrange\x1b[39m, \x1b[38;2;255;0;127mRose\x1b[39m, \x1b[38;2;92;1;32mBordeaux\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.fg(97)`, () => {
    const received = ansis.fg(97)('foo');
    const expected = '\x1b[38;5;97mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.bg(97)`, () => {
    const received = ansis.bg(97)('foo');
    const expected = '\x1b[48;5;97mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

});

describe('strip', () => {
  test(`ansis.strip() red`, () => {
    const received = ansis.strip('Hello \x1b[31mWorld\x1b[0m!');
    const expected = 'Hello World!';
    expect(received).toEqual(expected);
  });

  test(`ansis.strip() red.bold.underline`, () => {
    //const str = ansis.red.bold.underline('red.bold.underline');
    const str = '\x1b[31m\x1b[1m\x1b[4mred.bold.underline\x1b[24m\x1b[22m\x1b[39m';
    const received = ansis.strip(str);
    const expected = 'red.bold.underline';
    expect(received).toEqual(expected);
  });

  test(`ansis.strip() foo red bar bold baz`, () => {
    //const str = `foo ${ansis.red`red`} bar ${ansis.bold`bold`} baz`;
    const str = 'foo \x1b[31mred\x1b[39m bar \x1b[1mbold\x1b[22m baz';
    const received = ansis.strip(str);
    const expected = 'foo red bar bold baz';
    expect(received).toEqual(expected);
  });

  test(`ansis.strip() OSC 8 hyperlink`, () => {
    const str = ansis.link('https://example.com', 'Click here');
    const received = ansis.strip(str);
    const expected = 'Click here';
    expect(received).toEqual(expected);
  });

  test(`ansis.strip() styled OSC 8 hyperlink`, () => {
    const str = ansis.blue.link('https://example.com', 'Click here');
    const received = ansis.strip(str);
    const expected = 'Click here';
    expect(received).toEqual(expected);
  });

  test.each([
    ['BEL', '\x07', '\x07'],
    ['ST', '\x1b\\', '\x1b\\'],
    ['ST/BEL', '\x1b\\', '\x07'],
    ['BEL/ST', '\x07', '\x1b\\'],
  ])(`ansis.strip() OSC 8 hyperlink terminated with %s`, (_, openEnd, closeEnd) => {
    const str = `\x1b[34mBefore \x1b]8;id=docs;https://example.com${openEnd}Click here\x1b]8;;${closeEnd} after\x1b[39m`;
    expect(ansis.strip(str)).toEqual('Before Click here after');
  });

  test(`ansis.strip() adjacent OSC 8 hyperlinks`, () => {
    const str = '\x1b]8;;https://example.com/one\x1b\\One\x1b]8;;\x1b\\ / \x1b]8;;https://example.com/two\x07Two\x1b]8;;\x07';
    expect(ansis.strip(str)).toEqual('One / Two');
  });

  test(`ansis.strip() ST-terminated window title`, () => {
    const str = 'Before \x1b]0;Window title\x1b\\after';
    expect(ansis.strip(str)).toEqual('Before after');
  });

  test(`ansis.strip() incomplete OSC sequence`, () => {
    const str = 'Before \x1b]8;;https://example.com';
    expect(ansis.strip(str)).toEqual(str);
  });
});
