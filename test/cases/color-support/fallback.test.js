import { expect, describe, test } from 'vitest';

import colorNames from 'css-color-names';
import { Ansis } from 'ansis';

describe('color fallback', () => {
  test(`truecolor -> 256`, () => {
    const ansis = new Ansis(2);

    const received = ansis.hex('#00c200')`foo`;
    const expected = '\x1b[38;5;40mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`truecolor -> 16`, () => {
    const ansis = new Ansis(1);

    const received = ansis.hex('#00c200')`foo`;
    const expected = '\x1b[32mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`truecolor -> BW`, () => {
    const ansis = new Ansis(0);

    const received = ansis.hex('#00c200')`foo`;
    const expected = 'foo';
    expect(received).toEqual(expected);
  });

  test(`256 -> 16`, () => {
    const ansis = new Ansis(1);

    const received = ansis.fg(40)('foo');
    const expected = '\x1b[32mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`254 -> BW`, () => {
    const ansis = new Ansis(0);

    const received = ansis.fg(254)('foo');
    const expected = 'foo';
    expect(received).toEqual(expected);
  });

  test(`16 -> BW`, () => {
    const ansis = new Ansis(0);

    const received = ansis.red('foo');
    const expected = 'foo';
    expect(received).toEqual(expected);
  });

  test(`many color levels at the same time`, () => {
    const ansis0 = new Ansis(0); // no color
    const ansis1 = new Ansis(1); // 16 colors
    const ansis2 = new Ansis(2); // 256 colors
    const ansis3 = new Ansis(3); // truecolor

    expect(ansis0.hex('#00c200')`foo`).toEqual('foo');
    expect(ansis1.hex('#00c200')`foo`).toEqual('\x1b[32mfoo\x1b[39m');
    expect(ansis2.hex('#00c200')`foo`).toEqual('\x1b[38;5;40mfoo\x1b[39m');
    expect(ansis3.hex('#00c200')`foo`).toEqual('\x1b[38;2;0;194;0mfoo\x1b[39m');
  });
});

describe('color fallback preserves matching levels', () => {
  test(`truecolor -> truecolor`, () => {
    const ansis = new Ansis(3);

    const received = ansis.hex('#00c200')`foo`;
    const expected = '\x1b[38;2;0;194;0mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`256 -> 256`, () => {
    const ansis = new Ansis(2);

    const received = ansis.fg(40)('foo');
    const expected = '\x1b[38;5;40mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`16 -> 16`, () => {
    const ansis = new Ansis(1);

    const received = ansis.red('foo');
    const expected = '\x1b[31mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`BW -> BW`, () => {
    const ansis = new Ansis(0);

    const received = ansis.red('foo');
    const expected = 'foo';
    expect(received).toEqual(expected);
  });
});

describe('named color fallback', () => {
  const ansis16m = new Ansis(3); // force init with truecolor
  const ansis256 = new Ansis(2); // force init with 256 colors
  const ansis16 = new Ansis(1); // force init with 16 colors
  const ansisBW = new Ansis(0); // force init with black & white

  test('original orange color', () => {
    const color = ansis16m.extend(colorNames);
    const received = color.orange('orange');
    const expected = '\x1b[38;2;255;165;0morange\x1b[39m';
    expect(received).toEqual(expected);
  });

  test('original bgOrange color', () => {
    const color = ansis16m.extend(colorNames);
    const received = color.bgOrange('orange');
    const expected = '\x1b[48;2;255;165;0morange\x1b[49m';
    expect(received).toEqual(expected);
  });

  test('fallback orange to 256 colors', () => {
    const color = ansis256.extend(colorNames);
    const received = color.orange('orange');
    const expected = '\x1b[38;5;214morange\x1b[39m';
    expect(received).toEqual(expected);
  });

  test('fallback bgOrange to 256 colors', () => {
    const color = ansis256.extend(colorNames);
    const received = color.bgOrange('orange');
    const expected = '\x1b[48;5;214morange\x1b[49m';
    expect(received).toEqual(expected);
  });

  test('fallback orange to 16 colors', () => {
    const color = ansis16.extend(colorNames);
    const received = color.orange('orange');
    const expected = '\x1b[93morange\x1b[39m';
    expect(received).toEqual(expected);
  });

  test('fallback bgOrange to 16 colors', () => {
    const color = ansis16.extend(colorNames);
    const received = color.bgOrange('orange');
    const expected = '\x1b[103morange\x1b[49m';
    expect(received).toEqual(expected);
  });

  test('fallback orange to BW colors', () => {
    const color = ansisBW.extend(colorNames);
    const received = color.orange('orange');
    const expected = 'orange';
    expect(received).toEqual(expected);
  });

  test('fallback bgOrange to BW colors', () => {
    const color = ansisBW.extend(colorNames);
    const received = color.bgOrange('orange');
    const expected = 'orange';
    expect(received).toEqual(expected);
  });
});
