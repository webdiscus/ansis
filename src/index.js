import { create, defineProperty, setPrototypeOf, EMPTY_STRING } from './misc.js';
import { hasColors, styleData, fnRgb, mono } from './ansi-codes.js';
import { hexToRgb } from './utils.js';

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} o The open stack.
 * @property {string?} c The close stack.
 * @property {null | AnsisProps} p The properties.
 */

let styles = {};
let stylePrototype;
let LF = '\n';

/**
 * @param {AnsisProps} p
 * @param {{ open: string, close: string }} style
 * @param {boolean} useColors
 * @return {Ansis}
 */
let createStyle = ({ p: props }, style, useColors) => {
  /**
   * Decorate the string with ANSI codes.
   * @param {unknown} arg The input value, can be any or a template string.
   * @param {array} values The values of the template string.
   * @return {string}
   */
  let styleFn = (arg, ...values) => {
    // API rule: if the argument is one of '', undefined or null, then return empty string
    if (!arg) {
      if (open && open === close) return open;
      // null == arg || '' === arg
      if ((arg ?? EMPTY_STRING) === EMPTY_STRING) return EMPTY_STRING;
    }

    let output = arg.raw
      // concatenates the "cooked" (escaped string value) strings
      // see https://github.com/tc39/proposal-string-cooked
      ? String.raw({ raw: arg }, ...values)
      // stringify the argument
      : EMPTY_STRING + arg;

    //if (!useColors) return output;

    let props = styleFn.p;
    let openStack = props.o;
    let closeStack = props.c;

    // feat: detect nested styles
    // note: on node >= 22, includes is 5x faster than ~indexOf
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

    // feat: detect new line
    if (output.includes(LF)) {
      output = output.replace(/(\r?\n)/g, closeStack + '$1' + openStack);
    }

    return openStack + output + closeStack;
  };

  let { open, close } = useColors ? style : mono

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

const Ansis = function(useColors = hasColors) {
  let self = {
    // named export of the function to create new instance
    Ansis: Ansis,

    /**
     * Whether the output supports ANSI colors.
     *
     * @return {boolean}
     */
    isSupported: () => hasColors,

    /**
     * Remove ANSI escape sequences.
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
     * Extend base colors with custom ones.
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
              return (...args) => createStyle(this, color(...args), useColors);
            },
          };
        } else {
          styles[name] = {
            get() {
              let style = createStyle(this, styleProps, useColors);

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

  // define base functions, colors and styles
  return self.extend(styleData);
};

const ansis = new Ansis();

// for distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis;
// ansis.default = ansis; // needs for tsc

export { ansis as default, Ansis };
