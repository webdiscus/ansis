// Note: Ansis has limitations by using in tsconfig "module": "Node16" and "moduleResolution": "Node16"
// - works as pure CJS module (module must be required, not imported)
// - importing types (AnsiColors, Ansis) are not available
// Solution: use "moduleResolution" as "node" instead of "Node16".
// import ansis, { Ansis, type AnsiColors, greenBright, bg, bgGray, bgCyanBright } from 'ansis';

// Note: CommonJS (require) does not support destructuring and default import in the same statement like:
// const ansis, { bg, bgGray, bgCyanBright } = require('ansis');

const ansis = require('ansis');

const { Ansis, bg, bgGray, bgCyanBright } = ansis;

const log = console.log;

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
log(ansis.red(true));
log(ansis.red(false));
log(ansis.red([true, false]));