import { hexToRgb, rgbToAnsi256, rgbToAnsi16, ansi256To16 } from './utils.js';
import { getColorSpace } from './color-support.js';

const colorSpace = getColorSpace();
export const isSupported = colorSpace > 0;
const mono = { open: '', close: '' };
const monoFn = () => mono;
const esc = isSupported ? (open, close) => ({ open: `\x1b[${open}m`, close: `\x1b[${close}m` }) : monoFn;
const closeCode = 39;
const bgCloseCode = 49;
const bgOffset = 10;

const createRgbFn = (fn) => (r, g, b) => fn(rgbToAnsi256(r, g, b));

const createHexFn = (fn) => (hex) => {
  // note: the `...` operator is too slow
  let [r, g, b] = hexToRgb(hex);
  return fn(r, g, b);
};

// defaults, true color
let fnAnsi256 = (code) => esc(`38;5;${code}`, closeCode);
let fnBgAnsi256 = (code) => esc(`48;5;${code}`, bgCloseCode);
export let fnRgb = (r, g, b) => esc(`38;2;${r};${g};${b}`, closeCode);
let fnBgRgb = (r, g, b) => esc(`48;2;${r};${g};${b}`, bgCloseCode);

if (colorSpace === 1) {
  // ANSI 16 colors
  fnAnsi256 = (code) => esc(ansi256To16(code), closeCode);
  fnBgAnsi256 = (code) => esc(ansi256To16(code) + bgOffset, bgCloseCode);
  fnRgb = (r, g, b) => esc(rgbToAnsi16(r, g, b), closeCode);
  fnBgRgb = (r, g, b) => esc(rgbToAnsi16(r, g, b) + bgOffset, bgCloseCode);
} else if (colorSpace === 2) {
  // ANSI 256 colors
  fnRgb = createRgbFn(fnAnsi256);
  fnBgRgb = createRgbFn(fnBgAnsi256);
}

export let styleData = {
  // color functions
  ansi256: fnAnsi256, // alias for compatibility with chalk
  bgAnsi256: fnBgAnsi256, // alias for compatibility with chalk
  fg: fnAnsi256,
  bg: fnBgAnsi256,
  rgb: fnRgb, bgRgb:
  fnBgRgb,
  hex: createHexFn(fnRgb),
  bgHex: createHexFn(fnBgRgb),

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
  grey: esc(90, closeCode), // UK spelling alias for blackBright
  gray: esc(90, closeCode), // US spelling alias for blackBright

  // background colors
  bgGrey: esc(100, bgCloseCode), // UK spelling alias for bgBlackBright
  bgGray: esc(100, bgCloseCode), // US spelling alias for bgBlackBright
};

// generate ANSI 16 colors dynamically and save ~450 bytes
let styles = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
let bright = 'Bright';
let code = 30;
let name, bgName;

for (name of styles) {
  bgName = 'bg' + name[0].toUpperCase() + name.slice(1);

  styleData[name] = esc(code, closeCode);
  styleData[name + bright] = esc(code + 60, closeCode);
  styleData[bgName] = esc(code + bgOffset, bgCloseCode);
  styleData[bgName + bright] = esc(code + 70, bgCloseCode);

  code++;
}
