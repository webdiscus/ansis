import lib from 'chalk';
import spectrum from '../spectrum.js';
import { updatePageInfo } from './ansi-check.js';


window.onload = () => {
  let test = lib.red('red');
  updatePageInfo(test);
};

const labelName = 'Chalk';
const label = (text) => lib.bgGreen.whiteBright.bold(text);

console.log(label(` ${labelName} `) + lib.red(` Red`));
console.log(label(` ${labelName} `) + lib.green(` Green`));
console.log(label(` ${labelName} `) + lib.blue(` Blue`));
console.log(label(` ${labelName} `) + lib.hex('#B57EDC')(` TrueColor Lavenders`));

let spectrumColors = '';
spectrum.forEach(color => {spectrumColors += lib.hex(color)('█');});
console.log(spectrumColors);
