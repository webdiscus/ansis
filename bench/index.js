//
// ATTENTION !!! ACHTUNG !!! MEGA ULTRA IMPORTANT !!! WICHTIG !!!
//
// For the correct measures, DO NOT use the same function instance inside the added benchmark:
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

// vendor libraries
import chalk from 'chalk';
import colorsJs from 'colors';
import * as colorette from 'colorette';
import ansiColors from 'ansi-colors';
import cliColor from 'cli-color';
import colorCli from 'colors-cli/safe.js';
import kleur from 'kleur';
import * as kleurColors from 'kleur/colors';
import * as kolorist from 'kolorist';
import picocolors from 'picocolors';
import { Ansis, green, red, yellow, hex, rgb } from 'ansis';

import spectrum from '../examples/fixtures/spectrum.js';
import { getColorSpace } from '../src/color-support.js';

import packages from './packages.js';

// create a new instance of Ansis for correct measure in benchmark
const ansis = new Ansis();

const colorSpace = getColorSpace();

const log = console.log;

if (colorSpace < 3) {
  log(red.inverse` WARNING `, yellow`Your terminal don't support TrueColor!`);
  log('The result of some tests can be NOT correct! Choose a modern terminal, e.g. iTerm.\n');
}

// All vendor libraries to be tested
const vendors = [
  { name: packages['chalk'], lib: chalk },
  { name: packages['ansis'], lib: ansis },
  { name: packages['colorette'], lib: colorette },
  { name: packages['picocolors'], lib: picocolors },
  { name: packages['kleur'], lib: kleur },
  { name: 'kleur/colors', lib: kleurColors },
  { name: packages['ansi-colors'], lib: ansiColors },
  { name: packages['kolorist'], lib: kolorist },
  { name: packages['cli-color'], lib: cliColor },
  { name: packages['colors-cli'], lib: colorCli },
  { name: packages['colors'], lib: colorsJs },
];

const benchStyle = new Ansis();
const bench = new Bench({
  minOpsWidth: 12,
  //delay: 150,
  suiteNameColor: benchStyle.bgYellow.black,
  benchNameColor: benchStyle.magenta,
  opsColor: benchStyle.greenBright,
  rmeColor: benchStyle.cyan,
  statUnitColor: benchStyle.dim,
  failColor: benchStyle.red.bold,
});

// colors present in all libraries
const baseColors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
let fixture;

log(hex('#F88').inverse.bold` -= Benchmark =- `);

bench('Using 1 style (red)').
  add(packages['chalk'], () => chalk.red('foo')).
  add(packages['ansis'], () => ansis.red('foo')).
  add(packages['colorette'], () => colorette.red('foo')).
  add(packages['picocolors'], () => picocolors.red('foo')).
  add(packages['kleur'], () => kleur.red('foo')).
  add(packages['ansi-colors'], () => ansiColors.red('foo')).
  add(packages['kolorist'], () => kolorist.red('foo')).
  add(packages['cli-color'], () => cliColor.red('foo')).
  add(packages['colors-cli'], () => colorCli.red('foo')).
  add(packages['colors'], () => colorsJs.red('foo')).
  run();

bench(`Using 2 styles (bgWhite, red)`).
  add(packages['chalk'], () => chalk.bgWhite.red('foo')).
  add(packages['ansis'], () => ansis.bgWhite.red('foo')).
  add(packages['colorette'], () => colorette.bgWhite(colorette.red('foo'))).
  add(packages['picocolors'], () => picocolors.bgWhite(picocolors.red('foo'))).
  add(packages['kleur'], () => kleur.bgWhite().red('foo')).
  add(packages['ansi-colors'], () => ansiColors.bgWhite.red('foo')).
  add(packages['kolorist'], () => kolorist.bgWhite(kolorist.red('foo'))).
  add(packages['cli-color'], () => cliColor.bgWhite.red('foo')).
  add(packages['colors-cli'], () => colorCli.white_b.red('foo')).
  add(packages['colors'], () => colorsJs.bgWhite.red('foo')).
  run();

bench(`Using 3 styles (bgWhite, red, bold)`).
  add(packages['chalk'], () => chalk.bgWhite.red.bold('foo')).
  add(packages['ansis'], () => ansis.bgWhite.red.bold('foo')).
  add(packages['colorette'], () => colorette.bgWhite(colorette.red(colorette.bold('foo')))).
  add(packages['picocolors'], () => picocolors.bgWhite(picocolors.red(picocolors.bold('foo')))).
  add(packages['kleur'], () => kleur.bgWhite().red().bold('foo')).
  add(packages['ansi-colors'], () => ansiColors.bgWhite.red.bold('foo')).
  add(packages['kolorist'], () => kolorist.bgWhite(kolorist.red(kolorist.bold('foo')))).
  add(packages['cli-color'], () => cliColor.bgWhite.red.bold('foo')).
  add(packages['colors-cli'], () => colorCli.white_b.red.bold('foo')).
  add(packages['colors'], () => colorsJs.bgWhite.red.bold('foo')).
  run();

bench(`Using 4 styles (bgWhite red, bold, underline)`).
  add(packages['chalk'], () => chalk.bgWhite.red.bold.underline('foo')).
  add(packages['ansis'], () => ansis.bgWhite.red.bold.underline('foo')).
  add(packages['colorette'], () => colorette.bgWhite(colorette.red(colorette.bold(colorette.underline('foo'))))).
  add(packages['picocolors'], () => picocolors.bgWhite(picocolors.red(picocolors.bold(picocolors.underline('foo'))))).
  add(packages['kleur'], () => kleur.bgWhite().red().bold().underline('foo')).
  add(packages['ansi-colors'], () => ansiColors.bgWhite.red.bold.underline('foo')).
  add(packages['kolorist'], () => kolorist.bgWhite(kolorist.red(kolorist.bold(kolorist.underline('foo'))))).
  add(packages['cli-color'], () => cliColor.bgWhite.red.bold.underline('foo')).
  add(packages['colors-cli'], () => colorCli.white_b.red.bold.underline('foo')).
  add(packages['colors'], () => colorsJs.bgWhite.red.bold.underline('foo')).
  run();

// Colorette bench
// https://github.com/jorgebucaran/colorette/blob/main/bench/index.js
fixture = createFixture(vendors, coloretteBench);
bench('Colorette bench').
  add(vendors[0].name, () => fixture[0](vendors[0].lib)).
  add(vendors[1].name, () => fixture[1](vendors[1].lib)).
  add(vendors[2].name, () => fixture[2](vendors[2].lib)).
  add(vendors[3].name, () => fixture[3](vendors[3].lib)).
  add(vendors[4].name, () => fixture[4](vendors[4].lib)).
  add(vendors[5].name, () => fixture[5](vendors[5].lib)).
  add(vendors[6].name, () => fixture[6](vendors[6].lib)).
  add(vendors[7].name, () => fixture[7](vendors[7].lib)).
  add(vendors[8].name, () => fixture[8](vendors[8].lib)).
  add(vendors[9].name, () => fixture[9](vendors[9].lib)).
  add(vendors[10].name, () => fixture[10](vendors[10].lib)).
  run();

// Base colors
bench('Base colors').
  add(packages['chalk'], () => baseColors.forEach((style) => chalk[style]('foo'))).
  add(packages['ansis'], () => baseColors.forEach((style) => ansis[style]('foo'))).
  add(packages['colorette'], () => baseColors.forEach((style) => colorette[style]('foo'))).
  add(packages['picocolors'], () => baseColors.forEach((style) => picocolors[style]('foo'))).
  add(packages['kleur'], () => baseColors.forEach((style) => kleur[style]('foo'))).
  add('kleur/colors', () => baseColors.forEach((style) => kleurColors[style]('foo'))).
  add(packages['ansi-colors'], () => baseColors.forEach((style) => ansiColors[style]('foo'))).
  add(packages['kolorist'], () => baseColors.forEach((style) => kolorist[style]('foo'))).
  add(packages['cli-color'], () => baseColors.forEach((style) => cliColor[style]('foo'))).
  add(packages['colors-cli'], () => baseColors.forEach((style) => colorCli[style]('foo'))).
  add(packages['colors'], () => baseColors.forEach((style) => colorsJs[style]('foo'))).
  run();

// Chained styles
bench('Chained styles').
  add(packages['chalk'], () => baseColors.forEach((style) => chalk[style].bold.underline.italic('foo'))).
  add(packages['ansis'], () => baseColors.forEach((style) => ansis[style].bold.underline.italic('foo'))).
  add('colorette (not supported)', () => baseColors.forEach((style) => colorette[style].bold.underline.italic('foo'))).
  add('picocolors (not supported)', () =>
    baseColors.forEach((style) => picocolors[style].bold.underline.italic('foo')),
  ).
  add(packages['kleur'], () => baseColors.forEach((style) => kleur[style]().bold().underline().italic('foo'))). // alternate syntax
  add('kleur/colors (not supported)', () =>
    baseColors.forEach((style) => kleurColors[style].bold.underline.italic('foo')),
  ).
  add(packages['ansi-colors'], () => baseColors.forEach((style) => ansiColors[style].bold.underline.italic('foo'))).
  add('kolorist (not supported)', () => baseColors.forEach((style) => kolorist[style].bold.underline.italic('foo'))).
  add(packages['cli-color'], () => baseColors.forEach((style) => cliColor[style].bold.underline.italic('foo'))).
  add(packages['colors-cli'], () => baseColors.forEach((style) => colorCli[style].bold.underline.italic('foo'))).
  add(packages['colors'], () => baseColors.forEach((style) => colorsJs[style].bold.underline.italic('foo'))).
  run();

// Nested calls
bench('Nested calls').
  add(packages['chalk'], () => baseColors.forEach((style) => chalk[style](chalk.bold(chalk.underline(chalk.italic('foo')))))).
  add(packages['ansis'], () => baseColors.forEach((style) => ansis[style](ansis.bold(ansis.underline(ansis.italic('foo')))))).
  add(packages['colorette'], () =>
    baseColors.forEach((style) => colorette[style](colorette.bold(colorette.underline(colorette.italic('foo'))))),
  ).
  add(packages['picocolors'], () =>
    baseColors.forEach((style) => picocolors[style](picocolors.bold(picocolors.underline(picocolors.italic('foo'))))),
  ).
  add(packages['kleur'], () => baseColors.forEach((style) => kleur[style](kleur.bold(kleur.underline(kleur.italic('foo')))))).
  add('kleur/colors', () =>
    baseColors.forEach((style) =>
      kleurColors[style](kleurColors.bold(kleurColors.underline(kleurColors.italic('foo')))),
    ),
  ).
  add(packages['ansi-colors'], () =>
    baseColors.forEach((style) => ansiColors[style](ansiColors.bold(ansiColors.underline(ansiColors.italic('foo'))))),
  ).
  add(packages['kolorist'], () =>
    baseColors.forEach((style) => kolorist[style](kolorist.bold(kolorist.underline(kolorist.italic('foo'))))),
  ).
  add(packages['cli-color'], () =>
    baseColors.forEach((style) => cliColor[style](cliColor.bold(cliColor.underline(cliColor.italic('foo'))))),
  ).
  add(packages['colors-cli'], () =>
    baseColors.forEach((style) => colorCli[style](colorCli.bold(colorCli.underline(colorCli.italic('foo'))))),
  ).
  add(packages['colors'], () =>
    baseColors.forEach((style) => colorsJs[style](colorsJs.bold(colorsJs.underline(colorsJs.italic('foo'))))),
  ).
  run();

// Nested styles
fixture = createFixture(vendors, nestedFixture);
bench('Nested styles').
  add(packages['chalk'], () => fixture[0](chalk)).
  add(packages['ansis'], () => fixture[1](ansis)).
  add(packages['colorette'], () => fixture[2](colorette)).
  add(packages['picocolors'], () => fixture[3](picocolors)).
  add(packages['kleur'], () => fixture[4](kleur)).
  add('kleur/colors', () => fixture[5](kleurColors)).
  add(packages['ansi-colors'], () => fixture[6](ansiColors)).
  add(packages['kolorist'], () => fixture[7](kolorist)).
  add(packages['cli-color'], () => fixture[8](cliColor)).
  add(packages['colors-cli'], () => fixture[9](colorCli)).
  add(packages['colors'], () => fixture[10](colorsJs)).
  run();

// Deep nested styles
fixture = createFixture(vendors, deepNestedFixture);
bench('Deep nested styles').
  add(packages['chalk'], () => fixture[0](chalk)).
  add(packages['ansis'], () => fixture[1](ansis)).
  add(packages['colorette'], () => fixture[2](colorette)).
  add(packages['picocolors'], () => fixture[3](picocolors)).
  add(packages['kleur'], () => fixture[4](kleur)).
  add('kleur/colors', () => fixture[5](kleurColors)).
  add(packages['ansi-colors'], () => fixture[6](ansiColors)).
  add(packages['kolorist'], () => fixture[7](kolorist)).
  add(packages['cli-color'], () => fixture[8](cliColor)).
  add(packages['colors-cli'], () => fixture[9](colorCli)).
  add(packages['colors'], () => fixture[10](colorsJs)).
  run();

// Check support of correct break style at new line

// Break style at new line
//const breakStyleAtNewLineFixture = `\nAnsis\nNEW LINE\nNEXT NEW LINE\n`;
// bench('New Line')
//   .add('colors.js', () => colorsJs.bgGreen(breakStyleAtNewLineFixture))
//   .add(packages['ansi-colors'], () => ansiColors.bgGreen(breakStyleAtNewLineFixture))
//   .add(packages['chalk'], () => chalk.bgGreen(breakStyleAtNewLineFixture))
//   .add(packages['ansis'], () => ansis.bgGreen(breakStyleAtNewLineFixture))
//   .run();

bench('RGB colors').add(packages['chalk'], () => {
  for (let i = 0; i < 256; i++) chalk.rgb(i, 150, 200)('foo');
}).add(packages['ansis'], () => {
  for (let i = 0; i < 256; i++) rgb(i, 150, 200)('foo');
}).run();

// HEX colors
// the hex(), rgb(), bgHex(), bgRgb() methods support only chalk and ansis
bench('HEX colors').
  add(packages['chalk'], () => chalk.hex('#FBA')('foo')).
  add(packages['ansis'], () => hex('#FBA')('foo')).
  run();

// Spectrum HEX colors
bench('Spectrum HEX colors').
  add(packages['chalk'], () => {
    let str = '';
    spectrum.forEach(color => {
      str += chalk.hex(color)('█');
    });
    return str;
  }).
  add(packages['ansis'], () => {
    let str = '';
    spectrum.forEach(color => {
      str += hex(color)('█');
    });
    return str;
  }).
  run();

// Template literals
bench('Template literals').
  add(packages['ansis'], () => red`red ${yellow`yellow ${green`green`} yellow`} red`).
  run();

function coloretteBench(c) {
  return c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`);
}

function nestedFixture(c) {
  return c.red(
    `a red ${c.white('white')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.black('black')} red ${c.red(
      'red',
    )} red ${c.green('green')} red ${c.red('red')} red ${c.yellow('yellow')} red ${c.blue('blue')} red ${c.red(
      'red',
    )} red ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red',
    )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red',
    )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red',
    )} red ${c.green('green')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red',
    )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red',
    )} red ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.red(
      'red',
    )} red ${c.red('red')} red ${c.yellow('yellow')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
      'red',
    )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} message`,
  );
}

function deepNestedFixture(c) {
  return c.green(
    `green ${c.cyan(
      `cyan ${c.red(
        `red ${c.yellow(
          `yellow ${c.blue(
            `blue ${c.magenta(`magenta ${c.underline(`underline ${c.italic(`italic`)} underline`)} magenta`)} blue`,
          )} yellow`,
        )} red`,
      )} cyan`,
    )} green`,
  );
}
