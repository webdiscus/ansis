// test new named import
import ansis, { Ansis, red, yellow, green } from 'ansis';

// test old named import
import { magenta, cyan, blue } from 'ansis/colors';

const log = console.log;

const ansis2 = new Ansis();

log(ansis.green.inverse(' ESM '));
log(ansis2.bgCyanBright('const ansis = new Ansis();'));

log(`--- NEW named import: ${yellow`import { red, yellow, green } from 'ansis';`}`);
log(red('red'));
log(green.bold('green bold'));
log(yellow.italic`yellow italic`);

log(`--- OLD  named import: ${yellow`import { magenta, cyan, blue } from 'ansis/colors';`}`);
log(magenta`magenta`);
log(cyan.bold`cyan bold`);
log(blue.italic`blue italic`);