import { describe, test, expect } from 'vitest';
import { esc } from './utils/helpers.js';

// import env variables to simulate truecolor color space in CLI
import './env/color-space.truecolor.js';

//import ansis, { Ansis, red, yellow, green, bold, hex } from '../src/index.mjs'; // use it for debugging only
import ansis, { Ansis, red, yellow, green, bold, hex } from 'ansis'; // test build package

describe('support colors', () => {
  test(`ansis.isSupported()`, () => {
    const received = ansis.isSupported();
    const expected = true;
    expect(received).toEqual(expected);
  });
});

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

  // experimental link: not widely supported
  // test(`ansis.link('foo')`, () => {
  //   const received = ansis.link('https://github.com/webdiscus/ansis')('foo');
  //   const expected = '\x1b]8;;https://github.com/webdiscus/ansis\x07foo\x1b]8;;\x07';
  //   expect(esc(received)).toEqual(esc(expected));
  // });
});

describe('advanced features tests', () => {
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

  test(`nested multi styles using template strings`, () => {
    const rgb = ansis.rgb(100, 80, 155);
    const received = ansis.red
      `begin ${rgb.bold('RGB')} ${ansis.yellow('yellow')} red ${ansis.italic.cyan('italic cyan')} red ${ansis.red(
        'red')} red ${ansis.underline.green.italic(`underline italic green ${ansis.rgb(80, 120, 200)(
        'underline italic blue')} underline italic green`)} red ${ansis.cyan('cyan')} red ${ansis.bold.yellow(
        'bold yellow')} red ${ansis.green('green')} end`;

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

  test(`fg == ansi256`, () => {
    const received = ansis.fg(96)('foo');
    const expected = ansis.ansi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`bg == bgAnsi256`, () => {
    const received = ansis.bg(96)('foo');
    const expected = ansis.bgAnsi256(96)('foo');
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansi256(96).fg(96)('foo')`, () => {
    const received = ansis.ansi256(96).fg(96)('foo');
    const expected = '\x1b[38;5;96m\x1b[38;5;96mfoo\x1b[39m\x1b[39m';
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

    // destruct extended color
    const { orange } = ansis;

    const received = orange.bold('text');
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

describe('handling numbers', () => {
  test(`ansis(123)`, () => {
    const num = 123;
    const received = ansis(num);
    const expected = '123';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.bold(123)`, () => {
    const num = 123;
    const received = ansis.bold(num);
    const expected = '\x1b[1m123\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ansis.red(123)`, () => {
    const num = 123;
    const received = ansis.red(num);
    const expected = '\x1b[31m123\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`red(123)`, () => {
    const num = 123;
    const received = red(num);
    const expected = '\x1b[31m123\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`bold(123)`, () => {
    const num = 123;
    const received = bold(num);
    const expected = '\x1b[1m123\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`red.bold(123)`, () => {
    const num = 123;
    const received = red.bold(num);
    const expected = '\x1b[31m\x1b[1m123\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`hex('#A00')(123)`, () => {
    const num = 123;
    const received = hex('#A00')(num);
    const expected = '\x1b[38;2;170;0;0m123\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('red`size: ${123}px`', () => {
    const num = 123;
    const received = red`size: ${num}px`;
    const expected = '\x1b[31msize: 123px\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('base ANSI 16 colors', () => {
  // foreground colors
  test(`ansis.black('foo')`, () => {
    const received = ansis.black('foo');
    const expected = '\x1b[30mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.red('foo')`, () => {
    const received = ansis.red('foo');
    const expected = '\x1b[31mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.green('foo')`, () => {
    const received = ansis.green('foo');
    const expected = '\x1b[32mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.yellow('foo')`, () => {
    const received = ansis.yellow('foo');
    const expected = '\x1b[33mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.blue('foo')`, () => {
    const received = ansis.blue('foo');
    const expected = '\x1b[34mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.magenta('foo')`, () => {
    const received = ansis.magenta('foo');
    const expected = '\x1b[35mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.cyan('foo')`, () => {
    const received = ansis.cyan('foo');
    const expected = '\x1b[36mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.white('foo')`, () => {
    const received = ansis.white('foo');
    const expected = '\x1b[37mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.blackBright('foo')`, () => {
    const received = ansis.blackBright('foo');
    const expected = '\x1b[90mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.redBright('foo')`, () => {
    const received = ansis.redBright('foo');
    const expected = '\x1b[91mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.greenBright('foo')`, () => {
    const received = ansis.greenBright('foo');
    const expected = '\x1b[92mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.yellowBright('foo')`, () => {
    const received = ansis.yellowBright('foo');
    const expected = '\x1b[93mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.blueBright('foo')`, () => {
    const received = ansis.blueBright('foo');
    const expected = '\x1b[94mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.magentaBright('foo')`, () => {
    const received = ansis.magentaBright('foo');
    const expected = '\x1b[95mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.cyanBright('foo')`, () => {
    const received = ansis.cyanBright('foo');
    const expected = '\x1b[96mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.whiteBright('foo')`, () => {
    const received = ansis.whiteBright('foo');
    const expected = '\x1b[97mfoo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  // background colors
  test(`ansis.bgBlack('foo')`, () => {
    const received = ansis.bgBlack('foo');
    const expected = '\x1b[40mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgRed('foo')`, () => {
    const received = ansis.bgRed('foo');
    const expected = '\x1b[41mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgGreen('foo')`, () => {
    const received = ansis.bgGreen('foo');
    const expected = '\x1b[42mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgYellow('foo')`, () => {
    const received = ansis.bgYellow('foo');
    const expected = '\x1b[43mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgBlue('foo')`, () => {
    const received = ansis.bgBlue('foo');
    const expected = '\x1b[44mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgMagenta('foo')`, () => {
    const received = ansis.bgMagenta('foo');
    const expected = '\x1b[45mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgCyan('foo')`, () => {
    const received = ansis.bgCyan('foo');
    const expected = '\x1b[46mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgWhite('foo')`, () => {
    const received = ansis.bgWhite('foo');
    const expected = '\x1b[47mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgBlackBright('foo')`, () => {
    const received = ansis.bgBlackBright('foo');
    const expected = '\x1b[100mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgRedBright('foo')`, () => {
    const received = ansis.bgRedBright('foo');
    const expected = '\x1b[101mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgGreenBright('foo')`, () => {
    const received = ansis.bgGreenBright('foo');
    const expected = '\x1b[102mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgYellowBright('foo')`, () => {
    const received = ansis.bgYellowBright('foo');
    const expected = '\x1b[103mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgBlueBright('foo')`, () => {
    const received = ansis.bgBlueBright('foo');
    const expected = '\x1b[104mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgMagentaBright('foo')`, () => {
    const received = ansis.bgMagentaBright('foo');
    const expected = '\x1b[105mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgCyanBright('foo')`, () => {
    const received = ansis.bgCyanBright('foo');
    const expected = '\x1b[106mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
  test(`ansis.bgWhiteBright('foo')`, () => {
    const received = ansis.bgWhiteBright('foo');
    const expected = '\x1b[107mfoo\x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('custom theme', () => {
  // define theme
  const theme = {
    info: ansis.green,
    warn: ansis.yellow,
    error: ansis.red,
  };

  test(`theme.info('info')`, () => {
    const received = theme.info('info');
    const expected = '\x1b[32minfo\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`theme.warn('warn')`, () => {
    const received = theme.warn('warn');
    const expected = '\x1b[33mwarn\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`theme.error('error')`, () => {
    const received = theme.error('error');
    const expected = '\x1b[31merror\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});