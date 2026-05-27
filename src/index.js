import { create, defineProperty, getPrototypeOf, setPrototypeOf, separator, EMPTY_STRING } from './misc.js';
import { hexToRgb, rgbToAnsi256, ansi256To16 } from './utils.js';
import { getLevel } from './color-support.js';
import { LEVEL_BW, LEVEL_16COLORS, LEVEL_256COLORS } from './color-levels.js';

let visible = { open: EMPTY_STRING, close: EMPTY_STRING };
let closeCode = 39;
let bgCloseCode = 49;
let bgOffset = 10;
let LF = '\n';

/**
 * @typedef {(...args:any[]) => string} FormatterFn
 * @typedef {{ open: string, close: string, f?: FormatterFn }} StyleFormatter
 * @typedef {(...args:any[]) => { open: string, close: string }} StyleFactory
 */

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} o The open stack.
 * @property {string?} c The close stack.
 * @property {null | AnsisProps} p The properties.
 */

/**
 * Creates a style function that applies ANSI escape sequences to a string.
 * @param {AnsisProps} parent
 * @param {StyleFormatter} style
 * @return {Ansis}
 */
let createStyle = (parent, { open = EMPTY_STRING, close = EMPTY_STRING, f: formatter }) => {
  let openStack = (parent.open || EMPTY_STRING) + open;
  let closeStack = close + (parent.close || EMPTY_STRING);

  /**
   * Decorates a string with ANSI escape sequences.
   * @param {unknown} arg The input value, can be any or a template string.
   * @param {array} values The values of the template string.
   * @return {string}
   */
  let styleFn = (arg, ...values) => {
    // if the argument is empty or null, return an empty string
    if (!arg) {
      // reset has no closing sequence, without argument it returns the reset code
      if (!close) return open;
      // null == arg || '' === arg
      if ((arg ?? EMPTY_STRING) === EMPTY_STRING) return EMPTY_STRING;
      // fall through to stringify `false`, `0`, or `NaN`
    }

    // Render string
    let output = formatter
      ? formatter(arg, ...values) // extension formatter is expected to return a string
      : arg.raw // template strings
        ? String.raw({ raw: arg }, ...values) // concatenate the "cooked" (escaped string value) strings, see https://github.com/tc39/proposal-string-cooked
        : EMPTY_STRING + arg; // stringify the argument

    // Restore nested styles by walking the chain
    let node = styleFn;
    let pos;
    // Note: on Node.js >= 22, includes() is a tick faster than ~indexOf()
    if (output.includes('')) {
      while ((node = node.p)) {
        // This implementation runs ~30% faster than String.replaceAll()
        // output = output.replaceAll(node.close, node.open);
        // -- begin replaceAll
        let { _open: replacement, _close: search } = node;
        let searchLength = search.length;
        let result = EMPTY_STRING;
        let lastPos = 0;

        // the `visible` style has empty open/close properties
        if (searchLength) {
          for (; ~(pos = output.indexOf(search, lastPos)); lastPos = pos + searchLength) {
            result += output.slice(lastPos, pos) + replacement;
          }
        }
        output = result + output.slice(lastPos);
        // -- end replaceAll
      }
    }

    return (
      openStack +
      // Wraps line breaks with close/open ANSI escape sequences so multiline output keeps the current style correctly on each rendered line.
      (output.includes(LF) ? output.replace(/(\r?\n)/g, closeStack + '$1' + openStack) : output) +
      closeStack
    );
  };

  setPrototypeOf(styleFn, getPrototypeOf(parent));

  // Style function anatomy
  // styleFn        style function (returned by the getter)
  //   ├─ .open     public API: full cumulative open sequence
  //   ├─ .close    public API: full cumulative close sequence
  //   └─ .p        internal linked-list node
  //        ├─ ._open  raw open code of the current style  <- mangled with terser
  //        ├─ ._close raw close code of the current style <- mangled with terser
  //        └─ .p   parent node, or null at the root
  styleFn.p = { _open: open, _close: close, p: parent.p };
  styleFn.open = openStack;
  styleFn.close = closeStack;

  return styleFn;
};

function Ansis(option = globalThis) {
  // Number option is a strict color level; object option is treated as mock globalThis.
  let level = typeof option == 'number' ? option : getLevel(option);

  let styles = {};

  let self = {
    // Named export of the function to create new instance
    Ansis,

    /**
     * Color support level.
     * Automatically detected by default.
     *
     * Levels:
     * 0 – No color (black & white)
     * 1 – Basic ANSI (16 colors)
     * 2 – Extended ANSI (256 colors)
     * 3 – Truecolor (24-bit RGB)
     *
     * @type {number}
     * @readonly
     */
    level: level,

    /**
     * Checks if ANSI colors are supported in the output.
     *
     * @return {boolean}
     */
    isSupported: () => hasColors,

    /**
     * Removes ANSI escape sequences from a string.
     *
     * RegExp parts:
     *
     * - ][^]* - OSC sequence terminated by BEL (e.g. OSC 8 hyperlink)
     * - [] - ensures that CSI sequence starts with ANSI escape sequence
     * - [[()#;?]* - optional CSI sequence used for device control
     * - (?:[0-9]{1,4}(?:;[0-9]{0,4})*)? - CSI parameter bytes, list of numbers separated by semicolons, (e.g., 1;31;42)
     * - [0-9A-ORZcf-nqry=><] - final byte, determines the type of CSI sequence
     *
     * @param {string} str
     * @return {string}
     */
    strip: (str) => str.replace(/][^]*|[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, EMPTY_STRING),

    /**
     * Extends the current instance with custom styles.
     *
     * The `extensions` object maps a style name to one of the supported extension types:
     *
     * - **Hex color** (`string`)
     *   The value is treated as a hex color (`#RRGGBB` or `#RGB`).
     *   Creates both foreground and background variants: `name` and `bgName`.
     *
     * - **ANSI open/close pair** (`{ open, close }`)
     *   Plain { open, close } extensions create only the named style.
     *
     * - **Built-in dynamic style factory** (`function`, core extensions only)
     *   Internal form used by Ansis built-ins functions (e.g. `rgb`, `hex`, `fg`, `bg`),
     *   where the function returns `{ open, close }`.
     *
     * @param {Object.<name:string, value:string|{open:string, close:string}>} extensions The object with key as color name
     *  and value as hex code of custom color or the object with 'open' and 'close' codes.
     * @return {Ansis}
     */
    extend(extensions) {
      for (let name in extensions) {
        let value = extensions[name];
        // can be: s - string, f - function, o - object
        let type = (typeof value)[0];

        if (type === 's') {
          // strings are always treated as hex colors,
          // from this hex color both `fg` and `bg` variants are created: `name` and `bgName`

          // create background color
          createMethod(getBgName(name), bgRgbFn(...hexToRgb(value)));
          // prepare the value for foreground color
          value = rgbFn(...hexToRgb(value));
        }

        // create foreground color or a function like hex() or bgHex()
        createMethod(name, value, type === 'f');
      }

      // snapshot style getters into a prototype for this instance,
      // chained styles inherit it via getPrototypeOf(parent) in createStyle
      setPrototypeOf(self, create({}, styles));

      return self;
    },
  };

  /**
   * Create dynamically lazy getter for a style.
   *
   * @param {string} name The style name.
   * @param { StyleFormatter | ?StyleFactory } extension
   * @param {boolean} [isFunction] Whether `extension` is a function.
   * @return {{get(): Ansis}}
   */
  let createMethod = (name, extension, isFunction) => {
    // collect styles into global object
    styles[name] = {
      get() {
        let style = isFunction ? (...args) => createStyle(this, extension(...args)) : createStyle(this, extension);

        // lazy getter: compute once, then memoize as an own data property for direct subsequent access,
        // memorisation speed up to 5x
        defineProperty(this, name, { value: style });
        return style;
      },
    };
  };

  // Generate ANSI escape sequences by color level

  let hasColors = level > LEVEL_BW;
  // Note: reset hasn't closing code
  let esc = (open, close) => (hasColors ? { open: `[${open}m`, close: close ? `[${close}m` : EMPTY_STRING } : visible);

  let createHexFn = (fn) => (hex) => fn(...hexToRgb(hex));
  let createRgbFn = (open, close) => (r, g, b) => esc(`${open}8;2;${r};${g};${b}`, close);

  let createRgb256Fn = (fn) => (r, g, b) => fn(rgbToAnsi256(r, g, b));
  let createRgb16Fn = (offset, closeCode) => (r, g, b) => esc(ansi256To16(rgbToAnsi256(r, g, b)) + offset, closeCode);

  // Build background method name, e.g. "pink" -> "bgPink"
  let getBgName = (name) => 'bg' + name[0].toUpperCase() + name.slice(1);

  let bright = 'Bright';
  let styleData;

  // truecolor functions
  let rgbFn = createRgbFn(3, closeCode);
  let bgRgbFn = createRgbFn(4, bgCloseCode);

  // ANSI 256 colors functions
  let ansi256Fn = (code) => esc('38;5;' + code, closeCode);
  let bgAnsi256Fn = (code) => esc('48;5;' + code, bgCloseCode);

  // fallback functions
  if (level === LEVEL_256COLORS) {
    rgbFn = createRgb256Fn(ansi256Fn);
    bgRgbFn = createRgb256Fn(bgAnsi256Fn);
  } else if (level === LEVEL_16COLORS) {
    rgbFn = createRgb16Fn(0, closeCode);
    bgRgbFn = createRgb16Fn(bgOffset, bgCloseCode);
    ansi256Fn = (code) => esc(ansi256To16(code), closeCode);
    bgAnsi256Fn = (code) => esc(ansi256To16(code) + bgOffset, bgCloseCode);
  }

  styleData = {
    fg: ansi256Fn,
    bg: bgAnsi256Fn,
    rgb: rgbFn,
    bgRgb: bgRgbFn,
    hex: createHexFn(rgbFn),
    bgHex: createHexFn(bgRgbFn),

    visible,
    reset: esc(0, EMPTY_STRING),
    bold: esc(1, 22),
    dim: esc(2, 22),
    italic: esc(3, 23),
    underline: esc(4, 24),
    inverse: esc(7, 27),
    hidden: esc(8, 28),
    strikethrough: esc(9, 29),

    // OSC 8 hyperlinks
    link: {
      // zero-width spaces to prevent auto-linking while keeping copy/paste intact
      f: (url, text = url) => (hasColors ? `]8;;${url}${text}]8;;` : text != url ? `${text} (​${url}​)` : url),
    },
  };

  // Optimisation: generate ANSI 16 color styles to reduce the code size.

  // `black` has code 30, and each subsequent base color increments sequentially.
  // Optimisation: `gray` is placed first to handle its special bright-black codes with fewer operations.
  'gray,black,red,green,yellow,blue,magenta,cyan,white'.split(separator).map((name, offset) => {
    if (offset) {
      // Bright variants exist only for 8 base colors.
      // Since the first item is `gray`, base colors start at offset 1, so 89/99 are used instead of 90/100 to compensate this shifted index.
      styleData[name + bright] = esc(89 + offset, closeCode);
      styleData[getBgName(name) + bright] = esc(99 + offset, bgCloseCode);
    } else {
      // `gray` is the named alias for bright black.
      // Offset 61 with base codes 29/39 produces bright codes 90/100 (foreground and background bright black).
      offset = 61;
    }

    // Since the first item is `gray`, base colors start at offset 1, so 29/39 are used instead of 30/40 to compensate this shifted index.
    styleData[name] = esc(29 + offset, closeCode);
    styleData[getBgName(name)] = esc(39 + offset, bgCloseCode);
  });

  // define base functions, colors and styles
  return self.extend(styleData);
}

const ansis = new Ansis();

// For distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis.default = ansis; // `default` is required for tsc

export { ansis as default, Ansis };
