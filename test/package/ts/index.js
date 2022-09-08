import ansis from 'ansis';
import { red, green, blue, yellow, magenta } from 'ansis/colors';

const log = console.log;
const pink = ansis.hex('#FF75D1');

const boldText = ansis.bold.open + 'text bold' + ansis.bold.close;
const styledText = magenta.underline.italic('underline italic magenta');
const str = 'string';

log(boldText);
log(pink('pink'));
log(red('red'));
log(green.bold('green'));
log(blue.underline.italic('blue'));
log(yellow.italic(`yellow using ${str} variable`));
log(red.bgCyan.underline.hex('#fce')('text underline'));
log(styledText);
log(ansis.strip(styledText));

// Extend base colors
/** @type {AnsiColorsExtend<'pink' | 'orange | rubin'>} */
ansis.extend({
  //pink: '#FF75D1',
  pink: pink.props,
  orange: '#FFAB40',
  rubin: '#94075b',
});

log(pink`pink`);
log(ansis.orange.italic`orange ${pink`pink`} orange ${ansis.bold.red`rubin`}`);

ansis.rubin

log(ansis.rubin`rubin`);
log(ansis.rubin.bold`rubin`);
log(ansis.bold`rubin`);
log(ansis.bold.rubin`rubin`);