import ansis from 'ansis';
import { red, yellow, green } from 'ansis/colors';

const log = console.log;

log(ansis.green.inverse('ESM'));
log(red('red'));
log(green.bold('green bold'));
log(yellow.italic`yellow italic`);