// ESM wrapper

import a from './index.js';

// default export
export default a;

// named exports
export const {
  Ansis,
  // color functions
  fg,
  bg,
  rgb,
  bgRgb,
  hex,
  bgHex,

  // misc
  reset,
  inverse,
  hidden,
  visible,

  // styles
  bold,
  dim,
  italic,
  underline,
  strikethrough,

  // foreground colors
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,

  // background colors
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  bgGray,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright,
} = a;
