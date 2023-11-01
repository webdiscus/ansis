import {execSync} from 'child_process';
import path from 'path';

// test distributed version
import ansis, {Ansis} from '../src/index.js';
import {hexToRgb, clamp} from '../src/utils.js';
import {isSupported} from '../src/ansi-codes.js';
import {green, red, yellow} from '../src/colors.mjs';

const TEST_PATH = path.resolve('./test/');

/**
 * Return output of javascript file.
 *
 * @param {string} file
 * @param {array} flags
 * @return {string}
 */
const execScriptSync = (file, flags = []) => {
  const result = execSync('node ' + file + ' ' + flags.join(' '));
  // replace last newline in result
  return result.toString().replace(/\n$/, '');
};

/**
 * Escape the slash `\` in ESC-symbol.
 * Use it to show by an error the received ESC sequence string in console output.
 *
 * @param {string} str
 * @returns {string}
 */
const esc = (str) => str.replace(/\x1b/g, '\\x1b');

beforeAll(() => {
});

beforeEach(() => {
});

describe('default tests', () => {
  test(`self test`, (done) => {
    const received = 'OK';
    const expected = 'OK';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis()`, (done) => {
    const received = ansis('OK');
    const expected = 'OK';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('utils tests', () => {
  test(`strip()`, (done) => {
    const received = ansis.strip('\x1b[36m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m');
    const expected = 'foo';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

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

describe('node script flags', () => {
  test(`flag --color`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--color']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`flag --color=false`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--color=false']);
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`flag --no-color`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    const received = execScriptSync(filename, ['--no-color']);
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('style tests', () => {
  test(`ansis.visible('foo')`, (done) => {
    const received = ansis.visible('foo');
    const expected = 'foo';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`visible with template literal`, (done) => {
    const received = ansis.visible`foo ${green`bar`}`;
    const expected = 'foo \x1b[32mbar\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.green('')`, (done) => {
    const received = ansis.green('');
    const expected = '';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.green('foo', 'bar')`, (done) => {
    const received = ansis.green(['foo', 'bar'].join(' '));
    const expected = '\x1b[32mfoo bar\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgMagenta('foo')`, (done) => {
    const received = ansis.bgMagenta('foo');
    const expected = '\x1b[45mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.green.bold.underline.italic()`, (done) => {
    const received = ansis.green.bold.underline.italic('foo');
    const expected = '\x1b[32m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.cyan(ansis.bold(ansis.underline(ansis.italic('foo'))))`, (done) => {
    const received = ansis.cyan(ansis.bold(ansis.underline(ansis.italic('foo'))));
    const expected = '\x1b[36m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.rgb(80, 100, 150)`, (done) => {
    const received = ansis.rgb(80, 100, 150)('foo');
    const expected = '\x1b[38;2;80;100;150mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgRgb(80, 100, 150)`, (done) => {
    const received = ansis.bgRgb(80, 100, 150)('foo');
    const expected = '\x1b[48;2;80;100;150mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.hex('#ABC')`, (done) => {
    const received = ansis.hex('#ABC')('foo');
    const expected = '\x1b[38;2;170;187;204mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgHex('#ABC123')`, (done) => {
    const received = ansis.bgHex('#ABC123')('foo');
    const expected = '\x1b[48;2;171;193;35mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.ansi256(97)`, (done) => {
    const received = ansis.ansi256(97)('foo');
    const expected = '\x1b[38;5;97mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.ansi(97)`, (done) => {
    const received = ansis.ansi(97)('foo');
    const expected = '\x1b[38;5;97mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgAnsi256(97)`, (done) => {
    const received = ansis.bgAnsi256(97)('foo');
    const expected = '\x1b[48;5;97mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgAnsi(97)`, (done) => {
    const received = ansis.bgAnsi(97)('foo');
    const expected = '\x1b[48;5;97mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.green('\nHello\nNew line\nNext new line.\n')`, (done) => {
    const received = ansis.green('\nHello\nNew line\nNext new line.\n');
    const expected = `\x1b[32m\x1b[39m
\x1b[32mHello\x1b[39m
\x1b[32mNew line\x1b[39m
\x1b[32mNext new line.\x1b[39m
\x1b[32m\x1b[39m`;
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('functional tests', () => {
  test(`nested styles`, (done) => {
    const received = ansis.red('foo' + ansis.underline.bgBlue('bar') + '!');
    const expected = '\x1b[31mfoo\x1b[4m\x1b[44mbar\x1b[49m\x1b[24m!\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`nested prop.parent`, (done) => {
    const rgb = ansis.rgb(100, 80, 155);
    const received = ansis.green.bold.underline(`foo ${ansis.red.italic('bar')} foo`);

    const expected = '\x1b[32m\x1b[1m\x1b[4mfoo \x1b[31m\x1b[3mbar\x1b[23m\x1b[32m foo\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`nested multi styles`, (done) => {
    const rgb = ansis.rgb(100, 80, 155);
    const received = ansis.red(
      `begin ${rgb.bold('RGB')} ${ansis.yellow('yellow')} red ${ansis.italic.cyan('italic cyan')} red ${ansis.red(
        'red',
      )} red ${ansis.underline.green.italic(
        `underline italic green ${ansis.rgb(80, 120, 200)('underline italic blue')} underline italic green`,
      )} red ${ansis.cyan('cyan')} red ${ansis.bold.yellow('bold yellow')} red ${ansis.green('green')} end`,
    );

    const expected =
      '\x1b[31mbegin \x1b[38;2;100;80;155m\x1b[1mRGB\x1b[22m\x1b[31m \x1b[33myellow\x1b[31m red \x1b[3m\x1b[36mitalic cyan\x1b[31m\x1b[23m red \x1b[31mred\x1b[31m red \x1b[4m\x1b[32m\x1b[3munderline italic green \x1b[38;2;80;120;200munderline italic blue\x1b[32m underline italic green\x1b[23m\x1b[31m\x1b[24m red \x1b[36mcyan\x1b[31m red \x1b[1m\x1b[33mbold yellow\x1b[31m\x1b[22m red \x1b[32mgreen\x1b[31m end\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('alias tests', () => {
  test(`faint == dim`, (done) => {
    const received = ansis.faint('foo');
    const expected = ansis.dim('foo');
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`strike == strikethrough`, (done) => {
    const received = ansis.strike('foo');
    const expected = ansis.strikethrough('foo');
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`gray == blackBright`, (done) => {
    const received = ansis.gray('foo');
    const expected = ansis.blackBright('foo');
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`grey == gray`, (done) => {
    const received = ansis.grey('foo');
    const expected = ansis.gray('foo');
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`grey.gray('foo')`, (done) => {
    const received = ansis.grey.gray('foo');
    const expected = '\x1b[90m\x1b[90mfoo\x1b[39m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansi == ansi256`, (done) => {
    const received = ansis.ansi(96)('foo');
    const expected = ansis.ansi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`fg == ansi256`, (done) => {
    const received = ansis.fg(96)('foo');
    const expected = ansis.ansi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`bgAnsi == bgAnsi256`, (done) => {
    const received = ansis.bgAnsi(96)('foo');
    const expected = ansis.bgAnsi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`bg == bgAnsi256`, (done) => {
    const received = ansis.bg(96)('foo');
    const expected = ansis.bgAnsi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansi256(96).ansi(96).fg(96)('foo')`, (done) => {
    const received = ansis.ansi256(96).ansi(96).fg(96)('foo');
    const expected = '\x1b[38;5;96m\x1b[38;5;96m\x1b[38;5;96mfoo\x1b[39m\x1b[39m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('template literals tests', () => {
  test('ansis.red`red color`', (done) => {
    const received = ansis.red`red color`;
    const expected = '\x1b[31mred color\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test('red`red ${yellow`yellow ${green`green`} yellow`} red`', (done) => {
    const received = red`red ${yellow`yellow ${green`green`} yellow`} red`;
    const expected = '\x1b[31mred \x1b[33myellow \x1b[32mgreen\x1b[33m yellow\x1b[31m red\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('extend base colors tests', () => {
  test('imported ansis`', (done) => {
    ansis.extend({orange: '#FFAB40'});

    const received = ansis.orange.bold('text');
    const expected = '\x1b[38;2;255;171;64m\x1b[1mtext\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test('new ansis`', (done) => {
    const ansis = new Ansis();
    ansis.extend({orange: '#FFAB40'});

    // test the order bold > orange
    const received = ansis.bold.orange('text');
    const expected = '\x1b[1m\x1b[38;2;255;171;64mtext\x1b[39m\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
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
        env: {TERM: 'xterm'},
        argv: [],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
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
        env: {CI: 'GITLAB_CI'},
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
        env: {TERM: 'dumb'},
        argv: [],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
      },

    });
    const expected = false;
    expect(received).toEqual(expected);
    done();
  });

  test(`no colors, simulate output in file > log.txt`, (done) => {
    const received = isSupported({
      process: {
        env: {TERM: 'xterm'},
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
        env: {TERM: 'dumb'},
        argv: ['--color=true'],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
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
        env: {TERM: 'dumb'},
        argv: ['-color=true'],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
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
        env: {TERM: 'xterm'},
        argv: ['--color=false'],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
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
        env: {NO_COLOR: '1', TERM: 'xterm'},
        argv: [],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
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
        env: {FORCE_COLOR: '0', TERM: 'xterm'},
        argv: [],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
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
        env: {FORCE_COLOR: 'false', TERM: 'xterm'},
        argv: [],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
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
        env: {FORCE_COLOR: '1'},
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
        env: {FORCE_COLOR: 'true'},
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
          toObject: () => ({TERM: 'xterm-256color'}),
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
          toObject: () => ({TERM: ''}),
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
          toObject: () => ({FORCE_COLOR: 1}),
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
        env: {NEXT_RUNTIME: 'experimental-edge', TERM: 'xterm-256color'},
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
        env: {NEXT_RUNTIME: 'edge', TERM: 'xterm-256color'},
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
        env: {NEXT_RUNTIME: 'nodejs', TERM: 'xterm-256color'},
        argv: [],
        stdout: {isTTY: true},
        stderr: {isTTY: true},
      },

    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });
});