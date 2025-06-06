let { round, max } = Math;

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
  let color = /([a-f\d]{3,6})/i.exec(value)?.[1];
  let len = color?.length;

  // Optimisation: `n ^ 6` is faster then `n !== 6`
  let hex =
    // if len !== 6
    6 ^ len
      // if len !== 3
      ? 3 ^ len
        ? '0' // len !== 6 && len !== 3
        : color[0] + color[0] + color[1] + color[1] + color[2] + color[2] // len === 3
      : color // len === 6

  let decimal = parseInt(hex, 16);

  return [decimal >> 16 & 255, decimal >> 8 & 255, decimal & 255];
};

/**
 * Convert RGB values to approximate code of ANSI 256 colors.
 * Optimized version of https://github.com/Qix-/color-convert/blob/master/conversions.js#L551
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {number}
 */
export let rgbToAnsi256 = (r, g, b) => {
  // r !== g || g !== b
  if (r ^ g || g ^ b) {
    return 16
      // r / 255 * 5 => r / 51
      + (36 * round(r / 51))
      + (6 * round(g / 51))
      + round(b / 51);
  }

  // grayscale

  if (8 > r) return 16;
  if (r > 248) return 231;
  return round(((r - 8) * 24) / 247) + 232;
};

/**
 * Convert ANSI 256 color code to approximate code of ANSI 16 colors.
 *
 * @param {number} code
 * @return {number}
 */
export let ansi256To16 = (code) => {
  let r, g, b, value, remainder;

  if (8 > code) return 30 + code;
  if (16 > code) return 90 + (code - 8);

  if (232 > code) {
    code -= 16;
    remainder = code % 36;

    // (number | 0) is equivalent to Math.floor(number), we are sure that the code is >= 0
    r = (code / 36 | 0) / 5;
    g = (remainder / 6 | 0) / 5;
    b = (remainder % 6) / 5;
  } else {
    // grayscale
    r = g = b = (((code - 232) * 10) + 8) / 255;
  }

  value = max(r, g, b) * 2;

  return value
    ? 30 + (round(b) << 2 | round(g) << 1 | round(r)) + ( 2 ^ value ? 0 : 60) // equivalent to 2 !== value
    : 30;
};

export let rgbToAnsi16 = (r, g, b) => ansi256To16(rgbToAnsi256(r, g, b));
