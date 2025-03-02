import { describe, test, expect } from 'vitest';
import { esc } from './utils/helpers.js';

// import env variables to simulate truecolor color space in CLI
import './env/truecolor.js';

//import ansis, { Ansis, red, yellow, green, grey, gray, bold, italic, underline, hex } from '../src/index.mjs'; //  // for debugging only
import ansis, { Ansis, red, grey, gray, green, yellow, bold, italic, underline, hex } from 'ansis'; // test npm package

describe('support colors', () => {
  test(`ansis.isSupported()`, () => {
    const received = ansis.isSupported();
    const expected = true;
    expect(received).toEqual(expected);
  });
});

describe('convert function argument to string', () => {
  test(`no argument`, () => {
    const received = ansis.green();
    const expected = '';
    expect(received).toEqual(expected);
  });

  test(`undefined`, () => {
    const received = ansis.green(undefined);
    const expected = '';
    expect(received).toEqual(expected);
  });

  test(`null`, () => {
    const received = ansis.green(null);
    const expected = '';
    expect(received).toEqual(expected);
  });

  test(`undefined in template`, () => {
    let foo;
    // using a template string, `undefined` will be casted into string `undefined`:
    console.log(`Hello ${foo}!`);

    // but ansis handles the `undefined` as an empty string
    const received = green`Hello ${red(foo)}!`;
    console.log(received);
    const expected = '\x1b[32mHello !\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`empty string`, () => {
    // if the argument is an empty string, an empty string w/o ANSI codes should be returned
    const received = ansis.green('');
    const expected = '';
    expect(received).toEqual(expected);
  });

  test(`true`, () => {
    const received = ansis.green(true);
    const expected = '\x1b[32mtrue\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`false`, () => {
    const received = ansis.green(false);
    const expected = '\x1b[32mfalse\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`falsy value 0`, () => {
    const received = ansis.green(0);
    const expected = '\x1b[32m0\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`NaN`, () => {
    const received = ansis.green(100/'5px');
    const expected = '\x1b[32mNaN\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`Infinity`, () => {
    const received = ansis.green(1/0);
    const expected = '\x1b[32mInfinity\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`one space`, () => {
    // why we don't compare with empty string using trim()?
    // because can be used background color for the space
    const received = ansis.bgGreen(' ');
    const expected = '\x1b[42m \x1b[49m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test(`string`, () => {
    const received = ansis.green('green');
    const expected = '\x1b[32mgreen\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`number`, () => {
    const received = ansis.green(1974);
    const expected = '\x1b[32m1974\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`number with separator`, () => {
    const received = ansis.green(999_55);
    const expected = '\x1b[32m99955\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`float`, () => {
    const received = ansis.green(999.55);
    const expected = '\x1b[32m999.55\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`Array<number>`, () => {
    const received = ansis.green([999, 55]);
    const expected = '\x1b[32m999,55\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`Array<string>`, () => {
    const received = ansis.green(['Hello', 'world']);
    const expected = '\x1b[32mHello,world\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`Set<string>`, () => {
    const set = new Set(['Hello', 'world']);
    const received = ansis.green([...set]);
    const expected = '\x1b[32mHello,world\x1b[39m';
    expect(received).toEqual(expected);
  });
});

describe('arguments in template string', () => {
  test(`falsy value 0 in template`, () => {
    const received = ansis.green(`zero ${0} value`);
    const expected = '\x1b[32mzero 0 value\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`null in template`, () => {
    const received = ansis.green(`${null} value`);
    const expected = '\x1b[32mnull value\x1b[39m';
    expect(received).toEqual(expected);
  });
});

describe('handling numbers', () => {
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

describe('style tests', () => {
  test(`visible with template literal`, () => {
    const received = ansis.visible`foo ${green`bar ${red`baz`} bar`} foo`;
    const expected = 'foo \x1b[32mbar \x1b[31mbaz\x1b[32m bar\x1b[39m foo';
    expect(esc(received)).toEqual(esc(expected));
  });


  test(`ansis.green(['foo', 'bar'])`, () => {
    const received = ansis.green(['foo', 'bar']);
    const expected = '\x1b[32mfoo,bar\x1b[39m';
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
});

describe('using newline', () => {
  test(`new line CRLF, windows`, () => {
    const received = ansis.green('Hello\r\nWorld');
    const expected = '\x1b[32mHello\x1b[39m\r\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`newline LF, linux `, () => {
    const received = ansis.green('Hello\nWorld');
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`newline LF in template string`, () => {
    const received = ansis.green`Hello
World`;
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`newline in template string`, () => {
    const received = ansis.green`Hello\nWorld`;
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });

  // 1)
  test(`newline in function used template string`, () => {
    const received = ansis.green(`Hello\nWorld`);
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    //console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });

  // 2)
  test(`newline as expression in template string`, () => {
    const received = ansis.green`Hello${'\n'}World`;
    const expected = '\x1b[32mHello\x1b[39m\n\x1b[32mWorld\x1b[39m';
    //console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`linux new line LF, background`, () => {
    const received = ansis.bgGreen(' Hello \n World ');
    const expected = '\x1b[42m Hello \x1b[49m\n\x1b[42m World \x1b[49m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`multiple new line`, () => {
    const received = ansis.bgGreen(`\nHello\nNew line\nNext new line.\n`);
    const expected = `\x1b[42m\x1b[49m
\x1b[42mHello\x1b[49m
\x1b[42mNew line\x1b[49m
\x1b[42mNext new line.\x1b[49m
\x1b[42m\x1b[49m`;
    //console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`multiple new line, template strings`, () => {
    const received = ansis.bgGreen`\nHello\nNew line\nNext new line.\n`;
    const expected = `\x1b[42m\x1b[49m
\x1b[42mHello\x1b[49m
\x1b[42mNew line\x1b[49m
\x1b[42mNext new line.\x1b[49m
\x1b[42m\x1b[49m`;
    console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('Sequence in template literals', () => {
  test(`Newline escape`, () => {
    const received = ansis.red`foo\nbar`;
    const expected = ansis.red(`foo\nbar`);
    //console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Newline escape, prev\\next`, () => {
    const received = ansis.red`prev\\next`;
    const expected = ansis.red(`prev\\next`);
    //console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Newline escape, \\nice`, () => {
    const received = ansis.red`\\nice`;
    const expected = ansis.red(`\\nice`);
    //console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Tab escape`, () => {
    const received = ansis.red`foo\tbar`;
    const expected = ansis.red(`foo\tbar`);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Identity (pointless) escape`, () => {
    const received = ansis.red`\p`;
    const expected = ansis.red(`\p`);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Backslash escape`, () => {
    const received = ansis.red`\\`;
    const expected = ansis.red(`\\`);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Escape Sequence`, () => {
    const received = ansis.green`\\new\\next\\tab`;
    const expected = '\x1b[32m\\new\\next\\tab\x1b[39m';
    console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`Not Escape Sequence`, () => {
    const received = ansis.green`\nnew\nnext\ttab`;
    const expected = '\x1b[32m\x1b[39m\n' +
      '\x1b[32mnew\x1b[39m\n' +
      '\x1b[32mnext\ttab\x1b[39m';
    console.log(received);
    expect(esc(received)).toEqual(esc(expected));
  });
});

describe('advanced features tests', () => {
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

  test(`caching of aliases`, () => {
    const {gray, grey} = ansis.gray;
    const grayBold = gray.bold.italic;
    const greyBold = grey.bold.underline;

    expect(gray('foo')).toBe(grey('foo'));
    expect(grayBold('bar')).not.toBe(greyBold('bar'));
    expect(grey('baz')).not.toBe(greyBold('baz'));
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

  test('nested gray and gray', () => {
    const received = red`red ${grey.underline`grey ${yellow`yellow ${gray.italic`gray ${green`green`} gray`} yellow`} grey`} red`;
    const expected = '\x1b[31mred \x1b[90m\x1b[4mgrey \x1b[33myellow \x1b[90m\x1b[3mgray \x1b[32mgreen\x1b[90m gray\x1b[23m\x1b[33m yellow\x1b[90m grey\x1b[24m\x1b[31m red\x1b[39m';
    console.log(received); // visual control
    expect(esc(received)).toEqual(esc(expected));
  });

  test('nested gray and gray 2', () => {
    const received = red`red ${underline.grey`grey ${yellow`yellow ${italic.gray`gray ${green`green`} gray`} yellow`} grey`} red`;
    const expected = '\x1b[31mred \x1b[4m\x1b[90mgrey \x1b[33myellow \x1b[3m\x1b[90mgray \x1b[32mgreen\x1b[90m gray\x1b[33m\x1b[23m yellow\x1b[90m grey\x1b[31m\x1b[24m red\x1b[39m';
    console.log(received); // visual control
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
    const ansis = new Ansis(); // workaround to enable using the extended color as a sub-chain item
    ansis.extend({ orange: '#FFAB40' });

    // test the order bold > orange
    const received = ansis.bold.orange('text'); // <= requires new instance of Ansis
    const expected = '\x1b[1m\x1b[38;2;255;171;64mtext\x1b[39m\x1b[22m';
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

describe('styles', () => {
  test(`dim`, () => {
    const received = ansis.dim('foo');
    console.log(received);
    const expected = '\x1b[2mfoo\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`bold`, () => {
    const received = ansis.bold('foo');
    console.log(received);
    const expected = '\x1b[1mfoo\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`italic`, () => {
    const received = ansis.italic('foo');
    console.log(received);
    const expected = '\x1b[3mfoo\x1b[23m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`underline`, () => {
    const received = ansis.underline('foo');
    console.log(received);
    const expected = '\x1b[4mfoo\x1b[24m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`strikethrough`, () => {
    const received = ansis.strikethrough('foo');
    console.log(received);
    const expected = '\x1b[9mfoo\x1b[29m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`inverse`, () => {
    const received = ansis.inverse('foo');
    console.log(received);
    const expected = '\x1b[7mfoo\x1b[27m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`visible`, () => {
    const received = ansis.visible('foo');
    console.log(received);
    const expected = 'foo';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`hidden`, () => {
    const received = ansis.hidden('foo');
    console.log(received);
    const expected = '\x1b[8mfoo\x1b[28m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`reset fn`, () => {
    const received = ansis.reset();
    const expected = '\x1b[0m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`reset in middle`, () => {
    const received = ansis.red('red ' + ansis.reset.underline('underline') + ' text');

    // red + underline + text (in white)
    console.log(received);
    const expected = '\x1b[31mred \x1b[0m\x1b[4munderline\x1b[24m\x1b[0m text\x1b[39m';
    expect(received).toEqual(expected);
  });

  test(`reset in middle only`, () => {
    const { red } = ansis;
    const received = red`red ${red.reset.underline`underline`} red`

    // red + underline + red
    console.log(received);
    const expected = '\x1b[31mred \x1b[31m\x1b[0m\x1b[4munderline\x1b[24m\x1b[0m\x1b[31m red\x1b[39m';

    expect(received).toEqual(expected);
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