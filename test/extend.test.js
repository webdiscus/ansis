import { describe, test, expect } from 'vitest';

// import env variables to simulate truecolor in CLI
import './env/truecolor.js';

import ansis, { Ansis, red, yellow, green, gray, bold, italic, underline, hex } from '../src/index.mjs'; //  // for debugging only
//import ansis, { Ansis, red, gray, green, yellow, bold, italic, underline, hex } from 'ansis'; // test npm package

describe('extend experimental', () => {
  test('myTheme', () => {
    const LOG = true; // see output
    const debug = (...args) => LOG && console.log(...args);

    const myTheme = ansis.extend({
      info: (text) => ansis.cyan`ℹ ${text}`,
      success: (text) => ansis.green`✓ ${text}!`,
      failure: (text) => ansis.red`✗ ${text}!`,
      warning: (text) => ansis.yellow`⚠ ${text}!`,
      list: (text) => ansis.white`  • ${text}`,
    });

    const cases = [
      [myTheme.info('Info text'), '\x1b[36mℹ Info text\x1b[39m'],
      [myTheme.info`Info text`, '\x1b[36mℹ Info text\x1b[39m'],
      [myTheme.info.bold('Info text'), '\x1b[1m\x1b[36mℹ Info text\x1b[39m\x1b[22m'],
      [myTheme.info.bgBlue('Info text'), '\x1b[44m\x1b[36mℹ Info text\x1b[39m\x1b[49m'],
      [myTheme.info.bgBlue`Info text`, '\x1b[44m\x1b[36mℹ Info text\x1b[39m\x1b[49m'],
      [myTheme.failure('Failed'), '\x1b[31m✗ Failed!\x1b[39m'],
      [myTheme.warning('Warning'), '\x1b[33m⚠ Warning!\x1b[39m'],
      [myTheme.success('Success'), '\x1b[32m✓ Success!\x1b[39m'],
      [myTheme.success.bold.underline('Finish'), '\x1b[1m\x1b[4m\x1b[32m✓ Finish!\x1b[39m\x1b[24m\x1b[22m'],
      [myTheme.bold('List:'), '\x1b[1mList:\x1b[22m'],
      [myTheme.list('Item 1'), '\x1b[37m  • Item 1\x1b[39m'],
      [myTheme.list.italic('Item 2'), '\x1b[3m\x1b[37m  • Item 2\x1b[39m\x1b[23m'],
      [myTheme.list.bold('Item 3'), '\x1b[1m\x1b[37m  • Item 3\x1b[39m\x1b[22m'],
    ];

    for (const [actual, expected] of cases) {
      debug(actual);
      expect(actual).toBe(expected);
    }
  });

  test('raw template', async () => {
    const myTheme = ansis.extend({
      nav: (text) => ansis.green`prev\\next ${text}`,
    });

    const received = myTheme.nav.underline`path\\to\\next\\dir`;
    const expected = '[4m[32mprev\\next path\\to\\next\\dir[39m[24m';

    console.log(received);
    expect(received).toEqual(expected);
  });

  test('themed templates with multiple arguments', async () => {
    const myTheme = ansis.extend({
      app: (appName, instanceType) => ansis.white`-> ${ansis.blue(appName)} ${ansis.green(instanceType)}`,
    });

    const cases = [
      [myTheme.app('my-app', 'production'), '[37m-> [34mmy-app[37m [32mproduction[37m[39m'],
      [myTheme.app.bold('my-app', ansis.magenta`devel`), '[1m[37m-> [34mmy-app[37m [32m[35mdevel[32m[37m[39m[22m'],
      [myTheme.app.bgHex('#ffce00')('my-app', 'staging'), '[48;2;255;206;0m[37m-> [34mmy-app[37m [32mstaging[37m[39m[49m'],
    ];

    for (const [actual, expected] of cases) {
      console.log(actual);
      expect(actual).toBe(expected);
    }
  });

  /**
   * TODO: add to readme
   * Note:
   * For formatter theme styles, `.open`/`.close` are empty because formatting is generated at render-time.
   * Chained ANSI modifiers still provide correct `.open`/`.close`.
   */

  test('formatter style open/close are empty (visible semantics)', () => {
    const myTheme = ansis.extend({
      success: (text) => ansis.green`✓ ${text}!`,
    });

    // style.open/style.close cannot represent the final formatting,
    // because the formatting is produced at call time, not encoded as static open/close sequences.
    const style = myTheme.success;

    expect(style.open).toBe('');
    expect(style.close).toBe('');
    expect(style.open + 'Success' + style.close).toBe('Success');
  });

  test('chained ANSI style keeps open/close on top of formatter style', () => {
    const myTheme = ansis.extend({
      success: (text) => ansis.green`✓ ${text}!`,
    });

    const style = myTheme.success.underline;

    expect(style.open).toBe('\x1b[4m');
    expect(style.close).toBe('\x1b[24m');
    expect(style.open + 'Success' + style.close).toBe('\x1b[4mSuccess\x1b[24m');
  });
});

describe('formatter renderer inheritance', () => {
  test('a chained formatter should override parent renderer', () => {
    const color = ansis.extend({
      a: (text) => `A:${text}`,
      b: (text) => `B:${text}`,
    });

    // correct behavior: `b` (child) must override `a` (parent) when chained
    expect(color.a.b('x')).toBe('B:x');
  });
});