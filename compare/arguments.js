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
import tinyrainbow from 'tinyrainbow';
import ansis, { black } from 'ansis';

// Handling edge cases by various libraries

const viewOutput = (input, label) => {
  let type = typeof input;
  let output = type !== 'object' ? input.replace(/\x1b/g, 'ESC') : String(input);

  let testLabel = (label ? label : '').padEnd(16);

  console.log(ansis.cyanBright(testLabel), output);
}

const fnArguments = (lib) => {
  let resNoArg, resReset;

  try {
    resNoArg = lib.red()
  } catch (error) {
    resNoArg = 'ERROR';
  }

  try {
    resReset = lib.reset()
  } catch (error) {
    resReset = 'ERROR';
  }

  viewOutput(resNoArg, 'red()');
  viewOutput(lib.red(undefined), 'red(undefined)');
  viewOutput(lib.red(null), 'red(null)');
  viewOutput(lib.red(''), `red('')`);
  viewOutput(lib.red(0), 'red(0)');
  viewOutput(lib.red(false), 'red(false)');
  viewOutput(lib.red(true), 'red(false)');
  viewOutput(lib.red(NaN), 'red(NaN)');
  viewOutput(lib.red(1/0), 'red(NaN)');
  viewOutput(resReset, 'reset()');
}

console.log(black.bgGreen('\n ansis '));
fnArguments(ansis);

console.log(black.bgGreen('\n chalk '));
fnArguments(chalk);

console.log(black.bgGreen('\n picocolors '));
fnArguments(pico);

console.log(black.bgGreen('\n tinyrainbow '));
fnArguments(tinyrainbow);

console.log(black.bgGreen('\n ansi-colors '));
fnArguments(ansiColors);

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

console.log(black.bgGreen('\n cliColor '));
viewOutput(cliColor.reset, 'reset()');

console.log(ansis.cyan(ansis.whiteBright.bgRed('\n ERROR \n') + ansis.reset() + 'File not found!'));
console.log(ansis.cyan(pico.whiteBright(pico.bgRed('\n ERROR \n')) + pico.reset() + 'File not found!'));

console.log(black.bgGreen('\n Ansis reset() '));
console.log(ansis.red('red ' + ansis.underline('underline') + ' text'));
console.log(ansis.red('red ' + ansis.reset.underline('underline') + ' text'));
console.log(ansis.red('red ' + ansis.reset() + ansis.underline('underline') + ' text'));

//viewOutput(ansis.red('red ' + ansis.reset.underline('underline') + ' text'));
//viewOutput(ansis.red('red ' + ansis.reset() + ansis.underline('underline') + ' text'));
