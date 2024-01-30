import { esc } from './utils/helpers.js';
import ansis, { Ansis, red, yellow, green } from '../src/index.mjs';

describe('style tests', () => {
  test(`ansis.visible('foo')`, () => {
    const received = ansis.visible('foo');
    const expected = 'foo';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`visible with template literal`, () => {
    const received = ansis.visible`foo ${green`bar`}`;
    const expected = 'foo \x1b[32mbar\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.green('')`, () => {
    const received = ansis.green('');
    const expected = '';
    expect(esc(received)).toEqual(esc(expected));

  });

  test(`ansis.green('foo', 'bar')`, () => {
    const received = ansis.green(['foo', 'bar'].join(' '));
    const expected = '\x1b[32mfoo bar\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.bgMagenta('foo')`, () => {
    const received = ansis.bgMagenta('foo');
    const expected = '\x1b[45mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.green.bold.underline.italic()`, () => {
    const received = ansis.green.bold.underline.italic('foo');
    const expected = '\x1b[32m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.cyan(ansis.bold(ansis.underline(ansis.italic('foo'))))`, () => {
    const received = ansis.cyan(ansis.bold(ansis.underline(ansis.italic('foo'))));
    const expected = '\x1b[36m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.rgb(80, 100, 150)`, () => {
    const received = ansis.rgb(80, 100, 150)('foo');
    const expected = '\x1b[38;2;80;100;150mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.bgRgb(80, 100, 150)`, () => {
    const received = ansis.bgRgb(80, 100, 150)('foo');
    const expected = '\x1b[48;2;80;100;150mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.hex('#ABC')`, () => {
    const received = ansis.hex('#ABC')('foo');
    const expected = '\x1b[38;2;170;187;204mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.bgHex('#ABC123')`, () => {
    const received = ansis.bgHex('#ABC123')('foo');
    const expected = '\x1b[48;2;171;193;35mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.ansi256(97)`, () => {
    const received = ansis.ansi256(97)('foo');
    const expected = '\x1b[38;5;97mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.bgAnsi256(97)`, () => {
    const received = ansis.bgAnsi256(97)('foo');
    const expected = '\x1b[48;5;97mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.green('\nHello\nNew line\nNext new line.\n')`, () => {
    const received = ansis.green('\nHello\nNew line\nNext new line.\n');
    const expected = `\x1b[32m\x1b[39m
\x1b[32mHello\x1b[39m
\x1b[32mNew line\x1b[39m
\x1b[32mNext new line.\x1b[39m
\x1b[32m\x1b[39m`;
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('functional tests', () => {
  test(`ansis('OK')`, () => {
    const received = ansis('OK');
    const expected = 'OK';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`nested styles`, () => {
    const received = ansis.red('foo' + ansis.underline.bgBlue('bar') + '!');
    const expected = '\x1b[31mfoo\x1b[4m\x1b[44mbar\x1b[49m\x1b[24m!\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`nested prop.parent`, () => {
    const rgb = ansis.rgb(100, 80, 155);
    const received = ansis.green.bold.underline(`foo ${ansis.red.italic('bar')} foo`);

    const expected = '\x1b[32m\x1b[1m\x1b[4mfoo \x1b[31m\x1b[3mbar\x1b[23m\x1b[32m foo\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`nested multi styles`, () => {
    const rgb = ansis.rgb(100, 80, 155);
    const received = ansis.red(
      `begin ${rgb.bold('RGB')} ${ansis.yellow('yellow')} red ${ansis.italic.cyan('italic cyan')} red ${ansis.red(
        'red')} red ${ansis.underline.green.italic(`underline italic green ${ansis.rgb(80, 120, 200)(
        'underline italic blue')} underline italic green`)} red ${ansis.cyan('cyan')} red ${ansis.bold.yellow(
        'bold yellow')} red ${ansis.green('green')} end`);

    const expected = '\x1b[31mbegin \x1b[38;2;100;80;155m\x1b[1mRGB\x1b[22m\x1b[31m \x1b[33myellow\x1b[31m red \x1b[3m\x1b[36mitalic cyan\x1b[31m\x1b[23m red \x1b[31mred\x1b[31m red \x1b[4m\x1b[32m\x1b[3munderline italic green \x1b[38;2;80;120;200munderline italic blue\x1b[32m underline italic green\x1b[23m\x1b[31m\x1b[24m red \x1b[36mcyan\x1b[31m red \x1b[1m\x1b[33mbold yellow\x1b[31m\x1b[22m red \x1b[32mgreen\x1b[31m end\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`strip()`, () => {
    const received = ansis.strip('\x1b[36m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m');
    const expected = 'foo';
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('alias tests', () => {
  test(`faint == dim`, () => {
    const received = ansis.faint('foo');
    const expected = ansis.dim('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`strike == strikethrough`, () => {
    const received = ansis.strike('foo');
    const expected = ansis.strikethrough('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`gray == blackBright`, () => {
    const received = ansis.gray('foo');
    const expected = ansis.blackBright('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`grey == gray`, () => {
    const received = ansis.grey('foo');
    const expected = ansis.gray('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`bgGrey == bgGray`, () => {
    const received = ansis.bgGrey('foo');
    const expected = ansis.bgGray('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`grey.gray('foo')`, () => {
    const received = ansis.grey.gray('foo');
    const expected = '\x1b[90m\x1b[90mfoo\x1b[39m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`grey.bgGray('foo')`, () => {
    const received = ansis.grey.bgGray('foo');
    const expected = '\x1b[90m\x1b[100mfoo\x1b[49m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansi == ansi256`, () => {
    const received = ansis.ansi(96)('foo');
    const expected = ansis.ansi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`fg == ansi256`, () => {
    const received = ansis.fg(96)('foo');
    const expected = ansis.ansi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`bgAnsi == bgAnsi256`, () => {
    const received = ansis.bgAnsi(96)('foo');
    const expected = ansis.bgAnsi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`bg == bgAnsi256`, () => {
    const received = ansis.bg(96)('foo');
    const expected = ansis.bgAnsi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansi256(96).ansi(96).fg(96)('foo')`, () => {
    const received = ansis.ansi256(96).ansi(96).fg(96)('foo');
    const expected = '\x1b[38;5;96m\x1b[38;5;96m\x1b[38;5;96mfoo\x1b[39m\x1b[39m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('template literals tests', () => {
  test('ansis.red`red color`', () => {
    const received = ansis.red`red color`;
    const expected = '\x1b[31mred color\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('red`red ${yellow`yellow ${green`green`} yellow`} red`', () => {
    const received = red`red ${yellow`yellow ${green`green`} yellow`} red`;
    const expected = '\x1b[31mred \x1b[33myellow \x1b[32mgreen\x1b[33m yellow\x1b[31m red\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('extend base colors tests', () => {
  test('imported ansis`', () => {
    ansis.extend({ orange: '#FFAB40' });

    const received = ansis.orange.bold('text');
    const expected = '\x1b[38;2;255;171;64m\x1b[1mtext\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('new ansis`', () => {
    const ansis = new Ansis();
    ansis.extend({ orange: '#FFAB40' });

    // test the order bold > orange
    const received = ansis.bold.orange('text');
    const expected = '\x1b[1m\x1b[38;2;255;171;64mtext\x1b[39m\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });
});