import ansis from '../src/index.js';
import chalk from 'chalk';

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
    //c.black.bgWhiteBright('bgWhiteBright') +
    c.black.hex('#d93611')('#d93611') +
    c.black.hex('#d97511')('#d97511') +
    c.black.hex('#d9d611')('#d9d611') +
    c.black.hex('#a0d911')('#a0d911') +
    c.black.hex('#18d911')('#18d911') +
    //
    c.black.hex('#11d9c2')('#11d9c2') +
    c.black.hex('#119dd9')('#119dd9') +
    c.black.hex('#1157d9')('#1157d9') +
    c.black.hex('#6614f6')('#6614f6') +
    c.black.hex('#c511d9')('#c511d9') +
    c.black.hex('#f10794')('#f10794') +
    '\n ' +
    c.black.bgAnsi(197)(' 197 ') +
    c.black.bgAnsi(203)(' 203 ') +
    c.black.bgAnsi(209)(' 209 ') +
    c.black.bgAnsi(215)(' 215 ') +
    c.black.bgAnsi(221)(' 221 ') +
    c.black.bgAnsi(227)(' 227 ') +
    c.black.bgAnsi(191)(' 191 ') +
    c.black.bgAnsi(156)(' 156  ') +
    c.black.bgAnsi(120)(' 120  ') +
    c.black.bgAnsi(123)(' 123 ') +
    c.black.bgAnsi(117)(' 117 ') +
    c.black.bgAnsi(75)('  75 ') +
    c.black.bgAnsi(104)(' 104 ') +
    c.black.bgAnsi(98)('  98 ') +
    c.black.bgAnsi(92)('  92 ') +
    '\n '
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
log('BG ANSI 256 color: ', ansis.black.bgAnsi256(106)('foo'));
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
  cyan = ansis.cyan,
  myStyle = ansis.bold.italic.black.bgHex('#ABCDEF');

log('RAW:', `Hello ${ansis.green.open}ANSI${ansis.green.close} World!`);
log('RAW:', `Hello ${myStyle.open}ANSI${myStyle.close} World!`);

log('RAW:', ansis.green(`Hello ${inverse.open}ANSI${inverse.close} World!`));
log(
  'RAW:',
  `${warn.open}Warning:${warn.close} ${cyan.open}/path/to/file.js${cyan.close} ${err.open}not found!${err.close}`
);
log();

// Deep nested chained styles
log(
  c.green(
    `green ${c.cyan(
      `cyan ${c.red(
        `red ${c.yellow(
          `yellow ${c.blue(
            `blue ${c.magenta(
              `magenta ${c.underline(`underline ${c.yellowBright.italic(`italic bright yellow`)} underline`)} magenta`
            )} blue`
          )} yellow`
        )} red`
      )} cyan`
    )} green`
  )
);
log();
