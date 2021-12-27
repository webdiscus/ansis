const esc = ([open, close]) => ({ open: `\x1b[${open}m`, close: `\x1b[${close}m` });

export const codes = {
  // commands
  reset: [0, 0],
  inverse: [7, 27],
  hidden: [8, 28],

  // styles
  bold: [1, 22],
  dim: [2, 22], // alias for faint
  faint: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  doubleUnderline: [21, 24],
  strikethrough: [9, 29],
  strike: [9, 29], // alias for strikethrough
  frame: [51, 54],
  encircle: [52, 54],
  overline: [53, 55],

  // foreground colors
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39], // alias for blackBright
  blackBright: [90, 39],
  redBright: [91, 39],
  greenBright: [92, 39],
  yellowBright: [93, 39],
  blueBright: [94, 39],
  magentaBright: [95, 39],
  cyanBright: [96, 39],
  whiteBright: [97, 39],

  // background colors
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  bgBlackBright: [100, 49],
  bgRedBright: [101, 49],
  bgGreenBright: [102, 49],
  bgYellowBright: [103, 49],
  bgBlueBright: [104, 49],
  bgMagentaBright: [105, 49],
  bgCyanBright: [106, 49],
  bgWhiteBright: [107, 49],
};

export const ansiCodes = {
  // commands
  reset: esc([0, 0]),
  inverse: esc([7, 27]),
  hidden: esc([8, 28]),

  // styles
  bold: esc([1, 22]),
  dim: esc([2, 22]), // alias for faint
  faint: esc([2, 22]),
  italic: esc([3, 23]),
  underline: esc([4, 24]),
  doubleUnderline: esc([21, 24]),
  strikethrough: esc([9, 29]),
  strike: esc([9, 29]), // alias for strikethrough
  frame: esc([51, 54]),
  encircle: esc([52, 54]),
  overline: esc([53, 55]),

  // foreground colors
  black: esc([30, 39]),
  red: esc([31, 39]),
  green: esc([32, 39]),
  yellow: esc([33, 39]),
  blue: esc([34, 39]),
  magenta: esc([35, 39]),
  cyan: esc([36, 39]),
  white: esc([37, 39]),
  gray: esc([90, 39]), // alias for blackBright
  blackBright: esc([90, 39]),
  redBright: esc([91, 39]),
  greenBright: esc([92, 39]),
  yellowBright: esc([93, 39]),
  blueBright: esc([94, 39]),
  magentaBright: esc([95, 39]),
  cyanBright: esc([96, 39]),
  whiteBright: esc([97, 39]),

  // background colors
  bgBlack: esc([40, 49]),
  bgRed: esc([41, 49]),
  bgGreen: esc([42, 49]),
  bgYellow: esc([43, 49]),
  bgBlue: esc([44, 49]),
  bgMagenta: esc([45, 49]),
  bgCyan: esc([46, 49]),
  bgWhite: esc([47, 49]),
  bgBlackBright: esc([100, 49]),
  bgRedBright: esc([101, 49]),
  bgGreenBright: esc([102, 49]),
  bgYellowBright: esc([103, 49]),
  bgBlueBright: esc([104, 49]),
  bgMagentaBright: esc([105, 49]),
  bgCyanBright: esc([106, 49]),
  bgWhiteBright: esc([107, 49]),
};
