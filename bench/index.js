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

// Node.js >= 22
import { styleText } from 'node:util';

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
import { Ansis, cyan, red, yellow, hex } from 'ansis';

import Bench from './lib/bench.js';
import packages from './packages.js';
import { colorLevels, LEVEL_256COLORS } from '../src/color-levels.js';

// Single source of truth: which libs to run
// - Edit the DEFAULT_ENABLED array, OR
// - override via env: BENCH_LIBS="chalk,ansis,picocolors" node bench.js
const DEFAULT_ENABLED = [
  ...Object.keys(packages),
];

const ENABLED = (process.env.BENCH_LIBS || DEFAULT_ENABLED.join(',')).split(',').map(s => packages[s.trim()]).filter(Boolean);

// test only this libs
// const ENABLED = [
//   packages['chalk'],
//   packages['ansis'],
//   packages['picocolors'],
// ];

// create a new instance of Ansis for correct measure in benchmark
const ansis = new Ansis();
const colorLevel = ansis.level;

const log = console.log;

log();
log(cyan.inverse` Colors `, `Your terminal supports ${cyan(colorLevels[colorLevel])}.`);

if (colorLevel < LEVEL_256COLORS) {
  log(red.inverse` WARNING `, yellow`Your terminal doesn't support 256 or Truecolor!`);
  log('The result of some tests can be NOT correct!\nChoose a modern terminal, e.g. iTerm.\n');
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
}, ENABLED);

log();
log(hex('#F88').inverse.bold` -= Benchmark =- `);

// For inner perf test only
// bench('Simple short text 3 bytes, ansis').add(packages['ansis'], () => ansis.red(text3)).run();
// bench('Simple long text 60 bytes, ansis').add(packages['ansis'], () => ansis.red(text60)).run();
// bench(`red('foo')`).
//   add(packages['chalk'], () => chalk.red('foo')).
//   add(packages['ansis'], () => ansis.red('foo')).
//   add(packages['picocolors'], () => picocolors.red('foo')).
//   run();
// bench('red(`red ${green(`green`)} red`)').
//   add(packages['chalk'], () => chalk.red(`red ${chalk.green(`green`)} red`)).
//   add(packages['ansis'], () => ansis.red(`red ${ansis.green(`green`)} red`)).
//   add(packages['picocolors'], () => picocolors.red(`red ${picocolors.green(`green`)} red`)).
//   run();

// Node tests
// const stringWithEscape = 'foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo\x1b[31m red\x1b[39m';
// bench('indexOf vs includes').
//   add('indexOf', () => ~stringWithEscape.indexOf(''), true).
//   add('includes', () => stringWithEscape.includes(''), true).
//   run();

// RGB colors
bench('RGB colors').
  add(packages['chalk'], () => { for (let i = 0; i < 256; i++) chalk.rgb(i, 150, 200)('foo'); }).
  add(packages['ansis'], () => { for (let i = 0; i < 256; i++) ansis.rgb(i, 150, 200)('foo'); }).
  run();

// HEX colors (only chalk & ansis support hex()/rgb()/bgHex()/bgRgb())
bench('HEX colors').
  add(packages['chalk'], () => chalk.hex('#FBA')('foo')).
  add(packages['ansis'], () => ansis.hex('#FBA')('foo')).run();

const text3 = 'foo';
const text60 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.';

// Simple bench
bench('Simple short text, 3 chars, using 1 style').
  add('styleText', () => styleText('red', text3), true).
  add(packages['chalk'], () => chalk.red(text3)).
  add(packages['ansis'], () => ansis.red(text3)).
  add(packages['picocolors'], () => picocolors.red(text3)).
  add(packages['colorette'], () => colorette.red(text3)).
  add(packages['kleur'], () => kleur.red(text3)).
  add(packages['ansi-colors'], () => ansiColors.red(text3)).
  add(packages['kolorist'], () => kolorist.red(text3)).
  add(packages['cli-color'], () => cliColor.red(text3)).
  add(packages['colors-cli'], () => colorCli.red(text3)).
  add(packages['@colors/colors'], () => colorsJs.red(text3)).
  run();

bench('Simple long text, 60 chars, using 1 style').
  add('styleText', () => styleText('red', text60), true).
  add(packages['chalk'], () => chalk.red(text60)).
  add(packages['ansis'], () => ansis.red(text60)).
  add(packages['picocolors'], () => picocolors.red(text60)).
  add(packages['colorette'], () => colorette.red(text60)).
  add(packages['kleur'], () => kleur.red(text60)).
  add(packages['ansi-colors'], () => ansiColors.red(text60)).
  add(packages['kolorist'], () => kolorist.red(text60)).
  add(packages['cli-color'], () => cliColor.red(text60)).
  add(packages['colors-cli'], () => colorCli.red(text60)).
  add(packages['@colors/colors'], () => colorsJs.red(text60)).
  run();

// Fastest way for 2 styles
bench(`Use 2 styles`).
  add('styleText', () => styleText(['red', 'bold'], 'foo'), true).
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
  add('styleText', () => styleText(['red', 'bold', 'bgWhite'], 'foo'), true).
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
  add('styleText', () => styleText(['red', 'bold', 'underline', 'bgWhite'], 'foo'), true).
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
  // styleText - (not supported)
  // colorette - (not supported)
  // picocolors - (not supported)
  // kolorist - (not supported)
  run();

// Nested calls, like colorette recursion
bench('Nested calls').
  add('styleText', () => styleText('red', styleText('bold', styleText('underline', styleText('bgWhite', 'foo')))), true).
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

// Nested styles
bench('red(`red ${green(`green`)} red`)').
  add('styleText', () => styleText('red', `red ${styleText('green', 'green')} red`), true).
  add(packages['chalk'], () => chalk.red(`red ${chalk.green(`green`)} red`)).
  add(packages['ansis'], () => ansis.red(`red ${ansis.green(`green`)} red`)).
  add(packages['picocolors'], () => picocolors.red(`red ${picocolors.green(`green`)} red`)).
  add(packages['colorette'], () => colorette.red(`red ${colorette.green(`green`)} red`)).
  add(packages['kleur'], () => kleur.red(`red ${kleur.green(`green`)} red`)).
  add(packages['ansi-colors'], () => ansiColors.red(`red ${ansiColors.green(`green`)} red`)).
  add(packages['kolorist'], () => kolorist.red(`red ${kolorist.green(`green`)} red`)).
  add(packages['cli-color'], () => cliColor.red(`red ${cliColor.green(`green`)} red`)).
  add(packages['colors-cli'], () => colorCli.red(`red ${colorCli.green(`green`)} red`)).
  add(packages['@colors/colors'], () => colorsJs.red(`red ${colorsJs.green(`green`)} red`)).
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
  // using styleText the code is very awkward
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
const breakStyleAtNewLineFixture = `\nAnsis\nNEW LINE\nNEXT NEW LINE\n`;
bench('New Line').
  add(packages['@colors/colors'], () => colorsJs.bgGreen(breakStyleAtNewLineFixture)).
  add(packages['ansi-colors'], () => ansiColors.bgGreen(breakStyleAtNewLineFixture)).
  add(packages['chalk'], () => chalk.bgGreen(breakStyleAtNewLineFixture)).
  // 2x slower as chalk because chalk use own implementation, but ansis save 400 bytes and uses regexp, this speed is not critical
  add(packages['ansis'], () => ansis.bgGreen(breakStyleAtNewLineFixture)).
  run();

// Template literals, correctly works only with ansis
bench('Template literals').
  add(packages['ansis'], () => red`red ${yellow`yellow ${cyan`cyan`} yellow`} red`).
  run();
