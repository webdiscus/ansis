// Type check of the `ansis` public API usage.
// Compiled with `strict: true` by `npm run test:dts`.
// A line with `@ts-expect-error` must be a type error, otherwise the compilation fails.

import ansis, { Ansis, AnsiColors, red, green, blue, yellow, magenta } from 'ansis';

type AnsiColorsExtend<T extends string> = AnsiColors | (T & Record<never, never>);

const log = console.log;
const pink = ansis.hex('#FF75D1');

// create new instance
const ansis2 = new Ansis();
log(ansis2.cyan('new instance'));

// Extend base colors
ansis.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

// `AnsiColorsExtend` is an extendable type for TS to add a custom color
const write = (style: AnsiColorsExtend<'pink' | 'orange'>, message: string) => {
  // custom colors are not properties of the `ansis` type, so the style is cast to a known color
  console.log(ansis[style as AnsiColors](message));
};

write('red', 'message'); // default style OK
write('pink', 'message'); // extended style OK

// @ts-expect-error unknown style is a type error
write('unknown', 'message');

// @ts-expect-error unknown property is a type error
ansis.unknownStyle('message');

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

log(ansis.link('http://example.com/', 'click'));
