import ansis from '../src/index.js';

import { hexToRgb } from '../src/utils.js';

/**
 * Escape ESC-symbol.
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
});

describe('style tests', () => {
  const colorMethod = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
  const bgColorMethod = ['bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];

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
    let received = ansis.green('foo', 'bar');
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

  test(`ansis.bgAnsi256(97)`, (done) => {
    let received = ansis.bgAnsi256(97)('foo');
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