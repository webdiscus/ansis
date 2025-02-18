import lib from 'picocolors';

let label = (text) => lib.green(text);

console.log(label(` picocolors `) + lib.red(` Red`));
