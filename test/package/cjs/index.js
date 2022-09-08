const ansis = require('ansis');
const { red, green, blue, yellow, magenta } = require('ansis/colors');

const log = console.log;

log(ansis.green.inverse('CommonJS'));
log(red('red'));
log(green.bold('green'));
log(blue.underline.italic('blue'));
log(yellow.italic(`yellow using ${'some'} variable`));
log(magenta.underline`magenta using template literal`);