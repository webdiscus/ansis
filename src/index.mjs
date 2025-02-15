import a, { Ansis } from './index.js';

export { Ansis, a as default };

export const {
  // color functions
  ansi256,
  fg,
  bgAnsi256,
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
  strike,

  // foreground colors
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  grey,
  gray,
  blackBright,
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
  bgGrey,
  bgGray,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright,
} = a;
