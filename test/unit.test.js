import { expect, describe, test } from 'vitest';

import ansis from '../src/index.js';
import { hexToRgb, rgbToAnsi256, ansi256To16, rgbToAnsi16 } from '../src/utils.js';
import { getLevel } from '../src/color-support.js';
import { LEVEL_BW, LEVEL_16COLORS, LEVEL_256COLORS, LEVEL_TRUECOLOR } from '../src/color-levels.js';

describe('convert HEX to RGB', () => {
  test(`hexToRgb('FFAA99')`, () => {
    const received = hexToRgb('FFAA99');
    const expected = [255, 170, 153];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('#FFAA99')`, () => {
    const received = hexToRgb('#FFAA99');
    const expected = [255, 170, 153];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('#FA9')`, () => {
    const received = hexToRgb('#FA9');
    const expected = [255, 170, 153];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('#000')`, () => {
    const received = hexToRgb('#000');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('#000000')`, () => {
    const received = hexToRgb('#000000');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`invalid hexToRgb('#F')`, () => {
    const received = hexToRgb('#F');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`invalid hexToRgb('#F8')`, () => {
    const received = hexToRgb('#F8');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`invalid hexToRgb('#FF88')`, () => {
    const received = hexToRgb('#FF88');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`invalid hexToRgb('#FF88E')`, () => {
    const received = hexToRgb('#FF88E');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('invalid')`, () => {
    const received = hexToRgb('invalid');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });
});

describe('convert RGB to ANSI 256', () => {
  test(`rgbToAnsi256(7, 7, 7) lowest grayscale`, () => {
    const received = rgbToAnsi256(7, 7, 7);
    const expected = 16;
    expect(expected).toEqual(received);
  });

  test(`rgbToAnsi256(249, 249, 249) highest grayscale`, () => {
    const received = rgbToAnsi256(249, 249, 249);
    const expected = 231;
    expect(expected).toEqual(received);
  });

  test(`rgbToAnsi256(127, 127, 127) grayscale`, () => {
    const received = rgbToAnsi256(127, 127, 127);
    const expected = 244;
    expect(expected).toEqual(received);
  });

  test(`rgbToAnsi256(16, 16, 16) grayscale`, () => {
    const received = rgbToAnsi256(15, 15, 15);
    const expected = 233;
    expect(expected).toEqual(received);
  });

  test(`rgbToAnsi256(127, 63, 63) color`, () => {
    const received = rgbToAnsi256(200, 16, 16);
    const expected = 160;
    expect(expected).toEqual(received);
  });
});

describe('convert ANSI 256 to ANSI 16', () => {
  test(`black`, () => {
    const received = ansi256To16(0);
    const expected = 30;
    expect(expected).toEqual(received);
  });

  test(`white`, () => {
    const received = ansi256To16(7);
    const expected = 37;
    expect(expected).toEqual(received);
  });

  test(`whiteBright`, () => {
    const received = ansi256To16(15);
    const expected = 97;
    expect(expected).toEqual(received);
  });

  test(`ansi256To16(232) -> black`, () => {
    const received = ansi256To16(233);
    const expected = 30;
    expect(expected).toEqual(received);
  });

  test(`redBright`, () => {
    const received = ansi256To16(196);
    const expected = 91;
    expect(expected).toEqual(received);
  });

  test(`red`, () => {
    const received = ansi256To16(124);
    const expected = 31;
    expect(expected).toEqual(received);
  });

  test(`blue`, () => {
    const received = ansi256To16(20);
    const expected = 34;
    expect(expected).toEqual(received);
  });

  test(`blueBright`, () => {
    const received = ansi256To16(27);
    const expected = 94;
    expect(expected).toEqual(received);
  });

  test(`green`, () => {
    const received = ansi256To16(34);
    const expected = 32;
    expect(expected).toEqual(received);
  });

  test(`greenBright`, () => {
    const received = ansi256To16(82);
    const expected = 92;
    expect(expected).toEqual(received);
  });
});

describe('convert RGB to ANSI 16', () => {
  test(`redBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#ff6e67'));
    const expected = 91;
    expect(expected).toEqual(received);
  });

  test(`red`, () => {
    const received = rgbToAnsi16(...hexToRgb('#c91b00'));
    const expected = 31;
    expect(expected).toEqual(received);
  });

  test(`blue`, () => {
    const received = rgbToAnsi16(...hexToRgb('#0225c7'));
    const expected = 34;
    expect(expected).toEqual(received);
  });

  test(`blueBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#6871ff'));
    const expected = 94;
    expect(expected).toEqual(received);
  });

  test(`green`, () => {
    const received = rgbToAnsi16(...hexToRgb('#00c200'));
    const expected = 32;
    expect(expected).toEqual(received);
  });

  test(`greenBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#5ffa68'));
    const expected = 92;
    expect(expected).toEqual(received);
  });
});

describe('CI tools', () => {
  test(`GitHub CI`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { CI: true, GITHUB_ACTIONS: true },
        argv: [],
      },

    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`GitLab CI`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { CI: true, GITLAB_CI: true },
        argv: [],
      },

    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`Azure CI`, () => {
    const received = getLevel({
      process: {
        env: { TF_BUILD: true },
        argv: [],
      },

    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`TeamCity`, () => {
    const received = getLevel({
      process: {
        env: { TEAMCITY_VERSION: '2020.1.1' },
        argv: [],
      },

    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });
});

describe('flags and options', () => {
  test(`--color`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: {},
        argv: ['--color'],
      },

    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`--color=true`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'dumb' },
        argv: ['--color=true'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`--color=false`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm' },
        argv: ['--color=false'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`--color=never`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm' },
        argv: ['--color=never'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`NO_COLOR=1`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NO_COLOR: '1', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });
});

// FORCE_COLOR
describe('FORCE_COLOR', () => {
  test(`not exists FORCE_COLOR`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: {},
        argv: [],
      },
    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=false`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'false', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=0`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '0', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR true, no isTTY`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true' },
        argv: [],
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=3, TERM=xterm-256color, no isTTY`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '3', TERM: 'xterm-256color' },
        argv: [],
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR unset, TERM=xterm-256color, isTTY`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        // equivalent to: env: { TERM: 'xterm-256color' },
        env: { FORCE_COLOR: undefined, TERM: 'xterm-256color' },
        argv: [],
        stdout: { isTTY: true },
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  // FORCE_COLOR= node -e "console.log(process.env.FORCE_COLOR)"
  test(`FORCE_COLOR=, COLORTERM=ansi256`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '', COLORTERM: 'ansi256' },
        argv: [],
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  // FORCE_COLOR= node -e "console.log(process.env.FORCE_COLOR)"
  test(`FORCE_COLOR=, TERM=dumb`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '', TERM: 'dumb' },
        argv: [],
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=true`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true' },
        argv: [],
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=true, TERM=dumb`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'dumb', FORCE_COLOR: 'true' },
        argv: [],
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=true, COLORTERM=truecolor`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'truecolor' },
        argv: [],
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=true, COLORTERM=ansi256`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'ansi256' },
        argv: [],
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=true, COLORTERM=ansi`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'ansi' },
        argv: [],
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=1`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '1' },
        argv: [],
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=2`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '2' },
        argv: [],
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`FORCE_COLOR=3`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '3' },
        argv: [],
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  // disable the test for unsupported value, whoever uses it has only himself to blame
  // test(`FORCE_COLOR=5`, () => {
  //   const received = colorSpace({
  //     process: {
  //       platform: 'linux',
  //       env: { FORCE_COLOR: '5' },
  //       argv: [],
  //     },
  //   });
  //   const expected = LEVEL_TRUECOLOR;
  //   expect(expected).toEqual(received);
  // });

  test(`FORCE_COLOR=something`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'something' },
        argv: [],
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });
});

describe('color level', () => {
  test(`Any unknown terminal should support 16 colors`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'unknown-term' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS
    expect(expected).toEqual(received);
  });
});

describe('COLORTERM', () => {
  test(`detect truecolor from COLORTERM`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm', COLORTERM: 'truecolor' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`detect truecolor for TERM=xterm-256color and COLORTERM=truecolor`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256color', COLORTERM: 'truecolor' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`detect 256 colors from COLORTERM`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm', COLORTERM: 'ansi256' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`detect 16 colors from COLORTERM`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256color', COLORTERM: 'ansi' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS
    expect(expected).toEqual(received);
  });

});

describe('support colors in terminals', () => {
  test(`xterm`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`xterm-16colour`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-16colour' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`xterm-256`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`xterm-256color`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256color' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`xterm-256colour`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256colour' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`xterm-kitty`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-kitty', COLORTERM: 'truecolor' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`vt220`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'vt220' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`vt320-w`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'vt320-w' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`vt52`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'vt52' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`vt525`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'vt525' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`tmux`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'tmux' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`mintty-direct`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'mintty-direct' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`ansi.sysk`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'ansi.sysk' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(expected).toEqual(received);
  });

  test(`Browser chromium`, () => {
    const received = getLevel({
      window: {
        chrome: {},
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`Browser others`, () => {
    const received = getLevel({
      window: {},
    });
    const expected = LEVEL_BW
    expect(expected).toEqual(received);
  });

  test(`Unknown system`, () => {
    const received = getLevel({});
    const expected = LEVEL_BW
    expect(expected).toEqual(received);
  });

});

// Node.JS
describe('Node.JS different env', () => {
  test(`process undefined`, () => {
    // save original `process` object
    const processOriginal = process;
    process = undefined;

    const received = getLevel(undefined);
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);

    // restore original `process` object
    process = processOriginal;
  });

  test(`processMock {}`, () => {
    const received = getLevel({});
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`colors on windows platform`, () => {
    const received = getLevel({
      process: {
        platform: 'win32',
        env: {},
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`no colors, unsupported terminal`, () => {
    const received = getLevel({
      process: {
        env: { TERM: 'dumb' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`no colors, simulate output in file > log.txt`, () => {
    const received = getLevel({
      process: {
        env: { TERM: 'xterm' },
        argv: [],
      },

    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`COLORTERM: 'truecolor'`, () => {
    const received = getLevel({
      process: {
        env: { COLORTERM: 'truecolor' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`PM2: no isTTY but COLORTERM: 'truecolor'`, () => {
    const received = getLevel({
      process: {
        env: {
          PM2_HOME: '/var/www/',
          pm_id: '1',
          COLORTERM: 'truecolor',
        },
        argv: [],
        stdout: {},
        stderr: {},
      },

    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`PM2: no isTTY and unsupported terminal`, () => {
    const received = getLevel({
      process: {
        env: {
          PM2_HOME: '/var/www/',
          pm_id: '1',
          TERM: 'dumb',
        },
        argv: [],
        stdout: {},
        stderr: {},
      },

    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });
});

// Deno
describe('Deno 2.0+ support', () => {
  test(`env TERM`, () => {
    const received = getLevel({
      Deno: {},
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256color' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`no permissions`, () => {
    const received = getLevel({
      Deno: {},
      process: {
        platform: 'linux',
        env: new Proxy({}, {
          ownKeys(target) {
            // simulate original Deno error if a request to env access was denied
            // simulate an access with `Object.keys(env)`
            throw new Error('NotCapable: Requires env access, run again with the --allow-env flag');
          }
        }),
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`platform win`, () => {
    const received = getLevel({
      Deno: {},
      process: {
        platform: 'win32',
        env: { TERM: '' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(expected).toEqual(received);
  });

  test(`flag '--color'`, () => {
    const received = getLevel({
      Deno: {},
      process: {
        platform: 'linux',
        env: {},
        argv: ['--color'],
        stdout: { isTTY: false },
        stderr: { isTTY: false },
      },
    });
    const expected = LEVEL_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`no permissions`, () => {
    const received = getLevel({
      Deno: {},
      process: {
        platform: 'linux',
        env: new Proxy({}, {
          ownKeys(target) {
            // simulate original Deno error if a request to env access was denied
            // simulate an access with `Object.keys(env)`
            throw new Error('NotCapable: Requires env access, run again with the --allow-env flag');
          }
        }),
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = LEVEL_BW;
    expect(expected).toEqual(received);
  });

  test(`isTTY false, FORCE_COLOR=1`, () => {
    const received = getLevel({
      Deno: {},
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 1 },
        argv: [],
        stdout: { isTTY: false },
        stderr: { isTTY: false },
      },
    });
    const expected = LEVEL_16COLORS;
    expect(received).toEqual(expected);
  });
});

// Next.JS
describe('Next.JS support', () => {
  test(`runtime experimental-edge`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'experimental-edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`runtime edge`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });

  test(`runtime nodejs`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'nodejs', TERM: 'xterm-256color' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = LEVEL_256COLORS;
    expect(expected).toEqual(received);
  });
});

describe('strip ANSI codes', () => {
  test(`red`, () => {
    const received = ansis.strip('Hello \x1b[31mWorld\x1b[0m!');
    const expected = 'Hello World!';
    expect(received).toEqual(expected);
  });

  test(`red.bold.underline`, () => {
    //const str = ansis.red.bold.underline('red.bold.underline');
    const str = '[31m[1m[4mred.bold.underline[24m[22m[39m';
    const received = ansis.strip(str);
    const expected = 'red.bold.underline';
    expect(received).toEqual(expected);
  });


  test(`foo red bar bold baz`, () => {
    //const str = `foo ${ansis.red`red`} bar ${ansis.bold`bold`} baz`;
    const str = 'foo [31mred[39m bar [1mbold[22m baz';
    const received = ansis.strip(str);
    const expected = 'foo red bar bold baz';
    expect(received).toEqual(expected);
  });

});