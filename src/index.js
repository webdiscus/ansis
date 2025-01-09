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

let { create, defineProperty, setPrototypeOf } = Object;
let styles = {};
// note: place it here to allow the compiler to group all variables
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
   * @param {string} strings The normal or template string.
   * @param {array} values The values of the template string.
   * @return {string}
   */
  let styleFn = (strings, ...values) => {
    // if the argument is an empty string, an empty string w/o escape codes should be returned
    if (strings === '') return strings;

    let props = styleFn._p;
    let { _a: openStack, _b: closeStack } = props;

    // resolve the input string
    let str = strings?.raw
      // render template string
      ? String.raw(strings, ...values)
      // convert to string
      : '' + strings;

    // -> detect nested styles
    // on node.js, the performance of `includes()` and `~indexOf()` is the same, no difference
    if (str.includes('')) {
      while (props) {
        // this implementation is over 30% faster than native String.replaceAll()
        //str = str.replaceAll(props.close, props.open);
        // -- begin replaceAll, inline the function here to optimize the bundle size
        let search = props.close;
        let replacement = props.open;
        let searchLength = search.length;
        let result = '';
        let lastPos;
        let pos;

        // the `visible` style has empty open/close props
        if (searchLength) {
          for (lastPos = 0; ~(pos = str.indexOf(search, lastPos)); lastPos = pos + searchLength) {
            result += str.slice(lastPos, pos) + replacement;
          }

          if (lastPos) str = result + str.slice(lastPos);
        }
        // -- end replaceAll

        props = props._p;
      }
    }

    // -> detect new line
    //if (str.includes('\n')) {
    // size optimisation: using ~indexOf instead of includes, the compiled bundle is smaller by 1 byte
    if (~str.indexOf('\n')) {
      str = str.replace(/(\r?\n)/g, closeStack + '$1' + openStack);
    }

    return openStack + str + closeStack;
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
    }
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
