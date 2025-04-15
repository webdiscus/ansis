import { hexToRgb, rgbToAnsi256, rgbToAnsi16, ansi256To16 } from './utils.js';
import { getColorSpace } from './color-support.js';
import { LEVEL_BW, LEVEL_16COLORS, LEVEL_256COLORS } from './color-levels.js';
import { EMPTY_STRING, separator } from './misc.js';

let colorSpace = getColorSpace();
let hasColors = colorSpace > LEVEL_BW;
let mono = { open: EMPTY_STRING, close: EMPTY_STRING };
let monoFn = () => mono;
let esc = hasColors ? (open, close) => ({ open: `[${open}m`, close: `[${close}m` }) : monoFn;
let closeCode = 39;
let bgCloseCode = 49;
let bgOffset = 10;

let createRgb16Fn = (offset, closeCode) => (r, g, b) => esc(rgbToAnsi16(r, g, b) + offset, closeCode);

let createRgb256Fn = (fn) => (r, g, b) => fn(rgbToAnsi256(r, g, b));

let createHexFn = (fn) => (hex) => fn(...hexToRgb(hex));

// truecolor functions
let fnRgb = (r, g, b) => esc(`38;2;${r};${g};${b}`, closeCode);
let fnBgRgb = (r, g, b) => esc(`48;2;${r};${g};${b}`, bgCloseCode);

let fnAnsi256 = (code) => esc(`38;5;${code}`, closeCode);
let fnBgAnsi256 = (code) => esc(`48;5;${code}`, bgCloseCode);

if (colorSpace === LEVEL_256COLORS) {
  fnRgb = createRgb256Fn(fnAnsi256);
  fnBgRgb = createRgb256Fn(fnBgAnsi256);
} else if (colorSpace === LEVEL_16COLORS) {
  fnRgb = createRgb16Fn(0, closeCode);
  fnBgRgb = createRgb16Fn(bgOffset, bgCloseCode);
  fnAnsi256 = (code) => esc(ansi256To16(code), closeCode);
  fnBgAnsi256 = (code) => esc(ansi256To16(code) + bgOffset, bgCloseCode);
}

let styleData = {
  // color functions
  ansi256: fnAnsi256, // alias for compatibility with chalk
  bgAnsi256: fnBgAnsi256, // alias for compatibility with chalk
  fg: fnAnsi256,
  bg: fnBgAnsi256,
  rgb: fnRgb,
  bgRgb: fnBgRgb,
  hex: createHexFn(fnRgb),
  bgHex: createHexFn(fnBgRgb),

  // styles
  visible: mono,
  reset: esc(0, 0),
  bold: esc(1, 22),
  dim: esc(2, 22),
  italic: esc(3, 23),
  underline: esc(4, 24),
  inverse: esc(7, 27),
  hidden: esc(8, 28),
  strikethrough: esc(9, 29),
};

// Generate ANSI 16 colors dynamically to reduce the code size.

// `gray` (US) and `grey` (UK) are aliases for `blackBright` and use code 90.
// `black` uses code 30, and each subsequent color in the list increments sequentially.
let code = 30;
let bright = 'Bright';
let bgName;

'black,red,green,yellow,blue,magenta,cyan,white,gray,grey'.split(separator).map((name) => {
  bgName = 'bg' + name[0].toUpperCase() + name.slice(1);

  styleData[name] = esc(code, closeCode);
  styleData[bgName] = esc(code + bgOffset, bgCloseCode);

  // exclude for `gray` and `grey` aliases
  if (code < 38) {
    styleData[name + bright] = esc(60 + code, closeCode);
    styleData[bgName + bright] = esc(70 + code++, bgCloseCode);
  }

  if (code > 37) code = 90;
});

export {
  hasColors,
  styleData,
  fnRgb,
};
