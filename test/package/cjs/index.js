const ansis = require('ansis');
const { red, yellow, green } = require('ansis/colors');

const log = console.log;

log(ansis.green.inverse('CommonJS'));
log(red('red'));
log(green.bold('green bold'));
log(yellow.italic`yellow italic`);