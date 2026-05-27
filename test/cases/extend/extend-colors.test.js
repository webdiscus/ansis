import { describe, test, expect } from 'vitest';
import { esc } from '../../utils/helpers.js';

// import env variables to simulate truecolor in CLI
import '../../env/truecolor.js';

//import { Ansis } from '../../../src/index.mjs'; //  // for debugging only
import { Ansis } from 'ansis'; // test npm package

// WARNING:
// Named exports touch every base style getter on the default instance,
// which memoizes those style functions before extend() has a chance to add custom styles.
//
// The default ESM export is affected because src/index.mjs creates named exports by destructuring the default instance:
//   export const { red, bold, italic, underline, ... } = a;
//
// That destructuring reads every style getter during module initialization. Since styles are lazy and memoized on first access, all base style functions (italic, red, bold, etc.) become memoized before the user calls ansis.extend().
// Later, extend() adds new styles such as orange to the instance prototype, so newly-created chains work:
//   ansis.orange.italic('foo'); // works
//
// But already-memoized base style functions keep the old prototype and cannot see styles added later:
//   ansis.italic.orange('foo'); // does not work

describe('extend colors', () => {
  // Note: to use extended styles, create new instance of Ansis to enable using the extended color as a sub-chain item
  const ansis = new Ansis();
  const theme = ansis.extend({
    orange: '#FFAB40',
  });
  const { orange, italic } = theme;

  test(`extended color can be chained with base style`, () => {
    const received = ansis.orange.italic('foo');
    const expected = '\x1b[38;2;255;171;64m\x1b[3mfoo\x1b[23m\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`base style can be chained with extended color`, () => {
    const received = ansis.italic.orange('foo');
    const expected = '\x1b[3m\x1b[38;2;255;171;64mfoo\x1b[39m\x1b[23m';
    expect(received).toEqual(expected);
  });

  test(`destructured extended color can be chained with base style`, () => {
    const received = orange.italic('foo');
    const expected = '\x1b[38;2;255;171;64m\x1b[3mfoo\x1b[23m\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`destructured base style can be chained with extended color`, () => {
    const received = italic.orange('foo');
    const expected = '\x1b[3m\x1b[38;2;255;171;64mfoo\x1b[39m\x1b[23m';
    expect(received).toEqual(expected);
  });

  test(`extended color can be used in multi-style chain`, () => {
    const received = theme.orange.italic.underline('foo');
    const expected = '\x1b[38;2;255;171;64m\x1b[3m\x1b[4mfoo\x1b[24m\x1b[23m\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`extended color can be used as the last item in multi-style chain`, () => {
    const received = theme.italic.underline.orange('foo');
    const expected = '\x1b[3m\x1b[4m\x1b[38;2;255;171;64mfoo\x1b[39m\x1b[24m\x1b[23m';
    expect(received).toEqual(expected);
  });

  test('destructured extended color can be chained with bold', () => {
    ansis.extend({ orange: '#FFAB40' });

    const { orange } = ansis;

    const received = orange.bold('text');
    const expected = '\x1b[38;2;255;171;64m\x1b[1mtext\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('extended color can be used as a sub-chain item', () => {
    const ansis = new Ansis();
    ansis.extend({ orange: '#FFAB40' });

    const received = ansis.bold.orange('text');
    const expected = '\x1b[1m\x1b[38;2;255;171;64mtext\x1b[39m\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('single line: extended color can be used as a sub-chain item', () => {
    const ansis = new Ansis().extend({ orange: '#FFAB40' });

    const received = ansis.bold.orange('text');
    const expected = '\x1b[1m\x1b[38;2;255;171;64mtext\x1b[39m\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('extended styles after memoized base styles', () => {
  const ansis = new Ansis();

  // WARNING:
  // Accessing a base style before extend() memoizes that style function.
  // That memoized function cannot see styles added later by extend().
  // Avoid pre-accessing base styles if extended styles must be available as sub-chain items:
  //   ansis.italic('debug');

  ansis.extend({
    orange: '#FFAB40',
  });

  // OK
  test(`extended color can still be chained with base style`, () => {
    const received = ansis.orange.italic('foo');
    const expected = '\x1b[38;2;255;171;64m\x1b[3mfoo\x1b[23m\x1b[39m';
    expect(received).toEqual(expected);
  });

  // FAIL if used ansis.italic() before extend()
  test(`memoized base style cannot be chained with extended color`, () => {
    const received = ansis.italic.orange('foo');
    const expected = '\x1b[3m\x1b[38;2;255;171;64mfoo\x1b[39m\x1b[23m';
    expect(received).toEqual(expected);
  });
});