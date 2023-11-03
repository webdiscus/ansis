const ansis = require('ansis');

// test new named import
const { Ansis, red, yellow, green } = require('ansis');

// test old named import
const { magenta, cyan, blue } = require('ansis/colors');

const log = console.log;

const ansis2 = new Ansis();

log(ansis.green.inverse(' CommonJS '));
log(ansis2.bgCyanBright('const ansis = new Ansis();'));

log(`--- NEW named import: ${yellow`const { red, yellow, green } = require('ansis');`}`);
log(red('red'));
log(green.bold('green bold'));
log(yellow.italic`yellow italic`);

log(`--- OLD  named import: ${yellow`const { magenta, cyan, blue } = require('ansis/colors');`}`);
log(magenta`magenta`);
log(cyan.bold`cyan bold`);
log(blue.italic`blue italic`);