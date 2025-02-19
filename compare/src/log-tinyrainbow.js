import lib from 'tinyrainbow';
import { updatePageInfo } from './ansi-check.js';

window.onload = () => {
  let test = lib.red('red');
  updatePageInfo(test);
};

const label = (text) => lib.whiteBright(lib.bgGreen(text));

console.log(label(` TinyRainbow `) + lib.red(` Red`));
console.log(label(` TinyRainbow `) + lib.green(` Green`));
console.log(label(` TinyRainbow `) + lib.blue(` Blue`));
