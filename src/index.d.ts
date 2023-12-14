type ColorExtend = Record<string, string | { open: string, close: string }>

interface Ansis {
  /**
   * Return styled string.
   *
   * @param {string | TemplateStringsArray} string
   */
  (string: string): string;
  (string: TemplateStringsArray, ...parameters: string[]): string;

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
  ansi256: (code: number) => this;

  /**
   * Alias for ansi256.
   *
   * @param {number} code in range [0, 255].
   */
  ansi: (code: number) => this;

  /**
   * Alias for ansi256.
   *
   * @param {number} code in range [0, 255].
   */
  fg: (code: number) => this;

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
  bgAnsi256: (code: number) => this;

  /**
   * Alias for bgAnsi256.
   *
   * @param {number} code in range [0, 255].
   */
  bgAnsi: (code: number) => this;

  /**
   * Alias for bgAnsi256.
   *
   * @param {number} code in range [0, 255].
   */
  bg: (code: number) => this;

  /**
   * Set RGB values for foreground color.
   *
   * @param {number} red The red value, in range [0, 255].
   * @param {number} green The green value, in range [0, 255].
   * @param {number} blue The blue value, in range [0, 255].
   */
  rgb: (red: number, green: number, blue: number) => this;

  /**
   * Set HEX value for foreground color.
   *
   * @param {string} hex
   */
  hex: (color: string) => this;

  /**
   * Set RGB values for background color.
   *
   * @param {number} red The red value, in range [0, 255].
   * @param {number} green The green value, in range [0, 255].
   * @param {number} blue The blue value, in range [0, 255].
   */
  bgRgb: (red: number, green: number, blue: number) => this;

  /**
   * Set HEX value for background color.
   *
   * @param {string} hex
   */
  bgHex: (color: string) => this;

  /**
   * Remove ANSI styling codes.
   *
   * @param {string} str
   * @return {string}
   */
  strip: (string: string) => string;

  /**
   * Extend base colors with custom ones.
   *
   * @param {Object.<name:string, value:string|{open:string, close:string}>} colors The object with key as color name
   *  and value as hex code of custom color or the object with 'open' and 'close' codes.
   */
  extend: (colors: ColorExtend) => void;

  /** The ANSI escape sequences for starting the current style. */
  readonly open: string;

  /** The ANSI escape sequences for ending the current style. */
  readonly close: string;

  /** Reset the current style. */
  readonly reset: this;

  /** Invert background and foreground colors. */
  readonly inverse: this;

  /** Print the invisible text. */
  readonly hidden: this;

  /** Print visible text without ANSI styling. */
  readonly visible: this;

  /** <b>Bold</b> style (high intensity). */
  readonly bold: this;

  /** Faint style (low intensity or dim). The alias for `faint`. */
  readonly dim: this;

  /** Faint style (low intensity or dim). The name defined by ECMA-48. */
  readonly faint: this;

  /** <i>Italic</i> style. (Not widely supported) */
  readonly italic: this;

  /** U̲n̲d̲e̲r̲l̲i̲n̲e̲ style. (Not widely supported) */
  readonly underline: this;

  /** D̳o̳u̳b̳l̳e̳ ̳u̳n̳d̳e̳r̳l̳i̳n̳e̳ style. (Not widely supported) */
  readonly doubleUnderline: this;

  /** O̅v̅e̅r̅l̅i̅n̅e̅ style. (Not widely supported) */
  readonly overline: this;

  /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. (Not widely supported) */
  readonly strikethrough: this;

  /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. (Not widely supported) The alias for `strikethrough`. */
  readonly strike: this;

  /** Frame style. (Not widely supported) */
  readonly frame: this;

  /** Encircle style. (Not widely supported) */
  readonly encircle: this;

  readonly black: this;
  readonly red: this;
  readonly green: this;
  readonly yellow: this;
  readonly blue: this;
  readonly magenta: this;
  readonly cyan: this;
  readonly white: this;
  readonly gray: this;
  readonly grey: this;
  readonly blackBright: this;
  readonly redBright: this;
  readonly greenBright: this;
  readonly yellowBright: this;
  readonly blueBright: this;
  readonly magentaBright: this;
  readonly cyanBright: this;
  readonly whiteBright: this;
  readonly bgBlack: this;
  readonly bgRed: this;
  readonly bgGreen: this;
  readonly bgYellow: this;
  readonly bgBlue: this;
  readonly bgMagenta: this;
  readonly bgCyan: this;
  readonly bgWhite: this;
  readonly bgGray: this;
  readonly bgBlackBright: this;
  readonly bgRedBright: this;
  readonly bgGreenBright: this;
  readonly bgYellowBright: this;
  readonly bgBlueBright: this;
  readonly bgMagentaBright: this;
  readonly bgCyanBright: this;
  readonly bgWhiteBright: this;
}

declare const ansis: Ansis;
declare const Ansis: new () => Ansis;

/**
 * Base ANSI Styles
 */
type AnsiStyles = (
  | 'reset'
  | 'inverse'
  | 'hidden'
  | 'visible'
  | 'bold'
  | 'dim'
  | 'faint'
  | 'italic'
  | 'underline'
  | 'doubleUnderline'
  | 'overline'
  | 'strikethrough'
  | 'strike'
  | 'frame'
  | 'encircle'
  );

/**
 * Base ANSI Colors
 */
type AnsiColors = (
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgGray'
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright'
  );

type StringUnion<T, B extends string> = T | (B & Record<never, never>);
type AnsiColorsExtend<T extends string> = StringUnion<AnsiColors, T>;

export { AnsiColors, AnsiColorsExtend, AnsiStyles, Ansis, ansis as default };

export declare function ansi256(code: number): Ansis;

export declare function fg(code: number): Ansis;

export declare function bgAnsi256(code: number): Ansis;

export declare function bg(code: number): Ansis;

export declare function rgb(red: number, green: number, blue: number): Ansis;

export declare function bgRgb(red: number, green: number, blue: number): Ansis;

export declare function hex(code: string): Ansis;

export declare function bgHex(code: string): Ansis;

// misc
export declare const reset: Ansis;
export declare const inverse: Ansis;
export declare const hidden: Ansis;
export declare const visible: Ansis;

// styles
export declare const bold: Ansis;
export declare const dim: Ansis;
export declare const faint: Ansis;
export declare const italic: Ansis;
export declare const underline: Ansis;
export declare const doubleUnderline: Ansis;
export declare const strikethrough: Ansis;
export declare const strike: Ansis;
export declare const frame: Ansis;
export declare const encircle: Ansis;
export declare const overline: Ansis;

// foreground colors
export declare const black: Ansis;
export declare const red: Ansis;
export declare const green: Ansis;
export declare const yellow: Ansis;
export declare const blue: Ansis;
export declare const magenta: Ansis;
export declare const cyan: Ansis;
export declare const white: Ansis;
export declare const gray: Ansis;
export declare const grey: Ansis;
export declare const blackBright: Ansis;
export declare const redBright: Ansis;
export declare const greenBright: Ansis;
export declare const yellowBright: Ansis;
export declare const blueBright: Ansis;
export declare const magentaBright: Ansis;
export declare const cyanBright: Ansis;
export declare const whiteBright: Ansis;

// background colors
export declare const bgBlack: Ansis;
export declare const bgRed: Ansis;
export declare const bgGreen: Ansis;
export declare const bgYellow: Ansis;
export declare const bgBlue: Ansis;
export declare const bgMagenta: Ansis;
export declare const bgCyan: Ansis;
export declare const bgWhite: Ansis;
export declare const bgBlackBright: Ansis;
export declare const bgRedBright: Ansis;
export declare const bgGreenBright: Ansis;
export declare const bgYellowBright: Ansis;
export declare const bgBlueBright: Ansis;
export declare const bgMagentaBright: Ansis;
export declare const bgCyanBright: Ansis;
export declare const bgWhiteBright: Ansis;
