/**
 * Note: This d.ts file is optimized for a small size to keep the npm package as small as possible.
 */

/**
 * Base ANSI Styles
 */
type AnsiStyles =
  | 'reset' /** Reset the current style. */
  | 'inverse' /** Invert background and foreground colors. */
  | 'hidden' /** Print the invisible text. */
  | 'visible' /** Print visible text without ANSI styling. */
  | 'bold' /** <b>Bold</b> style (high intensity). */
  | 'dim' /** Faint style (low intensity or dim). */
  | 'italic' /** <i>Italic</i> style. (Not widely supported) */
  | 'underline' /** Underline style. (Not widely supported) */
  | 'strikethrough' /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. (Not widely supported) */
  | 'strike' /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. (Not widely supported) Alias for `strikethrough`. */;

// BasicColors
type BC = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey';

// BrightColors
type BBC = `${BC}Bright`;

/**
 * Base ANSI Colors
 * 4515
 * 3713
 * 3263; 4515 - 3263 = 1252
 * 3228; 4515 - 3228 = 1287
 * 3161; 4515 - 3161 = 1354
 * 3148; 4515 - 3148 = 1367 => 8.97 kB - beta.0
 *
 * 2611; 4515 - 2611 = 1904 => 8.4 kB
 * 2492; 4515 - 2492 = 2023 => 8.3 kB
 * 2244; 4515 - 2244 = 2271 => 8.1 kB
 * 2201; 4515 - 2201 = 2314 => 8.0 kB
 */
type AnsiColors =
  | BC
  | BBC
  | `bg${Capitalize<BC>}`
  | `bg${Capitalize<BBC>}`;

// Short alias for Ansis
type AC = AnsiColors;

type AnsiColorsExtend<T extends string> = AC | (T & Record<never, never>);

// Dynamic properties mapped to `Ansis` (DynamicProperties)
type DP = {
  [K in AnsiStyles | AC]: A;
};

// Static properties and methods (StaticMethods)
type SP = {
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

  (strings: TemplateStringsArray, ...values: any[]): string;

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
  ansi256(code: number): A;

  /**
   * Alias for ansi256.
   *
   * @param {number} code in range [0, 255].
   */
  fg(code: number): A;

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
  bgAnsi256(code: number): A;

  /**
   * Alias for bgAnsi256.
   *
   * @param {number} code in range [0, 255].
   */
  bg(code: number): A;

  /**
   * Set RGB values for foreground color.
   *
   * @param {number} r The red value, in range [0, 255].
   * @param {number} g The green value, in range [0, 255].
   * @param {number} b The blue value, in range [0, 255].
   */
  rgb(r: number, g: number, b: number): A;

  /**
   * Set RGB values for background color.
   *
   * @param {number} r The red value, in range [0, 255].
   * @param {number} g The green value, in range [0, 255].
   * @param {number} b The blue value, in range [0, 255].
   */
  bgRgb(r: number, g: number, b: number): A;

  /**
   * Set HEX value for foreground color.
   *
   * @param {string} hex
   */
  hex(hex: string): A;

  /**
   * Set HEX value for background color.
   *
   * @param {string} hex
   */
  bgHex(hex: string): A;

  /**
   * Remove ANSI styling codes.
   *
   * @param {string} str
   * @return {string}
   */
  strip(str: string): string;

  /**
   * Extends the current `Ansis` instance with additional colors.
   * Reserved as working example with return.
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
  //extend<U extends string>(colors: Record<U, string | { open: string; close: string }>): InstanceType<typeof Ansis> & Record<U, Ansis>;

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
  extend<U extends string>(colors: Record<U, string | { open: string; close: string }>): asserts this is InstanceType<typeof Ansis> & Record<U, A>;

  /** The ANSI escape sequences for starting the current style. */
  open: string;

  /** The ANSI escape sequences for ending the current style. */
  close: string;
};

// Combine dynamic and static properties
type Ansis = SP & DP;
// Short alias for Ansis
type A = Ansis;

declare const Ansis: new () => A,
  ansi256: (code: number) => A,
  bgAnsi256: (code: number) => A,
  fg: (code: number) => A,
  bg: (code: number) => A,
  rgb: (r: number, g: number, b: number) => A,
  bgRgb: (r: number, g: number, b: number) => A,
  hex: (code: string) => A,
  bgHex: (code: string) => A,

  ansis: A,

  // Base styles
  reset: A,
  inverse: A,
  hidden: A,
  visible: A,

  // Text styles
  bold: A,
  dim: A,
  italic: A,
  underline: A,
  strikethrough: A,
  strike: A,

  // Foreground colors
  black: A,
  red: A,
  green: A,
  yellow: A,
  blue: A,
  magenta: A,
  cyan: A,
  white: A,
  gray: A,
  grey: A,
  blackBright: A,
  redBright: A,
  greenBright: A,
  yellowBright: A,
  blueBright: A,
  magentaBright: A,
  cyanBright: A,
  whiteBright: A,

  // Background colors
  bgBlack: A,
  bgRed: A,
  bgGreen: A,
  bgYellow: A,
  bgBlue: A,
  bgMagenta: A,
  bgCyan: A,
  bgWhite: A,
  bgBlackBright: A,
  bgRedBright: A,
  bgGreenBright: A,
  bgYellowBright: A,
  bgBlueBright: A,
  bgMagentaBright: A,
  bgCyanBright: A,
  bgWhiteBright: A;

// Named exports
export {
  // note for me in feature: AnsiColors, AnsiStyles and AnsiColorsExtend types used in many project on GitHub, don't remove it!
  type AnsiColors,
  type AnsiStyles,
  type AnsiColorsExtend,
  ansis as default,
  Ansis,
  ansi256,
  fg,
  bgAnsi256,
  bg,
  rgb,
  bgRgb,
  hex,
  bgHex,
  reset,
  inverse,
  hidden,
  visible,
  bold,
  dim,
  italic,
  underline,
  strikethrough,
  strike,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  grey,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright,
};
