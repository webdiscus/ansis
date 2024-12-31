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

// vendor libraries
import chalk from 'chalk';
import colorsJs from '@colors/colors';
import * as colorette from 'colorette';
import ansiColors from 'ansi-colors';
import cliColor from 'cli-color';
import colorCli from 'colors-cli/safe.js';
import kleur from 'kleur';
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

log(hex('#F88').inverse.bold` -= Benchmark =- `);

// Simple bench
bench('Simple, using 1 style').
  add(packages['chalk'], () => chalk.red('foo')).
  add(packages['ansis'], () => ansis.red('foo')).
  add(packages['picocolors'], () => picocolors.red('foo')).
  add(packages['colorette'], () => colorette.red('foo')).
  add(packages['kleur'], () => kleur.red('foo')).
  add(packages['ansi-colors'], () => ansiColors.red('foo')).
  add(packages['kolorist'], () => kolorist.red('foo')).
  add(packages['cli-color'], () => cliColor.red('foo')).
  add(packages['colors-cli'], () => colorCli.red('foo')).
  add(packages['@colors/colors'], () => colorsJs.red('foo')).
  run();

// Fastest way for 2 styles
bench(`Use 2 styles`).
  add(packages['chalk'], () => chalk.red.bold('foo')).
  add(packages['ansis'], () => ansis.red.bold('foo')).
  add(packages['picocolors'], () => picocolors.red(picocolors.bold('foo'))).
  add(packages['colorette'], () => colorette.red(colorette.bold('foo'))).
  add(packages['kleur'], () => kleur.red().bold('foo')).
  add(packages['ansi-colors'], () => ansiColors.red.bold('foo')).
  add(packages['kolorist'], () => kolorist.red(kolorist.bold('foo'))).
  add(packages['cli-color'], () => cliColor.red.bold('foo')).
  add(packages['colors-cli'], () => colorCli.red.bold('foo')).
  add(packages['@colors/colors'], () => colorsJs.red.bold('foo')).
  run();

// Fastest way for 3 styles
bench('Use 3 styles').
  add(packages['chalk'], () => chalk.red.bold.bgWhite('foo')).
  add(packages['ansis'], () => ansis.red.bold.bgWhite('foo')).
  add(packages['picocolors'], () => picocolors.red(picocolors.bold(picocolors.bgWhite('foo')))).
  add(packages['colorette'], () => colorette.red(colorette.bold(colorette.bgWhite('foo')))).
  add(packages['kleur'], () => kleur.red().bold().bgWhite('foo')).
  add(packages['ansi-colors'], () => ansiColors.red.bold.bgWhite('foo')).
  add(packages['kolorist'], () => kolorist.red(kolorist.bold(kolorist.bgWhite('foo')))).
  add(packages['cli-color'], () => cliColor.red.bold.bgWhite('foo')).
  add(packages['colors-cli'], () => colorCli.red.bold.white_bt('foo')).
  add(packages['@colors/colors'], () => colorsJs.red.bold.bgWhite('foo')).
  run();

// Fastest way for 4 styles
bench('Use 4 styles').
  add(packages['chalk'], () => chalk.red.bold.underline.bgWhite('foo')).
  add(packages['ansis'], () => ansis.red.bold.underline.bgWhite('foo')).
  add(packages['picocolors'], () => picocolors.red(picocolors.bold(picocolors.underline(picocolors.bgWhite('foo'))))).
  add(packages['colorette'], () => colorette.red(colorette.bold(colorette.underline(colorette.bgWhite('foo'))))).
  add(packages['kleur'], () => kleur.red().bold().underline().bgWhite('foo')).
  add(packages['ansi-colors'], () => ansiColors.red.bold.underline.bgWhite('foo')).
  add(packages['kolorist'], () => kolorist.red(kolorist.bold(kolorist.underline(kolorist.bgWhite('foo'))))).
  add(packages['cli-color'], () => cliColor.red.bold.underline.bgWhite('foo')).
  add(packages['colors-cli'], () => colorCli.red.bold.underline.white_bt('foo')).
  add(packages['@colors/colors'], () => colorsJs.red.bold.underline.bgWhite('foo')).
  run();

// Chained syntax
bench('Chained syntax').
  add(packages['chalk'], () => chalk.red.bold.underline.bgWhite('foo')).
  add(packages['ansis'], () => ansis.red.bold.underline.bgWhite('foo')).
  add(packages['kleur'], () => kleur.red().bold().underline().bgWhite('foo')).
  add(packages['ansi-colors'], () => ansiColors.red.bold.underline.bgWhite('foo')).
  add(packages['cli-color'], () => cliColor.red.bold.underline.bgWhite('foo')).
  add(packages['colors-cli'], () => colorCli.red.bold.underline.white_bt('foo')).
  add(packages['@colors/colors'], () => colorsJs.red.bold.underline.bgWhite('foo')).
  // colorette - (not supported)
  // picocolors - (not supported)
  // kolorist - (not supported)
  run();

// Nested styles, like picocolors recursion
bench('Nested styles').
  add(packages['chalk'], () => chalk.red(chalk.bold(chalk.underline(chalk.bgWhite('foo'))))).
  add(packages['ansis'], () => ansis.red(ansis.bold(ansis.underline(ansis.bgWhite('foo'))))).
  add(packages['picocolors'], () => picocolors.red(picocolors.bold(picocolors.underline(picocolors.bgWhite('foo'))))).
  add(packages['colorette'], () => colorette.red(colorette.bold(colorette.underline(colorette.bgWhite('foo'))))).
  add(packages['kleur'], () => kleur.red(kleur.bold(kleur.underline(kleur.bgWhite('foo'))))).
  add(packages['ansi-colors'], () => ansiColors.red(ansiColors.bold(ansiColors.underline(ansiColors.bgWhite('foo'))))).
  add(packages['kolorist'], () => kolorist.red(kolorist.bold(kolorist.underline(kolorist.bgWhite('foo'))))).
  add(packages['cli-color'], () => cliColor.red(cliColor.bold(cliColor.underline(cliColor.bgWhite('foo'))))).
  add(packages['colors-cli'], () => colorCli.red(colorCli.bold(colorCli.underline(colorCli.white_bt('foo'))))).
  add(packages['@colors/colors'], () => colorsJs.red(colorsJs.bold(colorsJs.underline(colorsJs.bgWhite('foo'))))).
  run();

// Deep nested styles
const deepNestedBench = (c) => c.green(
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

bench('Deep nested styles').
  add(packages['chalk'], () => deepNestedBench(chalk)).
  add(packages['ansis'], () => deepNestedBench(ansis)).
  add(packages['picocolors'], () => deepNestedBench(picocolors)).
  add(packages['colorette'], () => deepNestedBench(colorette)).
  add(packages['kleur'], () => deepNestedBench(kleur)).
  add(packages['ansi-colors'], () => deepNestedBench(ansiColors)).
  add(packages['kolorist'], () => deepNestedBench(kolorist)).
  add(packages['cli-color'], () => deepNestedBench(cliColor)).
  add(packages['colors-cli'], () => deepNestedBench(colorCli)).
  add(packages['@colors/colors'], () => deepNestedBench(colorsJs)).
  run();

// Colorette bench
// https://github.com/jorgebucaran/colorette/blob/main/bench/index.js
const coloretteBanch = (c) => c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`);

bench('Colorette bench').
  add(packages['chalk'], () => coloretteBanch(chalk)).
  add(packages['ansis'], () => coloretteBanch(ansis)).
  add(packages['picocolors'], () => coloretteBanch(picocolors)).
  add(packages['colorette'], () => coloretteBanch(colorette)).
  add(packages['kleur'], () => coloretteBanch(kleur)).
  add(packages['ansi-colors'], () => coloretteBanch(ansiColors)).
  add(packages['kolorist'], () => coloretteBanch(kolorist)).
  add(packages['cli-color'], () => coloretteBanch(cliColor)).
  add(packages['colors-cli'], () => coloretteBanch(colorCli)).
  add(packages['@colors/colors'], () => coloretteBanch(colorsJs)).
  run();

// Picocolors complex bench, slightly modified
// Added a bit more complexity by applying 2 styles to the colorized word instead of one.
let index = 1e8;
const picoComplex = (c) => c.red('.') +
  c.yellow('.') +
  c.green('.') +
  c.red(c.bold(' ERROR ')) + // <= here is used nested calls, because picocolors doesn't support the chained syntax.
  c.red('Add plugin ' + c.cyan(c.underline('name')) + ' to use time limit with ' + c.cyan(++index));

const ansisComplex = (c) => c.red('.') +
  c.yellow('.') +
  c.green('.') +
  c.red.bold(' ERROR ') + // <= use chained syntax where is possible to improve readability and performance
  c.red('Add plugin ' + c.cyan.underline('name') + ' to use time limit with ' + c.cyan(++index));

bench('Picocolors complex bench').
  add(packages['chalk'], () => ansisComplex(chalk)).
  add(packages['ansis'], () => picoComplex(ansis)).
  add(packages['ansis'], () => ansisComplex(ansis)).
  add(packages['picocolors'], () => picoComplex(picocolors)).
  add(packages['colorette'], () => picoComplex(colorette)).
  add(packages['kleur'], () => picoComplex(kleur)).
  add(packages['kolorist'], () => picoComplex(kolorist)).
  add(packages['ansi-colors'], () => ansisComplex(ansiColors)).
  add(packages['cli-color'], () => ansisComplex(cliColor)).
  add(packages['colors-cli'], () => ansisComplex(colorCli)).
  add(packages['@colors/colors'], () => ansisComplex(colorsJs)).
  run();

// Check support of correct break style at new line

// Break style at new line
// const breakStyleAtNewLineFixture = `\nAnsis\nNEW LINE\nNEXT NEW LINE\n`;
// bench('New Line').
//   add('colors.js', () => colorsJs.bgGreen(breakStyleAtNewLineFixture)).
//   add(packages['ansi-colors'], () => ansiColors.bgGreen(breakStyleAtNewLineFixture)).
//   add(packages['chalk'], () => chalk.bgGreen(breakStyleAtNewLineFixture)).
//   // 2x slower as chalk because chalk use own implementation, but ansis save 400 bytes and uses regexp, this speed is not critical
//   add(packages['ansis'], () => ansis.bgGreen(breakStyleAtNewLineFixture)).
//   run();

// bench('RGB colors').add(packages['chalk'], () => {
//   for (let i = 0; i < 256; i++) chalk.rgb(i, 150, 200)('foo');
// }).add(packages['ansis'], () => {
//   for (let i = 0; i < 256; i++) rgb(i, 150, 200)('foo');
// }).run();
//
// // HEX colors
// // the hex(), rgb(), bgHex(), bgRgb() methods support only chalk and ansis
// bench('HEX colors').
//   add(packages['chalk'], () => chalk.hex('#FBA')('foo')).
//   add(packages['ansis'], () => hex('#FBA')('foo')).
//   run();
//
// // Spectrum HEX colors
// bench('Spectrum HEX colors').
//   add(packages['chalk'], () => {
//     let str = '';
//     spectrum.forEach(color => {
//       str += chalk.hex(color)('█');
//     });
//     return str;
//   }).
//   add(packages['ansis'], () => {
//     let str = '';
//     spectrum.forEach(color => {
//       str += hex(color)('█');
//     });
//     return str;
//   }).
//   run();

// // Template literals
// bench('Template literals').
//   add(packages['ansis'], () => red`red ${yellow`yellow ${green`green`} yellow`} red`).
//   run();
