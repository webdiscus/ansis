import ansis, { Ansis, AnsiColors } from 'ansis';

type AnsiColorsExtend<T extends string> = AnsiColors | (T & Record<never, never>);

const log = console.log;

// npm package for CSS color names: https://chir.ag/projects/name-that-color/
// tools to get name by hex: https://www.npmjs.com/package/css-color-names
const myTheme = {
  pink: '#FF75D1',
  orange: '#FFAB40',
  apple: '#4FA83D',
};

// Define the function using the extracted valid styles from the extended instance
const myLog = (style: AnsiColorsExtend<keyof typeof myTheme>, message: string) => {
  console.log(ansis[style](message));
};

// `AnsiColorsExtend` is an extendable type to add a custom color in the default color list
const myLog2 = (style: AnsiColorsExtend<'pink' | 'apple'>, message: string) => {
  console.log(ansis[style](message));
};

// Extend base colors
const color = ansis.extend(myTheme);

// Access extended colors
const { pink, orange, red } = color;

myLog('red', 'default: red'); // default style, OK
myLog('cyanBright', 'default: cyanBright'); // default style, OK
myLog('pink', 'extended: pink'); // extended style, OK
myLog('orange', 'extended: orange'); // extended style, OK
myLog2('apple', 'extended: apple'); // OK

// Expected: TS2345: Argument of type 'unknown' is not assignable to parameter of type AnsiColorsExtend<'pink' | 'orange' | 'apple'>
//myLog('unknown', 'message');

//log(customAnsis.apple.italic`extended color: apple italic`);
log(color.apple.italic`extended color: apple italic`);
log(red`destructured default color: red`);
log(pink`destructured extended color: pink`);
log(orange.italic`destructured extended color: orange italic`);

log(color.pink.underline('extended chained color: pink underline'));
log(pink.underline('destructured extended chained color: pink underline'));

// test in TS both extended variants: normal and background color names
log(color.orange('Orange foreground'));
log(color.bgOrange('Orange background'));

// Usage test: This should simulate what you'd get in TS validation

function testExtend(inst: Ansis) {
  const themed = inst.extend({
    foo: '#ff0',
    bar: { open: '\x1b[31m', close: '\x1b[39m' },
  });

  log(themed.foo('should be yellow'));
  log(themed.bar('should be red'));
}

function testExtend2(inst: InstanceType<typeof Ansis>) {
  const themed = inst.extend({ baz: '#ff0000' });

  log(themed.baz('should be red'));
}

testExtend(ansis);
testExtend2(ansis);