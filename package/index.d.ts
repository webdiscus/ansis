interface Property {
  open: string;
  close: string;
}

interface Method {
  (string: string): string;
}

interface Color extends Method, Property {
  ansi256: (code: number) => Color;
  ansi: (code: number) => Color;
  fg: (code: number) => Color;
  rgb: (red: number, green: number, blue: number) => Color;
  hex: (color: string) => Color;
  bgAnsi256: (code: number) => Color;
  bgAnsi: (code: number) => Color;
  bg: (code: number) => Color;
  bgRgb: (red: number, green: number, blue: number) => Color;
  bgHex: (color: string) => Color;
  reset: Color;
  inverse: Color;
  hidden: Color;
  visible: Color;
  bold: Color;
  dim: Color;
  faint: Color;
  italic: Color;
  underline: Color;
  doubleUnderline: Color;
  overline: Color;
  strikethrough: Color;
  strike: Color;
  frame: Color;
  encircle: Color;
  black: Color;
  red: Color;
  green: Color;
  yellow: Color;
  blue: Color;
  magenta: Color;
  cyan: Color;
  white: Color;
  gray: Color;
  grey: Color;
  blackBright: Color;
  redBright: Color;
  greenBright: Color;
  yellowBright: Color;
  blueBright: Color;
  magentaBright: Color;
  cyanBright: Color;
  whiteBright: Color;
  bgBlack: Color;
  bgRed: Color;
  bgGreen: Color;
  bgYellow: Color;
  bgBlue: Color;
  bgMagenta: Color;
  bgCyan: Color;
  bgWhite: Color;
  bgGray: Color;
  bgBlackBright: Color;
  bgRedBright: Color;
  bgGreenBright: Color;
  bgYellowBright: Color;
  bgBlueBright: Color;
  bgMagentaBright: Color;
  bgCyanBright: Color;
  bgWhiteBright: Color;
}

declare const ansis: Color;
declare const Ansis: new (str: string) => Color;
export { Ansis, ansis as default };
