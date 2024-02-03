'use strict';

// vendor libraries
import chalk from 'chalk';
import colorsJs from 'colors';
import * as colorette from 'colorette';
import ansiColors from 'ansi-colors';
import cliColor from 'cli-color';
import colorCli from 'colors-cli/lib/color-safe.js';
import kleur from 'kleur';
import * as kleurColors from 'kleur/colors';
import picocolors from 'picocolors';
import ansis, { greenBright, redBright, bgRed, black } from 'ansis';

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
  log(black.bgGreenBright(`\n Supports the deep nested styling `));

  logWithLabel(greenBright.inverse`  OK  `, 'colors.js: ', deepNestedFixture(colorsJs));
  logWithLabel(greenBright.inverse`  OK  `, 'colorette: ', deepNestedFixture(colorette));
  logWithLabel(greenBright.inverse`  OK  `, 'picocolors: ', deepNestedFixture(picocolors));
  logWithLabel(greenBright.inverse`  OK  `, 'cli-color: ', deepNestedFixture(cliColor));
  logWithLabel(black.bgYellow` BUG  `, 'color-cli: ', deepNestedFixture(colorCli));
  logWithLabel(greenBright.inverse`  OK  `, 'ansi-colors: ', deepNestedFixture(ansiColors));
  logWithLabel(greenBright.inverse`  OK  `, 'kleur/colors: ', deepNestedFixture(kleurColors));
  logWithLabel(greenBright.inverse`  OK  `, 'kleur: ', deepNestedFixture(kleur));
  logWithLabel(greenBright.inverse`  OK  `, 'chalk: ', deepNestedFixture(chalk));
  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', deepNestedFixture(ansis));
}

function showSupportOfDeepNestedChainedStyling() {
  log(black.bgGreenBright(`\n Supports the deep nested chained styling `));

  logWithLabel(greenBright.inverse`  OK  `, 'colors.js: ', deepNestedChainedFixture(colorsJs));
  logWithLabel(bgRed` FAIL `, 'colorette: ', redBright`not supported`);
  logWithLabel(bgRed` FAIL `, 'picocolors: ', redBright`not supported`);
  logWithLabel(greenBright.inverse`  OK  `, 'cli-color: ', deepNestedChainedFixture(cliColor));
  logWithLabel(black.bgYellow` BUG  `, 'color-cli: ', deepNestedChainedFixture(colorCli));
  logWithLabel(greenBright.inverse`  OK  `, 'ansi-colors: ', deepNestedChainedFixture(ansiColors));
  logWithLabel(greenBright.inverse`  OK  `, 'kleur: ', kleurDeepNestedChainedFixture());
  logWithLabel(greenBright.inverse`  OK  `, 'chalk: ', deepNestedChainedFixture(chalk));
  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', deepNestedChainedFixture(ansis));
}

function showSupportOfNestedTemplateStrings() {
  log(black.bgGreenBright(`\n Supports the nested template strings `));

  logWithLabel(bgRed` FAIL `, 'colors.js: ', nestedTemplateStringFixture(colorsJs));
  logWithLabel(bgRed` FAIL `, 'colorette: ', nestedTemplateStringFixture(colorette));
  logWithLabel(bgRed` FAIL `, 'picocolors: ', nestedTemplateStringFixture(picocolors));
  logWithLabel(bgRed` FAIL `, 'cli-color: ', nestedTemplateStringFixture(cliColor));
  logWithLabel(bgRed` FAIL `, 'color-cli: ', nestedTemplateStringFixture(colorCli));
  logWithLabel(bgRed` FAIL `, 'ansi-colors: ', nestedTemplateStringFixture(ansiColors));
  logWithLabel(bgRed` FAIL `, 'kleur: ', nestedTemplateStringFixture(kleur));
  logWithLabel(bgRed` FAIL `, 'chalk: ', nestedTemplateStringFixture(chalk));
  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', nestedTemplateStringFixture(ansis));
}

function showSupportOfBreakStyleAtNewLine() {
  log(black.bgGreenBright(`\n Supports the break style at New Line `));

  logWithLabel(greenBright.inverse`  OK  `, 'colors.js: ', colorsJs.bgGreen(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'colorette: ', colorette.bgGreen(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'picocolors: ', picocolors.bgGreen(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'cli-color: ', cliColor.bgGreen(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'color-cli: ', colorCli.green_b(breakStyleAtNewLineFixture));
  logWithLabel(greenBright.inverse`  OK  `, 'ansi-colors: ', ansiColors.bgGreen(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'kleur/colors: ', kleurColors.bgGreen(breakStyleAtNewLineFixture));
  logWithLabel(bgRed` FAIL `, 'kleur: ', kleur.bgGreen(breakStyleAtNewLineFixture));
  logWithLabel(greenBright.inverse`  OK  `, 'chalk: ', chalk.bgGreen(breakStyleAtNewLineFixture));
  logWithLabel(greenBright.inverse`  OK  `, 'ansis: ', ansis.bgGreen(breakStyleAtNewLineFixture));
}

showSupportOfDeepNestedStyling();
showSupportOfDeepNestedChainedStyling();
showSupportOfNestedTemplateStrings();
showSupportOfBreakStyleAtNewLine();
