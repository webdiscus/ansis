import ansis from '../src/index.js';
import chalk from 'chalk';

const log = console.log;
const style = 'red';
const c = ansis;

log();
log(ansisLogo());
log();

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
log(ansis.black.bgRgb(200, 80, 300)(`\nAnsis\n${ansis.black.bgBlueBright('NEW LINE')}\nNEXT NEW LINE\n`));

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

outputNested('chalk nested', chalk);
outputNested('ansis nested', ansis);
log();

function outputNested(name, lib) {
  const rgb = lib.rgb(100, 80, 155);

  const str = lib.red(
    `begin ${rgb.bold('RGB')} ${lib.yellow('yellow')} red ${lib.italic.cyan('italic cyan')} red ${lib.red(
      'red'
    )} red ${lib.underline.green.italic(
      `underline italic green ${lib.rgb(80, 120, 200)('underline italic blue')} underline italic green`
    )} red ${lib.cyan('cyan')} red ${lib.bold.yellow('bold yellow')} red ${lib.green('green')} end`
  );

  log(` ${name}:\t`, str);
}

// created via https://patorjk.com/software/taag/#p=testall&h=1&f=Graceful&t=ANSIS
function ansisLogo() {
  const paddingLeft = 6;

  const logo = `
 █████╗ ███╗   ██╗███████╗██╗███████╗
██╔══██╗████╗  ██║██╔════╝██║██╔════╝
███████║██╔██╗ ██║███████╗██║███████╗
██╔══██║██║╚██╗██║╚════██║██║╚════██║
██║  ██║██║ ╚████║███████║██║███████║
╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝╚══════╝
`;
  const chars = [
    { width: 8, codes: [76, 77, 78, 79, 80, 81] },
    { width: 10, codes: 196 },
    { width: 8, codes: 226 },
    { width: 3, codes: 214 },
    { width: 8, codes: [26, 27, 32, 33, 39, 45] },
  ];

  // start index in logo is 1, because first char is \n
  let i = 1,
    row = 0,
    out = '',
    char,
    code;

  while (logo[i]) {
    for (let charIdx = 0; charIdx < chars.length; charIdx++) {
      let { width, codes } = chars[charIdx];
      // last char width +1 (\n)
      if (charIdx === chars.length - 1) width++;
      if (charIdx === 0) out += ''.padStart(paddingLeft);
      for (let charWidthIdx = 0; charWidthIdx < width; charWidthIdx++) {
        char = logo[i++];
        code = Array.isArray(codes) ? codes[row] : codes + row;
        out += ansis.ansi256(code)(char);
      }
    }
    row++;
  }

  return out;
}
