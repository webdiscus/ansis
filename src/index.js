import { styleData, fnRgb, isSupported } from './ansi-codes.js';
import { hexToRgb } from './utils.js';

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} _a The openStack.
 * @property {string?} _b The closeStack.
 * @property {null | AnsisProps} _p The props.
 */

const { defineProperty, defineProperties, setPrototypeOf } = Object;
const stripANSIRegEx = /[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
const regexLFCR = /(\r?\n)/g;
const ESC = '';
const LF = '\n';
const styles = {};

/**
 * @param {Object} self
 * @param {AnsisProps} self._p
 * @param {Object} codes
 * @param {string} codes.open
 * @param {string} codes.close
 * @returns {Ansis}
 */
const createStyle = ({ _p: props }, { open, close }) => {
  /**
   * Wrap the string with ANSI codes.
   * @param {string} strings The normal or template string.
   * @param {array} values The values of the template string.
   * @return {string}
   */
  const style = (strings, ...values) => {
    if (!strings) return '';

    let props = style._p;
    let { _a: openStack, _b: closeStack } = props;

    let str = strings.raw
      // render template strings
      ? String.raw(strings, ...values)
      // convert the number to the string
      : '' + strings;

    // --> detect nested styles
    // on node.js, the performance of `includes()` and `~indexOf()` is the same, no difference
    if (str.includes(ESC)) {
      while (props) {
        // this implementation is over 30% faster than native String.replaceAll()
        //str = str.replaceAll(props.close, props.open);
        // -- begin replaceAll
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

    // --> detect new line
    if (str.includes(LF)) {
      str = str.replace(regexLFCR, closeStack + '$1' + openStack);
    }

    return openStack + str + closeStack;
  };

  let openStack = open;
  let closeStack = close;

  if (props) {
    openStack = props._a + open;
    closeStack = close + props._b;
  }

  setPrototypeOf(style, stylePrototype);
  style._p = { open, close, _a: openStack, _b: closeStack, _p: props };
  style.open = openStack;
  style.close = closeStack;

  return style;
};

const Ansis = function() {
  const self = (str) => '' + str;

  /**
   * Whether the output supports ANSI color and styles.
   *
   * @return {boolean}
   */
  self.isSupported = () => isSupported;

  /**
   * Remove ANSI styling codes.
   * @param {string} str
   * @return {string}
   */
  self.strip = (str) => str.replace(stripANSIRegEx, '');

  /**
   * @callback getStyleCodes
   * @param {string} value
   */

  /**
   * Extend base colors with custom ones.
   *
   * @param {Object.<name:string, value:string|{open:string, close:string}>} colors The object with key as color name
   *  and value as hex code of custom color or the object with 'open' and 'close' codes.
   * @return {(function(*): string)|Ansis|(function(...[*]): Ansis)}
   */
  self.extend = (colors) => {
    for (let name in colors) {
      let color = colors[name];
      let type = typeof color;

      // detect whether the value is style property Object {open, close}
      // or a string with hex code of a color, e.g.: '#FF0000'
      let styleProps = type === 'string' ? fnRgb(...hexToRgb(color)) : color;

      if (type === 'function') {
        styles[name] = {
          get() {
            return (...args) => createStyle(this, color(...args));
          },
        };
      } else {
        styles[name] = {
          get() {
            let style = createStyle(this, styleProps);
            defineProperty(this, name, { value: style });

            return style;
          },
        };
      }
    }

    stylePrototype = defineProperties({}, styles);
    setPrototypeOf(self, stylePrototype);

    // return is required for TypeScript to access extended colors
    return self;
  };

  // define functions, colors and styles
  self.extend(styleData);

  return self;
};

// note: place it here to allow the compiler to group all constants
let stylePrototype;

const ansis = new Ansis();

// for distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis;
// module.exports.Ansis = Ansis;
// ansis.default = ansis; // needs for tsc

export { ansis as default, Ansis };
