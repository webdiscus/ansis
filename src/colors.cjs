'use strict';

/** @type {Ansis} ansis */
const ansis = require('./bundle').default;

module.exports = {
  ansi256: ansis.ansi256,
  ansi: ansis.ansi,
  fg: ansis.fg,
  bgAnsi256: ansis.bgAnsi256,
  bgAnsi: ansis.bgAnsi,
  bg: ansis.bg,
  rgb: ansis.rgb,
  bgRgb: ansis.bgRgb,
  hex: ansis.hex,
  bgHex: ansis.bgHex,

  // misc
  reset: ansis.reset,
  inverse: ansis.inverse,
  hidden: ansis.hidden,
  visible: ansis.visible,

  // styles
  bold: ansis.bold,
  dim: ansis.dim,
  faint: ansis.faint,
  italic: ansis.italic,
  underline: ansis.underline,
  doubleUnderline: ansis.doubleUnderline,
  strikethrough: ansis.strikethrough,
  strike: ansis.strike,
  frame: ansis.frame,
  encircle: ansis.encircle,
  overline: ansis.overline,

  // foreground colors
  black: ansis.black,
  red: ansis.red,
  green: ansis.green,
  yellow: ansis.yellow,
  blue: ansis.blue,
  magenta: ansis.magenta,
  cyan: ansis.cyan,
  white: ansis.white,
  gray: ansis.gray,
  grey: ansis.grey,
  blackBright: ansis.blackBright,
  redBright: ansis.redBright,
  greenBright: ansis.greenBright,
  yellowBright: ansis.yellowBright,
  blueBright: ansis.blueBright,
  magentaBright: ansis.magentaBright,
  cyanBright: ansis.cyanBright,
  whiteBright: ansis.whiteBright,

  // background colors
  bgBlack: ansis.bgBlack,
  bgRed: ansis.bgRed,
  bgGreen: ansis.bgGreen,
  bgYellow: ansis.bgYellow,
  bgBlue: ansis.bgBlue,
  bgMagenta: ansis.bgMagenta,
  bgCyan: ansis.bgCyan,
  bgWhite: ansis.bgWhite,
  bgBlackBright: ansis.bgBlackBright,
  bgRedBright: ansis.bgRedBright,
  bgGreenBright: ansis.bgGreenBright,
  bgYellowBright: ansis.bgYellowBright,
  bgBlueBright: ansis.bgBlueBright,
  bgMagentaBright: ansis.bgMagentaBright,
  bgCyanBright: ansis.bgCyanBright,
  bgWhiteBright: ansis.bgWhiteBright,
};
