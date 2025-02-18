import lib from 'ansis';
import spectrum from '../spectrum.js';

let fallbackColors = '';
spectrum.forEach(color => {fallbackColors += lib.hex(color)('█');});

console.log(lib.bgGreen.whiteBright.bold` Ansis `+ lib.red` Red`);
console.log(lib.bgGreen.whiteBright.bold` Ansis `+ lib.green` Green`);
console.log(lib.bgGreen.whiteBright.bold` Ansis `+ lib.blue` Blue`);
console.log(lib.bgGreen.whiteBright.bold` Ansis `+ lib.hex('#B57EDC')` TrueColor Lavenders`);
console.log(fallbackColors);
