import lib from 'tinyrainbow';

let label = (text) => lib.whiteBright(lib.bgGreen(text));

console.log(label(` tinyrainbow `) + lib.red(` Red`));
