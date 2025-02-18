import lib from 'cli-color';

let label = (text) => lib.green(text);

console.log(label(` cli-color `) + lib.red(` Red`));
