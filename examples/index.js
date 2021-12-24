import ansis from '../src/index.js';
import chalk from 'chalk';

const log = console.log;

// Output benchmark samples
const style = 'red';
const c = ansis;

log('Colorette bench: ', c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`));
log('Base styles: ', ansis[style]('foo'));
log('Chained styles: ', ansis[style].bold.underline.italic('foo'));
log('Nested calls: ', ansis[style](ansis.bold(ansis.underline(ansis.italic('foo')))));
log(
  'Nested styles: ',
  c.red(
    `a red ${c.white('white')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.black('black')} red ${c.red(
      'red'
    )} red ${c.green('green')} red ${c.red('red')} red ${c.yellow('yellow')} red ${c.blue('blue')} red ${c.red(
      'red'
    )} red ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red'
    )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red'
    )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red'
    )} red ${c.green('green')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red'
    )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red'
    )} red ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.red(
      'red'
    )} red ${c.red('red')} red ${c.yellow('yellow')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red'
    )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} message`
  )
);

log('FG HEX 3 color: ', ansis.hex('#FBA')('foo'));
log('BG HEX 6 color: ', ansis.bgHex('#FFBBAA').black('foo'));
log('FG RGB color: ', ansis.rgb(100, 150, 200)('foo'));
log('BG RGB color: ', ansis.bgRgb(100, 150, 200).black('foo'));
log('FG ANSI 256 color: ', ansis.ansi256(96)('foo'));
log('BG ANSI 256 color: ', ansis.bgAnsi256(106)('foo'));
log();

// background color
log(ansis.bold.italic.hex('#800909').bgHex('#ffe49e')('Hello ansis!'));
log(ansis.bold.italic.bgHex('#800909').hex('#ffe49e')('Hello ansis!'));
log(ansis.black.bgRgb(200, 80, 300)('\nAnsis\nNEW LINE\nNEXT NEW LINE\n'));

// example from readme
log(ansis.green(`Hello ${ansis.inverse('ANSI')} World!`));
log(ansis.black.bgYellow(`Warning: `) + ansis.cyan(' /path/to/file.js ') + ansis.red(`not found!`));
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
