import path from 'path';
import { expect, describe, test } from 'vitest';
import { WriteStream } from 'node:tty';
import { esc, execScriptSync } from '../../utils/helpers.js';

const TEST_PATH = path.resolve('./test/');
const outputRed = path.join(TEST_PATH, './cli/output-red.js');
const outputRgb = path.join(TEST_PATH, './cli/output-rgb.js');

const RED_PLAIN = '_RED_';
const RED_COLORED = '\x1b[31m_RED_\x1b[39m';

const PINK_PLAIN = '_PINK_';
const PINK_ANSI16 = '\x1b[95m_PINK_\x1b[39m';
const PINK_ANSI256 = '\x1b[38;5;205m_PINK_\x1b[39m';
const PINK_TRUECOLOR = '\x1b[38;2;255;46;135m_PINK_\x1b[39m';

describe('Node: hasColors()', () => {
  // Original force-color.org rule: any non-empty value should enable colors.
  // Node: disables colors.
  // Ansis: explicit value '0' disables colors.
  test(`FORCE_COLOR: '0'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: '0' });
    expect(received).toEqual(false);
  });

  // Original force-color.org rule: any non-empty value should enable colors.
  // Node: disables colors.
  // Ansis: explicit value 'false' disables colors.
  test(`FORCE_COLOR: 'false'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: 'false' });
    expect(received).toEqual(false);
  });

  // Original force-color.org rule: any non-empty value should enable colors.
  // Node: enables colors.
  // Ansis: explicit value '1' enables level 1.
  test(`FORCE_COLOR: '1'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: '1' });
    expect(received).toEqual(true);
  });

  // Original force-color.org rule: any non-empty value should enable colors.
  // Node: enables colors.
  // Ansis: explicit value '2' enables level 2.
  test(`FORCE_COLOR: '2'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: '2' });
    expect(received).toEqual(true);
  });

  // Original force-color.org rule: any non-empty value should enable colors.
  // Node: enables colors.
  // Ansis: explicit value '3' enables level 3.
  test(`FORCE_COLOR: '3'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: '3' });
    expect(received).toEqual(true);
  });

  // Original force-color.org rule: any non-empty value should enable colors.
  // Node: disables colors.
  // Ansis: any other non-empty string means auto-detect and enables colors.
  test(`FORCE_COLOR: '4'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: '4' });
    expect(received).toEqual(false);
  });

  // Original force-color.org rule: any non-empty value should enable colors.
  // Node: enables colors.
  // Ansis: string 'true' means auto-detect and enables colors.
  test(`FORCE_COLOR: 'true'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: 'true' });
    expect(received).toEqual(true);
  });

  // Original force-color.org rule: an empty value should not force colors.
  // Node: enables colors.
  // Ansis: empty string means auto-detect and enables colors.
  test(`FORCE_COLOR: ''`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: '' });
    expect(received).toEqual(true);
  });

  // Original force-color.org rule: any non-empty value should enable colors.
  // Node: disables colors.
  // Ansis: any other non-empty string means auto-detect, so colors stay enabled.
  test(`FORCE_COLOR: 'something'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { FORCE_COLOR: 'something' });
    expect(received).toEqual(false);
  });

  // Original no-color.org rule: any non-empty value disables colors.
  // Node: disables colors.
  // Ansis: disables colors.
  test(`NO_COLOR: '1'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { NO_COLOR: '1' });
    expect(received).toEqual(false);
  });

  // Original no-color.org rule: any non-empty value disables colors.
  // Node: disables colors.
  // Ansis: disables colors.
  test(`NO_COLOR: '0'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { NO_COLOR: '0' });
    expect(received).toEqual(false);
  });

  // Original no-color.org rule: an empty value should not disable colors.
  // Node: disables colors.
  // Ansis: empty string has no effect.
  test(`NO_COLOR: ''`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { NO_COLOR: '' });
    expect(received).toEqual(false);
  });

  // Original force-color.org example: FORCE_COLOR overrides NO_COLOR when active.
  // Node: enables colors.
  // Ansis: FORCE_COLOR always overrides NO_COLOR.
  test(`NO_COLOR: '1', FORCE_COLOR: '1'`, () => {
    const received = WriteStream.prototype.hasColors.call(process.stdout, 16, { NO_COLOR: '1', FORCE_COLOR: '1' });
    expect(received).toEqual(true);
  });
});

describe('default behaviour: no args, no env', () => {
  test(`isTTY=false`, () => {
    const received = execScriptSync(outputRed, [], {}, { isTTY: false });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true`, () => {
    const received = execScriptSync(outputRed, [], {}, { isTTY: true });
    expect(received).toEqual(RED_COLORED);
  });
});

describe('FORCE_COLOR enable/disable', () => {
  // in node: force disable color
  test(`isTTY=true, FORCE_COLOR=false`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: 'false' }, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true, FORCE_COLOR=false, bool`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: false }, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  // in node: force disable color
  test(`isTTY=false, FORCE_COLOR=0`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '0' }, { isTTY: false });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=false, FORCE_COLOR=1`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '1' }, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=false, FORCE_COLOR=any`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: 'any string' }, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  // in node: force enable color
  // TODO: discuss whether empty value should force enable (as in Node) or no effect (original force-color.org rule)
  test(`isTTY=false, FORCE_COLOR=`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '' }, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });
});

describe('FORCE_COLOR color levels', () => {
  test(`isTTY=true, COLORTERM: 'truecolor', FORCE_COLOR=0`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'truecolor', FORCE_COLOR: '0' }, { isTTY: true });
    expect(received).toEqual(PINK_PLAIN);
  });

  test(`isTTY=false, COLORTERM: 'truecolor', FORCE_COLOR=1`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'truecolor', FORCE_COLOR: '1' }, { isTTY: false });
    console.log(esc(received), received);
    expect(received).toEqual(PINK_ANSI16);
  });

  test(`isTTY=false, COLORTERM: 'truecolor', FORCE_COLOR=2`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'truecolor', FORCE_COLOR: '2' }, { isTTY: false });
    console.log(esc(received), received);
    expect(received).toEqual(PINK_ANSI256);
  });

  test(`isTTY=false, COLORTERM: 'truecolor', FORCE_COLOR=2, num`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'truecolor', FORCE_COLOR: 2 }, { isTTY: false });
    expect(received).toEqual(PINK_ANSI256);
  });

  test(`isTTY=false, COLORTERM: 'truecolor', FORCE_COLOR=3`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'truecolor', FORCE_COLOR: '3' }, { isTTY: false });
    console.log(esc(received), received);
    expect(received).toEqual(PINK_TRUECOLOR);
  });
});

describe('FORCE_COLOR auto detect', () => {
  test(`isTTY=false, COLORTERM: 'ansi', FORCE_COLOR=true`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'ansi', FORCE_COLOR: 'true' }, { isTTY: false });
    expect(received).toEqual(PINK_ANSI16);
  });

  test(`isTTY=false, COLORTERM: 'ansi256', FORCE_COLOR=true`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'ansi256', FORCE_COLOR: 'true' }, { isTTY: false });
    expect(received).toEqual(PINK_ANSI256);
  });

  test(`isTTY=false, COLORTERM: 'ansi256', FORCE_COLOR=true, bool`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'ansi256', FORCE_COLOR: true }, { isTTY: false });
    expect(received).toEqual(PINK_ANSI256);
  });

  test(`isTTY=false, COLORTERM: 'truecolor', FORCE_COLOR=true`, () => {
    const received = execScriptSync(outputRgb, [], { COLORTERM: 'truecolor', FORCE_COLOR: 'true' }, { isTTY: false });
    expect(received).toEqual(PINK_TRUECOLOR);
  });

  test(`isTTY=false, no color env, FORCE_COLOR=true -> fallback to 16 colors`, () => {
    const received = execScriptSync(outputRgb, [], { FORCE_COLOR: 'true' }, { isTTY: false });
    expect(received).toEqual(PINK_ANSI16);
  });
});

describe('NO_COLOR', () => {
  test(`isTTY=true, NO_COLOR='' - no effect`, () => {
    const received = execScriptSync(outputRed, [], { NO_COLOR: '' }, { isTTY: true });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=true, NO_COLOR=0`, () => {
    const received = execScriptSync(outputRed, [], { NO_COLOR: '0' }, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true, NO_COLOR=0, num`, () => {
    const received = execScriptSync(outputRed, [], { NO_COLOR: 0 }, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true, NO_COLOR=1`, () => {
    const received = execScriptSync(outputRed, [], { NO_COLOR: '1' }, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true, NO_COLOR=1, num`, () => {
    const received = execScriptSync(outputRed, [], { NO_COLOR: 1 }, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });
});

describe('CLI flags', () => {
  test(`isTTY=false, --color`, () => {
    const received = execScriptSync(outputRed, ['--color'], {}, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=false, --color=true`, () => {
    const received = execScriptSync(outputRed, ['--color=true'], {}, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=false, --color=always`, () => {
    const received = execScriptSync(outputRed, ['--color=always'], {}, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=true, --color=false`, () => {
    const received = execScriptSync(outputRed, ['--color=false'], {}, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true, --color=never`, () => {
    const received = execScriptSync(outputRed, ['--color=never'], {}, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true, --no-color`, () => {
    const received = execScriptSync(outputRed, ['--no-color'], {}, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=false, no color env, --color -> fallback to 16 colors`, () => {
    const received = execScriptSync(outputRgb, ['--color'], {}, { isTTY: false });
    expect(received).toEqual(PINK_ANSI16);
  });
});

describe('--color auto detect', () => {
  test(`isTTY=false, COLORTERM: 'ansi', --color`, () => {
    const received = execScriptSync(outputRgb, ['--color'], { COLORTERM: 'ansi' }, { isTTY: false });
    expect(received).toEqual(PINK_ANSI16);
  });

  test(`isTTY=false, COLORTERM: 'ansi256', --color`, () => {
    const received = execScriptSync(outputRgb, ['--color'], { COLORTERM: 'ansi256' }, { isTTY: false });
    expect(received).toEqual(PINK_ANSI256);
  });

  test(`isTTY=false, COLORTERM: 'truecolor', --color`, () => {
    const received = execScriptSync(outputRgb, ['--color'], { COLORTERM: 'truecolor' }, { isTTY: false });
    expect(received).toEqual(PINK_TRUECOLOR);
  });

  test(`isTTY=false, no color env, --color -> fallback to 16 colors`, () => {
    const received = execScriptSync(outputRgb, ['--color'], {}, { isTTY: false });
    expect(received).toEqual(PINK_ANSI16);
  });
});

describe('last CLI flag wins', () => {
  test(`isTTY=false, --no-color, --color`, () => {
    const received = execScriptSync(outputRed, ['--no-color', '--color'], {}, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=true, --color, --no-color`, () => {
    const received = execScriptSync(outputRed, ['--color', '--no-color'], {}, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true, --color=true, --color=false`, () => {
    const received = execScriptSync(outputRed, ['--color=true', '--color=false'], {}, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=false, --color=false, --color=true`, () => {
    const received = execScriptSync(outputRed, ['--color=false', '--color=true'], {}, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });
});

describe('FORCE_COLOR priority over NO_COLOR', () => {
  test(`isTTY=true, FORCE_COLOR=1, NO_COLOR=1`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '1', NO_COLOR: '1' }, { isTTY: true });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=false, FORCE_COLOR=1, NO_COLOR=1`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '1', NO_COLOR: '1' }, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=true, FORCE_COLOR=, NO_COLOR=1`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '', NO_COLOR: '1' }, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=true, FORCE_COLOR=, NO_COLOR=`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '', NO_COLOR: '' }, { isTTY: true });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=false, FORCE_COLOR=, NO_COLOR=`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '', NO_COLOR: '' }, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=true, FORCE_COLOR=0, NO_COLOR=1`, () => {
    const received = execScriptSync(outputRed, [], { FORCE_COLOR: '0', NO_COLOR: '1' }, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });
});

describe('Priority: NO_COLOR < CLI flags < FORCE_COLOR', () => {
  test(`isTTY=false, FORCE_COLOR=1, --no-color`, () => {
    const received = execScriptSync(outputRed, ['--no-color'], { FORCE_COLOR: '1' }, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=false, FORCE_COLOR=1, --color=false`, () => {
    const received = execScriptSync(outputRed, ['--color=false'], { FORCE_COLOR: '1' }, { isTTY: false });
    expect(received).toEqual(RED_COLORED);
  });

  test(`isTTY=true, FORCE_COLOR=0, --color`, () => {
    const received = execScriptSync(outputRed, ['--color'], { FORCE_COLOR: '0' }, { isTTY: true });
    expect(received).toEqual(RED_PLAIN);
  });

  test(`isTTY=true, NO_COLOR=1, --color`, () => {
    const received = execScriptSync(outputRed, ['--color'], { NO_COLOR: '1' }, { isTTY: true });
    expect(received).toEqual(RED_COLORED);
  });
});