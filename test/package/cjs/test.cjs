const ansis = require('ansis');

// test new named import
const { Ansis, red, green, yellow, hex } = require('ansis');

// test old named import
const { magenta, cyan, blue } = require('ansis/colors');

const log = console.log;

log(ansis.ansi256(227).inverse(' -= [ansis package] CommonJS =- '));

// styles
log(red.bold.underline(`red.bold.underline('red')`));
log(ansis.red.bold.underline(`ansis.red.bold.underline(red)`));

log(hex('#faff63').bold(`hex('#FFAB40').bold('#63ffc6')`));
log(ansis.hex('#faff63').bold(`ansis.hex('#FFAB40').bold(#63ffc6)`));

// extend
ansis.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

log(ansis.pink('ansis.pink'));
log(ansis.orange('ansis.orange'));
log(ansis.orange.bold('ansis.orange.bold'));

const ansis2 = new Ansis();
log(ansis2.bold.red('ansis2.bold.red'));

ansis2.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

log(ansis2.pink('extend: ansis2.pink'));
log(ansis2.italic.orange('extend: ansis2.italic.orange'));

// strip
const greenText = green`green text`;
log('colored: ', greenText);
log('striped: ', ansis.strip(greenText));

log(`--- OLD  named import: ${yellow`const { magenta, cyan, blue } = require('ansis/colors');`}`);
log(magenta`magenta`);
log(cyan.bold`cyan bold`);
log(blue.italic`blue italic`);