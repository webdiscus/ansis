import { hexToRgb, rgbToAnsi256, rgbToAnsi16, ansi256To16 } from './utils.js';
import { getColorSpace } from './color-support.js';

const colorSpace = getColorSpace();
export const isSupported = colorSpace > 0;
const mono = { open: '', close: '' };
const monoFn = () => mono;
const esc = isSupported ? (open, close) => ({ open: `\x1b[${open}m`, close: `\x1b[${close}m` }) : monoFn;
const closeCode = 39;
const bgCloseCode = 49;

const ESC = '\x1b';
const BEL = '\x07';
const ZWSP = '\u200B';

// defaults, true color
let fnAnsi256 = (code) => esc(`38;5;${code}`, closeCode);
let fnBgAnsi256 = (code) => esc(`48;5;${code}`, bgCloseCode);
let fnRgb = (r, g, b) => esc(`38;2;${r};${g};${b}`, closeCode);
let fnBgRgb = (r, g, b) => esc(`48;2;${r};${g};${b}`, bgCloseCode);

const createRgbFn = (fn) => (r, g, b) => fn(rgbToAnsi256(r, g, b));

const createHexFn = (fn) => (hex) => {
  let [r, g, b] = hexToRgb(hex);
  return fn(r, g, b);
};

if (colorSpace === 1) {
  // ANSI 16 colors
  fnAnsi256 = (code) => esc(ansi256To16(code), closeCode);
  fnBgAnsi256 = (code) => esc(ansi256To16(code) + 10, bgCloseCode);
  fnRgb = (r, g, b) => esc(rgbToAnsi16(r, g, b), closeCode);
  fnBgRgb = (r, g, b) => esc(rgbToAnsi16(r, g, b) + 10, bgCloseCode);
} else if (colorSpace === 2) {
  // ANSI 256 colors
  fnRgb = createRgbFn(fnAnsi256);
  fnBgRgb = createRgbFn(fnBgAnsi256);
}

export const baseStyles = {
  // misc
  visible: mono,
  reset: esc(0, 0),
  inverse: esc(7, 27),
  hidden: esc(8, 28),

  // styles
  bold: esc(1, 22),
  dim: esc(2, 22),
  italic: esc(3, 23),
  underline: esc(4, 24),
  strikethrough: esc(9, 29),
  strike: esc(9, 29), // alias for strikethrough

  // foreground colors
  // black: esc(30, closeCode),
  // red: esc(31, closeCode),
  // green: esc(32, closeCode),
  // yellow: esc(33, closeCode),
  // blue: esc(34, closeCode),
  // magenta: esc(35, closeCode),
  // cyan: esc(36, closeCode),
  // white: esc(37, closeCode),
  grey: esc(90, closeCode), // UK spelling alias for blackBright
  gray: esc(90, closeCode), // US spelling alias for blackBright
  // blackBright: esc(90, closeCode),
  // redBright: esc(91, closeCode),
  // greenBright: esc(92, closeCode),
  // yellowBright: esc(93, closeCode),
  // blueBright: esc(94, closeCode),
  // magentaBright: esc(95, closeCode),
  // cyanBright: esc(96, closeCode),
  // whiteBright: esc(97, closeCode),

  // background colors
  // bgBlack: esc(40, bgCloseCode),
  // bgRed: esc(41, bgCloseCode),
  // bgGreen: esc(42, bgCloseCode),
  // bgYellow: esc(43, bgCloseCode),
  // bgBlue: esc(44, bgCloseCode),
  // bgMagenta: esc(45, bgCloseCode),
  // bgCyan: esc(46, bgCloseCode),
  // bgWhite: esc(47, bgCloseCode),
  bgGrey: esc(100, bgCloseCode), // UK spelling alias for bgBlackBright
  bgGray: esc(100, bgCloseCode), // US spelling alias for bgBlackBright
  // bgBlackBright: esc(100, bgCloseCode),
  // bgRedBright: esc(101, bgCloseCode),
  // bgGreenBright: esc(102, bgCloseCode),
  // bgYellowBright: esc(103, bgCloseCode),
  // bgBlueBright: esc(104, bgCloseCode),
  // bgMagentaBright: esc(105, bgCloseCode),
  // bgCyanBright: esc(106, bgCloseCode),
  // bgWhiteBright: esc(107, bgCloseCode),
};

// generate ANSI 16 colors dynamically and save ~450 bytes
let styles = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
let bright = 'Bright';
let code = 30;
let name, bgName;

for (name of styles) {
  bgName = 'bg' + name[0].toUpperCase() + name.slice(1);

  baseStyles[name] = esc(code, closeCode);
  baseStyles[name + bright] = esc(code + 60, closeCode);
  baseStyles[bgName] = esc(code + 10, bgCloseCode);
  baseStyles[bgName + bright] = esc(code + 70, bgCloseCode);

  code++;
}

export const styleMethods = {
  fg: fnAnsi256,
  bg: fnBgAnsi256,
  rgb: fnRgb,
  bgRgb: fnBgRgb,
  // note: the `...` operator is too slow
  //hex: (hex) => fnRgb(...hexToRgb(hex)),
  hex: createHexFn(fnRgb),
  // note: the `...` operator is too slow
  //bgHex: (hex) => fnBgRgb(...hexToRgb(hex)),
  bgHex: createHexFn(fnBgRgb),

  // reserved for future: hyperlink (OSC 8) is not widely supported (works in iTerm)
  // link: hasColor
  //   ? (url) => ({ open: ESC + ']8;;' + url + BEL, close: ESC + ']8;;' + BEL })
  //   : (url) => ({ open: '', close: `(${ZWSP}${url}${ZWSP})` }),
};

export const rgb = fnRgb;
