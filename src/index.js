import { baseStyles, styleMethods, rgb } from './ansi-codes.js';
import { hexToRgb, replaceAll } from './utils.js';

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} openStack
 * @property {string?} closeStack
 * @property {null | AnsisProps} props
 */

const { defineProperty, defineProperties, setPrototypeOf } = Object;
const stripANSIRegEx = /[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
const regexLFCR = /(\r?\n)/g;
const ESC = '\x1b';
const LF = '\x0a';
const styles = {};

/**
 * Wrap the string with styling and reset codes.
 *
 * @param {string | Array<String> | number} strings A string or template literals.
 * @param {Array<String>} values The values of the template literals.
 * @param {AnsisProps} props
 * @returns {string}
 */
const wrap = (strings, values, props) => {
  if (!strings) return '';

  const { _a: openStack, _b: closeStack } = props;
  // convert the number to the string
  let string = strings.raw != null ? String.raw(strings, ...values) : strings + '';

  if (string.includes(ESC)) {
    while (props != null) {
      string = replaceAll(string, props.close, props.open); // much faster than native replaceAll
      //string = string.replaceAll(props.close, props.open); // too slow!
      props = props._p;
    }
  }

  if (string.includes(LF)) {
    string = string.replace(regexLFCR, closeStack + '$1' + openStack);
  }

  return openStack + string + closeStack;
};

/**
 * @param {Object} self
 * @param {AnsisProps} self._p
 * @param {Object} codes
 * @param {string} codes.open
 * @param {string} codes.close
 * @returns {Ansis}
 */
const createStyle = ({ _p: props }, { open, close }) => {
  const style = (strings, ...values) => wrap(strings, values, style._p);
  let openStack = open;
  let closeStack = close;

  if (props != null) {
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
  const self = (str) => str + '';

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
   */
  self.extend = (colors) => {
    for (let name in colors) {
      let value = colors[name];
      // detect whether the value is style property Object {open, close} or a string with hex code of color '#FF0000'
      let isStyle = value.open != null;
      let styleCodes = isStyle ? value : rgb(...hexToRgb(value));

      styles[name] = {
        get() {
          const style = createStyle(this, styleCodes);
          defineProperty(this, name, { value: style });
          return style;
        },
      };
    }

    stylePrototype = defineProperties({}, styles);
    setPrototypeOf(self, stylePrototype);
  };

  // extend styles with base colors & styles
  self.extend(baseStyles);

  return self;
};

// extend styles with methods: rgb(), hex(), etc.
for (let name in styleMethods) {
  styles[name] = {
    get() {
      return (...args) => createStyle(this, styleMethods[name](...args));
    },
  };
}

// define method aliases for compatibility with chalk
styles.ansi256 = styles.fg;
styles.bgAnsi256 = styles.bg;

// note: place it here to allow the compiler to group all constants
let stylePrototype;

const ansis = new Ansis();

// for distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis;
// module.exports.Ansis = Ansis;

export { ansis as default, Ansis };
