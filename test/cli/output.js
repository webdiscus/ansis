import ansis from '../../src/index.js';
const c = ansis;

console.log(
  c.red('red') +
    '|' +
    c.rgb(80, 80, 80)('rgb') +
    '|' +
    c.bgRgb(80, 80, 80)('bgRgb') +
    '|' +
    c.hex('#fff')('hex') +
    '|' +
    c.bgHex('#fff')('bgHex')
);