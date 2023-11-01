import { hexToRgb, clamp, strReplaceAll } from './utils.js';
import { baseStyles, fnAnsi256, fnBgAnsi256, fnRgb, fnBgRgb } from './ansi-codes.js';

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} openStack
 * @property {string?} closeStack
 * @property {null | AnsisProps} parent
 */

//Object.defineProperty(exports, '__esModule', { value: !0 });

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
  style.props = { open, close, openStack, closeStack, parent: props };
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
      props = props.parent;
    }
  }

  if (~string.indexOf('\n')) {
    string = string.replace(regexLF, closeStack + '$1' + openStack);
  }

  return openStack + string + closeStack;
};

const styleMethods = {
  ansi: (code) => fnAnsi256(clamp(code, 0, 255)),
  bgAnsi: (code) => fnBgAnsi256(clamp(code, 0, 255)),
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

// define method aliases for compatibility with chalk
styles.ansi256 = styles.fg = styles.ansi;
styles.bgAnsi256 = styles.bg = styles.bgAnsi;

const ansis = new Ansis();

export { Ansis, ansis as default };

export const ansi256 = ansis.ansi256;
export const ansi = ansis.ansi;
export const fg = ansis.fg;
export const bgAnsi256 = ansis.bgAnsi256;
export const bgAnsi = ansis.bgAnsi;
export const bg = ansis.bg;
export const rgb = ansis.rgb;
export const bgRgb = ansis.bgRgb;
export const hex = ansis.hex;
export const bgHex = ansis.bgHex;

// misc
export const reset = ansis.reset;
export const inverse = ansis.inverse;
export const hidden = ansis.hidden;
export const visible = ansis.visible;

// styles
export const bold = ansis.bold;
export const dim = ansis.dim;
export const faint = ansis.faint;
export const italic = ansis.italic;
export const underline = ansis.underline;
export const doubleUnderline = ansis.doubleUnderline;
export const strikethrough = ansis.strikethrough;
export const strike = ansis.strike;
export const frame = ansis.frame;
export const encircle = ansis.encircle;
export const overline = ansis.overline;

// foreground colors
export const black = ansis.black;
export const red = ansis.red;
export const green = ansis.green;
export const yellow = ansis.yellow;
export const blue = ansis.blue;
export const magenta = ansis.magenta;
export const cyan = ansis.cyan;
export const white = ansis.white;
export const gray = ansis.gray;
export const grey = ansis.grey;
export const blackBright = ansis.blackBright;
export const redBright = ansis.redBright;
export const greenBright = ansis.greenBright;
export const yellowBright = ansis.yellowBright;
export const blueBright = ansis.blueBright;
export const magentaBright = ansis.magentaBright;
export const cyanBright = ansis.cyanBright;
export const whiteBright = ansis.whiteBright;

// background colors
export const bgBlack = ansis.bgBlack;
export const bgRed = ansis.bgRed;
export const bgGreen = ansis.bgGreen;
export const bgYellow = ansis.bgYellow;
export const bgBlue = ansis.bgBlue;
export const bgMagenta = ansis.bgMagenta;
export const bgCyan = ansis.bgCyan;
export const bgWhite = ansis.bgWhite;
export const bgBlackBright = ansis.bgBlackBright;
export const bgRedBright = ansis.bgRedBright;
export const bgGreenBright = ansis.bgGreenBright;
export const bgYellowBright = ansis.bgYellowBright;
export const bgBlueBright = ansis.bgBlueBright;
export const bgMagentaBright = ansis.bgMagentaBright;
export const bgCyanBright = ansis.bgCyanBright;
export const bgWhiteBright = ansis.bgWhiteBright;
