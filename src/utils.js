let { round, floor, max } = Math;

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
 * @param {string} value A string that contains the hexadecimal RGB color representation.
 * @return {[number, number, number]} The red, green, blue values in range [0, 255] .
 */
export let hexToRgb = (value) => {
  let [, color] = /([a-f\d]{3,6})/i.exec(value) || [];
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
 * Convert RGB values to approximate code of ANSI 256 colors.
 * https://github.com/Qix-/color-convert/blob/master/conversions.js#L551
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {number}
 */
export let rgbToAnsi256 = (r, g, b) => {
  // greyscale
  if (r === g && g === b) {
    if (r < 8) return 16;
    if (r > 248) return 231;
    return round(((r - 8) / 247) * 24) + 232;
  }

  return 16
    // r / 255 * 5 => r / 51
    + (36 * round(r / 51))
    + (6 * round(g / 51))
    + round(b / 51);
};

/**
 * Convert ANSI 256 color code to approximate code of ANSI 16 colors.
 *
 * @param {number} code
 * @return {number}
 */
export let ansi256To16 = (code) => {
  let r, g, b, value, remainder;

  if (code < 8) return 30 + code;
  if (code < 16) return 90 + (code - 8);

  if (code >= 232) {
    // greyscale
    r = g = b = (((code - 232) * 10) + 8) / 255;
  } else {
    code -= 16;
    remainder = code % 36;

    r = floor(code / 36) / 5;
    g = floor(remainder / 6) / 5;
    b = (remainder % 6) / 5;
  }

  value = max(r, g, b) * 2;

  return value
    ? 30 + (round(b) << 2 | round(g) << 1 | round(r)) + (value === 2 ? 60 : 0)
    : 30;
};

export let rgbToAnsi16 = (r, g, b) => ansi256To16(rgbToAnsi256(r, g, b));
