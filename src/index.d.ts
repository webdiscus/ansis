interface Property {
  /**
   The ANSI escape sequences for starting the style.
   */
  readonly open: string;

  /**
   The ANSI escape sequences for ending the style.
   */
  readonly close: string;
}

interface Method {
  /**
   * Return colored string.
   *
   * @param {string} string
   *  All strings from the arguments will be concatenated.
   */
  (string: string): string;
}

interface AnsisColor extends Method, Property {
  /**
   * Set [256-color ANSI code](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) for foreground color.
   *
   * Code ranges:
   * ```
   *   0 -   7: standard colors
   *   8 -  15: high intensity colors
   *  16 - 231: 6 × 6 × 6 cube (216 colors)
   * 232 - 255: grayscale from black to white in 24 steps
   * ```
   *
   * @param {number} code in range [0, 255].
   */
  ansi256: (code: number) => AnsisColor;

  /**
   * Alias for ansi256.
   * @param {number} code in range [0, 255].
   */
  ansi: (code: number) => AnsisColor;

  /**
   * Alias for ansi256.
   * @param {number} code in range [0, 255].
   */
  fg: (code: number) => AnsisColor;

  /**
   * Set RGB values for foreground color.
   *
   * @param {number} red The red value, in range [0, 255].
   * @param {number} green The green value, in range [0, 255].
   * @param {number} blue The blue value, in range [0, 255].
   */
  rgb: (red: number, green: number, blue: number) => AnsisColor;

  /**
   * Set HEX value for foreground color.
   *
   * @param {string} hex
   */
  hex: (color: string) => AnsisColor;

  /**
   * Set [256-color ANSI code](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) for background color.
   *
   * Code ranges:
   * ```
   *   0 -   7: standard colors
   *   8 -  15: high intensity colors
   *  16 - 231: 6 × 6 × 6 cube (216 colors)
   * 232 - 255: grayscale from black to white in 24 steps
   * ```
   *
   * @param {number} code in range [0, 255].
   */
  bgAnsi256: (code: number) => AnsisColor;

  /**
   * Alias for bgAnsi256.
   * @param {number} code in range [0, 255].
   */
  bgAnsi: (code: number) => AnsisColor;

  /**
   * Alias for bgAnsi256.
   * @param {number} code in range [0, 255].
   */
  bg: (code: number) => AnsisColor;

  /**
   * Set RGB values for background color.
   *
   * @param {number} red The red value, in range [0, 255].
   * @param {number} green The green value, in range [0, 255].
   * @param {number} blue The blue value, in range [0, 255].
   */
  bgRgb: (red: number, green: number, blue: number) => AnsisColor;

  /**
   * Set HEX value for background color.
   *
   * @param {string} hex
   */
  bgHex: (color: string) => AnsisColor;

  /** Reset the current style. */
  readonly reset: AnsisColor;

  /** Invert background and foreground colors. */
  readonly inverse: AnsisColor;

  /** Print the invisible text. */
  readonly hidden: AnsisColor;

  /** Print visible text without ANSI styling.*/
  readonly visible: AnsisColor;

  /** <b>Bold</b> style (high intensity). */
  readonly bold: AnsisColor;

  /** Faint style (low intensity or dim). The alias for `faint`. */
  readonly dim: AnsisColor;

  /** Faint style (low intensity or dim). The name defined by ECMA-48. */
  readonly faint: AnsisColor;

  /** <i>Italic</i> style. *(Not widely supported)* */
  readonly italic: AnsisColor;

  /** U̲n̲d̲e̲r̲l̲i̲n̲e̲ style. *(Not widely supported)* */
  readonly underline: AnsisColor;

  /** D̳o̳u̳b̳l̳e̳ ̳u̳n̳d̳e̳r̳l̳i̳n̳e̳ style. *(Not widely supported)* */
  readonly doubleUnderline: AnsisColor;

  /** O̅v̅e̅r̅l̅i̅n̅e̅ style. *(Not widely supported)* */
  readonly overline: AnsisColor;

  /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. *(Not widely supported)* */
  readonly strikethrough: AnsisColor;

  /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. *(Not widely supported)* The alias for `strikethrough`. */
  readonly strike: AnsisColor;

  /** Frame style. *(Not widely supported)* */
  readonly frame: AnsisColor;

  /** Encircle style. *(Not widely supported)* */
  readonly encircle: AnsisColor;

  readonly black: AnsisColor;
  readonly red: AnsisColor;
  readonly green: AnsisColor;
  readonly yellow: AnsisColor;
  readonly blue: AnsisColor;
  readonly magenta: AnsisColor;
  readonly cyan: AnsisColor;
  readonly white: AnsisColor;
  readonly gray: AnsisColor;
  readonly grey: AnsisColor;
  readonly blackBright: AnsisColor;
  readonly redBright: AnsisColor;
  readonly greenBright: AnsisColor;
  readonly yellowBright: AnsisColor;
  readonly blueBright: AnsisColor;
  readonly magentaBright: AnsisColor;
  readonly cyanBright: AnsisColor;
  readonly whiteBright: AnsisColor;
  readonly bgBlack: AnsisColor;
  readonly bgRed: AnsisColor;
  readonly bgGreen: AnsisColor;
  readonly bgYellow: AnsisColor;
  readonly bgBlue: AnsisColor;
  readonly bgMagenta: AnsisColor;
  readonly bgCyan: AnsisColor;
  readonly bgWhite: AnsisColor;
  readonly bgGray: AnsisColor;
  readonly bgBlackBright: AnsisColor;
  readonly bgRedBright: AnsisColor;
  readonly bgGreenBright: AnsisColor;
  readonly bgYellowBright: AnsisColor;
  readonly bgBlueBright: AnsisColor;
  readonly bgMagentaBright: AnsisColor;
  readonly bgCyanBright: AnsisColor;
  readonly bgWhiteBright: AnsisColor;
}

declare const ansis: AnsisColor;

declare const Ansis: new (str: string) => AnsisColor;

export { Ansis, ansis as default };
