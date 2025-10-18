import spectrum from '../examples/fixtures/spectrum.js';

import {
  Ansis,
  // Note: Standard ANSI colors differ in tone from their CSS color equivalents defined in 'css-color-names' package.
  black,
  cyan,
  cyanBright,
  dim, gray,
  green,
  bold,
  inverse,
  italic,
  magenta,
  red,
  strikethrough,
  underline,
  yellow,
  hex,
  rgb,
} from 'ansis';

import colorNames from 'css-color-names' with { type: 'json' };

const truecolor = new Ansis(3).extend(colorNames);

const {
  hotpink,
  orchid,
  mediumorchid,
  mediumvioletred,
  darkviolet,
  fuchsia,
  purple,
  bgTomato,
  bgOrange,
  bgLime,
  bgDeepskyblue,
  bgBlueviolet,
  bgDeeppink,
  bgGold,
} = new Ansis(3).extend(colorNames);

/**
 * Find truecolor names by length.
 *
 * @param {object} obj The input object.
 * @param {number} length The desired length.
 * @returns {string[]} List of color names matching the given length.
 */
function findColorByLength(obj, length) {
  return Object.keys(obj).filter(key => {
    if (key.length === length) {
      console.log(` ${truecolor[key](key)} `)
      return true;
    }
    return false;
  });
}

//findColorByLength(colorNames, 9); // use it only for dev

const out =
  `${bold`bold`} ${dim`dim`} ${italic`italic`} ${underline`underline`} ${strikethrough`strikethrough`} ${inverse` inverse `} ${green.bold.italic.underline`green.bold.italic.underline`}` +
  '\n' +
  `${red`red`} ${yellow`yellow`} ${green`green`} ${gray`gray`} ${cyan`cyan`} ${cyanBright`cyanBright`} ${dim.cyan`dim.cyan`} ${italic.blueBright`italic.blueBright`} ${bold.magenta`bold.magenta`}` +
  '\n' +
  `${black.bgRed` bgRed `}${black.bgYellow` bgYellow `}${black.bgGreen` bgGreen `}${black.bgGreenBright` bgGreenBright `}${black.bgCyan` bgCyan `}${black.bgMagenta` bgMagenta `}${black.bgMagentaBright` bgMagentaBright `} ` +
  '\n' +
  `${purple`purple`} ${magenta`magenta`} ${fuchsia`fuchsia`} ${orchid`orchid`} ${mediumorchid`mediumorchid`} ${mediumvioletred`mediumvioletred`} ${darkviolet`darkviolet`} ${hotpink`hotpink`}` +
  '\n' +
  `${bgTomato.black` bgTomato `}${bgOrange.black` bgOrange `}${bgGold.black` bgGold `}${bgLime.black` bgLime `}${bgDeepskyblue.black` bgDeepskyblue `}${bgBlueviolet.black` bgBlueviolet `}${bgDeeppink.black` bgDeeppink `}` +
  '\n' +
  `${hex('#dc143c')("hex('#dc143c')`crimson`")} ${hex('#f08080')("hex('#f08080')`lightcoral`")} ${hex('#1e90ff')("hex('#1e90ff')`dodgerblue`")} ` +
  '\n' +
  `${rgb(218,165,32)("rgb(218,165,32)`goldenrod`")} ${rgb(52,251,152)("rgb(152,251,152)`palegreen`")} ${rgb(255,127,80)("rgb(255,127,80)`coral`")} ` +
  '\n' +
  spectrum.reduce((out, hex) => out + black.hex(hex)('█'), '') +
  '\n' +
  [' 197 ', ' 203 ', ' 209 ', ' 215 ', ' 221 ', ' 227 ', ' 191 ', ' 156  ', ' 120  ', ' 123 ', ' 117 ', ' 147 ', ' 141 ', '  98 ', '  92 '].reduce(
    (out, code) => out + black.bg(parseInt(code, 10))(code),
    ''
  ) +
  '\n ';

export { out as ansisStylesDemo };
