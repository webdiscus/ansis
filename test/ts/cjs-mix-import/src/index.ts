import ansis, { Ansis, AnsiColors, AnsiStyles, red, green, blue, yellow, magenta, hex } from 'ansis';

const log = console.log;

const write = (
  content: string,
  tagColor: AnsiColors | AnsiStyles,
  bgTagColor: AnsiColors,
  tag: string,
  error = false
) => {
  const stream = error ? process.stderr : process.stdout;
  const tagLabel = `[${tag}]`;
  const item = `${ansis[bgTagColor][tagColor](tagLabel)} ${ansis.white(content)}\n`;
  stream.write(item);
};

// color names by hex: https://chir.ag/projects/name-that-color/
const pink = ansis.hex('#FF75D1').bold; // using default import
const lime = hex('#BFFF00').bold; // using named import

// create new instance
const ansis2 = new Ansis();

const boldText = ansis.bold.open + 'text bold' + ansis.bold.close;
const styledText = magenta.underline.italic('underline italic magenta');
const str = 'string';

log(ansis2.cyan('new instance'));
log(boldText);
log(pink('pink'));
log(lime('lime'));
log(red('red'));
log(green.bold('green'));
log(blue.underline.italic('blue'));
log(yellow.italic(`yellow using ${str} variable`));
log(red.bgCyan.underline.hex('#fce')('text underline'));
log(styledText);
log(ansis.strip(styledText), '<= strip ANSI codes');

// test the AnsiColors and AnsiStyles types
write('The tip message.', 'italic', 'bgGreen', 'TIP', false);
write('The information.', 'black', 'bgBlue', 'INFO', false);