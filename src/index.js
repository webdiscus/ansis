import { clamp, hexToRgb, strReplaceAll } from './utils.js';
import ansiCodes from './ansi-codes.js';

const styles = {};
const ESC = '\x1b';
const regexLF = /(\r*\n)/g;
const colorCloseRegex = /\x1B\[39m/g;
const bgCloseRegex = /\x1B\[49m/g;

/**
 * The ANSI string (ansis).
 *
 * @param {string | string[]} str
 * @returns {string}
 */
const ansis = (...str) => str.join(' ');

/**
 * @typedef {Object} AnsisProps
 * @property {string} open
 * @property {string} close
 * @property {string?} openStack
 * @property {string?} closeStack
 * @property {RegExp?} closeRe
 * @property {null | AnsisProps} parent
 */

/**
 * Wrap the string with styling and reset codes.
 *
 * @param {string | string[]} strings
 * @param {AnsisProps} props
 * @returns {string}
 */
const wrap = (strings, props) => {
  let str = strings.length === 1 ? '' + strings[0] : strings.join(' ');
  if (!str) return '';

  const { openStack, closeStack } = props;
  if (str.indexOf(ESC) > -1) {
    while (props !== undefined) {
      str = strReplaceAll(str, props);
      props = props.parent;
    }
  }
  if (str.indexOf('\n') > -1) str = str.replace(regexLF, closeStack + '$1' + openStack);

  return openStack + str + closeStack;
};

/**
 * @param {AnsisProps} props
 * @returns {AnsisInstance}
 */
const createStyle = (props) => {
  const { open, close, parent } = props;
  if (parent !== undefined) {
    props.openStack = parent.openStack + open;
    props.closeStack = close + parent.closeStack;
  } else {
    props.openStack = open;
    props.closeStack = close;
  }

  const style = (...strings) => wrap(strings, style.props);
  Object.setPrototypeOf(style, styleProxy);
  style.props = props;

  return style;
};

/**
 * Create base styles.
 */
for (let name in ansiCodes) {
  const [open, close] = ansiCodes[name];
  styles[name] = {
    get() {
      const style = createStyle({
        open: `\x1B[${open}m`,
        close: `\x1B[${close}m`,
        closeRe: new RegExp(`\\x1B\\[${close}m`, 'g'),
        parent: this.props,
      });
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
    return createStyle({
      open: '',
      close: '',
      closeRe: null,
      parent: this.props,
    });
  },
};

/**
 * @type {AnsisInstance.ansi256}
 */
styles.ansi256 = {
  get() {
    return (num) => {
      num = clamp(num, 16, 255);
      return createStyle({
        open: `\x1B[38;5;${num}m`,
        close: '\x1B[39m',
        closeRe: colorCloseRegex,
        parent: this.props,
      });
    };
  },
};

/**
 * @type {AnsisInstance.bgAnsi256}
 */
styles.bgAnsi256 = {
  get() {
    return (num) => {
      num = clamp(num, 16, 255);

      return createStyle({
        open: `\x1B[48;2;${num}m`,
        close: '\x1B[49m',
        closeRe: bgCloseRegex,
        parent: this.props,
      });
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

      return createStyle({
        open: `\x1B[38;2;${r};${g};${b}m`,
        close: '\x1B[39m',
        closeRe: colorCloseRegex,
        parent: this.props,
      });
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

      return createStyle({
        open: `\x1B[38;2;${r};${g};${b}m`,
        close: '\x1B[39m',
        closeRe: colorCloseRegex,
        parent: this.props,
      });
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

      return createStyle({
        open: `\x1B[48;2;${r};${g};${b}m`,
        close: '\x1B[49m',
        closeRe: bgCloseRegex,
        parent: this.props,
      });
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

      return createStyle({
        open: `\x1B[48;2;${r};${g};${b}m`,
        close: '\x1B[49m',
        closeRe: bgCloseRegex,
        parent: this.props,
      });
    };
  },
};

const styleProxy = Object.defineProperties(() => {}, styles);
Object.setPrototypeOf(ansis, styleProxy);

export default ansis;
