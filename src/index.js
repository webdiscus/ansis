import { clamp, hexToRgb, strReplaceAll } from './utils.js';
import { ansiCodes } from './ansi-codes.js';

/**
 * All methods are implemented in prototype of the `styleProxy` object.
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
for (let name in ansiCodes) {
  const { open, close } = ansiCodes[name];
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
    return (num) => {
      num = clamp(num, 0, 255);
      return createStyle(`\x1B[38;5;${num}m`, '\x1B[39m', this.props);
    };
  },
};

/**
 * @type {AnsisInstance.bgAnsi256}
 */
styles.bgAnsi256 = {
  get() {
    return (num) => {
      num = clamp(num, 0, 255);
      return createStyle(`\x1B[48;5;${num}m`, '\x1B[49m', this.props);
    };
  },
};

/**
 * @type {AnsisInstance.rgb}
 */
styles.rgb = {
  get() {
    return (r, g, b) => {
      r = clamp(r, 0, 255);
      g = clamp(g, 0, 255);
      b = clamp(b, 0, 255);
      return createStyle(`\x1B[38;2;${r};${g};${b}m`, '\x1B[39m', this.props);
    };
  },
};

/**
 * @type {AnsisInstance.hex}
 */
styles.hex = {
  get() {
    return (hex) => {
      const [r, g, b] = hexToRgb(hex);
      return createStyle(`\x1B[38;2;${r};${g};${b}m`, '\x1B[39m', this.props);
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
      return createStyle(`\x1B[48;2;${r};${g};${b}m`, '\x1B[49m', this.props);
    };
  },
};

/**
 * @type {AnsisInstance.bgHex}
 */
styles.bgHex = {
  get() {
    return (hex) => {
      const [r, g, b] = hexToRgb(hex);
      return createStyle(`\x1B[48;2;${r};${g};${b}m`, '\x1B[49m', this.props);
    };
  },
};

const styleProxy = Object.defineProperties(() => {}, styles);

export default new Ansis();
