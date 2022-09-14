/**
 * Convert hex color string to RGB values.
 *
 * A hexadecimal color code can be 3 or 6 digits with an optional "#" prefix.
 *
 * The 3 digits specifies an RGB doublet data as a fully opaque color.
 * For example, "#123" specifies the color that is represented by "#112233".
 *
 * The 6 digits specifies a fully opaque color.
 * For example, "#112233".
 *
 * @param {string} hex A string that contains the hexadecimal RGB color representation.
 * @return {[number, number, number]} The red, green, blue values in range [0, 255] .
 */
export const hexToRgb = (hex) => {
  let [, color] = /([a-f\d]{3,6})/i.exec(hex) || [];
  let len = color ? color.length : 0;

  if (len === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  } else if (len !== 6) {
    return [0, 0, 0];
  }

  let num = parseInt(color, 16);

  return [num >> 16 & 255, num >> 8 & 255, num & 255];
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
 * Replace all matched strings.
 * Note: this implementation is over 30% faster than String.replaceAll().
 *
 * @param {string} str
 * @param {string} searchValue
 * @param {string} replaceValue
 * @returns {string}
 */
export const strReplaceAll = (str, searchValue, replaceValue) => {
  // visible style has empty open/close props
  if (searchValue === '') return str;

  let pos = str.indexOf(searchValue);
  if (pos < 0) return str;

  let substringLength = searchValue.length;
  let lastPos = 0;
  let result = '';

  while (~pos) {
    result += str.slice(lastPos, pos) + replaceValue;
    lastPos = pos + substringLength;
    pos = str.indexOf(searchValue, lastPos);
  }

  return result + str.slice(lastPos);
};

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
//   return result + str.slice(lastPos);
// };
