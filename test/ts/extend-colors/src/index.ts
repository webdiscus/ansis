import ansis, { AnsiColorsExtend } from 'ansis';

const log = console.log;

// color names by hex: https://chir.ag/projects/name-that-color/
const myTheme = {
  pink: '#FF75D1',
  orange: '#FFAB40',
  apple: '#4FA83D',
};

// OK
// Define the function using the extracted valid styles from the extended instance
const myLog = (style: AnsiColorsExtend<keyof typeof myTheme>, message: string) => {
  console.log(ansis[style](message));
};

// OK
// `AnsiColorsExtend` is an extendable type to add a custom color in the default color list
// const myLog = (style: AnsiColorsExtend<'pink' | 'orange'>, message: string) => {
//   console.log(customAnsis[style](message));
// };

// Extend base colors
//const customAnsis = ansis.extend(myTheme);
ansis.extend(myTheme);

// Access extended colors
//const { pink, orange, red } = customAnsis;
const { pink, orange, red } = ansis;

myLog('red', 'default: red'); // default style, OK
myLog('cyanBright', 'default: cyanBright'); // default style, OK
myLog('pink', 'extended: pink'); // extended style, OK
myLog('orange', 'extended: orange'); // extended style, OK
// myLog('apple', 'extended: apple'); // OK
// myLog('unknown', 'message'); // TS Error, OK

//log(customAnsis.apple.italic`extended color: apple italic`);
log(ansis.apple.italic`extended color: apple italic`);
log(red`destructured default color: red`);
log(pink`destructured extended color: pink`);
log(orange.italic`destructured extended color: orange italic`);

log(ansis.pink.underline('extended chained color: pink underline'));
log(pink.underline('destructured extended chained color: pink underline'));