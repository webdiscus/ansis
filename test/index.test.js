import { esc } from './utils/helpers.js';
import ansis, { Ansis, red, yellow, green } from '../src/index.mjs';

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

  test(`ansis.bgAnsi256(97)`, (done) => {
    const received = ansis.bgAnsi256(97)('foo');
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
  test(`ansis('OK')`, (done) => {
    const received = ansis('OK');
    const expected = 'OK';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

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

  test(`strip()`, (done) => {
    const received = ansis.strip('\x1b[36m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m');
    const expected = 'foo';
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
    ansis.extend({ orange: '#FFAB40' });

    const received = ansis.orange.bold('text');
    const expected = '\x1b[38;2;255;171;64m\x1b[1mtext\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });

  test('new ansis`', (done) => {
    const ansis = new Ansis();
    ansis.extend({ orange: '#FFAB40' });

    // test the order bold > orange
    const received = ansis.bold.orange('text');
    const expected = '\x1b[1m\x1b[38;2;255;171;64mtext\x1b[39m\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
    done();
  });
});