import { describe, bench } from 'vitest';

// vendor libraries
import chalk from 'chalk';
import colorsJs from 'colors';
import * as colorette from 'colorette';
import ansiColors from 'ansi-colors';
import cliColor from 'cli-color';
import colorCli from 'colors-cli/safe.js';
import kleur from 'kleur';
import picocolors from 'picocolors';
import * as kolorist from 'kolorist';
import { Ansis } from 'ansis';

// create a new instance of Ansis for correct measure in benchmark
const ansis = new Ansis();

import packages from './packages.js';

const CI = process.env.CI;
const options = {
  warmupTime: CI ? 500 : 100,
  time: CI ? 2000 : 500,
};

// TODO:
//  fix - the bench with `kolorist` occurs fatal error: Allocation failed - JavaScript heap out of memory
//  fix - unreal/FALSE bench results, e.g. ansis cannot be 3x faster than chalk with the `lib.red('foo')` test

describe(`Using 1 style (red)`, () => {
  bench(packages['colors'], () => colorsJs.red('foo'), options);
  bench(packages['colorette'], () => colorette.red('foo'), options);
  bench(packages['picocolors'], () => picocolors.red('foo'), options);
  bench(packages['cli-color'], () => cliColor.red('foo'), options);
  bench(packages['colors-cli'], () => colorCli.red('foo'), options);
  bench(packages['ansi-colors'], () => ansiColors.red('foo'), options);
  bench(packages['kleur'], () => kleur.red('foo'), options);
  //bench(packages['kolorist'], () =>kolorist.red('foo'), options);
  bench(packages['chalk'], () => chalk.red('foo'), options);
  bench(packages['ansis'], () => ansis.red('foo'), options);
});

describe(`Using 2 styles (red, bold)`, () => {
  bench(packages['colors'], () => colorsJs.red.bold('foo'), options);
  bench(packages['colorette'], () => colorette.red(colorette.bold('foo')), options);
  bench(packages['picocolors'], () => picocolors.red(picocolors.bold('foo')), options);
  bench(packages['cli-color'], () => cliColor.red.bold('foo'), options);
  bench(packages['colors-cli'], () => colorCli.red.bold('foo'), options);
  bench(packages['ansi-colors'], () => ansiColors.red.bold('foo'), options);
  bench(packages['kleur'], () => kleur.red().bold('foo'), options);
  //bench(packages['kolorist'], () =>kolorist.red(kolorist.bold('foo')), options);
  bench(packages['chalk'], () => chalk.red.bold('foo'), options);
  bench(packages['ansis'], () => ansis.red.bold('foo'), options);
});

describe(`Using 3 styles (red, bold, underline)`, () => {
  bench(packages['colors'], () => colorsJs.red.bold.underline('foo'), options);
  bench(packages['colorette'], () => colorette.red(colorette.bold(colorette.underline('foo'))), options);
  bench(packages['picocolors'], () => picocolors.red(picocolors.bold(picocolors.underline('foo'))), options);
  bench(packages['cli-color'], () => cliColor.red.bold.underline('foo'), options);
  bench(packages['colors-cli'], () => colorCli.red.bold.underline('foo'), options);
  bench(packages['ansi-colors'], () => ansiColors.red.bold.underline('foo'), options);
  bench(packages['kleur'], () => kleur.red().bold().underline('foo'), options);
  //bench(packages['kolorist'], () =>kolorist.red(kolorist.bold(kolorist.underline('foo'))), options);
  bench(packages['chalk'], () => chalk.red.bold.underline('foo'), options);
  bench(packages['ansis'], () => ansis.red.bold.underline('foo'), options);
});

describe(`Using 7 styles (bgWhite red, bold, italic, dim, underline, strikethrough)`, () => {
  bench(packages['colors'], () => colorsJs.bgWhite.red.bold.italic.dim.underline.strikethrough('foo'), options);
  bench(packages['colorette'], () => colorette.bgWhite(colorette.red(colorette.bold(colorette.italic(colorette.dim(colorette.underline(colorette.strikethrough('foo'))))))),
    options);
  bench(packages['picocolors'],
    () => picocolors.bgWhite(picocolors.red(picocolors.bold(picocolors.italic(picocolors.dim(picocolors.underline(picocolors.strikethrough('foo'))))))), options);
  bench(packages['cli-color'], () => cliColor.bgWhite.red.bold.italic.inverse.underline.strike('foo'), options);
  bench(packages['colors-cli'], () => colorCli.white_b.red.bold.italic.inverse.underline.strike('foo'), options);
  bench(packages['ansi-colors'], () => ansiColors.bgWhite.red.bold.italic.dim.underline.strikethrough('foo'), options);
  bench(packages['kleur'], () => kleur.bgWhite().red().bold().italic().dim().underline().strikethrough('foo'), options);
  //bench(packages['kolorist'], () =>kolorist.bgWhite(kolorist.red(kolorist.bold(kolorist.italic(kolorist.dim(kolorist.underline(kolorist.strikethrough('foo'))))))), options);
  bench(packages['chalk'], () => chalk.bgWhite.red.bold.italic.dim.underline.strikethrough('foo'), options);
  bench(packages['ansis'], () => ansis.bgWhite.red.bold.italic.dim.underline.strikethrough('foo'), options);
});
