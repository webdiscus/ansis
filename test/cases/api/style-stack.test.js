/**
 * Behavior specification for style stack handling.
 * These tests verify correct ANSI sequence generation for complex style combinations.
 */

import { describe, expect, test } from 'vitest';
import ansis from 'ansis';

describe('style stack', () => {
  test(`different close codes in a chained style`, () => {
    const received = ansis.red.bold('foo');
    const expected = '\x1b[31m\x1b[1mfoo\x1b[22m\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`same close codes in a chained style`, () => {
    const received = ansis.red.green('foo');
    const expected = '\x1b[31m\x1b[32mfoo\x1b[39m\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`nested different foreground styles restore the outer style`, () => {
    const received = ansis.red(`foo ${ansis.green('bar')} baz`);
    const expected = '\x1b[31mfoo \x1b[32mbar\x1b[31m baz\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`nested same foreground style restores the current style category`, () => {
    const received = ansis.red(`foo ${ansis.red('bar')} baz`);
    const expected = '\x1b[31mfoo \x1b[31mbar\x1b[31m baz\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`repeated foreground chain restores the nearest foreground style after nesting`, () => {
    const received = ansis.red.green.red(`foo ${ansis.blue('bar')} baz`);
    const expected = '\x1b[31m\x1b[32m\x1b[31mfoo \x1b[34mbar\x1b[31m baz\x1b[39m\x1b[39m\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`multiline text keeps background styling around nested foreground styles`, () => {
    const received = ansis.bgRed(`foo\n${ansis.blue('bar')}\nbaz`);
    const expected = '\x1b[41mfoo\x1b[49m\n\x1b[41m\x1b[34mbar\x1b[39m\x1b[49m\n\x1b[41mbaz\x1b[49m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`visible style with empty ANSI codes does not break chained style mapping`, () => {
    const received = ansis.visible.red('foo');
    const expected = '\x1b[31mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`reset inside a styled context is preserved without remapping`, () => {
    const received = ansis.red(`foo ${ansis.reset('bar')} baz`);
    const expected = '\x1b[31mfoo \x1b[0mbar\x1b[0m baz\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`deep foreground, background and modifier combination restores outer styles`, () => {
    const received = ansis.red.bgGreen.bold(`foo ${ansis.green.bgRed.italic('bar')} baz`);
    const expected = '\x1b[31m\x1b[42m\x1b[1mfoo \x1b[32m\x1b[41m\x1b[3mbar\x1b[23m\x1b[42m\x1b[31m baz\x1b[22m\x1b[49m\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });
});