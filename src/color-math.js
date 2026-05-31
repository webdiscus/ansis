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
  let color = /([a-f\d]{3,6})/i.exec(value)?.[0];
  let len = color?.length;

  // Optimisation: `n ^ 6` is faster then `n !== 6`
  let hex =
    // if len !== 6
    6 ^ len
      ? // if len !== 3
        3 ^ len
        ? '0' // len !== 6 && len !== 3
        : color[0] + color[0] + color[1] + color[1] + color[2] + color[2] // len === 3
      : color; // len === 6

  let decimal = ('0x' + hex) | 0;

  return [decimal >> 16, (decimal >> 8) & 255, decimal & 255];
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
  if (r ^ g | g ^ b) {
    return (
      16 +
      // r / 255 * 5 => r / 51
      36 * round(r / 51) +
      6 * round(g / 51) +
      round(b / 51)
    );
  }

  // grayscale

  if (8 > r) return 16;
  if (r > 248) return 231;
  return round(((r - 8) * 24) / 247) + 232;
};

/**
 * Convert ANSI 256 color code to approximate code of ANSI 16 colors.
 *
 * @param {number} code The color code, [0..255].
 * @return {number}
 */
export let ansi256To16 = (code) => {
  if (8 > code) return 30 + code;
  if (16 > code) return 82 + code;

  // grayscale 232..255: black or white, flips at the midpoint (round flips 0 -> 1 at code 244)
  if (code > 231) return code > 243 ? 37 : 30;

  // color cube 16..231
  code -= 16;
  let remainder = code % 36;

  // channels are integers 0..5; (number | 0) is equivalent to Math.floor(number)
  let r = (code / 36) | 0;
  let g = (remainder / 6) | 0;
  let b = remainder % 6;

  // get the max saturated channel
  let maxChanel = max(r, g, b);

  // Each cube channel r, g, b is an integer 0..5. A channel is "on" when ch > 2.
  // This is the same as round(ch / 5): it gives 1 when ch / 5 >= 0.5, that is ch >= 3.
  // Pack the on/off bits into the ANSI base color 0..7: red = bit 0, green = bit 1, blue = bit 2.
  let chR = r > 2; // bit 0, red; the `|` below coerces this bool to 0 or 1
  let chG = (g > 2) << 1; // bit 1, green
  let chB = (b > 2) << 2; // bit 2, blue

  // +60 switches to the bright variant (90..97) when a channel is fully saturated (maxChanel == 5).
  let bright = maxChanel > 4 ? 60 : 0;

  // 30 + base color gives the foreground SGR code (30..37).
  return 30 + (chR | chG | chB) + bright;
};
