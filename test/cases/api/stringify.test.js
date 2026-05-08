import { describe, expect, test } from 'vitest';
import { esc } from '../../utils/helpers.js';

import '../../env/truecolor.js';

import ansis, { bold, green, hex, red } from 'ansis';

describe('convert function argument to string', () => {
  test(`no argument`, () => {
    const received = ansis.green();
    const expected = '';
    expect(received).toEqual(expected);
  });

  test(`undefined`, () => {
    const received = ansis.green(undefined);
    const expected = '';
    expect(received).toEqual(expected);
  });

  test(`null`, () => {
    const received = ansis.green(null);
    const expected = '';
    expect(received).toEqual(expected);
  });

  test(`undefined in template`, () => {
    let foo;
    const received = green`Hello ${red(foo)}!`;
    const expected = '\x1b[32mHello !\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`empty string`, () => {
    const received = ansis.green('');
    const expected = '';
    expect(received).toEqual(expected);
  });

  test(`true`, () => {
    const received = ansis.green(true);
    const expected = '\x1b[32mtrue\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`false`, () => {
    const received = ansis.green(false);
    const expected = '\x1b[32mfalse\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`falsy value 0`, () => {
    const received = ansis.green(0);
    const expected = '\x1b[32m0\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`NaN`, () => {
    const received = ansis.green(100 / '5px');
    const expected = '\x1b[32mNaN\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`Infinity`, () => {
    const received = ansis.green(1 / 0);
    const expected = '\x1b[32mInfinity\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`one space`, () => {
    const received = ansis.bgGreen(' ');
    const expected = '\x1b[42m \x1b[49m';
    expect(received).toEqual(expected);
  });

  test(`string`, () => {
    const received = ansis.green('green');
    const expected = '\x1b[32mgreen\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`number`, () => {
    const received = ansis.green(1974);
    const expected = '\x1b[32m1974\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`number with separator`, () => {
    const received = ansis.green(999_55);
    const expected = '\x1b[32m99955\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`float`, () => {
    const received = ansis.green(999.55);
    const expected = '\x1b[32m999.55\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`Array<number>`, () => {
    const received = ansis.green([999, 55]);
    const expected = '\x1b[32m999,55\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`Array<string>`, () => {
    const received = ansis.green(['Hello', 'world']);
    const expected = '\x1b[32mHello,world\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`Set<string>`, () => {
    const set = new Set(['Hello', 'world']);
    const received = ansis.green([...set]);
    const expected = '\x1b[32mHello,world\x1b[39m';
    expect(received).toEqual(expected);
  });
});

describe('arguments in template string', () => {
  test(`falsy value 0 in template`, () => {
    const received = ansis.green(`zero ${0} value`);
    const expected = '\x1b[32mzero 0 value\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`null in template`, () => {
    const received = ansis.green(`${null} value`);
    const expected = '\x1b[32mnull value\x1b[39m';
    expect(received).toEqual(expected);
  });
});

describe('handling numbers', () => {
  test(`ansis.bold(123)`, () => {
    const num = 123;
    const received = ansis.bold(num);
    const expected = '\x1b[1m123\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.red(123)`, () => {
    const num = 123;
    const received = ansis.red(num);
    const expected = '\x1b[31m123\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`red(123)`, () => {
    const num = 123;
    const received = red(num);
    const expected = '\x1b[31m123\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`bold(123)`, () => {
    const num = 123;
    const received = bold(num);
    const expected = '\x1b[1m123\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`red.bold(123)`, () => {
    const num = 123;
    const received = red.bold(num);
    const expected = '\x1b[31m\x1b[1m123\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`hex('#A00')(123)`, () => {
    const num = 123;
    const received = hex('#A00')(num);
    const expected = '\x1b[38;2;170;0;0m123\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('red`size: ${123}px`', () => {
    const num = 123;
    const received = red`size: ${num}px`;
    const expected = '\x1b[31msize: 123px\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.green(['foo', 'bar'])`, () => {
    const received = ansis.green(['foo', 'bar']);
    const expected = '\x1b[32mfoo,bar\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});
