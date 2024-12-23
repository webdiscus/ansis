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
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'strike'
  );


// BasicColors
type BC = | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey';

// BrightColors
type BBC = `${BC}Bright`;

/**
 * Base ANSI Colors
 */
type AnsiColors =
  | BC
  | BBC
  | `bg${Capitalize<BC>}`
  | `bg${Capitalize<BBC>}`;

type AnsiColorsExtend<T extends string> = AnsiColors | (T & Record<never, never>);

interface Ansis {
  /**
   * Whether the output supports ANSI color and styles.
   *
   * @return {boolean}
   */
  isSupported(): boolean;

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
  ansi256(code: number): this;

  /**
   * Alias for ansi256.
   *
   * @param {number} code in range [0, 255].
   */
  fg(code: number): this;

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
  bgAnsi256(code: number): this;

  /**
   * Alias for bgAnsi256.
   *
   * @param {number} code in range [0, 255].
   */
  bg(code: number): this;

  /**
   * Set RGB values for foreground color.
   *
   * @param {number} red The red value, in range [0, 255].
   * @param {number} green The green value, in range [0, 255].
   * @param {number} blue The blue value, in range [0, 255].
   */
  rgb(red: number, green: number, blue: number): this;

  /**
   * Set RGB values for background color.
   *
   * @param {number} red The red value, in range [0, 255].
   * @param {number} green The green value, in range [0, 255].
   * @param {number} blue The blue value, in range [0, 255].
   */
  bgRgb(red: number, green: number, blue: number): this;

  /**
   * Set HEX value for foreground color.
   *
   * @param {string} hex
   */
  hex(hex: string): this;

  /**
   * Set HEX value for background color.
   *
   * @param {string} hex
   */
  bgHex(hex: string): this;

  /**
   * Remove ANSI styling codes.
   *
   * @param {string} str
   * @return {string}
   */
  strip(str: string): string;

  /**
   * Extends the current `Ansis` instance with additional colors.
   *
   * For example:
   *
   * const myTheme = {
   *   apple: '#4FA83D',
   *   pink: '#FF75D1',
   * };
   * const customAnsis = ansis.extend(myTheme);
   * const { apple, pink, red } = customAnsis;
   *
   * @param colors A record of new colors to add, with either a string or an object containing `open` and `close` sequences.
   * @returns An instance of `Ansis` with the extended colors available as properties.
   */
  //extend<U extends string>(colors: Record<U, string | { open: string; close: string }>): this & Record<U, this>;

  /**
   * Extends the current `Ansis` instance with additional colors.
   *
   * For example:
   *
   * const myTheme = {
   *   apple: '#4FA83D',
   *   pink: '#FF75D1',
   * };
   * ansis.extend(myTheme);
   * const { apple, pink, red } = ansis;
   *
   * @param colors A record of new colors to add, with either a string or an object containing `open` and `close` sequences.
   */
  extend<U extends string>(colors: Record<U, string | { open: string; close: string }>): asserts this is this & Record<U, this>;

  /** The ANSI escape sequences for starting the current style. */
  open: string;

  /** The ANSI escape sequences for ending the current style. */
  close: string;

  /** Reset the current style. */
  reset: this;

  /** Invert background and foreground colors. */
  inverse: this;

  /** Print the invisible text. */
  hidden: this;

  /** Print visible text without ANSI styling. */
  visible: this;

  /** <b>Bold</b> style (high intensity). */
  bold: this;

  /** Faint style (low intensity or dim). */
  dim: this;

  /** <i>Italic</i> style. (Not widely supported) */
  italic: this;

  /** U̲n̲d̲e̲r̲l̲i̲n̲e̲ style. (Not widely supported) */
  underline: this;

  /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. (Not widely supported) */
  strikethrough: this;

  /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. (Not widely supported) Alias for `strikethrough`. */
  strike: this;

  // Colors
  black: this;
  red: this;
  green: this;
  yellow: this;
  blue: this;
  magenta: this;
  cyan: this;
  white: this;
  grey: this;
  gray: this; // Alias for grey
  blackBright: this;
  redBright: this;
  greenBright: this;
  yellowBright: this;
  blueBright: this;
  magentaBright: this;
  cyanBright: this;
  whiteBright: this;

  // Background colors
  bgBlack: this;
  bgRed: this;
  bgGreen: this;
  bgYellow: this;
  bgBlue: this;
  bgMagenta: this;
  bgCyan: this;
  bgWhite: this;
  bgGrey: this;
  bgGray: this; // Alias for bgGrey
  bgBlackBright: this;
  bgRedBright: this;
  bgGreenBright: this;
  bgYellowBright: this;
  bgBlueBright: this;
  bgMagentaBright: this;
  bgCyanBright: this;
  bgWhiteBright: this;
}

declare const ansis: Ansis;

export {
  type AnsiColors,
  type AnsiColorsExtend,
  type AnsiStyles,
  ansis as default,
};

export declare const Ansis: new () => Ansis;

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
export declare const italic: Ansis;
export declare const underline: Ansis;
export declare const strikethrough: Ansis;
export declare const strike: Ansis;

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
