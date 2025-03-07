import {
  bgBlue,
  bgBlueBright,
  black,
  blue, blueBright,
  cyan, cyanBright,
  dim, gray,
  green, greenBright,
  bold,
  inverse,
  italic,
  magenta, magentaBright,
  red, redBright,
  strikethrough,
  underline,
  white, whiteBright,
  yellow, yellowBright,
} from 'ansis';

import { hexToRgb } from '../src/utils.js';
import spectrum from '../examples/fixtures/spectrum.js';

const out = `${bold`bold`} ${dim`dim`} ${italic`italic`} ${underline`underline`} ${strikethrough`strikethrough`} ${inverse` inverse `} ${green.bold.italic.underline`green bold italic underline`}` +
  '\n' +
  `${red`red`} ${green`green`} ${yellow`yellow`} ${blue`blue`} ${magenta`magenta`} ${cyan`cyan`} ${white`white`} ${gray`gray`} ${bold.yellow`bold yellow`} ${dim.cyan`dim cyan`} ${red.italic`italic red`} ` +
  '\n' +
  `${black.bgRed`bgRed`} ${black.bgGreen`bgGreen`} ${black.bgYellow`bgYellow`} ${bgBlue`bgBlue`} ${black.bgMagenta`bgMagenta`} ${black.bgCyan`bgCyan`} ${black.bgWhite`bgWhite`} ${black.bgRedBright`bgRedBright`} ${white.bgRed.bold.italic` CocaCola `}` +
  '\n' +
  `${greenBright`greenBright`} ${yellowBright`yellowBright`} ${blueBright`blueBright`} ${magentaBright`magentaBright`} ${cyanBright`cyanBright`} ${whiteBright`whiteBright`} ${greenBright`A`}${magentaBright`N`}${yellowBright`S`}${redBright`I`}` +
  '\n' +
  `${black.bgGreenBright`bgGreenBright`} ${black.bgYellowBright`bgYellowBright`} ${bgBlueBright`bgBlueBright`} ${black.bgMagentaBright`bgMagentaBright`} ${black.bgCyanBright`bgCyanBright`} ${magentaBright.bgGreenBright`C`}${greenBright.bgMagentaBright`O`}${redBright.bgYellowBright`L`}${yellowBright.bgRedBright`O`}${redBright.bgCyanBright`R`}${yellowBright.bgBlueBright`S`}` +
  '\n' +
  [
    '#d93611',
    '#d97511',
    '#d9d611',
    '#a0d911',
    '#18d911',
    '#11d9c2',
    '#119dd9',
    '#1157d9',
    '#6614f6',
    '#c511d9',
    '#f10794',
  ].reduce((out, hex) => out + black.hex(hex)(hex), '') +
  '\n' +
  spectrum.reduce((out, hex) => out + black.hex(hex)('█'), '') +
  '\n' +
  [
    '#d93611',
    '#d9d609',
    '#18d911',
    '#099dd9',
    '#7a09f6',
    '#c509d9',
    '#f10794',
  ].reduce((out, hex) => {
    let [r, g, b] = hexToRgb(hex);
    return out + black.hex(hex)(`[${r},${g},${b}]`);
  }, '') + '\n' +
  [
    ' 197 ',
    ' 203 ',
    ' 209 ',
    ' 215 ',
    ' 221 ',
    ' 227 ',
    ' 191 ',
    ' 156  ',
    ' 120  ',
    ' 123 ',
    ' 117 ',
    ' 147 ',
    ' 141 ',
    '  98 ',
    '  92 ',
  ].reduce((out, code) => out + black.bgAnsi256(parseInt(code, 10))(code), '') +
  '\n ';

export { out as ansisStylesDemo };
