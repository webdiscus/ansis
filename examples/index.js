#!/usr/bin/env node

import ansis, {Ansis} from '../src/index.js';
import { white, red, green, blue, cyan, cyanBright, yellow, yellowBright, magenta, bold, italic, underline, hex } from '../src/colors.mjs';

const log = console.log;
const style = 'green';
const c = ansis;

const colorizeASCII = ({ ascii, data }, paddingLeft = 5) => {
  // start index in logo is 1, because first char is \n
  let i = 1,
    row = 0,
    out = '',
    char,
    code;

  do {
    for (let charIdx = 0; charIdx < data.length; charIdx++) {
      let { width, codes } = data[charIdx];
      // last char width +1 (\n)
      if (charIdx === data.length - 1) width++;
      if (charIdx === 0) out += ''.padStart(paddingLeft);
      for (let charWidthIdx = 0; charWidthIdx < width; charWidthIdx++) {
        char = ascii[i++];
        code = Array.isArray(codes) ? codes[row] : codes + row;
        out += ansis.ansi(code)(char);
      }
    }
    row++;
  } while (char);

  return out;
};

// The ASCII logo powered by https://patorjk.com/software/taag/#p=testall&h=1&f=Graceful&t=ANSIS
const logo = {
  ascii: `
 █████╗ ███╗   ██╗███████╗██╗███████╗
██╔══██╗████╗  ██║██╔════╝██║██╔════╝
███████║██╔██╗ ██║███████╗██║███████╗
██╔══██║██║╚██╗██║╚════██║██║╚════██║
██║  ██║██║ ╚████║███████║██║███████║
╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝╚══════╝
`,
  data: [
    { width: 8, codes: [76, 77, 78, 79, 80, 81] },
    { width: 10, codes: 196 },
    { width: 8, codes: 226 },
    { width: 3, codes: 214 },
    { width: 8, codes: [26, 27, 32, 33, 39, 45] },
  ],
};

/**
 * ANSIS Logo.
 * Showing in readme.
 */
log();
log(colorizeASCII(logo, 5));
log();

/**
 * Demo of all features.
 * Showing in readme.
 */
log(
  c.bold(' bold') +
  c.dim(' dim') +
  c.italic(' italic ') +
  c.underline('underline') +
  ' ' +
  c.strikethrough('strikethrough') +
  ' ' +
  c.inverse('inverse') +
  ' ' +
  c.bold.italic.underline.strike(' bold italic underline strike ') +
  c.red('\n red') +
  c.green(' green') +
  c.yellow(' yellow') +
  c.blue(' blue') +
  c.magenta(' magenta') +
  c.cyan(' cyan') +
  c.white(' white') +
  c.gray(' gray') +
  c.bold.yellow(' bold yellow ') +
  c.dim.cyan('faint cyan ') +
  c.redBright('redBright\n ') +
  c.black.bgRed('bgRed') +
  ' ' +
  c.black.bgGreen('bgGreen') +
  ' ' +
  c.black.bgYellow('bgYellow') +
  ' ' +
  c.bgBlue('bgBlue') +
  ' ' +
  c.black.bgMagenta('bgMagenta') +
  ' ' +
  c.black.bgCyan('bgCyan') +
  ' ' +
  c.black.bgWhite('bgWhite') +
  ' ' +
  c.white.bgRed.bold.italic.strikethrough(' Coca Cola ') +
  ' ' +
  c.black.bgRedBright('bgRedBright\n') +
  c.greenBright(' greenBright') +
  c.yellowBright(' yellowBright') +
  c.blueBright(' blueBright') +
  c.magentaBright(' magentaBright') +
  c.cyanBright(' cyanBright') +
  c.whiteBright(' whiteBright') +
  c.greenBright(' A') +
  c.magentaBright('N') +
  c.yellowBright('S') +
  c.redBright('I') +
  c.blueBright('S\n ') +
  c.black.bgGreenBright('bgGreenBright') +
  ' ' +
  c.black.bgYellowBright('bgYellowBright') +
  ' ' +
  c.bgBlueBright('bgBlueBright') +
  ' ' +
  c.black.bgMagentaBright('bgMagentaBright') +
  ' ' +
  c.black.bgCyanBright('bgCyanBright') +
  ' ' +
  c.black.bgWhiteBright(' ') +
  ' ' +
  c.magentaBright.bgGreenBright('A') +
  c.blueBright.bgMagentaBright('N') +
  c.redBright.bgYellowBright('S') +
  c.yellowBright.bgRedBright('I') +
  c.redBright.bgBlueBright('S') +
  '\n ' +
  [
    '#d93611',
    '#d97511',
    '#d9d611',
    '#a0d911',
    '#18d911',
    '#11d9c2',
    '#119dd9',
    '#1157d9',
    '#6614f6',
    '#c511d9',
    '#f10794',
  ].reduce((out, hex) => out + c.black.hex(hex)(hex), '') +
  '\n ' +
  [
    ' 197 ',
    ' 203 ',
    ' 209 ',
    ' 215 ',
    ' 221 ',
    ' 227 ',
    ' 191 ',
    ' 156  ',
    ' 120  ',
    ' 123 ',
    ' 117 ',
    ' 147 ',
    ' 141 ',
    '  98 ',
    '  92 ',
  ].reduce((out, code) => out + c.black.bgAnsi(parseInt(code, 10))(code), '') +
  '\n ',
);

/**
 * Misc demos.
 */

// Output benchmark samples
log('Colorette bench: ', c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`));
log('Base styles: ', ansis[style]('foo'));
log('Chained styles: ', ansis[style].bold.underline.italic('foo'));
log('Nested calls: ', ansis[style](ansis.bold(ansis.underline(ansis.italic('foo')))));
log('FG HEX 3 color: ', ansis.hex('#FBA')('foo'));
log('BG HEX 6 color: ', ansis.bgHex('#FFBBAA').black('foo'));
log('FG RGB color: ', ansis.rgb(100, 150, 200)('foo'));
log('BG RGB color: ', ansis.bgRgb(100, 150, 200).black('foo'));
log('FG ANSI 256 color: ', ansis.ansi256(96)('foo'));
log('FG ANSI 256 color: ', ansis.fg(96)('foo alias'));
log('BG ANSI 256 color: ', ansis.black.bgAnsi256(106)('foo'));
log('BG ANSI 256 color: ', ansis.black.bg(106)('foo alias'));
log();

// background color
log(ansis.bold.italic.hex('#800909').bgHex('#ffe49e')('Hello ansis!'));
log(ansis.bold.italic.bgHex('#800909').hex('#ffe49e')('Hello ansis!'));
log(ansis.black.bgGreen(`\n Ansis \n NEW LINE \n NEXT NEW LINE \n`));
//log(ansis.black.bgRgb(200, 80, 300)(`\nAnsis\n${ansis.black.bgBlueBright('NEW LINE')}\nNEXT NEW LINE\n`));

// example from readme
log(ansis.green(`Hello ${ansis.inverse('ANSI')} World!`));
log(ansis.black.bgYellow(`Warning:`) + ansis.cyan(' /path/to/file.js ') + ansis.red(`not found!`));
log();

// raw styling with `open` and `close` properties
const inverse = ansis.inverse,
  warn = ansis.black.bgYellow,
  err = ansis.red,
  info = ansis.cyan,
  myStyle = ansis.bold.italic.black.bgHex('#ABCDEF');

log('RAW:', `Hello ${ansis.green.open}ANSI${ansis.green.close} World!`);
log('RAW:', `Hello ${myStyle.open}ANSI${myStyle.close} World!`);

log('RAW:', ansis.green(`Hello ${inverse.open}ANSI${inverse.close} World!`));
log(
  'RAW:',
  `${warn.open}Warning:${warn.close} ${info.open}/path/to/file.js${info.close} ${err.open}not found!${err.close}`,
);
log();

// Check replacement in props.parent
log(ansis.green.bold.underline(`foo ${ansis.red.italic('bar')} foo`));

// Deep nested chained styles
log(
  c.green(
    `green ${c.cyan(
      `cyan ${c.red(
        `red ${c.yellow(
          `yellow ${c.blue(
            `blue ${c.magenta(
              `magenta ${c.underline(`underline ${c.yellowBright.italic(`italic bright yellow`)} underline`)} magenta`,
            )} blue`,
          )} yellow`,
        )} red`,
      )} cyan`,
    )} green`,
  ),
);
log();

// Template literals
const pink = hex('#FF75D1');
log(red`red ${yellow`yellow ${green`green ${pink`pink`} green`} yellow`} red`);

const msg = ansis.bold.open + 'text bold' + ansis.bold.close;
log(ansis.visible`visible`);
log(msg);
log(red('red'));
log(green.bold('green'));
log(blue.underline.italic('blue'));
log(yellow.italic(`yellow using ${'some'} variable`));
log(magenta.italic`magenta using text only`);
log(hex('#fce').bgCyan.underline('text underline'));

log(white`MakBookPro, ${cyan`RAM:`} 64 GB`);
log(white`MakBookPro, ${cyan`RAM:`} 64 GB | ${yellow`GPU:`} 32 cores`);
log(white`MakBookPro, ${cyan`RAM: ${cyanBright`64`} GB`} | ${yellow`GPU: ${yellowBright`32`} cores`}`);
log(red`${bold`${italic`${underline`underline`} italic`} bold`} red`);

// Extend base colors
ansis.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

log(ansis.pink('pink'));
log(ansis.orange('orange'));
log(ansis.orange.bold('orange'));
//log(ansis.bold.orange('orange')); // => error

/**
 * Problem description
 *
 * When imported instance `ansis` is extended with custom color,
 * then new color is accessible in first level only:
 *
 * ```js
 * import ansis from 'ansis';
 * ansis.extend({ orange: '#FFAB40' });
 * ansis.orange.bold('text'); // OK
 * ansis.bold.orange('text'); // => error
 * ```
 *
 * Solution
 *
 * For 100% compatibility must be created new instance in your code and then extended.
 *
 * ```js
 * import { Ansis } from 'ansis';
 * const ansis = new Ansis();
 * ansis.extend({ orange: '#FFAB40' }); // note: extend new created instance
 * ansis.orange.bold('text'); // OK
 * ansis.bold.orange('text'); // OK, new color is accessible anywhere
 * ```
 */

const ansis2 = new Ansis();

log(ansis2.bold.red('red'));

ansis2.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

log(ansis2.pink('pink'));
log(ansis2.bold.orange('orange'));
