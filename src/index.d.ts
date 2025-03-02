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
  | 'strikethrough' /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. (Not widely supported) */;

// BasicColors
type BC = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

// BrightColors
type BBC = `${BC}Bright`;

/**
 * Base ANSI Colors
 */
type AnsiColors =
  | BC
  | 'gray' | 'grey'
  | BBC
  | `bg${Capitalize<BC>}`
  | `bg${Capitalize<BBC>}`
  | 'bgGray' | 'bgGrey';

// Short alias for Ansis
type AC = AnsiColors;

type AnsiColorsExtend<T extends string> = AC | (T & Record<never, never>);

// Dynamic properties mapped to `Ansis` (DynamicProperties)
type DP = {
  [K in AnsiStyles | AC]: A;
};

// Static properties and methods (StaticMethods)
// Compatibility note:
// - typescript <= 5.5: The `this` can be used within a method of an `interface`.
// - typescript >= 5.6: The `this` can be used within a method of a `type`.
interface SP {
  (value: unknown): string;

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
   * @param {number} n in range [0, 255].
   */
  ansi256(n: number): A;

  /**
   * Alias for ansi256.
   *
   * @param {number} n in range [0, 255].
   */
  fg(n: number): A;

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
   * @param {number} n in range [0, 255].
   */
  bgAnsi256(n: number): A;

  /**
   * Alias for bgAnsi256.
   *
   * @param {number} n in range [0, 255].
   */
  bg(n: number): A;

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
   * @param {string} s
   * @return {string}
   */
  strip(s: string): string;

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
   * // it works w/o return too:
   * // ansis.extend(myTheme);
   * // const { apple, pink, red } = ansis;
   *
   * @param colors A record of new colors to add, with either a string or an object containing `open` and `close` sequences.
   * @returns An instance of `Ansis` with the extended colors available as properties.
   */
  extend<U extends string>(colors: Record<U, string | { open: string; close: string }>): asserts this is InstanceType<typeof Ansis> & Record<U, A>;

  /**
   * Whether the output supports ANSI color and styles.
   *
   * @return {boolean}
   */
  isSupported(): boolean;

  /** The ANSI escape sequences for starting the current style. */
  open: string;

  /** The ANSI escape sequences for ending the current style. */
  close: string;
}

// Combine dynamic and static properties
type Ansis = SP & DP;

// Short alias for Ansis
type A = Ansis;

// Note: define constants with only unique declarations,
// E.g. the methods rgb and bgRgb have the same arguments and return, therefore we need it only once.
declare const Ansis: new () => A,
  isSupported: () => boolean,
  strip: SP["strip"],
  extend: SP["extend"],

  fg: SP["fg"],
  rgb: SP["rgb"],
  hex: SP["hex"],

  // declare all styles and colors of type Ansis
  a: A;

// Named exports
export {
  // note: AnsiColors, AnsiStyles and AnsiColorsExtend types used in many project on GitHub, don't remove it!
  type AnsiColors,
  type AnsiStyles,
  type AnsiColorsExtend,
  a as default,
  Ansis,

  // exporting these methods is required if the `module` compiler option is `node16,
  // otherwise the TS compiler can't find they in default import:
  // import ansis from 'ansis';
  // ansis.strip(text); // <= TS2339: Property strip does not exist on type
  isSupported,
  strip,
  extend,

  fg,
  fg as bg,
  fg as ansi256,
  fg as bgAnsi256,
  rgb,
  rgb as bgRgb,
  hex,
  hex as bgHex,

  // Base styles
  a as reset,
  a as inverse,
  a as hidden,
  a as visible,
  a as bold,
  a as dim,
  a as italic,
  a as underline,
  a as strikethrough,

  // Foreground colors
  a as black,
  a as red,
  a as green,
  a as yellow,
  a as blue,
  a as magenta,
  a as cyan,
  a as white,
  a as gray,
  a as grey,
  a as blackBright,
  a as redBright,
  a as greenBright,
  a as yellowBright,
  a as blueBright,
  a as magentaBright,
  a as cyanBright,
  a as whiteBright,

  // Background colors
  a as bgBlack,
  a as bgGray,
  a as bgGrey,
  a as bgRed,
  a as bgGreen,
  a as bgYellow,
  a as bgBlue,
  a as bgMagenta,
  a as bgCyan,
  a as bgWhite,
  a as bgBlackBright,
  a as bgRedBright,
  a as bgGreenBright,
  a as bgYellowBright,
  a as bgBlueBright,
  a as bgMagentaBright,
  a as bgCyanBright,
  a as bgWhiteBright,
};
