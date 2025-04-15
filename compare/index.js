'use strict';

// vendor libraries
import chalk from 'chalk';
import colorsJs from '@colors/colors';
import * as colorette from 'colorette';
import ansiColors from 'ansi-colors';
import cliColor from 'cli-color';
import colorCli from 'colors-cli/safe.js';
import kleur from 'kleur';
import * as kleurColors from 'kleur/colors';
import * as kolorist from 'kolorist';
import pico from 'picocolors';
import ansis, { greenBright, redBright, bgRed, bgBlueBright, green, blue, black, yellow, hex } from 'ansis';

import { hexToRgb } from '../src/utils.js';
import spectrum from './spectrum.js';

const log = console.log;

const logWithLabel = (state, label, string) => log(state + ' ' + label.padEnd(14), string);

const nestedTemplateStringFixture = (c) => c.red`red ${c.yellow`yellow ${c.green`green`} yellow`} red`;

const breakStyleAtNewLineFixture = `\nAnsis\nNEW LINE\nNEXT NEW LINE\n`;

const deepNestedFixture = (c) => {
  return c.green(
    `green ${c.red(
      `red ${c.yellow(
        `yellow ${c.underline(`underline ${c.italic(`italic`)} underline`)} yellow`,
      )} red`,
    )} green`,
  );
};

const deepNestedChainedFixture = (c) => {
  return c.red(
    `red ${c.cyan('cyan')} red ${c.underline.green(
      `underline green ${c.yellow('underline yellow')} underline green`,
    )} red ${c.yellow('yellow')} red`,
  );
};

const kleurDeepNestedChainedFixture = () => {
  const c = kleur;
  // note: kleur has functionally chained syntax
  return c.red(
    `red ${c.cyan('cyan')} red ${c.underline().green(
      `underline green ${c.yellow('underline yellow')} underline green`,
    )} red ${c.yellow('yellow')} red`,
  );
};

function showSupportOfDeepNestedStyling() {
  log(bgBlueBright(`\n -= Supports the deep nested styling =- `));

  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', deepNestedFixture(ansis));
  logWithLabel(greenBright.inverse`  OK  `, 'chalk: ', deepNestedFixture(chalk));
  logWithLabel(greenBright.inverse`  OK  `, 'kolorist: ', deepNestedFixture(kolorist));
  logWithLabel(greenBright.inverse`  OK  `, 'colors.js: ', deepNestedFixture(colorsJs));
  logWithLabel(greenBright.inverse`  OK  `, 'colorette: ', deepNestedFixture(colorette));
  logWithLabel(greenBright.inverse`  OK  `, 'picocolors: ', deepNestedFixture(pico));
  logWithLabel(greenBright.inverse`  OK  `, 'cli-color: ', deepNestedFixture(cliColor));
  logWithLabel(black.bgYellow` BUG  `, 'colors-cli: ', deepNestedFixture(colorCli));
  logWithLabel(greenBright.inverse`  OK  `, 'ansi-colors: ', deepNestedFixture(ansiColors));
  logWithLabel(greenBright.inverse`  OK  `, 'kleur/colors: ', deepNestedFixture(kleurColors));
  logWithLabel(greenBright.inverse`  OK  `, 'kleur: ', deepNestedFixture(kleur));
}

function showSupportOfDeepNestedChainedStyling() {
  log(bgBlueBright(`\n -= Supports the deep nested chained styling =- `));

  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', deepNestedChainedFixture(ansis));
  logWithLabel(greenBright.inverse`  OK  `, 'chalk: ', deepNestedChainedFixture(chalk));
  logWithLabel(bgRed` FAIL `, 'kolorist: ', redBright`not supported`);
  logWithLabel(greenBright.inverse`  OK  `, 'colors.js: ', deepNestedChainedFixture(colorsJs));
  logWithLabel(bgRed` FAIL `, 'colorette: ', redBright`not supported`);
  logWithLabel(bgRed` FAIL `, 'picocolors: ', redBright`not supported`);
  logWithLabel(greenBright.inverse`  OK  `, 'cli-color: ', deepNestedChainedFixture(cliColor));
  logWithLabel(black.bgYellow` BUG  `, 'colors-cli: ', deepNestedChainedFixture(colorCli));
  logWithLabel(greenBright.inverse`  OK  `, 'ansi-colors: ', deepNestedChainedFixture(ansiColors));
  logWithLabel(greenBright.inverse`  OK  `, 'kleur: ', kleurDeepNestedChainedFixture());
}

function showSupportOfNestedTemplateStrings() {
  log(bgBlueBright(`\n -= Supports the nested template strings =- `));

  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', nestedTemplateStringFixture(ansis));
  logWithLabel(bgRed` FAIL `, 'chalk: ', nestedTemplateStringFixture(chalk));
  logWithLabel(bgRed` FAIL `, 'kolorist: ', nestedTemplateStringFixture(kolorist));
  logWithLabel(bgRed` FAIL `, 'colors.js: ', nestedTemplateStringFixture(colorsJs));
  logWithLabel(bgRed` FAIL `, 'colorette: ', nestedTemplateStringFixture(colorette));
  logWithLabel(bgRed` FAIL `, 'picocolors: ', nestedTemplateStringFixture(pico));
  logWithLabel(bgRed` FAIL `, 'cli-color: ', nestedTemplateStringFixture(cliColor));
  logWithLabel(bgRed` FAIL `, 'colors-cli: ', nestedTemplateStringFixture(colorCli));
  logWithLabel(bgRed` FAIL `, 'ansi-colors: ', nestedTemplateStringFixture(ansiColors));
  logWithLabel(bgRed` FAIL `, 'kleur: ', nestedTemplateStringFixture(kleur));

  // examples for screenshot in readme (Edge cases > Nested template strings)
  console.log();
  console.log('✅  ansis ', ansis.red`R ${ansis.green`G ${ansis.blue`B`} G`} R`);
  console.log('❌  chalk ', chalk.red`R ${chalk.green`G ${chalk.blue`B`} G`} R`);
  console.log('❌  pico  ', pico.red`R ${pico.green`G ${pico.blue`B`} G`} R`);
  console.log('❌  kleur  ', kleur.red`R ${kleur.green`G ${kleur.blue`B`} G`} R`);
  console.log('❌  kleur/colors  ', kleurColors.red`R ${kleurColors.green`G ${kleurColors.blue`B`} G`} R`);
}

function showSupportOfBreakStyleAtNewLine() {
  log(bgBlueBright(`\n -= Supports the break style at New Line =- `));

  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', ansis.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(greenBright.inverse`  OK  `, 'chalk: ', chalk.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'kolorist: ', kolorist.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(greenBright.inverse`  OK  `, 'colors.js: ', colorsJs.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'colorette: ', colorette.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'picocolors: ', pico.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'cli-color: ', cliColor.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'colors-cli: ', colorCli.cyan_b(breakStyleAtNewLineFixture));
  logWithLabel(greenBright.inverse`  OK  `, 'ansi-colors: ', ansiColors.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'kleur/colors: ', kleurColors.bgCyan(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'kleur: ', kleur.bgCyan(breakStyleAtNewLineFixture));

  // examples for screenshot in readme (Edge cases > Break style at New Line)
  log(bgBlueBright(`\n -= Supports the break style at New Lines: picocolors =- `));
  console.log('\n ❌  ');
  console.log(pico.bgRed('\n ERROR \n') + pico.cyan('The file not found!'));

  log(bgBlueBright(`\n -= Supports the break style at New Lines: ansis =- `));
  console.log('\n ✅  ');
  console.log(ansis.bgRed('\n ERROR \n') + ansis.cyan('The file not found!'));
  console.log();

  log(bgBlueBright(`\n -= Supports the break style at New Lines: chalk =- `));
  console.log('\n ✅  ');
  console.log(chalk.bgRed('\n ERROR \n') + chalk.cyan('The file not found!'));
  console.log();
}

function showFallbackToSupportedColorSpace() {
  let fallbackColors;

  log(bgBlueBright(`\n -= Supports the fallback to color level =- `));

  fallbackColors = '';
  spectrum.forEach(color => {fallbackColors += hex(color)('█');});
  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', fallbackColors);

  fallbackColors = '';
  spectrum.forEach(color => {fallbackColors += chalk.hex(color)('█');});
  logWithLabel(greenBright.inverse`  OK  `, 'chalk: ', fallbackColors);

  fallbackColors = '';
  spectrum.forEach(color => {fallbackColors += kolorist.trueColor(...hexToRgb(color))('█');});
  logWithLabel(black.bgYellow`  +/- `, 'kolorist: ', fallbackColors + yellow` (not for 16 colors)`);
}

showSupportOfDeepNestedStyling();
showSupportOfDeepNestedChainedStyling();
showSupportOfNestedTemplateStrings();
showSupportOfBreakStyleAtNewLine();
showFallbackToSupportedColorSpace();

//
console.log(black.bgGreen('\n -= Nested template strings =- '));
console.log(green`New ${blue.bold`React`} app is created!`);
console.log(chalk.green`New ${chalk.blue.bold('React')} app is created!`);
console.log(chalk.green(`New ${chalk.blue.bold('React')} app is created!`));
console.log(chalk.green(`New ${chalk.blue.bold`React`} app is created!`));

console.log(pico.green(`Create ${pico.blue(pico.bold('React'))} app!`));
console.log(pico.green`Create ${pico.blue(pico.bold`React`)} app!`);
console.log(pico.green(`Create ${pico.blue(pico.bold`React`)} app!`));
