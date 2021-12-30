import { execSync } from 'child_process';
import path from 'path';

import ansis from '../src/index.js';
import { hexToRgb, clamp } from '../src/utils.js';
import { isSupported } from '../src/ansi-codes.js';

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
  //
});

beforeEach(() => {
  //jest.setTimeout(2000);
});

describe('default tests', () => {
  test(`self test`, (done) => {
    let received = 'OK';
    const expected = 'OK';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis()`, (done) => {
    let received = ansis('OK');
    const expected = 'OK';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('isSupported', () => {
  test(`true`, (done) => {
    let received = isSupported({});
    const expected = false;
    expect(received).toEqual(expected);
    done();
  });

  test(`true`, (done) => {
    let received = isSupported({
      platform: 'win32',
      env: { FORCE_COLOR: true, CI: 'GITLAB_CI', TERM: 'ansi' },
      argv: ['--color'],
      stdout: { isTTY: true },
      stderr: { isTTY: true },
    });
    const expected = true;
    expect(received).toEqual(expected);
    done();
  });

  test(`false`, (done) => {
    let received = isSupported({
      env: { NO_COLOR: true, TERM: 'dumb' },
      argv: ['--color=false', '--no-color'],
      stdout: {},
      stderr: {},
    });
    const expected = false;
    expect(received).toEqual(expected);
    done();
  });
});

describe('utils tests', () => {
  test(`hexToRgb('FFAA99')`, (done) => {
    let received = hexToRgb('FFAA99');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
    done();
  });

  test(`hexToRgb('#FFAA99')`, (done) => {
    let received = hexToRgb('#FFAA99');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
    done();
  });

  test(`hexToRgb('#FA9')`, (done) => {
    let received = hexToRgb('#FA9');
    const expected = [255, 170, 153];
    expect(received).toEqual(expected);
    done();
  });

  test(`hexToRgb('#FF99')`, (done) => {
    let received = hexToRgb('#FF99');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
    done();
  });

  test(`hexToRgb('something')`, (done) => {
    let received = hexToRgb('something');
    const expected = [0, 0, 0];
    expect(received).toEqual(expected);
    done();
  });

  test(`clamp(3, 0, 2)`, (done) => {
    let received = clamp(3, 0, 2);
    const expected = 2;
    expect(received).toEqual(expected);
    done();
  });

  test(`clamp(0, 1, 2)`, (done) => {
    let received = clamp(0, 1, 2);
    const expected = 1;
    expect(received).toEqual(expected);
    done();
  });
});

describe('node script flags', () => {
  test(`flag --color`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    let received = execScriptSync(filename, ['--color']);
    const expected =
      '\x1b[31mred\x1b[39m|\x1b[38;2;80;80;80mrgb\x1b[39m|\x1b[48;2;80;80;80mbgRgb\x1b[49m|\x1b[38;2;255;255;255mhex\x1b[39m|\x1b[48;2;255;255;255mbgHex\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`flag --color=false`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    let received = execScriptSync(filename, ['--color=false']);
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`flag --no-color`, (done) => {
    const filename = path.join(TEST_PATH, './cli/output.js');
    let received = execScriptSync(filename, ['--no-color']);
    const expected = 'red|rgb|bgRgb|hex|bgHex';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});

describe('style tests', () => {
  test(`ansis.visible('foo')`, (done) => {
    let received = ansis.visible('foo');
    const expected = 'foo';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.green('')`, (done) => {
    let received = ansis.green('');
    const expected = '';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.green('foo', 'bar')`, (done) => {
    let received = ansis.green(['foo', 'bar'].join(' '));
    const expected = '\x1b[32mfoo bar\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgMagenta('foo')`, (done) => {
    let received = ansis.bgMagenta('foo');
    const expected = '\x1b[45mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.green.bold.underline.italic()`, (done) => {
    let received = ansis.green.bold.underline.italic('foo');
    const expected = '\x1b[32m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.cyan(ansis.bold(ansis.underline(ansis.italic('foo'))))`, (done) => {
    let received = ansis.cyan(ansis.bold(ansis.underline(ansis.italic('foo'))));
    const expected = '\x1b[36m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.rgb(80, 100, 150)`, (done) => {
    let received = ansis.rgb(80, 100, 150)('foo');
    const expected = '\x1b[38;2;80;100;150mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgRgb(80, 100, 150)`, (done) => {
    let received = ansis.bgRgb(80, 100, 150)('foo');
    const expected = '\x1b[48;2;80;100;150mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.hex('#ABC')`, (done) => {
    let received = ansis.hex('#ABC')('foo');
    const expected = '\x1b[38;2;170;187;204mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgHex('#ABC123')`, (done) => {
    let received = ansis.bgHex('#ABC123')('foo');
    const expected = '\x1b[48;2;171;193;35mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.ansi256(97)`, (done) => {
    let received = ansis.ansi256(97)('foo');
    const expected = '\x1b[38;5;97mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.ansi(97)`, (done) => {
    let received = ansis.ansi(97)('foo');
    const expected = '\x1b[38;5;97mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgAnsi256(97)`, (done) => {
    let received = ansis.bgAnsi256(97)('foo');
    const expected = '\x1b[48;5;97mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.bgAnsi(97)`, (done) => {
    let received = ansis.bgAnsi(97)('foo');
    const expected = '\x1b[48;5;97mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`ansis.green('\nHello\nNew line\nNext new line.\n')`, (done) => {
    let received = ansis.green('\nHello\nNew line\nNext new line.\n');
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
    let received = ansis.red('foo' + ansis.underline.bgBlue('bar') + '!');
    const expected = '\x1b[31mfoo\x1b[4m\x1b[44mbar\x1b[49m\x1b[24m!\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`nested prop.parent`, (done) => {
    const rgb = ansis.rgb(100, 80, 155);
    let received = ansis.green.bold.underline(`foo ${ansis.red.italic('bar')} foo`);

    const expected = '\x1b[32m\x1b[1m\x1b[4mfoo \x1b[31m\x1b[3mbar\x1b[23m\x1b[32m foo\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test(`nested multi styles`, (done) => {
    const rgb = ansis.rgb(100, 80, 155);
    let received = ansis.red(
      `begin ${rgb.bold('RGB')} ${ansis.yellow('yellow')} red ${ansis.italic.cyan('italic cyan')} red ${ansis.red(
        'red'
      )} red ${ansis.underline.green.italic(
        `underline italic green ${ansis.rgb(80, 120, 200)('underline italic blue')} underline italic green`
      )} red ${ansis.cyan('cyan')} red ${ansis.bold.yellow('bold yellow')} red ${ansis.green('green')} end`
    );

    const expected =
      '\x1b[31mbegin \x1b[38;2;100;80;155m\x1b[1mRGB\x1b[22m\x1b[31m \x1b[33myellow\x1b[31m red \x1b[3m\x1b[36mitalic cyan\x1b[31m\x1b[23m red \x1b[31mred\x1b[31m red \x1b[4m\x1b[32m\x1b[3munderline italic green \x1b[38;2;80;120;200munderline italic blue\x1b[32m underline italic green\x1b[23m\x1b[31m\x1b[24m red \x1b[36mcyan\x1b[31m red \x1b[1m\x1b[33mbold yellow\x1b[31m\x1b[22m red \x1b[32mgreen\x1b[31m end\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});