import lib from 'kleur';
import { updatePageInfo } from './ansi-check.js';

window.onload = () => {
  let test = lib.red('red');
  updatePageInfo(test);
};

const label = (text) => lib.bgGreen(text);

console.log(label(` Kleur `) + lib.red(` Red`));
console.log(label(` Kleur `) + lib.green(` Green`));
console.log(label(` Kleur `) + lib.blue(` Blue`));
