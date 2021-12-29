'use strict';

/* DON`T MODIFY THIS FILE!
Use `npm run build:cjs` to create this CommonJS bundle. */

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Convert hex color string to RGB values.
 *
 * A hexadecimal color code can be 3 or 6 digits with an optional "#" prefix.
 *
 * The 3 digits specifies a RGB doublet data as a fully opaque color.
 * For example, "#123" specifies the color that is represented by "#112233".
 *
 * The 6 digits specifies a fully opaque color.
 * For example, "#112233".
 *
 * @param {string} hex A string that contains the hexadecimal RGB color representation.
 * @return {[number, number, number]} The red, green, blue values in range [0, 255] .
 */
const hexToRgb = function (hex) {
  let [, color] = /([a-f\d]{3,6})/i.exec(hex) || [];
  const len = color ? color.length : 0;

  if (len === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  } else if (len !== 6) {
    return [0, 0, 0];
  }

  const num = parseInt(color, 16);

  return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
};

/**
 * Clamp a number within the inclusive range specified by min and max.
 * @note: The ternary operator is a tick quicker than Math.min(Math.max(num, min), max).
 *
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number} The number if is between min - max, or min/max.
 */
const clamp = (num, min, max) => (min > num ? min : num > max ? max : num);

/**
 * Replace all matched strings.
 * Note: this implementation is over 30% faster than String.replaceAll().
 *
 * @param {string} str
 * @param {string} searchValue
 * @param {string} replaceValue
 * @returns {string}
 */
const strReplaceAll = function (str, searchValue, replaceValue) {
  let pos = str.indexOf(searchValue);
  if (pos < 0) return str;

  const substringLength = searchValue.length;
  let lastPos = 0;
  let result = '';

  while (pos > -1) {
    result += str.substr(lastPos, pos - lastPos) + replaceValue;
    lastPos = pos + substringLength;
    pos = str.indexOf(searchValue, lastPos);
  }

  return result + str.substr(lastPos);
};

/**
 * The style must be break at the end of the line and continued on a new line.
 * TODO: compare with str.replace(/(\r*\n)/g, props.closeStack + '$1' + props.openStack);
 *   - compatibility in windows
 *   - performance
 *   - delete this function if replace() is faster
 *
 * @param {string} str The string containing linebreaks.
 * @param {string} open The code of styling.
 * @param {string} close The reset of styling.
 * @param {number} pos The position of the first linebreak.
 * @returns {string}
 */
// export const breakStyle = (str, open, close, pos) => {
//   let result = '',
//     lastPos = 0;
//
//   while (pos > -1) {
//     let len = pos,
//       LF = '\n';
//     // fix for windows
//     if (str[pos - 1] === '\r') {
//       LF = '\r\n';
//       len--;
//     }
//
//     result += str.substr(lastPos, len - lastPos) + close + LF + open;
//     lastPos = pos + 1;
//     pos = str.indexOf('\n', lastPos);
//   }
//
//   return result + str.substr(lastPos);
// };

/**
 * @param {Object?} processTest Used by unit test only.
 * @returns {boolean}
 */
const isSupported = (processTest) => {
  const proc = processTest ? processTest : process || {};
  const env = proc.env || {};
  const argv = proc.argv || [];
  const stdout = proc.stdout && proc.stdout.isTTY;
  //const stderr = proc.stderr && proc.stderr.isTTY;

  const isDisabled = 'NO_COLOR' in env || argv.includes('--no-color') || argv.includes('--color=false');
  const isForced = 'FORCE_COLOR' in env || argv.includes('--color');

  const isTerm = env.TERM !== 'dumb' && /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM);
  const isCompatibleTerminal = (stdout && isTerm) || proc.platform === 'win32';
  const isCI = 'CI' in env;

  return !isDisabled && (isForced || isCompatibleTerminal || isCI);
};

const supported = isSupported();

const noColorProps = { open: '', close: '' };
const esc = supported ? ([open, close]) => ({ open: `\x1b[${open}m`, close: `\x1b[${close}m` }) : () => noColorProps;

const baseCodes = {
  // misc
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

const extendedCodes = {
  ansi256: supported ? (code) => ({ open: `\x1B[38;5;${code}m`, close: '\x1B[39m' }) : () => noColorProps,
  bgAnsi256: supported ? (code) => ({ open: `\x1B[48;5;${code}m`, close: '\x1B[49m' }) : () => noColorProps,
  rgb: supported ? (r, g, b) => ({ open: `\x1B[38;2;${r};${g};${b}m`, close: '\x1B[39m' }) : () => noColorProps,
  bgRgb: supported ? (r, g, b) => ({ open: `\x1B[48;2;${r};${g};${b}m`, close: '\x1B[49m' }) : () => noColorProps,
};

/**
 * Note: all methods are implemented in prototype of the `styleProxy` object.
 * @implements {AnsisInstance}
 */
class Ansis {
  constructor() {
    const self = (str) => str;
    Object.setPrototypeOf(self, styleProxy);

    return self;
  }
}

const styles = {};
const regexLF = /(\r*\n)/g;

/**
 * @typedef {StyleProperties} AnsisProps
 * @property {string?} openStack
 * @property {string?} closeStack
 * @property {null | AnsisProps} parent
 */

/**
 * Wrap the string with styling and reset codes.
 *
 * @param {string} str
 * @param {AnsisProps} props
 * @returns {string}
 */
const wrap = (str, props) => {
  if (!str) return '';

  const { openStack, closeStack } = props;
  if (str.indexOf('\x1b') > -1) {
    while (props !== undefined) {
      str = strReplaceAll(str, props.close, props.open);
      props = props.parent;
    }
  }

  if (str.indexOf('\n') > -1) str = str.replace(regexLF, closeStack + '$1' + openStack);

  return openStack + str + closeStack;
};

/**
 * @param {string} open
 * @param {string} close
 * @param {AnsisProps} parent
 * @returns {AnsisInstance}
 */
const createStyle = (open, close, parent) => {
  let openStack = open;
  let closeStack = close;
  if (parent !== undefined) {
    openStack = parent.openStack + open;
    closeStack = close + parent.closeStack;
  }

  const style = (str) => wrap(str, style.props);
  Object.setPrototypeOf(style, styleProxy);
  style.props = { open, close, openStack, closeStack, parent };
  style.open = openStack;
  style.close = closeStack;

  return style;
};

/**
 * Create base styles.
 */
for (let name in baseCodes) {
  const { open, close } = baseCodes[name];
  styles[name] = {
    get() {
      const style = createStyle(open, close, this.props);
      Object.defineProperty(this, name, { value: style });
      return style;
    },
  };
}

/**
 * @type {AnsisInstance.visible}
 */
styles.visible = {
  get() {
    return createStyle('', '', this.props);
  },
};

/**
 * @type {AnsisInstance.ansi256}
 */
styles.ansi256 = {
  get() {
    return (code) => {
      code = clamp(code, 0, 255);
      const { open, close } = extendedCodes.ansi256(code);
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * Alias for ansi256.
 * @type {AnsisInstance.ansi256}
 */
styles.ansi = styles.ansi256;

/**
 * Alias for ansi256.
 * @type {AnsisInstance.ansi256}
 */

styles.fg = styles.ansi256;

/**
 * @type {AnsisInstance.bgAnsi256}
 */
styles.bgAnsi256 = {
  get() {
    return (code) => {
      code = clamp(code, 0, 255);
      const { open, close } = extendedCodes.bgAnsi256(code);
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * Alias for bgAnsi256.
 * @type {AnsisInstance.bgAnsi256}
 */
styles.bgAnsi = styles.bgAnsi256;

/**
 * Alias for bgAnsi256.
 * @type {AnsisInstance.bgAnsi256}
 */
styles.bg = styles.bgAnsi256;

/**
 * @type {AnsisInstance.rgb}
 */
styles.rgb = {
  get() {
    return (r, g, b) => {
      r = clamp(r, 0, 255);
      g = clamp(g, 0, 255);
      b = clamp(b, 0, 255);
      const { open, close } = extendedCodes.rgb(r, g, b);
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * @type {AnsisInstance.hex}
 */
styles.hex = {
  get() {
    return (hex) => {
      const { open, close } = extendedCodes.rgb(...hexToRgb(hex));
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * @type {AnsisInstance.bgRgb}
 */
styles.bgRgb = {
  get() {
    return (r, g, b) => {
      r = clamp(r, 0, 255);
      g = clamp(g, 0, 255);
      b = clamp(b, 0, 255);
      const { open, close } = extendedCodes.bgRgb(r, g, b);
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * @type {AnsisInstance.bgHex}
 */
styles.bgHex = {
  get() {
    return (hex) => {
      const { open, close } = extendedCodes.bgRgb(...hexToRgb(hex));
      return createStyle(open, close, this.props);
    };
  },
};

const styleProxy = Object.defineProperties(() => {}, styles);

var index = new Ansis();

exports.Ansis = Ansis;
exports["default"] = index;
