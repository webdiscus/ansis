/**
 * Behavior specification for reset handling.
 * These tests document how reset ANSI sequences are generated and preserved
 * in chained, nested, raw ANSI, template literal and multiline style contexts.
 */

import { describe, expect, test } from 'vitest';
import { Ansis } from 'ansis';

// use base colors
const ansis = new Ansis(1);

describe('reset with empty values', () => {
  test(`reset with empty string returns ANSI reset sequence`, () => {
    const received = ansis.reset('');
    const expected = '\x1b[0m';
    expect(received).toEqual(expected);
  });

  test(`reset with null returns ANSI reset sequence`, () => {
    const received = ansis.reset(null);
    const expected = '\x1b[0m';
    expect(received).toEqual(expected);
  });

  test(`reset with undefined returns ANSI reset sequence`, () => {
    const received = ansis.reset(undefined);
    const expected = '\x1b[0m';
    expect(received).toEqual(expected);
  });
});

describe('reset', () => {
  test(`reset without arguments returns ANSI reset sequence`, () => {
    const received = ansis.reset();
    const expected = '\x1b[0m';
    expect(received).toEqual(expected);
  });

  test(`reset prepends reset sequence to text`, () => {
    const received = ansis.reset('foo');
    const expected = '\x1b[0mfoo';
    expect(received).toEqual(expected);
  });

  test(`reset chained after foreground style resets before text`, () => {
    const received = ansis.red.reset('foo');
    const expected = '\x1b[31m\x1b[0mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`foreground style chained after reset starts from reset state`, () => {
    const received = ansis.reset.red('foo');
    const expected = '\x1b[0m\x1b[31mfoo\x1b[39m';
    expect(received).toEqual(expected);
  });

  // TODO: recovery styles after reset in nested styles
  test(`222`, () => {
    //const received = ansis.green.underline.italic.bgMagenta`green ${ansis.reset.red('foo')} green`;
    //const received = ansis.green.underline.reset.italic.bgBlue`green ${ansis.red('foo')} green`;

    // reference
    const received = ansis.green.underline.italic.bgBlue`green ${ansis.red('foo')} green`;

    //const expected = '\x1b[32m\x1b[4mgreen \x1b[0m\x1b[31mfoo\x1b[32m green\x1b[24m\x1b[39m';
    const expected = '\x1b[32m\x1b[4mgreen \x1b[0m\x1b[31mfoo\x1b[32m\x1b[0m green\x1b[24m\x1b[39m';

    console.log(received);
    console.log(expected);

    console.log();
    console.log(ansis.green.underline.bgBlue`green${ansis.red(' foo ')}${ansis.green.underline.bgBlue`green`}`);
    console.log(ansis.green.underline.bgBlue`green${ansis.reset.red(' foo ')}${ansis.green.underline.bgBlue`green`}`);

    console.log();
    console.log(ansis.green.underline.bgBlue`green${ansis.red(' foo ')}green`);
    console.log(ansis.green.underline.bgBlue`green${ansis.reset.red(' foo ')}green`);

    expect(received).toEqual(expected);
  });

  test(`nested reset inside foreground style is preserved without remapping`, () => {
    const received = ansis.red(`foo ${ansis.reset('bar')} baz`);
    const expected = '\x1b[31mfoo \x1b[0mbar baz\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`nested reset inside foreground and background styles is preserved without remapping`, () => {
    const received = ansis.red.bgGreen(`foo ${ansis.reset('bar')} baz`);
    const expected = '\x1b[31m\x1b[42mfoo \x1b[0mbar baz\x1b[49m\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`reset in a prebuilt line is preserved inside foreground and background styles`, () => {
    const line = 'before ' + ansis.reset('inner') + ' after';
    const received = ansis.red.bgGreen(line);
    const expected = '\x1b[31m\x1b[42mbefore \x1b[0minner after\x1b[49m\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`reset template literal prepends reset sequence to nested styles`, () => {
    const received = ansis.reset`foo ${ansis.red('bar')} baz`;
    const expected = '\x1b[0mfoo \x1b[31mbar\x1b[39m baz';
    expect(received).toEqual(expected);
  });

  test(`explicit trailing reset can reset after a reset template literal`, () => {
    const received = ansis.reset`foo ${ansis.red('bar')} baz` + ansis.reset();
    const expected = '\x1b[0mfoo \x1b[31mbar\x1b[39m baz\x1b[0m';
    expect(received).toEqual(expected);
  });

  test(`nested reset template literal inside foreground style is preserved without remapping`, () => {
    const received = ansis.red`foo ${ansis.reset`bar`} baz`;
    const expected = '\x1b[31mfoo \x1b[0mbar baz\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`raw reset sequence inside foreground and background styles is preserved without remapping`, () => {
    const received = ansis.red.bgGreen('foo \x1b[0mbar baz');
    const expected = '\x1b[31m\x1b[42mfoo \x1b[0mbar baz\x1b[49m\x1b[39m';
    expect(received).toEqual(expected);
  });
});

describe('reset inside styled template composition', () => {
  test(`without reset, explicit nested tail keeps full outer style`, () => {
    const received = ansis.green.underline.bgBlue`green${ansis.red(' foo ')}${ansis.green.underline.bgBlue`green`}`;
    const expected = '\x1b[32m\x1b[4m\x1b[44mgreen\x1b[31m foo \x1b[32m\x1b[32m\x1b[4m\x1b[44mgreen\x1b[44m\x1b[4m\x1b[32m\x1b[49m\x1b[24m\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`with reset, explicit nested tail keeps full outer style`, () => {
    const received = ansis.green.underline.bgBlue`green${ansis.reset.red(' foo ')}${ansis.green.underline.bgBlue`green`}`;
    const expected = '\x1b[32m\x1b[4m\x1b[44mgreen\x1b[0m\x1b[31m foo \x1b[32m\x1b[32m\x1b[4m\x1b[44mgreen\x1b[44m\x1b[4m\x1b[32m\x1b[49m\x1b[24m\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`without reset, nested foreground restores outer foreground for plain tail`, () => {
    const received = ansis.green.underline.bgBlue`green${ansis.red(' foo ')}green`;
    const expected = '\x1b[32m\x1b[4m\x1b[44mgreen\x1b[31m foo \x1b[32mgreen\x1b[49m\x1b[24m\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`with reset, nested foreground restores only outer foreground for plain tail`, () => {
    const received = ansis.green.underline.bgBlue`green${ansis.reset.red(' foo ')}green`;
    const expected = '\x1b[32m\x1b[4m\x1b[44mgreen\x1b[0m\x1b[31m foo \x1b[32mgreen\x1b[49m\x1b[24m\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });
});

describe('reset in nested style composition', () => {
  test(`reset followed by underline inside foreground string composition`, () => {
    const received = ansis.red('red ' + ansis.reset.underline('underline') + ' text');
    const expected = '\x1b[31mred \x1b[0m\x1b[4munderline\x1b[24m text\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`reset followed by underline inside nested template literal restores outer foreground`, () => {
    const { red } = ansis;
    const received = red`red ${red.reset.underline`underline`} red`;
    const expected = '\x1b[31mred \x1b[31m\x1b[0m\x1b[4munderline\x1b[24m\x1b[31m red\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });
});

describe('reset with multiline wrapping', () => {
  test(`reset keeps multiline reset fragment unstyled inside an outer style`, () => {
    const received = ansis.red(`foo ${ansis.reset('bar\nbaz')} qux`);
    const expected = '\x1b[31mfoo \x1b[0mbar\x1b[39m\n\x1b[31m\x1b[0mbaz qux\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`Baseline comparison: without reset, multiline wrapping reapplies the outer style stack`, () => {
    const received = ansis.red('foo\nbar');
    const expected = '\x1b[31mfoo\x1b[39m\n\x1b[31mbar\x1b[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });
});