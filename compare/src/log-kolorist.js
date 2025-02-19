import * as lib from 'kolorist';
import { updatePageInfo } from './ansi-check.js';

window.onload = () => {
  let test = lib.red('red');
  updatePageInfo(test);
};

const label = (text) => lib.bgGreen(text);

console.log(label(` Kolorist `) + lib.red(` Red`));
