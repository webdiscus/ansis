interface StyleProperties {
  /**
   The ANSI escape sequences for starting the style.
   */
  readonly open: string;

  /**
   The ANSI escape sequences for ending the style.
   */
  readonly close: string;
}

export interface StyleFunction {
  /**
   * Return colored string.
   *
   * @param {string[]} strings String or multiple strings in arguments.
   *  All strings from the arguments will be concatenated.
   */
  (...strings: string[]): string;
}

/**
 * Color styling of text for ANSI terminals using the SGR codes defined in the [ECMA-48](https://www.ecma-international.org/publications-and-standards/standards/ecma-48/) standard.
 */
export interface AnsisInstance extends StyleFunction, StyleProperties {
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
  ansi256: (code: number) => AnsisInstance;

  /**
   * Alias to ansi256.
   * @param {number} code in range [0, 255].
   */
  ansi: (code: number) => AnsisInstance;

  /**
   * Set RGB values for foreground color.
   *
   * @param {number} red The red value, in range [0, 255].
   * @param {number} green The green value, in range [0, 255].
   * @param {number} blue The blue value, in range [0, 255].
   */
  rgb: (red: number, green: number, blue: number) => AnsisInstance;

  /**
   * Set HEX value for foreground color.
   *
   * @param {string} hex
   */
  hex: (color: string) => AnsisInstance;

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
  bgAnsi256: (code: number) => AnsisInstance;

  /**
   * Alias to bgAnsi256.
   * @param {number} code in range [0, 255].
   */
  bgAnsi: (code: number) => AnsisInstance;

  /**
   * Set RGB values for background color.
   *
   * @param {number} red The red value, in range [0, 255].
   * @param {number} green The green value, in range [0, 255].
   * @param {number} blue The blue value, in range [0, 255].
   */
  bgRgb: (red: number, green: number, blue: number) => AnsisInstance;

  /**
   * Set HEX value for background color.
   *
   * @param {string} hex
   */
  bgHex: (color: string) => AnsisInstance;

  /**
   * Command
   */

  /** Reset the current style. */
  readonly reset: AnsisInstance;

  /** Invert background and foreground colors. */
  readonly inverse: AnsisInstance;

  /** Print the invisible text. */
  readonly hidden: AnsisInstance;

  /** Print visible text without ANSI styling.*/
  readonly visible: AnsisInstance;

  /**
   * Style
   */

  /** <b>Bold</b> style (high intensity). */
  readonly bold: AnsisInstance;

  /** Faint style (low intensity or dim). The alias for `faint`. */
  readonly dim: AnsisInstance;

  /** Faint style (low intensity or dim). The name defined by ECMA-48. */
  readonly faint: AnsisInstance;

  /** <i>Italic</i> style. *(Not widely supported)* */
  readonly italic: AnsisInstance;

  /** U̲n̲d̲e̲r̲l̲i̲n̲e̲ style. *(Not widely supported)* */
  readonly underline: AnsisInstance;

  /** D̳o̳u̳b̳l̳e̳ ̳u̳n̳d̳e̳r̳l̳i̳n̳e̳ style. *(Not widely supported)* */
  readonly doubleUnderline: AnsisInstance;

  /** O̅v̅e̅r̅l̅i̅n̅e̅ style. *(Not widely supported)* */
  readonly overline: AnsisInstance;

  /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. *(Not widely supported)* */
  readonly strikethrough: AnsisInstance;

  /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. *(Not widely supported)* The alias for `strikethrough`. */
  readonly strike: AnsisInstance;

  /** Frame style. *(Not widely supported)* */
  readonly frame: AnsisInstance;

  /** Encircle style. *(Not widely supported)* */
  readonly encircle: AnsisInstance;

  /**
   * Foreground color
   */

  /** Black foreground. */
  readonly black: AnsisInstance;

  /** Red foreground. */
  readonly red: AnsisInstance;

  /** Green foreground. */
  readonly green: AnsisInstance;

  /** Yellow foreground. */
  readonly yellow: AnsisInstance;

  /** Blue foreground. */
  readonly blue: AnsisInstance;

  /** Magenta foreground. */
  readonly magenta: AnsisInstance;

  /** Cyan foreground. */
  readonly cyan: AnsisInstance;

  /** White foreground. */
  readonly white: AnsisInstance;

  /** Gray foreground. The alias for blackBright. */
  readonly gray: AnsisInstance;

  /** Bright black foreground. */
  readonly blackBright: AnsisInstance;

  /** Bright red foreground. */
  readonly redBright: AnsisInstance;

  /** Bright green foreground. */
  readonly greenBright: AnsisInstance;

  /** Bright yellow foreground. */
  readonly yellowBright: AnsisInstance;

  /** Bright blue foreground. */
  readonly blueBright: AnsisInstance;

  /** Bright magenta foreground. */
  readonly magentaBright: AnsisInstance;

  /** Bright cyan foreground. */
  readonly cyanBright: AnsisInstance;

  /** Bright white foreground. */
  readonly whiteBright: AnsisInstance;

  /**
   * Background color
   */

  /** Black background. */
  readonly bgBlack: AnsisInstance;

  /** Red background. */
  readonly bgRed: AnsisInstance;

  /** Green background. */
  readonly bgGreen: AnsisInstance;

  /** Yellow background. */
  readonly bgYellow: AnsisInstance;

  /** Blue background. */
  readonly bgBlue: AnsisInstance;

  /** Magenta background. */
  readonly bgMagenta: AnsisInstance;

  /** Cyan background. */
  readonly bgCyan: AnsisInstance;

  /** White background. */
  readonly bgWhite: AnsisInstance;

  /** Gray background. */
  readonly bgGray: AnsisInstance;

  /** Bright black background. */
  readonly bgBlackBright: AnsisInstance;

  /** Bright red background. */
  readonly bgRedBright: AnsisInstance;

  /** Bright green background. */
  readonly bgGreenBright: AnsisInstance;

  /** Bright yellow background. */
  readonly bgYellowBright: AnsisInstance;

  /** Bright blue background. */
  readonly bgBlueBright: AnsisInstance;

  /** Bright magenta background. */
  readonly bgMagentaBright: AnsisInstance;

  /** Bright cyan background. */
  readonly bgCyanBright: AnsisInstance;

  /** Bright white background. */
  readonly bgWhiteBright: AnsisInstance;
}

declare const ansis: AnsisInstance;

export default ansis;

export const Ansis: new (str: string) => AnsisInstance;
