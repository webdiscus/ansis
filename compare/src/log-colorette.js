// FATAL ERROR in ./node_modules/colorette/index.js
// Can't resolve 'tty'...
import lib from 'colorette';

let label = (text) => lib.green(text);

console.log(label(` colorette `) + lib.red(` Red`));
