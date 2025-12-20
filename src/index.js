import { create, defineProperty, setPrototypeOf, separator, EMPTY_STRING } from './misc.js';
import { hexToRgb, rgbToAnsi256, rgbToAnsi16, ansi256To16 } from './utils.js';
import { getLevel } from './color-support.js';
import { LEVEL_BW, LEVEL_16COLORS, LEVEL_256COLORS } from './color-levels.js';

let detectedLevel = getLevel();
let visible = { open: EMPTY_STRING, close: EMPTY_STRING };

let closeCode = 39;
let bgCloseCode = 49;
let bgOffset = 10;

let styles = {};
let stylePrototype;
// @preserve
let LF = '\n';

/**
 * @typedef {(...args:any[]) => string} RenderStyleExtension
 * @typedef {{ open: string, close: string, r?: RenderStyleExtension }} StyleExtension
 * @typedef {(...args:any[]) => { open: string, close: string }} StyleFactory
 */

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} o The open stack.
 * @property {string?} c The close stack.
 * @property {RenderStyleExtension?} r Formatter renderer.
 * @property {null | AnsisProps} p The properties.
 */

/**
 * Creates a style function that applies ANSI codes to a string.
 * @param {{p: AnsisProps}} self
 * @param {StyleExtension} style
 * @return {Ansis}
 */
let createStyle = ({ p: props }, { open, close, r }) => {
  /**
   * Decorates a string with ANSI escape sequences.
   * @param {unknown} arg The input value, can be any or a template string.
   * @param {array} values The values of the template string.
   * @return {string}
   */
  let styleFn = (arg, ...values) => {
    // if the argument is empty or null, return an empty string
    if (!arg) {
      // style reset
      if (open && open === close) return open;
      // null == arg || '' === arg
      if ((arg ?? EMPTY_STRING) === EMPTY_STRING) return EMPTY_STRING;
      // fall-through to stringify the args: `false`, `0` or `NaN`
    }

    let props = styleFn.p;
    let openStack = props.o;
    let closeStack = props.c;

    // renderer inherited through chain (if an extension is a function)
    let render = props.r;

    // Render string
    let output = render
      // we asume that a user render must return alway a string
      ? render(arg, ...values)
      // template strings
      : arg.raw
        // concatenate the "cooked" (escaped string value) strings
        // see https://github.com/tc39/proposal-string-cooked
        ? String.raw({ raw: arg }, ...values)
        // stringify the argument
        : EMPTY_STRING + arg;

    // Detect nested styles
    // Note: on Node.js >= 22, includes() is a tick faster than using ~indexOf()
    let pos;
    if (output.includes('')) {
      for (; props; props = props.p) {
        // This implementation runs ~30% faster than String.replaceAll()
        // output = output.replaceAll(props.close, props.open);
        // -- begin replaceAll, inline the function here to reduce the bundle size
        let { open: replacement, close: search } = props;
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

    // Wrap each line with the current open/close codes so multi-line output remains correctly styled
    if (output.includes(LF)) {
      let wrap = closeStack + '$1' + openStack;
      output = output.replace(/(\r?\n)/g, wrap);
    }

    return openStack + output + closeStack;
  };

  let openStack = open;
  let closeStack = close;

  // inherit renderer from parent unless overridden
  let render = r || (props && props.r);

  if (props) {
    openStack = props.o + open;
    closeStack = close + props.c;
  }

  setPrototypeOf(styleFn, stylePrototype);

  styleFn.p = { open, close, o: openStack, c: closeStack, r: render, p: props };
  styleFn.open = openStack;
  styleFn.close = closeStack;

  return styleFn;
};

function Ansis(level = detectedLevel) {
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
    level,

    /**
     * Checks if ANSI colors are supported in the output.
     *
     * @return {boolean|number}
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
     * Extends the current instance with custom styles.
     *
     * The `extensions` object maps a style name to one of the supported extension types:
     *
     * - **Hex color** (`string`)
     *   The value is treated as a hex color (`#RRGGBB` or `#RGB`).
     *   Creates both foreground and background variants: `name` and `bgName`.
     *
     * - **Formatter renderer** (`function`,  user extensions only)
     *   The function is treated as a formatter and must return a string (can contain ANSI codes).
     *   The result remains chainable with built-in styles.
     *
     * - **ANSI open/close pair** (`{ open, close }`)
     *   A plain style definition with ANSI open/close escape sequences.
     *
     * - **Built-in dynamic style factory** (`function`, core extensions only)
     *   Internal form used by Ansis built-ins functions (e.g. `rgb`, `hex`, `fg`, `bg`),
     *   where the function returns `{ open, close }`.
     *
     * @param {Object.<string, string | RenderStyleExtension | StyleExtension | StyleFactory>} extensions The map of extension names to values.
     * @param {boolean} [isFunctionStyleFactory] Whether the extension functions are style factories.
     *        If true, the functions are treads as style factories.
     *        If false, the functions are treads as formatter render.
     * @return {Ansis}
     */
    extend(extensions, isFunctionStyleFactory) {
      for (let name in extensions) {
        let value = extensions[name];

        // Supported input types:
        // - string (s): user hex color -> creates `name` and `bgName`
        // - function (f) + isFunctionStyleFactory: built-in style factory -> returns `{ open, close }`
        // - function (f) + !isFunctionStyleFactory: user formatter renderer -> stored as `{ open:'', close:'', r: fn }`
        // - { open, close }: plain ANSI style
        let type = (typeof value)[0];
        let isFunction = type === 'f';
        let rgb;

        if (type === 's') {
          // user theme strings are always treated as hex colors,
          // from this hex color both `fg` and `bg` variants are created: `name` and `bgName`
          rgb = hexToRgb(value);
          createMethod(name, fnRgb(...rgb));
          createMethod(getBgName(name), fnBgRgb(...rgb));
        } else {
          let extension =
            isFunction && !isFunctionStyleFactory
              // user theme functions are treated as formatter renderers (`r`)
              ? { open: EMPTY_STRING, close: EMPTY_STRING, r: value }
              : value;

          let isStyleFactory = isFunction && isFunctionStyleFactory;

          createMethod(name, extension, isStyleFactory);
        }
      }

      stylePrototype = create({}, styles);
      setPrototypeOf(self, stylePrototype);

      return self;
    },
  };

  /**
   * Create lazy getter for a style.
   *
   * @param {string} name The style name.
   * @param { StyleExtension | ?StyleFactory } extension
   * @param {boolean} [isStyleFactory] Whether `extension` is a dynamic factory (e.g. built-in rgb, hex, fg, bg, etc).
   * @return {{get(): Ansis}}
   */
  let createMethod = (name, extension, isStyleFactory) => {
    // collect styles into global object
    styles[name] = {
      get() {
        let value = isStyleFactory
          ? (...args) => createStyle(this, extension(...args))
          : createStyle(this, extension);

        // optimisation: up to 5x faster.
        // lazy getter: compute once, then memoize.
        // replace the accessor with a data property on this object,
        // so subsequent reads are direct (no prototype lookup).
        defineProperty(this, name, { value });
        return value;
      },
    };
  };

  // Generate ANSI codes by color level

  let hasColors = level > LEVEL_BW;
  let esc = hasColors
    ? (open, close) => ({ open: `[${open}m`, close: `[${close}m` })
    : () => visible;

  let createHexFn = (fn) => (hex) => fn(...hexToRgb(hex));
  let createRgbFn = (open, close) => (r, g, b) => esc(`${open}8;2;${r};${g};${b}`, close);
  let createRgb16Fn = (offset, closeCode) => (r, g, b) => esc(rgbToAnsi16(r, g, b) + offset, closeCode);
  let createRgb256Fn = (fn) => (r, g, b) => fn(rgbToAnsi256(r, g, b));

  let fnRgb = createRgbFn(3, closeCode);
  let fnBgRgb = createRgbFn(4, bgCloseCode);

  let fnAnsi256 = (code) => esc('38;5;' + code, closeCode);
  let fnBgAnsi256 = (code) => esc('48;5;' + code, bgCloseCode);

  // fallback
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
    fg: fnAnsi256,
    bg: fnBgAnsi256,
    rgb: fnRgb,
    bgRgb: fnBgRgb,
    hex: createHexFn(fnRgb),
    bgHex: createHexFn(fnBgRgb),

    visible: visible,
    reset: esc(0, 0),
    bold: esc(1, 22),
    dim: esc(2, 22),
    italic: esc(3, 23),
    underline: esc(4, 24),
    inverse: esc(7, 27),
    hidden: esc(8, 28),
    strikethrough: esc(9, 29),
  };

  // Build background method name, e.g. "pink" -> "bgPink"
  let getBgName = (name) => 'bg' + name[0].toUpperCase() + name.slice(1);

  // Generate ANSI 16 colors dynamically to reduce the code size

  let bright = 'Bright';
  let bgName;

  // begin code 30 as `black`, each subsequent color in the list increments sequentially
  'black,red,green,yellow,blue,magenta,cyan,white,gray'.split(separator).map((name, offset) => {
    bgName = getBgName(name);

    // no bright for gray (bright black)
    if (8 > offset) {
      styleData[name + bright] = esc(90 + offset, closeCode);
      styleData[bgName + bright] = esc(100 + offset, bgCloseCode);
    } else {
      // set code offset for gray
      // code  90 - `gray` is common used color name for "bright black" foreground
      // code 100 - `bgGray` is common used color name for "bright black" background
      offset = 60;
    }

    styleData[name] = esc(30 + offset, closeCode);
    styleData[bgName] = esc(40 + offset, bgCloseCode);
  });

  // define base functions, colors and styles
  return self.extend(styleData, true);
}

const ansis = new Ansis();

// For distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis;
// ansis.default = ansis; // needs for tsc

export { ansis as default, Ansis };
