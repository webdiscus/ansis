import lib from 'chalk';
import spectrum from '../spectrum.js';

let fallbackColors = '';
spectrum.forEach(color => {fallbackColors += lib.hex(color)('█');});

console.log(lib.bgGreen.whiteBright.bold` Chalk `+ lib.red` Red`);
console.log(lib.bgGreen.whiteBright.bold` Chalk `+ lib.green` Green`);
console.log(lib.bgGreen.whiteBright.bold` Chalk `+ lib.blue` Blue`);
console.log(lib.bgGreen.whiteBright.bold` Chalk `+ lib.hex('#B57EDC')` TrueColor Lavenders`);
console.log(fallbackColors);
