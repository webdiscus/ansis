import { hexToRgb, clamp } from '../src/utils.js';
import { isSupported } from '../src/color-support.js';

describe('utils tests', () => {
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

  test(`hexToRgb('#FF99')`, () => {
    const received = hexToRgb('#FF99');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
  });

  test(`hexToRgb('something')`, () => {
    const received = hexToRgb('something');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
  });

  test(`clamp(3, 0, 2)`, () => {
    const received = clamp(3, 0, 2);
    const expected = 2;
    expect(received).toEqual(expected);
  });

  test(`clamp(0, 1, 2)`, () => {
    const received = clamp(0, 1, 2);
    const expected = 1;
    expect(received).toEqual(expected);
  });
});

// Node.JS
describe('Node.JS isSupported', () => {
  test(`process undefined`, () => {
    // save original `process` object
    const processOriginal = process;
    process = undefined;

    const received = isSupported(undefined);
    const expected = false;
    expect(received).toEqual(expected);

    // restore original `process` object
    process = processOriginal;
  });

  test(`processMock undefined`, () => {
    const received = isSupported(undefined);
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`processMock {}`, () => {
    const received = isSupported({});
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`colors in linux terminal`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },
    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`colors on windows platform`, () => {
    const received = isSupported({
      process: {
        platform: 'win32',
        env: {},
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`colors in any CI`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { CI: 'GITLAB_CI' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`no colors, unsupported terminal`, () => {
    const received = isSupported({
      process: {
        env: { TERM: 'dumb' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`no colors, simulate output in file > log.txt`, () => {
    const received = isSupported({
      process: {
        env: { TERM: 'xterm' },
        argv: [],
      },

    });
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`enable colors via --color`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: {},
        argv: ['--color'],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`enable colors via -color`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: {},
        argv: ['-color'],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`enable colors via --color=true`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { TERM: 'dumb' },
        argv: ['--color=true'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`enable colors via -color=true`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { TERM: 'dumb' },
        argv: ['-color=true'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`disable colors via --color=false`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { TERM: 'xterm' },
        argv: ['--color=false'],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`disable colors via NO_COLOR=1`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { NO_COLOR: '1', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`disable colors via FORCE_COLOR=0`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '0', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`disable colors via FORCE_COLOR=false`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'false', TERM: 'xterm' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = false;
    expect(received).toEqual(expected);
  });

  test(`enable colors via FORCE_COLOR=1`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '1' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`enable colors via FORCE_COLOR=true`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });
});

// Deno
describe('Deno isSupported', () => {
  test(`env TERM`, () => {
    const received = isSupported({
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
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`platform win`, () => {
    const received = isSupported({
      Deno: {
        env: {
          toObject: () => ({ TERM: '' }),
        },
        args: [],
        build: {
          os: 'win32',
        },
        isatty: (rid) => false, // analog to process.stdout.isTTY in node
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`FORCE_COLOR`, () => {
    const received = isSupported({
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
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`flag '--color'`, () => {
    const received = isSupported({
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
    const expected = true;
    expect(received).toEqual(expected);
  });
});

// Next.JS
describe('Next.JS isSupported', () => {
  test(`runtime experimental-edge`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'experimental-edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`runtime edge`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });

  test(`runtime nodejs`, () => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'nodejs', TERM: 'xterm-256color' },
        argv: [],
        stdout: { isTTY: true },
        stderr: { isTTY: true },
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
  });
});