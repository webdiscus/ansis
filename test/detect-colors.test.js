import { expect, describe, test } from 'vitest';

import { getLevel } from '../src/color-support.js';
import { LEVEL_BW, LEVEL_16COLORS, LEVEL_256COLORS, LEVEL_TRUECOLOR } from '../src/color-levels.js';

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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_TRUECOLOR);
  });

  test(`GitLab CI`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { CI: true, GITLAB_CI: true },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });
});

// Flags / Options
describe('flags and options', () => {
  test(`--color`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: {},
        argv: ['--color'],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_BW);
  });

  test(`FORCE_COLOR true, no isTTY`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`FORCE_COLOR=3, TERM=xterm-256color, no isTTY`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '3', TERM: 'xterm-256color' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_TRUECOLOR);
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
    expect(received).toEqual(LEVEL_256COLORS);
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
    expect(received).toEqual(LEVEL_256COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`FORCE_COLOR=true`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`FORCE_COLOR=true, TERM=dumb`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { TERM: 'dumb', FORCE_COLOR: 'true' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`FORCE_COLOR=true, COLORTERM=truecolor`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'truecolor' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_TRUECOLOR);
  });

  test(`FORCE_COLOR=true, COLORTERM=ansi256`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'ansi256' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_256COLORS);
  });

  test(`FORCE_COLOR=true, COLORTERM=ansi`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true', COLORTERM: 'ansi' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`FORCE_COLOR=1`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '1' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`FORCE_COLOR=2`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '2' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_256COLORS);
  });

  test(`FORCE_COLOR=3`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '3' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_TRUECOLOR);
  });

  test(`FORCE_COLOR=something`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'something' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });
});

// COLORTERM
describe('COLORTERM', () => {
  test(`COLORTERM: 'truecolor'`, () => {
    const received = getLevel({
      process: {
        env: { COLORTERM: 'truecolor' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    expect(received).toEqual(LEVEL_TRUECOLOR);
  });

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
    expect(received).toEqual(LEVEL_TRUECOLOR);
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
    expect(received).toEqual(LEVEL_TRUECOLOR);
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
    expect(received).toEqual(LEVEL_256COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
  });
});

// Terminals
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_256COLORS);
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
    expect(received).toEqual(LEVEL_256COLORS);
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
    expect(received).toEqual(LEVEL_256COLORS);
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
    expect(received).toEqual(LEVEL_TRUECOLOR);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`Browser chromium`, () => {
    const received = getLevel({
      window: {
        chrome: {},
      },
    });
    expect(received).toEqual(LEVEL_TRUECOLOR);
  });

  test(`Browser others`, () => {
    const received = getLevel({
      window: {},
    });
    expect(received).toEqual(LEVEL_BW);
  });

  test(`Unknown system`, () => {
    const received = getLevel({});
    expect(received).toEqual(LEVEL_BW);
  });
});

// Node.JS
describe('Node.JS different env', () => {
  test(`process undefined`, () => {
    // save original `process` object
    const processOriginal = process;
    process = undefined;

    const received = getLevel(globalThis);
    expect(received).toEqual(LEVEL_BW);

    // restore original `process` object
    process = processOriginal;
  });

  test(`processMock {}`, () => {
    const received = getLevel({});
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_TRUECOLOR);
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
    expect(received).toEqual(LEVEL_BW);
  });

  test(`no colors, simulate output in file > log.txt`, () => {
    const received = getLevel({
      process: {
        env: { TERM: 'xterm' },
        argv: [],
      },

    });
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_256COLORS);
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
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_TRUECOLOR);
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
    expect(received).toEqual(LEVEL_16COLORS);
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
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_16COLORS);
  });
});

// Next.JS
describe('Next.JS support', () => {
  test(`runtime experimental-edge, terminal 256 colors`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'experimental-edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    expect(received).toEqual(LEVEL_256COLORS);
  });

  test(`runtime edge, truecolor terminal`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'edge', TERM: 'unknown', COLORTERM: '24bit' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_TRUECOLOR);
  });

  test(`runtime edge, 256 colors`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    expect(received).toEqual(LEVEL_256COLORS);
  });

  test(`runtime edge, unknown terminal`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'edge', TERM: 'unknown' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`runtime not edge`, () => {
    const received = getLevel({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'unsupported' },
        argv: [],
      },
    });
    expect(received).toEqual(LEVEL_BW);
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
    expect(received).toEqual(LEVEL_256COLORS);
  });
});

// PM2
describe('PM2 support', () => {
  test(`no PM2_HOME in evn`, () => {
    const received = getLevel({
      process: {
        env: {
          //PM2_HOME: '/var/www/', // PM2 not exists
          pm_id: '1',
        },
        argv: [],
        stdout: {
          //isTTY: false,
        },
        stderr: {},
      },
    });
    expect(received).toEqual(LEVEL_BW);
  });

  test(`PM2_HOME empty in env`, () => {
    const received = getLevel({
      process: {
        env: {
          PM2_HOME: '', // falsy value is not allowed, traits as not PM2
          pm_id: '1',
        },
        argv: [],
        stdout: {},
        stderr: {},
      },
    });
    expect(received).toEqual(LEVEL_BW);
  });


  test(`PM2_HOME exists in env`, () => {
    const received = getLevel({
      process: {
        env: {
          PM2_HOME: '/var/www/', // the existing value must not be falsy
          pm_id: '1',
        },
        argv: [],
        stdout: {},
        stderr: {},
      },
    });
    expect(received).toEqual(LEVEL_16COLORS);
  });

  test(`no isTTY but COLORTERM: 'truecolor'`, () => {
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
    expect(received).toEqual(LEVEL_TRUECOLOR);
  });

  test(`no isTTY and unsupported terminal`, () => {
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
    expect(received).toEqual(LEVEL_BW);
  });
});