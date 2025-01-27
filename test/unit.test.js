import { expect, describe, test } from 'vitest';

import { hexToRgb, rgbToAnsi256, ansi256To16, rgbToAnsi16 } from '../src/utils.js';
import { getColorSpace } from '../src/color-support.js';
import { SPACE_BW, SPACE_16COLORS, SPACE_256COLORS, SPACE_TRUECOLOR } from '../src/color-spaces.js';

const colorSpace = (mock) => getColorSpace(mock);

describe('convert HEX to RGB', () => {
  test(`hexToRgb('FFAA99')`, () => {
    const received = hexToRgb('FFAA99');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
  });

  test(`hexToRgb('#FFAA99')`, () => {
    const received = hexToRgb('#FFAA99');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
  });

  test(`hexToRgb('#FA9')`, () => {
    const received = hexToRgb('#FA9');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
  });

  test(`invalid hexToRgb('#F')`, () => {
    const received = hexToRgb('#F');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
  });

  test(`invalid hexToRgb('#F8')`, () => {
    const received = hexToRgb('#F8');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
  });

  test(`invalid hexToRgb('#FF88')`, () => {
    const received = hexToRgb('#FF88');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
  });

  test(`invalid hexToRgb('#FF88E')`, () => {
    const received = hexToRgb('#FF88E');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
  });

  test(`hexToRgb('invalid')`, () => {
    const received = hexToRgb('invalid');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
  });
});

describe('convert RGB to ANSI 256', () => {
  test(`rgbToAnsi256(7, 7, 7) lowest greyscale`, () => {
    const received = rgbToAnsi256(7, 7, 7);
    const expected = 16;
    expect(received).toEqual(expected);
  });

  test(`rgbToAnsi256(249, 249, 249) highest greyscale`, () => {
    const received = rgbToAnsi256(249, 249, 249);
    const expected = 231;
    expect(received).toEqual(expected);
  });

  test(`rgbToAnsi256(127, 127, 127) greyscale`, () => {
    const received = rgbToAnsi256(127, 127, 127);
    const expected = 244;
    expect(received).toEqual(expected);
  });

  test(`rgbToAnsi256(16, 16, 16) greyscale`, () => {
    const received = rgbToAnsi256(15, 15, 15);
    const expected = 233;
    expect(received).toEqual(expected);
  });

  test(`rgbToAnsi256(127, 63, 63) color`, () => {
    const received = rgbToAnsi256(200, 16, 16);
    const expected = 160;
    expect(received).toEqual(expected);
  });
});

describe('convert ANSI 256 to ANSI 16', () => {
  test(`black`, () => {
    const received = ansi256To16(0);
    const expected = 30;
    expect(received).toEqual(expected);
  });

  test(`white`, () => {
    const received = ansi256To16(7);
    const expected = 37;
    expect(received).toEqual(expected);
  });

  test(`whiteBright`, () => {
    const received = ansi256To16(15);
    const expected = 97;
    expect(received).toEqual(expected);
  });

  test(`ansi256To16(232) -> black`, () => {
    const received = ansi256To16(233);
    const expected = 30;
    expect(received).toEqual(expected);
  });

  test(`redBright`, () => {
    const received = ansi256To16(196);
    const expected = 91;
    expect(received).toEqual(expected);
  });

  test(`red`, () => {
    const received = ansi256To16(124);
    const expected = 31;
    expect(received).toEqual(expected);
  });

  test(`blue`, () => {
    const received = ansi256To16(20);
    const expected = 34;
    expect(received).toEqual(expected);
  });

  test(`blueBright`, () => {
    const received = ansi256To16(27);
    const expected = 94;
    expect(received).toEqual(expected);
  });

  test(`green`, () => {
    const received = ansi256To16(34);
    const expected = 32;
    expect(received).toEqual(expected);
  });

  test(`greenBright`, () => {
    const received = ansi256To16(82);
    const expected = 92;
    expect(received).toEqual(expected);
  });
});

describe('convert RGB to ANSI 16', () => {
  test(`redBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#ff6e67'));
    const expected = 91;
    expect(received).toEqual(expected);
  });

  test(`red`, () => {
    const received = rgbToAnsi16(...hexToRgb('#c91b00'));
    const expected = 31;
    expect(received).toEqual(expected);
  });

  test(`blue`, () => {
    const received = rgbToAnsi16(...hexToRgb('#0225c7'));
    const expected = 34;
    expect(received).toEqual(expected);
  });

  test(`blueBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#6871ff'));
    const expected = 94;
    expect(received).toEqual(expected);
  });

  test(`green`, () => {
    const received = rgbToAnsi16(...hexToRgb('#00c200'));
    const expected = 32;
    expect(received).toEqual(expected);
  });

  test(`greenBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#5ffa68'));
    const expected = 92;
    expect(received).toEqual(expected);
  });
});

describe('CI tools', () => {
  test(`GitHub CI`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { CI: true, GITHUB_ACTIONS: true },
        argv: [],
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`GitLab CI`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { CI: true, GITLAB_CI: true },
        argv: [],
      },

    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`Azure CI`, () => {
    const received = colorSpace({
      process: {
        env: { TF_BUILD: true },
        argv: [],
      },

    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`TeamCity`, () => {
    const received = colorSpace({
      process: {
        env: { TEAMCITY_VERSION: '2020.1.1' },
        argv: [],
      },

    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });
});

describe('flags and options', () => {
  test(`--color`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: {},
        argv: ['--color'],
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`-color`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: {},
        argv: ['-color'],
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`--color=true`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'dumb' },
        argv: ['--color=true'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`-color=true`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'dumb' },
        argv: ['-color=true'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`--color=false`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm' },
        argv: ['--color=false'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`--color=never`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm' },
        argv: ['--color=never'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`NO_COLOR=1`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { NO_COLOR: '1', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });
});

// FORCE_COLOR
describe('FORCE_COLOR', () => {
  test(`not exists FORCE_COLOR`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: {},
        argv: [],
      },
    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=false`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'false', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=0`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '0', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR unset, no isTTY`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '' },
        argv: [],
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR unset, TERM=xterm-256color, no isTTY`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '', TERM: 'xterm-256color' },
        argv: [],
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR unset, TERM=xterm-256color, isTTY`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '', TERM: 'xterm-256color' },
        argv: [],
        stdout: { isTTY: true },
      },
    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=true`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true' },
        argv: [],
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=true, TERM=dumb`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'dumb', FORCE_COLOR: 'true' },
        argv: [],
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=true, COLORTERM=truecolor`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'truecolor' },
        argv: [],
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=true, COLORTERM=ansi256`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'ansi256' },
        argv: [],
      },
    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=true, COLORTERM=ansi`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'ansi' },
        argv: [],
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=1`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '1' },
        argv: [],
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=2`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '2' },
        argv: [],
      },
    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR=3`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '3' },
        argv: [],
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
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
  //   const expected = SPACE_TRUECOLOR;
  //   expect(received).toEqual(expected);
  // });

  test(`FORCE_COLOR=something`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'something' },
        argv: [],
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`isTTY false, FORCE_COLOR=1`, () => {
    const received = colorSpace({
      Deno: {
        env: {
          toObject: () => ({ FORCE_COLOR: 1 }),
        },
        args: [],
        build: {
          os: 'linux',
        },
        isatty: (rid) => false, // analog to process.stdout.isTTY in node
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });
});

describe('color space', () => {
  test(`Any new unknown terminal should support TrueColor (defaults)`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'any-new-term' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });
});

describe('COLORTERM', () => {
  test(`detect truecolor from COLORTERM`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm', COLORTERM: 'truecolor' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`detect 256 colors from COLORTERM`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm', COLORTERM: 'ansi256' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`detect 16 colors from COLORTERM`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256color', COLORTERM: 'ansi' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS
    expect(received).toEqual(expected);
  });

});

describe('support colors in terminals', () => {
  test(`xterm`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`xterm-16colour`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-16colour' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`xterm-256`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`xterm-256color`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256color' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`xterm-256colour`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-256colour' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`xterm-kitty`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm-kitty' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`vt220`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'vt220' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`vt320-w`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'vt320-w' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`vt52`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'vt52' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`vt525`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'vt525' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`tmux`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'tmux' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`mintty-direct`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'mintty-direct' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

  test(`ansi.sysk`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { TERM: 'ansi.sysk' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = SPACE_16COLORS;
    expect(received).toEqual(expected);
  });

});

// Node.JS
describe('Node.JS different env', () => {
  test(`process undefined`, () => {
    // save original `process` object
    const processOriginal = process;
    process = undefined;

    const received = colorSpace(undefined);
    const expected = SPACE_BW;
    expect(received).toEqual(expected);

    // restore original `process` object
    process = processOriginal;
  });

  test(`processMock {}`, () => {
    const received = colorSpace({});
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`colors on windows platform`, () => {
    const received = colorSpace({
      process: {
        platform: 'win32',
        env: {},
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`no colors, unsupported terminal`, () => {
    const received = colorSpace({
      process: {
        env: { TERM: 'dumb' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`no colors, simulate output in file > log.txt`, () => {
    const received = colorSpace({
      process: {
        env: { TERM: 'xterm' },
        argv: [],
      },

    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`COLORTERM: 'truecolor'`, () => {
    const received = colorSpace({
      process: {
        env: { COLORTERM: 'truecolor' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`PM2: no isTTY but COLORTERM: 'truecolor'`, () => {
    const received = colorSpace({
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
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });

  test(`PM2: no isTTY and unsupported terminal`, () => {
    const received = colorSpace({
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
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });
});

// Deno
describe('Deno support', () => {
  test(`env TERM`, () => {
    const received = colorSpace({
      Deno: {
        env: {
          toObject: () => ({ TERM: 'xterm-256color' }),
        },
        args: [],
        build: {
          os: 'linux', // win32
        },
        isatty: (rid) => rid === 1, // analog to process.stdout.isTTY in node
      },

    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`no permissions`, () => {
    const received = colorSpace({
      Deno: {
        env: {
          toObject: () => {
            // throw error to simulate no permission
            throw new Error('np permissions');
          },
        },
        args: [],
        build: {
          os: 'linux',
        },
        isatty: (rid) => rid === 1, // analog to process.stdout.isTTY in node
      },

    });
    const expected = SPACE_BW;
    expect(received).toEqual(expected);
  });

  test(`platform win`, () => {
    const received = colorSpace({
      Deno: {
        env: {
          toObject: () => ({ TERM: '' }),
        },
        args: [],
        build: {
          os: 'win32',
        },
        isatty: (rid) => true, // analog to process.stdout.isTTY in node
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });



  test(`flag '--color'`, () => {
    const received = colorSpace({
      Deno: {
        env: {
          toObject: () => ({}),
        },
        args: ['--color'],
        build: {
          os: 'linux',
        },
        isatty: (rid) => false, // analog to process.stdout.isTTY in node
      },

    });
    const expected = SPACE_TRUECOLOR;
    expect(received).toEqual(expected);
  });
});

// Next.JS
describe('Next.JS support', () => {
  test(`runtime experimental-edge`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'experimental-edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`runtime edge`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });

  test(`runtime nodejs`, () => {
    const received = colorSpace({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'nodejs', TERM: 'xterm-256color' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = SPACE_256COLORS;
    expect(received).toEqual(expected);
  });
});