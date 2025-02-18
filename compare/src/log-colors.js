// FATAL ERROR in ./node_modules/@colors/colors/lib/colors.js 36:11-26
// Webpack can't resolve the lib.
import lib from '@colors/colors';

let label = (text) => lib.green(text);

console.log(label(` colors `) + lib.red(` Red`));
