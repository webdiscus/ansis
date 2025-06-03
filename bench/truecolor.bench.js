'use strict';

/**
 * Note: the hex(), rgb(), bgHex(), bgRgb() methods support only chalk and ansis.
 */

import Bench from './lib/bench.js';

import chalk from 'chalk';
import { Ansis, cyan, red, yellow, hex } from 'ansis';

import spectrum from '../examples/fixtures/spectrum.js';
import { colorLevels, LEVEL_TRUECOLOR } from '../src/color-levels.js';
import packages from './packages.js';

const log = console.log;

// create a new instance of Ansis for correct measure in benchmark
const ansis = new Ansis();
const colorLevel = ansis.level;

log();
log(cyan.inverse` Colors `, `Your terminal supports ${cyan(colorLevels[colorLevel])}.`);

if (colorLevel < LEVEL_TRUECOLOR) {
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
  add(packages['chalk'], () => chalk.rgb(99, 150, 200)('foo')).
  add(packages['ansis'], () => ansis.rgb(99, 150, 200)('foo')).
  run();

bench('HEX color: #FBA').
  add(packages['chalk'], () => chalk.hex('#FBA')('foo')).
  add(packages['ansis'], () => ansis.hex('#FBA')('foo')).
  run();

bench('HEX color: #FBAFBA').
  add(packages['chalk'], () => chalk.hex('#FBAFBA')('foo')).
  add(packages['ansis'], () => ansis.hex('#FBAFBA')('foo')).
  run();

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
      str += ansis.hex(color)('█');
    });
    return str;
  }).
  run();
