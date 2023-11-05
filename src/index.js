import { hexToRgb, clamp, strReplaceAll } from './utils.js';
import { baseStyles, fnAnsi256, fnBgAnsi256, fnRgb, fnBgRgb } from './ansi-codes.js';

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} openStack
 * @property {string?} closeStack
 * @property {null | AnsisProps} props
 */

const { defineProperty, defineProperties, setPrototypeOf } = Object;

const stripANSIRegEx = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

const regexLF = /(\r*\n)/g;

const Ansis = function() {
  const self = (str) => str;

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
      let hasProperty = value.open != null;
      let styleCodes = hasProperty ? value : fnRgb(...hexToRgb(value));

      styles[name] = {
        get() {
          const style = createStyle(this, styleCodes);
          defineProperty(this, name, { value: style });
          return style;
        },
      };
    }

    stylePrototype = defineProperties(() => {}, styles);
    setPrototypeOf(self, stylePrototype);
  };

  // extend styles with base colors & styles
  self.extend(baseStyles);

  return self;
};

/**
 * @param {Object} self
 * @param {AnsisProps} self.props
 * @param {Object} codes
 * @param {string} codes.open
 * @param {string} codes.close
 * @returns {Ansis}
 */
const createStyle = ({ props }, { open, close }) => {
  const style = (strings, ...values) => wrap(strings, values, style.props);
  let openStack = open;
  let closeStack = close;

  if (props !== undefined) {
    openStack = props.openStack + open;
    closeStack = close + props.closeStack;
  }

  setPrototypeOf(style, stylePrototype);
  style.props = { open, close, openStack, closeStack, props: props };
  style.open = openStack;
  style.close = closeStack;

  return style;
};

/**
 * Wrap the string with styling and reset codes.
 *
 * @param {string | Array<String>} strings A string or template literals.
 * @param {Array<String>} values The values of the template literals.
 * @param {AnsisProps} props
 * @returns {string}
 */
const wrap = (strings, values, props) => {
  if (!strings) return '';

  const { openStack, closeStack } = props;
  let string = strings.raw != null ? String.raw(strings, ...values) : strings;

  if (~string.indexOf('\x1b')) {
    while (props !== undefined) {
      string = strReplaceAll(string, props.close, props.open);
      props = props.props;
    }
  }

  if (~string.indexOf('\n')) {
    string = string.replace(regexLF, closeStack + '$1' + openStack);
  }

  return openStack + string + closeStack;
};

const styleMethods = {
  fg: (code) => fnAnsi256(clamp(code, 0, 255)),
  bg: (code) => fnBgAnsi256(clamp(code, 0, 255)),
  hex: (hex) => fnRgb(...hexToRgb(hex)),
  bgHex: (hex) => fnBgRgb(...hexToRgb(hex)),
  rgb: (r, g, b) => fnRgb(
    clamp(r, 0, 255),
    clamp(g, 0, 255),
    clamp(b, 0, 255),
  ),
  bgRgb: (r, g, b) => fnBgRgb(
    clamp(r, 0, 255),
    clamp(g, 0, 255),
    clamp(b, 0, 255),
  ),
};

const styles = {};
let stylePrototype;

// extend styles with methods: rgb(), hex(), etc.
for (let name in styleMethods) {
  styles[name] = {
    get() {
      return (...args) => createStyle(this, styleMethods[name](...args));
    },
  };
}

// TODO: DEPRECATE ansi and bgAnsi
// define method aliases for compatibility with chalk
styles.ansi256 = styles.ansi = styles.fg;
styles.bgAnsi256 = styles.bgAnsi = styles.bg;

const ansis = new Ansis();

// for distribution code, the export will be replaced (via @rollup/plugin-replace) with the following export:
// module.exports = ansis;
// module.exports.Ansis = Ansis;

export { ansis as default, Ansis };
