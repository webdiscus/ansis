import path from 'path';
import { expect, describe, test } from 'vitest';
import { esc, execScriptSync } from './utils/helpers.js';

// import env variables to simulate truecolor color space in CLI
import './env/truecolor.js';

const TEST_PATH = path.resolve('./test/');

// CLI with flags and environment variables
// Note: using child_process.execSync the stdout.isTTY is always false
// TODO:
//   - test FORCE_COLOR=0
//   - test NO_COLOR=1

describe('enable colors', () => {
  test(`--color`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--color']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`--color=true`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--color=true']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`--color=always`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--color=always']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`FORCE_COLOR=true`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, [], { FORCE_COLOR: true });
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';

    expect(esc(received)).toEqual(esc(expected));
  });

  test(`FORCE_COLOR=1`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, [], { FORCE_COLOR: 1 });
    const expected = '\x1b[31mred\x1b[39m|\x1b[30mrgb\x1b[39m|\x1b[40mbgRgb\x1b[49m|\x1b[97mhex\x1b[39m|\x1b[107mbgHex\x1b[49m';

    expect(esc(received)).toEqual(esc(expected));
  });

  test(`FORCE_COLOR=2`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, [], { FORCE_COLOR: 2 });
    const expected = '\x1b[31mred\x1b[39m|\x1b[38;5;239mrgb\x1b[39m|\x1b[48;5;239mbgRgb\x1b[49m|\x1b[38;5;231mhex\x1b[39m|\x1b[48;5;231mbgHex\x1b[49m';

    expect(esc(received)).toEqual(esc(expected));
  });

  test(`FORCE_COLOR=3`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, [], { FORCE_COLOR: 3 });
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';

    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('disable colors', () => {
  test(`--no-color`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    // flags has priority over env variable
    const received = execScriptSync(filename, ['--no-color'], { FORCE_COLOR: 1 });
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`--color=false`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    // flags has priority over env variable
    const received = execScriptSync(filename, ['--color=false'], { FORCE_COLOR: 1 });
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`--color=never`, () => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    // flags has priority over env variable
    const received = execScriptSync(filename, ['--color=never'], { FORCE_COLOR: 1 });
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
  });
});