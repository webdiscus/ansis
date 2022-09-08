import ansis from 'ansis';
import { red, green, blue, yellow, magenta } from 'ansis/colors';

const log = console.log;

log(ansis.green.inverse('ESM'));
log(red('red'));
log(green.bold('green'));
log(blue.underline.italic('blue'));
log(yellow.italic(`yellow using ${'some'} variable`));
log(magenta.underline`magenta using template literal`);