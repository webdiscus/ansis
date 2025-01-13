import { hasColors, styleData, fnRgb } from './ansi-codes.js';
import { hexToRgb } from './utils.js';

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} _a The openStack.
 * @property {string?} _b The closeStack.
 * @property {null | AnsisProps} _p The props.
 */

// use the Number.isNaN, because:
// - Number.isNaN(undefined) is false (expected),
// - isNaN(undefined) is true (unexpected)
let { isNaN } = Number;
let { create, defineProperty, setPrototypeOf } = Object;
let styles = {};
let stylePrototype;

/**
 * @param {Object} self
 * @param {AnsisProps} self._p
 * @param {Object} codes
 * @param {string} codes.open
 * @param {string} codes.close
 * @returns {Ansis}
 */
let createStyle = ({ _p: props }, { open, close }) => {
  /**
   * Decorate the string with ANSI codes.
   * @param {unknown} arg The input value, can be any or a template string.
   * @param {array} values The values of the template string.
   * @return {string}
   */
  let styleFn = (arg, ...values) => {
    // DEPRECATED: if the argument is an empty string, then return empty string
    //if (arg === '') return arg;

    // NEW: if the argument is one of '', undefined or null, then return empty string

    // longer but a tick faster
    //if (!arg && 0 !== arg && false !== arg && !isNaN(arg)) return '';

    // it's shorter, but a tick slower (0.1%) because it always compares 2 expressions
    if (null == arg || '' === arg) return '';

    let props = styleFn._p;
    let { _a: openStack, _b: closeStack } = props;

    // resolve the arg string
    let output = arg?.raw
      // render template string
      ? String.raw(arg, ...values)
      // convert to string
      : '' + arg;

    // -> detect nested styles
    if (~output.indexOf('')) {
      while (props) {
        // this implementation is over 30% faster than native String.replaceAll()
        //output = output.replaceAll(props.close, props.open);
        // -- begin replaceAll, inline the function here to reduce the bundle size
        let search = props.close;
        let replacement = props.open;
        let searchLength = search.length;
        let result = '';
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

        props = props._p;
      }
    }

    // -> detect new line
    if (~output.indexOf('\n')) {
      output = output.replace(/(\r?\n)/g, closeStack + '$1' + openStack);
    }

    return openStack + output + closeStack;
  };

  let openStack = open;
  let closeStack = close;

  if (props) {
    openStack = props._a + open;
    closeStack = close + props._b;
  }

  setPrototypeOf(styleFn, stylePrototype);

  styleFn._p = { open, close, _a: openStack, _b: closeStack, _p: props };
  styleFn.open = openStack;
  styleFn.close = closeStack;

  return styleFn;
};

const Ansis = function() {
  let self = {
    /**
     * Whether the output supports ANSI colors.
     *
     * @return {boolean}
     */
    isSupported: () => hasColors,

    /**
     * Remove ANSI styling codes.
     * @param {string} str
     * @return {string}
     */
    strip: (str) => str.replace(/[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''),

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
        // type === 'string' by extending a custom color, e.g. ansis.extend({ pink: '#FF75D1' })
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

  // define functions, colors and styles
  return self.extend(styleData);
};

const ansis = new Ansis();

// for distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis;
// module.exports.Ansis = Ansis;
// ansis.default = ansis; // needs for tsc

export { ansis as default, Ansis };
