import ansis, { Ansis } from './index.js';

export { Ansis, ansis as default };

export const {
  // color functions
  ansi256,
  ansi,
  fg,
  bgAnsi256,
  bgAnsi,
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
  faint,
  italic,
  underline,
  doubleUnderline,
  strikethrough,
  strike,
  frame,
  encircle,
  overline,

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
} = ansis;
