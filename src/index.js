import { clamp, hexToRgb, strReplaceAll } from './utils.js';
import { baseCodes, extendedCodes } from './ansi-codes.js';

/**
 * Note: all methods are implemented in prototype of the `styleProxy` object.
 * @implements {AnsisInstance}
 */
export class Ansis {
  constructor() {
    const self = (str) => str;
    Object.setPrototypeOf(self, styleProxy);

    return self;
  }
}

const styles = {};
const regexLF = /(\r*\n)/g;

/**
 * @typedef {StyleProperties} AnsisProps
 * @property {string?} openStack
 * @property {string?} closeStack
 * @property {null | AnsisProps} parent
 */

/**
 * Wrap the string with styling and reset codes.
 *
 * @param {string | string[]} str
 * @param {AnsisProps} props
 * @returns {string}
 */
const wrap = (str, props) => {
  if (!str) return '';

  const { openStack, closeStack } = props;
  if (str.indexOf('\x1b') > -1) {
    while (props !== undefined) {
      str = strReplaceAll(str, props.close, props.open);
      props = props.parent;
    }
  }

  if (str.indexOf('\n') > -1) str = str.replace(regexLF, closeStack + '$1' + openStack);

  return openStack + str + closeStack;
};

/**
 * @param {string} open
 * @param {string} close
 * @param {AnsisProps} parent
 * @returns {AnsisInstance}
 */
const createStyle = (open, close, parent) => {
  let openStack = open;
  let closeStack = close;
  if (parent !== undefined) {
    openStack = parent.openStack + open;
    closeStack = close + parent.closeStack;
  }

  const style = (str) => wrap(str, style.props);
  Object.setPrototypeOf(style, styleProxy);
  style.props = { open, close, openStack, closeStack, parent };
  style.open = openStack;
  style.close = closeStack;

  return style;
};

/**
 * Create base styles.
 */
for (let name in baseCodes) {
  const { open, close } = baseCodes[name];
  styles[name] = {
    get() {
      const style = createStyle(open, close, this.props);
      Object.defineProperty(this, name, { value: style });
      return style;
    },
  };
}

/**
 * @type {AnsisInstance.visible}
 */
styles.visible = {
  get() {
    return createStyle('', '', this.props);
  },
};

/**
 * @type {AnsisInstance.ansi256}
 */
styles.ansi256 = {
  get() {
    return (code) => {
      code = clamp(code, 0, 255);
      const { open, close } = extendedCodes.ansi256(code);
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * Alias to ansi256.
 * @type {AnsisInstance.ansi256}
 */
styles.ansi = styles.ansi256;

/**
 * @type {AnsisInstance.bgAnsi256}
 */
styles.bgAnsi256 = {
  get() {
    return (code) => {
      code = clamp(code, 0, 255);
      const { open, close } = extendedCodes.bgAnsi256(code);
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * Alias to bgAnsi256.
 * @type {AnsisInstance.bgAnsi256}
 */
styles.bgAnsi = styles.bgAnsi256;

/**
 * @type {AnsisInstance.rgb}
 */
styles.rgb = {
  get() {
    return (r, g, b) => {
      r = clamp(r, 0, 255);
      g = clamp(g, 0, 255);
      b = clamp(b, 0, 255);
      const { open, close } = extendedCodes.rgb(r, g, b);
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * @type {AnsisInstance.hex}
 */
styles.hex = {
  get() {
    return (hex) => {
      const { open, close } = extendedCodes.rgb(...hexToRgb(hex));
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * @type {AnsisInstance.bgRgb}
 */
styles.bgRgb = {
  get() {
    return (r, g, b) => {
      r = clamp(r, 0, 255);
      g = clamp(g, 0, 255);
      b = clamp(b, 0, 255);
      const { open, close } = extendedCodes.bgRgb(r, g, b);
      return createStyle(open, close, this.props);
    };
  },
};

/**
 * @type {AnsisInstance.bgHex}
 */
styles.bgHex = {
  get() {
    return (hex) => {
      const { open, close } = extendedCodes.bgRgb(...hexToRgb(hex));
      return createStyle(open, close, this.props);
    };
  },
};

const styleProxy = Object.defineProperties(() => {}, styles);

export default new Ansis();
