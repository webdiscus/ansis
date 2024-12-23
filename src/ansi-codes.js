import { hexToRgb, rgbToAnsi256, rgbToAnsi16, ansi256To16 } from './utils.js';
import { getColorSpace } from './color-support.js';
import { SPACE_MONO, SPACE_16COLORS, SPACE_256COLORS } from './color-spaces.js';

let colorSpace = getColorSpace();
let isSupported = colorSpace > SPACE_MONO;
let mono = { open: '', close: '' };
let monoFn = () => mono;
let esc = isSupported ? (open, close) => ({ open: `\x1b[${open}m`, close: `\x1b[${close}m` }) : monoFn;
let closeCode = 39;
let bgCloseCode = 49;
let bgOffset = 10;

let createRgbFn = (fn) => (r, g, b) => fn(rgbToAnsi256(r, g, b));

let createHexFn = (fn) => (hex) => {
  // note: the `...` operator is too slow
  let [r, g, b] = hexToRgb(hex);
  return fn(r, g, b);
};

// defaults, truecolor
let fnAnsi256 = (code) => esc(`38;5;${code}`, closeCode);
let fnBgAnsi256 = (code) => esc(`48;5;${code}`, bgCloseCode);
let fnRgb = (r, g, b) => esc(`38;2;${r};${g};${b}`, closeCode);
let fnBgRgb = (r, g, b) => esc(`48;2;${r};${g};${b}`, bgCloseCode);

if (colorSpace === SPACE_16COLORS) {
  // ANSI 16 colors
  fnAnsi256 = (code) => esc(ansi256To16(code), closeCode);
  fnBgAnsi256 = (code) => esc(ansi256To16(code) + bgOffset, bgCloseCode);
  fnRgb = (r, g, b) => esc(rgbToAnsi16(r, g, b), closeCode);
  fnBgRgb = (r, g, b) => esc(rgbToAnsi16(r, g, b) + bgOffset, bgCloseCode);
} else if (colorSpace === SPACE_256COLORS) {
  // ANSI 256 colors
  fnRgb = createRgbFn(fnAnsi256);
  fnBgRgb = createRgbFn(fnBgAnsi256);
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
};

// generate ANSI 16 colors dynamically to reduce the code
let styles = 'black,red,green,yellow,blue,magenta,cyan,white'.split(',');
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

// UK and US spelling alias for blackBright
styleData.grey = styleData.gray = esc(90, closeCode);

// UK and US spelling alias for bgBlackBright
styleData.bgGrey = styleData.bgGray = esc(100, bgCloseCode);

// alias for strikethrough
styleData.strikethrough = styleData.strike = esc(9, 29);

export {
  isSupported,
  styleData,
  fnRgb,
}
