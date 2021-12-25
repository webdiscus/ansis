import tty from 'tty';

// todo Add supports NO_COLOR
export const isSupported = () => {
  if (!process) return false;

  const env = process.env || {};
  const argv = process.argv || [];
  const isDisabled = 'NO_COLOR' in env || argv.includes('--no-color');
  const isForced = 'FORCE_COLOR' in env || argv.includes('--color');

  const isCompatibleTerminal = (tty.isatty(1) && env.TERM && env.TERM !== 'dumb') || process.platform === 'win32';
  const isCI = 'CI' in env;

  return !isDisabled && (isForced || isCompatibleTerminal || isCI);
};

/**
 * Convert hex color string to RGB values.
 *
 * A hexadecimal color code can be 3 or 6 digits with an optional "#" prefix.
 *
 * The 3 digits specifies a RGB doublet data as a fully opaque color.
 * For example, "#123" specifies the color that is represented by "#112233".
 *
 * The 6 digits specifies a fully opaque color.
 * For example, "#112233".
 *
 * @param {string} hex A string that contains the hexadecimal RGB color representation.
 * @return {[number, number, number]} The red, green, blue values in range [0, 255] .
 */
export const hexToRgb = function (hex) {
  let [, color] = /([a-f\d]{3,6})/i.exec(hex) || [];
  const len = color ? color.length : 0;

  if (len === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  } else if (len !== 6) {
    return [0, 0, 0];
  }

  const num = parseInt(color, 16);

  return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
};

/**
 * Clamp a number within the inclusive range specified by min and max.
 * @note: The ternary operator is a tick quicker than Math.min(Math.max(num, min), max).
 *
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number} The number if is between min - max, or min/max.
 */
export const clamp = (num, min, max) => (min > num ? min : num > max ? max : num);

/**
 * @param {string} str
 * @param {{open: string, close: string} | {open: string, closeRe: RegExp}} props
 */
export const strReplaceAll =
  String.prototype.replaceAll != null
    ? // node >= 15
      (str, { close, open }) => str.replaceAll(close, open)
    : // node < 15
      (str, { closeRe, open }) => str.replace(closeRe, open);

/**
 * The style must be break at the end of the line and continued on a new line.
 * TODO: compare with str.replace(/(\r*\n)/g, props.closeStack + '$1' + props.openStack);
 *   - compatibility in windows
 *   - performance
 *   - delete this function if replace() is faster
 *
 * @param {string} str The string containing linebreaks.
 * @param {string} open The code of styling.
 * @param {string} close The reset of styling.
 * @param {number} pos The position of the first linebreak.
 * @returns {string}
 */
// export const breakStyle = (str, open, close, pos) => {
//   let result = '',
//     lastPos = 0;
//
//   while (pos > -1) {
//     let len = pos,
//       LF = '\n';
//     // fix for windows
//     if (str[pos - 1] === '\r') {
//       LF = '\r\n';
//       len--;
//     }
//
//     result += str.substr(lastPos, len - lastPos) + close + LF + open;
//     lastPos = pos + 1;
//     pos = str.indexOf('\n', lastPos);
//   }
//
//   return result + str.substr(lastPos);
// };
