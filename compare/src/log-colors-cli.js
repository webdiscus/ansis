import lib from 'colors-cli';

let label = (text) => lib.green(text);

console.log(label(` colors-cli `) + lib.red(` Red`));
