'use strict';

import Bench from './lib/bench.js';

import chalk from 'chalk';
import { Ansis, cyan, green, red, yellow, hex } from 'ansis';

import { getColorSpace } from '../src/color-support.js';
import { colorLevels, LEVEL_TRUECOLOR } from '../src/color-levels.js';

const log = console.log;

// create a new instance of Ansis for correct measure in benchmark
const truecolorBench = new Ansis();
const colorSpace = getColorSpace();

log();
log(cyan.inverse` Colors `, `Your terminal supports ${cyan(colorLevels[colorSpace])}.`);

if (colorSpace < LEVEL_TRUECOLOR) {
  log(red.inverse` WARNING `, yellow`Your terminal doesn't support Truecolor!`);
  log('The result of some tests can be NOT correct!\nChoose a modern terminal, e.g. iTerm.\n');
}

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

log();
log(hex('#F88').inverse.bold` -= Benchmark =- `);

bench('RGB colors').
  add('chalk', () => chalk.rgb(99, 150, 200)('foo')).
  add('ansis', () => truecolorBench.rgb(99, 150, 200)('foo')).
  run();

bench('HEX colors').
  add('chalk #FBA', () => chalk.hex('#FBA')('foo')).
  add('ansis #FBA', () => truecolorBench.hex('#FBA')('foo')).
  add('chalk #FBA123', () => chalk.hex('#FBA123')('foo')).
  add('ansis #FBA123', () => truecolorBench.hex('#FBA123')('foo')).
  run();
