import { hasColors, styleData, fnRgb, EMPTY_STRING } from './ansi-codes.js';
import { hexToRgb } from './utils.js';

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} _a The openStack.
 * @property {string?} _b The closeStack.
 * @property {null | AnsisProps} _p The props.
 */

let { create, defineProperty, setPrototypeOf } = Object;
let styles = {};
let stylePrototype;
let LF = '\n';

/**
 * @param {Object} self
 * @param {AnsisProps} self._p
 * @param {Object} codes
 * @param {string} codes.open
 * @param {string} codes.close
 * @returns {Ansis}
 */
let createStyle = ({ _p: props }, { open, close}) => {
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
      if (null == arg || EMPTY_STRING === arg) return EMPTY_STRING;
    }

    let output = arg.raw
      // render template string
      ? String.raw(arg, ...values).replace(/\\n/g, LF)
      // stringify the argument
      : EMPTY_STRING + arg;

    let props = styleFn._p;
    let { _a: openStack, _b: closeStack } = props;

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

        props = props._p;
      }
    }

    // feat: detect new line
    if (output.includes(LF)) {
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

  // define base functions, colors and styles
  return self.extend(styleData);
};

const ansis = new Ansis();

// for distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis;
// module.exports.Ansis = Ansis;
// ansis.default = ansis; // needs for tsc

export { ansis as default, Ansis };
