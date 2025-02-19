import lib from 'picocolors';
import { updatePageInfo } from './ansi-check.js';

window.onload = () => {
  let test = lib.red('red');
  updatePageInfo(test);
};

const label = (text) => lib.green(text);

console.log(label(` picocolors `) + lib.red(` Red`));
