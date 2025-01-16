// vendor libraries
import chalk from 'chalk';
import colorsJs from '@colors/colors';
import * as colorette from 'colorette';
import ansiColors from 'ansi-colors';
import cliColor from 'cli-color';
import colorCli from 'colors-cli/safe.js';
import kleur from 'kleur';
import * as kolorist from 'kolorist';
import pico from 'picocolors';
import ansis, { black } from 'ansis';

// Handling edge cases by various libraries

const viewOutput = (input) => {
  let type = typeof input;
  let output = type !== 'object' ? input.replace(/\x1b/g, 'ESC') : String(input);

  console.log(output);
}

const fnArguments = (lib) => {
  let res;
  try {
    res = lib.red()
  } catch (error) {
    res = error.toString()
  }

  viewOutput(res);
  viewOutput(lib.red(undefined));
  viewOutput(lib.red(null));
  viewOutput(lib.red(''));
  viewOutput(lib.red(0));
  viewOutput(lib.red(false));
  viewOutput(lib.red(true));
  viewOutput(lib.red(NaN));
  viewOutput(lib.red(1/0));
}

console.log(black.bgGreen('\n ansis '));
viewOutput(ansis.red());          // => empty string
viewOutput(ansis.red(undefined)); // => empty string
viewOutput(ansis.red(null));      // => empty string
viewOutput(ansis.red(''));        // => empty string
viewOutput(ansis.red(0));         // => 0
viewOutput(ansis.red(false));     // => false
viewOutput(ansis.red(true));      // => true
viewOutput(ansis.red(NaN));       // => NaN
viewOutput(ansis.red(1/0));       // => Infinity

console.log(black.bgGreen('\n chalk '));
viewOutput(chalk.red());               // => empty string
viewOutput(chalk.red(undefined)); // => undefined
viewOutput(chalk.red(null));      // => null
viewOutput(chalk.red(''));        // => empty string
viewOutput(chalk.red(0));         // => 0
viewOutput(chalk.red(false));     // => false
viewOutput(chalk.red(true));      // => true
viewOutput(chalk.red(NaN));           // => NaN
viewOutput(chalk.red(1/0));       // => Infinity

console.log(black.bgGreen('\n picocolors '));
viewOutput(pico.red());               // => undefined
viewOutput(pico.red(undefined)); // => undefined
viewOutput(pico.red(null));      // => null
viewOutput(pico.red(''));        // => empty string with ANSI codes
viewOutput(pico.red(0));         // => 0
viewOutput(pico.red(false));     // => false
viewOutput(pico.red(true));      // => true
viewOutput(pico.red(NaN));            // => NaN
viewOutput(pico.red(1/0));       // => Infinity

console.log(black.bgGreen('\n ansi-colors '));
viewOutput(ansiColors.red());             // => empty string
viewOutput(ansiColors.red(undefined)); // => empty string
viewOutput(ansiColors.red(null));      // => empty string
viewOutput(ansiColors.red(''));        // => empty string
viewOutput(ansiColors.red(0));         // => 0
viewOutput(ansiColors.red(false));     // => false
viewOutput(ansiColors.red(true));      // => true
viewOutput(ansiColors.red(NaN));          // => NaN
viewOutput(ansiColors.red(1/0));       // => Infinity

console.log(black.bgGreen('\n colorette '));
fnArguments(colorette);


console.log(black.bgGreen('\n kleur '));
fnArguments(kleur);

console.log(black.bgGreen('\n kolorist '));
fnArguments(kolorist);

console.log(black.bgGreen('\n colorsJs '));
fnArguments(colorsJs);

console.log(black.bgGreen('\n cliColor '));
fnArguments(cliColor);

console.log(black.bgGreen('\n colorCli '));
fnArguments(colorCli);
