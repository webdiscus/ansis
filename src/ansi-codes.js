import { clamp, hexToRgb } from './utils.js';
import { isSupported } from './color-support.js';

const noColor = { open: '', close: '' };
const esc = isSupported() ? (open, close) => ({ open: `\x1b[${open}m`, close: `\x1b[${close}m` }) : () => noColor;

export const fnAnsi256 = (code) => esc(`38;5;${code}`, 39);
export const fnBgAnsi256 = (code) => esc(`48;5;${code}`, 49);
export const fnRgb = (r, g, b) => esc(`38;2;${r};${g};${b}`, 39);
export const fnBgRgb = (r, g, b) => esc(`48;2;${r};${g};${b}`, 49);

export const baseStyles = {
  // misc
  visible: noColor,
  reset: esc(0, 0),
  inverse: esc(7, 27),
  hidden: esc(8, 28),

  // styles
  bold: esc(1, 22),
  dim: esc(2, 22),
  faint: esc(2, 22), // alias for dim, TODO: remove in next major release
  italic: esc(3, 23),
  underline: esc(4, 24),
  doubleUnderline: esc(21, 24), // not widely supported, TODO: remove in next major release
  strikethrough: esc(9, 29),
  strike: esc(9, 29), // alias for strikethrough
  frame: esc(51, 54), // not widely supported, TODO: remove in next major release
  encircle: esc(52, 54), // not widely supported, TODO: remove in next major release
  overline: esc(53, 55), // not widely supported, TODO: remove in next major release

  // foreground colors
  black: esc(30, 39),
  red: esc(31, 39),
  green: esc(32, 39),
  yellow: esc(33, 39),
  blue: esc(34, 39),
  magenta: esc(35, 39),
  cyan: esc(36, 39),
  white: esc(37, 39),
  grey: esc(90, 39), // UK spelling alias for blackBright
  gray: esc(90, 39), // US spelling alias for blackBright
  blackBright: esc(90, 39),
  redBright: esc(91, 39),
  greenBright: esc(92, 39),
  yellowBright: esc(93, 39),
  blueBright: esc(94, 39),
  magentaBright: esc(95, 39),
  cyanBright: esc(96, 39),
  whiteBright: esc(97, 39),

  // background colors
  bgBlack: esc(40, 49),
  bgRed: esc(41, 49),
  bgGreen: esc(42, 49),
  bgYellow: esc(43, 49),
  bgBlue: esc(44, 49),
  bgMagenta: esc(45, 49),
  bgCyan: esc(46, 49),
  bgWhite: esc(47, 49),
  bgGrey: esc(100, 49), // UK spelling alias for bgBlackBright
  bgGray: esc(100, 49), // US spelling alias for bgBlackBright
  bgBlackBright: esc(100, 49),
  bgRedBright: esc(101, 49),
  bgGreenBright: esc(102, 49),
  bgYellowBright: esc(103, 49),
  bgBlueBright: esc(104, 49),
  bgMagentaBright: esc(105, 49),
  bgCyanBright: esc(106, 49),
  bgWhiteBright: esc(107, 49),
};

export const styleMethods = {
  fg: (code) => fnAnsi256(clamp(code, 0, 255)),
  bg: (code) => fnBgAnsi256(clamp(code, 0, 255)),
  hex: (hex) => fnRgb(...hexToRgb(hex)),
  bgHex: (hex) => fnBgRgb(...hexToRgb(hex)),
  rgb: (r, g, b) => fnRgb(
    clamp(r, 0, 255),
    clamp(g, 0, 255),
    clamp(b, 0, 255),
  ),
  bgRgb: (r, g, b) => fnBgRgb(
    clamp(r, 0, 255),
    clamp(g, 0, 255),
    clamp(b, 0, 255),
  ),
};
