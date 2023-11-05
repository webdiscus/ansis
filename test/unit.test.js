import { hexToRgb, clamp } from '../src/utils.js';
import { isSupported } from '../src/ansi-codes.js';

describe('utils tests', () => {
  test(`hexToRgb('FFAA99')`, (done) => {
    const received = hexToRgb('FFAA99');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
    done();
  });

  test(`hexToRgb('#FFAA99')`, (done) => {
    const received = hexToRgb('#FFAA99');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
    done();
  });

  test(`hexToRgb('#FA9')`, (done) => {
    const received = hexToRgb('#FA9');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
    done();
  });

  test(`hexToRgb('#FF99')`, (done) => {
    const received = hexToRgb('#FF99');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
    done();
  });

  test(`hexToRgb('something')`, (done) => {
    const received = hexToRgb('something');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
    done();
  });

  test(`clamp(3, 0, 2)`, (done) => {
    const received = clamp(3, 0, 2);
    const expected = 2;
    expect(received).toEqual(expected);
    done();
  });

  test(`clamp(0, 1, 2)`, (done) => {
    const received = clamp(0, 1, 2);
    const expected = 1;
    expect(received).toEqual(expected);
    done();
  });
});

// Node.JS
describe('Node.JS isSupported', () => {
  test(`process undefined`, (done) => {
    // save original `process` object
    const processOriginal = process;
    process = undefined;

    const received = isSupported(undefined);
    const expected = false;
    expect(received).toEqual(expected);

    // restore original `process` object
    process = processOriginal;
    done();
  });

  test(`processMock undefined`, (done) => {
    const received = isSupported(undefined);
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`processMock {}`, (done) => {
    const received = isSupported({});
    const expected = false;
    expect(received).toEqual(expected);
    done();
  });

  test(`colors in linux terminal`, (done) => {
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
    done();
  });

  test(`colors on windows platform`, (done) => {
    const received = isSupported({
      process: {
        platform: 'win32',
        env: {},
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`colors in any CI`, (done) => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { CI: 'GITLAB_CI' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`no colors, unsupported terminal`, (done) => {
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
    done();
  });

  test(`no colors, simulate output in file > log.txt`, (done) => {
    const received = isSupported({
      process: {
        env: { TERM: 'xterm' },
        argv: [],
      },

    });
    const expected = false;
    expect(received).toEqual(expected);
    done();
  });

  test(`enable colors via --color`, (done) => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: {},
        argv: ['--color'],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`enable colors via -color`, (done) => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: {},
        argv: ['-color'],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`enable colors via --color=true`, (done) => {
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
    done();
  });

  test(`enable colors via -color=true`, (done) => {
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
    done();
  });

  test(`disable colors via --color=false`, (done) => {
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
    done();
  });

  test(`disable colors via NO_COLOR=1`, (done) => {
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
    done();
  });

  test(`disable colors via FORCE_COLOR=0`, (done) => {
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
    done();
  });

  test(`disable colors via FORCE_COLOR=false`, (done) => {
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
    done();
  });

  test(`enable colors via FORCE_COLOR=1`, (done) => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: '1' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`enable colors via FORCE_COLOR=true`, (done) => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { FORCE_COLOR: 'true' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

});

// Deno
describe('Deno isSupported', () => {
  test(`env TERM`, (done) => {
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
    done();
  });

  test(`platform win`, (done) => {
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
    done();
  });

  test(`FORCE_COLOR`, (done) => {
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
    done();
  });

  test(`flag '--color'`, (done) => {
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
    done();
  });
});

// Next.JS
describe('Next.JS isSupported', () => {
  test(`runtime experimental-edge`, (done) => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'experimental-edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`runtime edge`, (done) => {
    const received = isSupported({
      process: {
        platform: 'linux',
        env: { NEXT_RUNTIME: 'edge', TERM: 'xterm-256color' },
        argv: [],
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`runtime nodejs`, (done) => {
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
    done();
  });
});