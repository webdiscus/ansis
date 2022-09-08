import ansis, {AnsiColorsExtend} from 'ansis';
import {red, green, blue, yellow, magenta} from 'ansis/colors';

const log = console.log;
const pink = ansis.hex('#FF75D1');

// Extend base colors
ansis.extend({
    pink: '#FF75D1',
    orange: '#FFAB40',
});

const write = (style: AnsiColorsExtend<'pink' | 'orange'>, message: string) => {
    console.log(ansis[style](message));
}

write('red', 'message'); // default style OK
write('pink', 'message'); // extended style OK
// write('unknown', 'message'); // TS Error

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