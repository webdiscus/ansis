// TS1484: AnsiColorsExtend is a type and must be imported using a type-only import when `verbatimModuleSyntax` is enabled.
import ansis, { Ansis, type AnsiColorsExtend, greenBright, bgAnsi256, bgGray, bgCyanBright } from 'ansis';

const log = console.log;

let isSupported = ansis.isSupported();
log('isSupported: ', ansis.ansi256(192)`${isSupported}`);
log('bgAnsi256: ', bgAnsi256(127)(1993)); // test number value
log('bgAnsi256: ', bgAnsi256(21)(true)); // test boolean value

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
ansis.extend(myTheme);

// Access extended colors
const { pink, orange, red } = ansis;

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

log(ansis.apple.italic`extended color: apple italic`);
log(red`destructured default color: red`);
log(pink`destructured extended color: pink`);
log(orange.italic`destructured extended color: orange italic`);

log(ansis.pink.underline('extended chained color: pink underline'));
log(pink.underline('destructured extended chained color: pink underline'));

log(ansis.gray`gray`);
log(bgGray` bgGray `);

log(bgCyanBright.yellowBright` bgCyanBright `);
log(ansis.bgWhiteBright.italic` bgWhiteBright `);