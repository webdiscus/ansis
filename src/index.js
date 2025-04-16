import { create, defineProperty, setPrototypeOf, separator, EMPTY_STRING } from './misc.js';
import { hexToRgb, rgbToAnsi256, rgbToAnsi16, ansi256To16 } from './utils.js';
import { getLevel } from './color-support.js';
import { LEVEL_BW, LEVEL_16COLORS, LEVEL_256COLORS } from './color-levels.js';

let detectedLevel = getLevel();
let mono = { open: EMPTY_STRING, close: EMPTY_STRING };
let closeCode = 39;
let bgCloseCode = 49;
let bgOffset = 10;

let styles = {};
let stylePrototype;
let LF = '\n';

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} o The open stack.
 * @property {string?} c The close stack.
 * @property {null | AnsisProps} p The properties.
 */

/**
 * Creates a style function that applies ANSI codes to a string.
 * @param {AnsisProps} p
 * @param {{ open: string, close: string }} style
 * @return {Ansis}
 */
let createStyle = ({ p: props }, { open, close }) => {
  /**
   * Decorates a string with ANSI escape sequences.
   * @param {unknown} arg The input value, can be any or a template string.
   * @param {array} values The values of the template string.
   * @return {string}
   */
  let styleFn = (arg, ...values) => {
    // If the argument is empty or null, return an empty string
    if (!arg) {
      if (open && open === close) return open;
      // null == arg || '' === arg
      if ((arg ?? EMPTY_STRING) === EMPTY_STRING) return EMPTY_STRING;
    }

    let output = arg.raw
      // Concatenate the "cooked" (escaped string value) strings
      // see https://github.com/tc39/proposal-string-cooked
      ? String.raw({ raw: arg }, ...values)
      // Stringify the argument
      : EMPTY_STRING + arg;

    let props = styleFn.p;
    let openStack = props.o;
    let closeStack = props.c;

    // Detect nested styles
    // Note: on node >= 22, includes is 5x faster than ~indexOf
    if (output.includes('')) {
      while (props) {
        // this implementation is over 30% faster than native String.replaceAll()
        // output = output.replaceAll(props.close, props.open);
        // -- begin replaceAll, inline the function here to reduce the bundle size
        let search = props.close;
        let replacement = props.open;
        let searchLength = search.length;
        let result = EMPTY_STRING;
        let lastPos = 0;
        let pos;

        // the `visible` style has empty open/close properties
        if (searchLength) {
          for (; ~(pos = output.indexOf(search, lastPos)); lastPos = pos + searchLength) {
            result += output.slice(lastPos, pos) + replacement;
          }
          output = result + output.slice(lastPos);
        }
        // -- end replaceAll

        props = props.p;
      }
    }

    // Detect new line
    if (output.includes(LF)) {
      output = output.replace(/(\r?\n)/g, closeStack + '$1' + openStack);
    }

    return openStack + output + closeStack;
  };

  let openStack = open;
  let closeStack = close;

  if (props) {
    openStack = props.o + open;
    closeStack = close + props.c;
  }

  setPrototypeOf(styleFn, stylePrototype);

  styleFn.p = { open, close, o: openStack, c: closeStack, p: props };
  styleFn.open = openStack;
  styleFn.close = closeStack;

  return styleFn;
};

const Ansis = function(level = detectedLevel) {
  let self = {
    // Named export of the function to create new instance
    Ansis: Ansis,

    /**
     * Checks if ANSI colors are supported in the output.
     * @return {boolean}
     */
    isSupported: () => hasColors,

    /**
     * Removes ANSI escape sequences  from a string.
     *
     * RegExp parts:
     *
     * - [] - ensures that the string starts with ANSI codes
     * - [[()#;?]* - optional sequence used for device control
     * - (?:[0-9]{1,4}(?:;[0-9]{0,4})*)? - parameter bytes, list of numbers separated by semicolons, (e.g., 1;31;42)
     * - [0-9A-ORZcf-nqry=><] - final byte, determines the type of ANSI escape sequence
     *
     * @param {string} str
     * @return {string}
     */
    strip: (str) => str.replace(/[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, EMPTY_STRING),

    /**
     * Extends the base colors with custom ones.
     *
     * @param {Object.<name:string, value:string|{open:string, close:string}>} colors The object with key as color name
     *  and value as hex code of custom color or the object with 'open' and 'close' codes.
     * @return {Ansis}
     */
    extend(colors) {
      for (let name in colors) {
        let color = colors[name];
        // can be: f - function, s - string, o - object
        let type = (typeof color)[0];

        // detect whether the value is object {open, close} or hex string
        // type === 'string' for extend colors, e.g. ansis.extend({ pink: '#FF75D1' })
        let styleProps = type === 's' ? fnRgb(...hexToRgb(color)) : color;

        // type === 'function'
        if (type === 'f') {
          styles[name] = {
            get() {
              return (...args) => createStyle(this, color(...args));
            },
          };
        } else {
          styles[name] = {
            get() {
              let style = createStyle(this, styleProps);

              // performance impact: up to 5x faster;
              // V8 optimizes access to properties defined via `defineProperty`,
              // the `style` becomes a cached value on the object with direct access, w/o lookup for prototype chain
              defineProperty(this, name, { value: style });
              return style;
            },
          };
        }
      }

      stylePrototype = create({}, styles);
      setPrototypeOf(self, stylePrototype);

      return self;
    },
  };

  // Generate ANSI codes by color level

  let hasColors = level > LEVEL_BW;
  let esc = (open, close) => (hasColors ? { open: `[${open}m`, close: `[${close}m` } : mono);
  let createRgb16Fn = (offset, closeCode) => (r, g, b) => esc(rgbToAnsi16(r, g, b) + offset, closeCode);
  let createRgb256Fn = (fn) => (r, g, b) => fn(rgbToAnsi256(r, g, b));
  let createHexFn = (fn) => (hex) => fn(...hexToRgb(hex));

  let fnRgb = (r, g, b) => esc(`38;2;${r};${g};${b}`, closeCode);
  let fnBgRgb = (r, g, b) => esc(`48;2;${r};${g};${b}`, bgCloseCode);

  let fnAnsi256 = (code) => esc(`38;5;${code}`, closeCode);
  let fnBgAnsi256 = (code) => esc(`48;5;${code}`, bgCloseCode);

  if (level === LEVEL_256COLORS) {
    fnRgb = createRgb256Fn(fnAnsi256);
    fnBgRgb = createRgb256Fn(fnBgAnsi256);
  } else if (level === LEVEL_16COLORS) {
    fnRgb = createRgb16Fn(0, closeCode);
    fnBgRgb = createRgb16Fn(bgOffset, bgCloseCode);
    fnAnsi256 = (code) => esc(ansi256To16(code), closeCode);
    fnBgAnsi256 = (code) => esc(ansi256To16(code) + bgOffset, bgCloseCode);
  }

  let styleData = {
    ansi256: fnAnsi256, // alias for compatibility with chalk
    bgAnsi256: fnBgAnsi256, // alias for compatibility with chalk
    fg: fnAnsi256,
    bg: fnBgAnsi256,
    rgb: fnRgb,
    bgRgb: fnBgRgb,
    hex: createHexFn(fnRgb),
    bgHex: createHexFn(fnBgRgb),

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

  // define base functions, colors and styles
  return self.extend(styleData);
};

const ansis = new Ansis();

// For distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis;
// ansis.default = ansis; // needs for tsc

export { ansis as default, Ansis };
