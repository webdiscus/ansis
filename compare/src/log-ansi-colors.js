import lib from 'ansi-colors';

let label = (text) => lib.green(text);

console.log(label(` ansi-colors `) + lib.red(` Red`));
