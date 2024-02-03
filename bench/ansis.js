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

import { Ansis, green, red, yellow, hex } from 'ansis';
//import { Ansis, green, red, yellow, hex } from '../_ignored/index-2.0.3.min.js';

const log = console.log;

// create a new instance of Ansis for correct measure in benchmark
const ansis = new Ansis();

// All vendor libraries to be tested
const vendors = [
  { name: 'ansis', lib: ansis },
];

const benchStyle = new Ansis();
const bench = new Bench({
  minOpsWidth: 12,
  suiteNameColor: benchStyle.bgYellow.black,
  benchNameColor: benchStyle.magenta,
  opsColor: benchStyle.greenBright,
  rmeColor: benchStyle.cyan,
  statUnitColor: benchStyle.dim,
  failColor: benchStyle.red.bold,
});

// colors present in all libraries
const baseColors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

let fixture = [];

log(hex('#F88').inverse.bold` -= Benchmark =- `);

// Colorette bench
// https://github.com/jorgebucaran/colorette/blob/main/bench/index.js
fixture = createFixture(vendors, coloretteBench);
bench('Colorette bench').
  add('ansis', () => fixture[0](ansis)).run();

// Base colors
bench('Base colors').
  add('ansis', () => baseColors.forEach((style) => ansis[style]('foo'))).
  run();

// Chained styles
bench('Chained styles').
  add('ansis', () => baseColors.forEach((style) => ansis[style].bold.underline.italic('foo'))).
  run();

// Nested calls
bench('Nested calls').
  add('ansis', () => baseColors.forEach((style) => ansis[style](ansis.bold(ansis.underline(ansis.italic('foo')))))).
  run();

// Nested styles
fixture = createFixture(vendors, nestedFixture);
bench('Nested styles').
  add('ansis', () => fixture[0](ansis)).
  run();

// Deep nested styles
fixture = createFixture(vendors, deepNestedFixture);
bench('Deep nested styles').
  add('ansis', () => fixture[0](ansis)).
  run();

// Check support of correct break style at new line

// Break style at new line
//const breakStyleAtNewLineFixture = `\nAnsis\nNEW LINE\nNEXT NEW LINE\n`;
// bench('New Line')
//   .add('ansis', () => ansis.bgGreen(breakStyleAtNewLineFixture))
//   .run();

bench('RGB colors').add('ansis', () => {
  for (let i = 0; i < 256; i++) ansis.rgb(i, 150, 200)('foo');
}).run();

// HEX colors
// the hex(), rgb(), bgHex(), bgRgb() methods support only chalk and ansis
bench('HEX colors').
  add('ansis', () => ansis.hex('#FBA')('foo')).
  run();

// Template literals
bench('Template literals').
  add('ansis', () => red`red ${yellow`yellow ${green`green`} yellow`} red`).
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
