#!/usr/bin/env node

import ansis, {
  Ansis,
  red,
  green,
  blue,
  cyan,
  yellow,
  yellowBright,
  magenta,
  bold,
  italic,
  underline,
  inverse,
  visible,
  hex,
} from 'ansis';

import { ansi256Table } from './ansi256.js';
import { ansisLogo } from './ansis-logo.js';
import { ansisStylesDemo } from './ansis-styles-demo.js';

const log = console.log;
const style = 'green';

/**
 * ANSIS Logo.
 * Showing in readme.
 */

console.log(inverse`ANSIS logo:`);
log();
log(ansisLogo);

/**
 * Demo of styles.
 * Showing in readme.
 */
log(inverse`ANSIS styles demo:`);
log();
log(ansisStylesDemo);

/**
 * ANSI 256 color table.
 * Showing in readme.
 */
log(inverse`ANSI 256 color table:`);
log();
log(ansi256Table);

/**
 * Benchmark samples
 */
log();
log(inverse`Benchmark samples:`);
log();

// Output benchmark samples
log('Colorette bench: ', red(`${bold(`${cyan(`${yellow('yellow')}cyan`)}`)}red`));
log('Base styles: ', ansis[style]('foo'));
log('Chained styles: ', ansis[style].bold.underline.italic('foo'));
log('Nested calls: ', ansis[style](ansis.bold(ansis.underline(ansis.italic('foo')))));
log('FG HEX 3 color: ', ansis.hex('#FBA')('foo'));
log('BG HEX 6 color: ', ansis.bgHex('#FFBBAA').black('foo'));
log('FG RGB color: ', ansis.rgb(100, 150, 200)('foo'));
log('BG RGB color: ', ansis.bgRgb(100, 150, 200).black('foo'));
log('FG ANSI 256 colors: ', ansis.ansi256(96)('foo'));
log('FG ANSI 256 colors: ', ansis.fg(96)('foo alias'));
log('BG ANSI 256 colors: ', ansis.black.bgAnsi256(106)('foo'));
log('BG ANSI 256 colors: ', ansis.black.bg(106)('foo alias'));
log();

/**
 * Background color
 */
log();
log(inverse`Background color:`);
log();
log(ansis.bold.italic.hex('#800909').bgHex('#ffe49e')('Hello ansis!'));
log(ansis.bold.italic.bgHex('#800909').hex('#ffe49e')('Hello ansis!'));

/**
 * New line break
 */
log();
log(inverse`New line break:`);
log();

log(ansis.black.bgGreen(`\n Ansis \n NEW LINE \n NEXT NEW LINE \n`));
log(ansis.black.bgRgb(200, 80, 300)(`\nAnsis\n${ansis.black.bgBlueBright('NEW LINE')}\nNEXT NEW LINE\n`));

/**
 * README example
 */
log();
log(inverse`README example:`);
log();
log(ansis.green(`Hello ${ansis.inverse('ANSI')} World!`));
log(ansis.black.bgYellow(`Warning:`) + ansis.cyan(' /path/to/file.js ') + ansis.red(`not found!`));
log();

// Check replacement in props.parent
//log(ansis.green.bold.underline(`foo ${ansis.red.italic('bar')} foo`));

/**
 * Nested syntax
 */
log();
log(inverse`Nested syntax:`);
log();
log(red(`red ${italic`red italic ${underline`red italic underline`}`} red`));
log();
// simple variant for readme
log(
  green(
    `green ${yellow(
      `yellow ${magenta(
        `magenta ${cyan(
          `cyan ${red.italic.underline(`red italic underline`)} cyan`,
        )} magenta`,
      )} yellow`,
    )} green`,
  ),
);

/**
 * Deep nested chained styles
 */
log();
log(inverse`Deep nested chained styles:`);
log(
  green(
    `green ${cyan(
      `cyan ${red(
        `red ${yellow(
          `yellow ${blue(
            `blue ${magenta(
              `magenta ${underline(`underline ${yellowBright.italic(`italic bright yellow`)} underline`)} magenta`,
            )} blue`,
          )} yellow`,
        )} red`,
      )} cyan`,
    )} green`,
  ),
);
log();

/**
 * Low level - opn/close props
 */
log();
log(inverse`Low level - open/close props:`);
const themeColor = ansis.yellowBright.bold;
log(themeColor.open + 'bright yellow bold' + themeColor.close);

const myStyle = ansis.bold.italic.black.bgHex('#ABCDEF');
log(`Hello ${ansis.green.open}ANSI${ansis.green.close} World!`);
log(`Hello ${myStyle.open}ANSI${myStyle.close} World!`);

/**
 * Nested template strings
 */
log();
log(inverse`Nested template strings:`);
log();

const pink = hex('#FF75D1');

log(red`red`);
log(yellow.italic`yellow using ${'some'} variable`);
log(hex('#fce').bgCyan.underline`text underline`);
log(red`red ${green`green ${pink.italic`pink italic`} green`} red`);
log(red`red ${cyan.bold`cyan bold ${pink.underline`pink bold underline`} cyan bold`} red`);

/**
 * Extend base colors
 */
log();
log(inverse`Extend base colors:`);
log();

ansis.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

log(ansis.pink('pink'));
log(ansis.orange('orange'));
log(ansis.orange.bold('orange'));
//log(ansis.bold.orange('orange')); // => error, but by 2nd extension it works, see the `side effect` below

/**
 * Problem description
 *
 * When imported instance `ansis` is extended with custom color,
 * then new color is accessible in first level only:
 *
 * ```js
 * import ansis from 'ansis';
 * ansis.extend({ orange: '#FFAB40' });
 * ansis.orange.bold('text'); // OK
 * ansis.bold.orange('text'); // => error
 * ```
 *
 * Solution
 *
 * For 100% compatibility must be created new instance in your code and then extended.
 *
 * ```js
 * import { Ansis } from 'ansis';
 * const ansis = new Ansis();
 * ansis.extend({ orange: '#FFAB40' }); // note: extend new created instance
 * ansis.orange.bold('text'); // OK
 * ansis.bold.orange('text'); // OK, new color is accessible anywhere
 * ```
 */

const ansis2 = new Ansis();

log(ansis2.bold.red('red'));

ansis2.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

log(ansis2.pink('pink'));
// SIDE EFFECT: here works only because the ansis is already extended: ansis.extend({orange:'..'}), see above
log(ansis2.italic.orange('orange'));

/**
 * Misc
 */
// visible
log(ansis.visible`visible`);

/**
 * Multiline nested example from readme
 */
let cpu = 33;
let ram = 44;
let disk = 55;

// ansis: standard ES2016 syntax, very fast because works native
log(visible`
CPU:  ${red`${cpu}%`}
RAM:  ${green`${ram}%`}
DISK: ${hex('#FFAB40')`${disk}%`}
`);

log(inverse`
CPU:  ${red`${cpu}%`}
RAM:  ${green`${ram}%`}
DISK: ${hex('#FFAB40')`${disk}%`}
`);

// chalk: non-standard syntax, bad practices, slow because used RegExp
// log(chalk`
// CPU:  {red.bold ${cpu}%}
// RAM:  {green ${ram}%}
// DISK: {hex('#FFAB40') ${disk}%}
// `);
