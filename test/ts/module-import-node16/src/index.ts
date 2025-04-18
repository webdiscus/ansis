// TS1484: AnsiColorsExtend is a type and must be imported using a type-only import when `verbatimModuleSyntax` is enabled.
import ansis, { Ansis, type AnsiColorsExtend, greenBright, bg, bgGray, bgCyanBright } from 'ansis';

//import pico from 'picocolors'; // ok
//import { blue } from 'picocolors'; // Error: Named export 'blue' not found. The requested module 'picocolors' is a CommonJS module, which may not support all module.exports as named exports.

const log = console.log;

// test Picocolors in TS
//log(pico.red('pico red')); // no color output
//log(blue('pico blue')); // fatal error

let isSupported = ansis.isSupported();
log('isSupported: ', ansis.fg(192)`${isSupported}`);
log('bgAnsi256: ', bg(127)(1993)); // test number value
log('bgAnsi256: ', bg(21)(true)); // test boolean value

// test the magic getters defined static and dynamically
const resultColor: string = `${ansis.hex('#ff0')`Hello`}, ${ansis.red(`World`)}!`;
log(resultColor);

// test raw properties of a style
let strRed = ansis.red.open + 'red' + ansis.red.close;
log(strRed);

// test the method
const result = ansis.strip('Hello \x1b[31mWorld\x1b[0m!');
log(result);

// color names by hex: https://chir.ag/projects/name-that-color/
const myTheme = {
  pink: '#FF75D1',
  orange: '#FFAB40',
  apple: '#4FA83D',
};

// Extend base colors
const themed = ansis.extend(myTheme);

// Access extended colors
const { pink, orange, red } = themed;

// OK
// Define the function using the extracted valid styles from the extended instance
const myLog = (style: AnsiColorsExtend<keyof typeof myTheme>, message: string) => {
  log((ansis as Record<string, any>)[style](message));
};

// OK
const formatValue = (value: any, colorFn: Ansis) => {
  return colorFn(`${value} ${greenBright(`[${typeof value}]`)}`);
};

myLog('red', 'default: red'); // default style, OK
myLog('cyanBright', 'default: cyanBright'); // default style, OK
myLog('pink', 'extended: pink'); // extended style, OK
myLog('orange', 'extended: orange'); // extended style, OK
//myLog('apple', 'extended: apple'); // OK
//myLog('unknown', 'message'); // TS Error, OK

log(formatValue('formatValue', ansis.red));

log(themed.apple.italic`extended color: apple italic`);
log(red`destructured default color: red`);
log(pink`destructured extended color: pink`);
log(orange.italic`destructured extended color: orange italic`);

log(themed.pink.underline('extended chained color: pink underline'));
log(pink.underline('destructured extended chained color: pink underline'));

log(ansis.gray`gray`);
log(bgGray` bgGray `);

log(bgCyanBright.yellowBright` bgCyanBright `);
log(ansis.bgWhiteBright.italic` bgWhiteBright `);

// support boolean and array types
log(ansis.red(true))
log(ansis.red(false))
log(ansis.red([true, false]))