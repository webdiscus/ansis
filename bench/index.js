//
// ATTENTION !!! ACHTUNG !!! MEGA ULTRA IMPORTANT !!! WICHTIG !!!
//
// For a correct measures, DO NOT use the same function instance inside the added benchmark:
// bench('Benchmark')
//   .add('bench1', () => anyFixture(arg1)) // <== only first measure of `anyFixture()` will be correct
//   .add('bench2', () => anyFixture(arg2)) // <== second and next measures of same function will be WRONG!
//
// Solution.
// Create the fixture as pure function and clone it for each added benchmark:
//
// const uniqFixture = [
//   clonePureFunction(anyFixture),
//   clonePureFunction(anyFixture),
//   ...
// ]
//
// or use:
// const uniqFixture = createFixture(arrayOfLibraries, anyFixture);
//
// bench('Benchmark')
//   .add('bench1', () => uniqFixture[0](arg1)) // <== the cloned function will be correct measured
//   .add('bench2', () => uniqFixture[1](arg2)) // <== the cloned function will be correct measured
//

'use strict';

import Bench from './lib/bench.js';
import { createFixture } from './lib/utils.js';

// vendor libraries for benchmark
import ansis from '../src/index.js';
import chalk from 'chalk';
import colorsJs from 'colors';
import * as colorette from 'colorette';
import ansiColors from 'ansi-colors';
import cliColor from 'cli-color';
import colorCli from 'colors-cli/lib/color-safe.js';
import kleur from 'kleur';
import * as kleurColors from 'kleur/colors';
import picocolors from 'picocolors';

// All vendor libraries to be tested
const vendors = [
  { name: 'colors-js', lib: colorsJs },
  { name: 'colorette', lib: colorette },
  { name: 'picocolors', lib: picocolors },
  { name: 'cli-color', lib: cliColor },
  { name: 'color-cli', lib: colorCli },
  { name: 'ansi-colors', lib: ansiColors },
  { name: 'kleur/colors', lib: kleurColors },
  { name: 'kleur', lib: kleur },
  { name: 'chalk', lib: chalk },
  { name: 'ansis', lib: ansis },
];

const bench = new Bench({
  minOpsWidth: 12,
  suiteNameColor: ansis.bgYellow.black,
  benchNameColor: ansis.magenta,
  opsColor: ansis.greenBright,
  rmeColor: ansis.cyan,
  statUnitColor: ansis.dim,
  failColor: ansis.red.bold,
});

// styles present in all libraries
const baseStyles = [
  'bold',
  'italic',
  'underline',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
];
const colorStyles = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

let fixture = [];

// Colorette bench
// https://github.com/jorgebucaran/colorette/blob/main/bench/index.js
fixture = createFixture(vendors, coloretteBench);
bench('Colorette bench')
  .add(vendors[0].name, () => fixture[0](vendors[0].lib))
  .add(vendors[1].name, () => fixture[1](vendors[1].lib))
  .add(vendors[2].name, () => fixture[2](vendors[2].lib))
  .add(vendors[3].name, () => fixture[3](vendors[3].lib))
  .add(vendors[4].name, () => fixture[4](vendors[4].lib))
  .add(vendors[5].name, () => fixture[5](vendors[5].lib))
  .add(vendors[6].name, () => fixture[6](vendors[6].lib))
  .add(vendors[7].name, () => fixture[7](vendors[7].lib))
  .add(vendors[8].name, () => fixture[8](vendors[8].lib))
  .add(vendors[9].name, () => fixture[9](vendors[9].lib))
  .run();

// Base styles
bench('Base styles')
  .add('colors-js', () => baseStyles.forEach((style) => colorsJs[style]('foo')))
  .add('colorette', () => baseStyles.forEach((style) => colorette[style]('foo')))
  .add('picocolors', () => baseStyles.forEach((style) => picocolors[style]('foo')))
  .add('cli-color', () => baseStyles.forEach((style) => cliColor[style]('foo')))
  .add('color-cli', () => baseStyles.forEach((style) => colorCli[style]('foo')))
  .add('ansi-colors', () => baseStyles.forEach((style) => ansiColors[style]('foo')))
  .add('kleur/colors', () => baseStyles.forEach((style) => kleurColors[style]('foo')))
  .add('kleur', () => baseStyles.forEach((style) => kleur[style]('foo')))
  .add('chalk', () => baseStyles.forEach((style) => chalk[style]('foo')))
  .add('ansis', () => baseStyles.forEach((style) => ansis[style]('foo')))
  .run();

// Chained styles
bench('Chained styles')
  .add('colors-js', () => colorStyles.forEach((style) => colorsJs[style].bold.underline.italic('foo')))
  .add('colorette (not supported)', () => colorStyles.forEach((style) => colorette[style].bold.underline.italic('foo')))
  .add('picocolors (not supported)', () =>
    colorStyles.forEach((style) => picocolors[style].bold.underline.italic('foo'))
  )
  .add('cli-color', () => colorStyles.forEach((style) => cliColor[style].bold.underline.italic('foo')))
  .add('color-cli', () => colorStyles.forEach((style) => colorCli[style].bold.underline.italic('foo')))
  .add('ansi-colors', () => colorStyles.forEach((style) => ansiColors[style].bold.underline.italic('foo')))
  .add('kleur/colors (not supported)', () =>
    colorStyles.forEach((style) => kleurColors[style].bold.underline.italic('foo'))
  )
  .add('kleur', () => colorStyles.forEach((style) => kleur[style]().bold().underline().italic('foo'))) // alternate syntax
  .add('chalk', () => colorStyles.forEach((style) => chalk[style].bold.underline.italic('foo')))
  .add('ansis', () => colorStyles.forEach((style) => ansis[style].bold.underline.italic('foo')))
  .run();

// Nested calls
bench('Nested calls')
  .add('colors-js', () =>
    colorStyles.forEach((style) => colorsJs[style](colorsJs.bold(colorsJs.underline(colorsJs.italic('foo')))))
  )
  .add('colorette', () =>
    colorStyles.forEach((style) => colorette[style](colorette.bold(colorette.underline(colorette.italic('foo')))))
  )
  .add('picocolors', () =>
    colorStyles.forEach((style) => picocolors[style](picocolors.bold(picocolors.underline(picocolors.italic('foo')))))
  )
  .add('cli-color', () =>
    colorStyles.forEach((style) => cliColor[style](cliColor.bold(cliColor.underline(cliColor.italic('foo')))))
  )
  .add('color-cli', () =>
    colorStyles.forEach((style) => colorCli[style](colorCli.bold(colorCli.underline(colorCli.italic('foo')))))
  )
  .add('ansi-colors', () =>
    colorStyles.forEach((style) => ansiColors[style](ansiColors.bold(ansiColors.underline(ansiColors.italic('foo')))))
  )
  .add('kleur/colors', () =>
    colorStyles.forEach((style) =>
      kleurColors[style](kleurColors.bold(kleurColors.underline(kleurColors.italic('foo'))))
    )
  )
  .add('kleur', () => colorStyles.forEach((style) => kleur[style](kleur.bold(kleur.underline(kleur.italic('foo'))))))
  .add('chalk', () => colorStyles.forEach((style) => chalk[style](chalk.bold(chalk.underline(chalk.italic('foo'))))))
  .add('ansis', () => colorStyles.forEach((style) => ansis[style](ansis.bold(ansis.underline(ansis.italic('foo'))))))
  .run();

// Nested styles
fixture = createFixture(vendors, nestedFixture);
bench('Nested styles')
  .add('colors-js', () => fixture[9](colorsJs))
  .add('colorette', () => fixture[0](colorette))
  .add('picocolors', () => fixture[1](picocolors))
  .add('cli-color', () => fixture[2](cliColor))
  .add('color-cli', () => fixture[3](colorCli))
  .add('ansi-colors', () => fixture[4](ansiColors))
  .add('kleur/colors', () => fixture[5](kleurColors))
  .add('kleur', () => fixture[6](kleur))
  .add('chalk', () => fixture[7](chalk))
  .add('ansis', () => fixture[8](ansis))
  .run();

// HEX colors
// the hex(), rgb(), bgHex(), bgRgb() methods support only chalk and ansis
bench('HEX colors')
  .add('chalk', () => chalk.hex('#FBA')('foo'))
  .add('ansis', () => ansis.hex('#FBA')('foo'))
  .run();

function coloretteBench(c) {
  return c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`);
}

function nestedFixture(c) {
  return c.red(
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
  );
}
