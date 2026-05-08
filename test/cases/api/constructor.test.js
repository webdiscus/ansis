import { describe, expect, test } from 'vitest';

import { Ansis } from 'ansis';

describe('constructor options', () => {
  test(`default globalThis`, () => {
    const ansis = new Ansis();

    expect(ansis.level).toBeTypeOf('number');
  });

  test(`strict color level: 0`, () => {
    const ansis = new Ansis(0);

    expect(ansis.level).toEqual(0);
    expect(ansis.red('foo')).toEqual('foo');
  });

  test(`strict color level: 1`, () => {
    const ansis = new Ansis(1);

    expect(ansis.level).toEqual(1);
    expect(ansis.hex('#00c200')`foo`).toEqual('\x1b[32mfoo\x1b[39m');
  });

  test(`strict color level: 2`, () => {
    const ansis = new Ansis(2);

    expect(ansis.level).toEqual(2);
    expect(ansis.hex('#00c200')`foo`).toEqual('\x1b[38;5;40mfoo\x1b[39m');
  });

  test(`strict color level: 3`, () => {
    const ansis = new Ansis(3);

    expect(ansis.level).toEqual(3);
    expect(ansis.hex('#00c200')`foo`).toEqual('\x1b[38;2;0;194;0mfoo\x1b[39m');
  });

  test(`empty mock globalThis`, () => {
    const ansis = new Ansis({});

    expect(ansis.level).toEqual(0);
    expect(ansis.red('foo')).toEqual('foo');
  });

  test(`mock globalThis controls auto-detection`, () => {
    const ansis = new Ansis({
      process: {
        platform: 'linux',
        env: { COLORTERM: 'ansi256' },
        argv: ['node', 'test.js'],
        stdout: { isTTY: false },
      },
    });

    expect(ansis.level).toEqual(2);
  });

  test(`mock globalThis applies env and CLI priority`, () => {
    const ansis = new Ansis({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '1' },
        argv: ['node', 'test.js', '--no-color'],
        stdout: { isTTY: false },
      },
    });

    expect(ansis.level).toEqual(1);
    expect(ansis.red('foo')).toEqual('\x1b[31mfoo\x1b[39m');
  });

  test(`mock browser globalThis`, () => {
    const ansis = new Ansis({
      window: { chrome: {} },
    });

    expect(ansis.level).toEqual(3);
  });
});