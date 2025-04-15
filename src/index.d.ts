/**
 * Note: This d.ts file is optimized for a small size to keep the npm package as small as possible.
 */

/**
 * Primitive type aliases for size optimization.
 *
 * Ansis is a very small library, intentionally optimized for minimal package size.
 * Since its API uses only simple, predictable function signatures with primitive types (number, string, boolean),
 * we define short aliases for frequently used types.
 *
 * Benefits:
 * - The smaller `.d.ts` file reduces the package size.
 * - The TypeScript compiler treats them exactly as the native types with no perf difference.
 * - The TypeScript compiler cares only about structure, not formatting.
 * - In TypeScript, the whitespace in type definitions is not significant.
 * - Given the simplicity of the API, the tradeoff in readability is acceptable.
 *
 * Example:
 *   rgb(r: N, g: N, b: N): A
 *   // is equivalent to:
 *   rgb(r: number, g: number, b: number): Ansis
 */
type N = number;
type S = string;
type B = boolean;

// BasicColors
type C = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

// BrightColors
type BC = `${C}Bright`;

/**
 * Base ANSI Colors
 */
export type AnsiColors =
  | C
  | 'gray' | 'grey'
  | BC
  | `bg${Capitalize<C> | Capitalize<BC>}`
  | 'bgGray' | 'bgGrey';

/**
 * Base ANSI Styles
 */
export type AnsiStyles =
  | 'reset' /** Reset the current style. */
  | 'inverse' /** Invert background and foreground colors. */
  | 'hidden' /** Print the invisible text. */
  | 'visible' /** Print visible text without ANSI styling. */
  | 'bold' /** <b>Bold</b> style (high intensity). */
  | 'dim' /** Faint style (low intensity or dim). */
  | 'italic' /** <i>Italic</i> style. (Not widely supported) */
  | 'underline' /** Underline style. (Not widely supported) */
  | 'strikethrough' /** S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ style. (Not widely supported) */;

// Note: AnsiColors, AnsiStyles and AnsiColorsExtend types used in many project on GitHub, don't remove it!
export type AnsiColorsExtend<T extends S> = AC | (T & Record<never, never>);

// Short alias for Ansis
type AC = AnsiColors;

// Dynamic properties mapped to `Ansis` (DynamicProperties)
type DP = {
  [K in AnsiStyles | AC]: A;
};

// Static properties and methods (StaticMethods)
// Compatibility note:
// - TypeScript <= 5.5: The `this` can be used within a method of an `interface` only.
// - TypeScript >= 5.6: The `this` can be used within a method of an `interface` or a `type`.
interface SP {
  /**
   * @param {unknown} v The value to be processed, can be of any type, which will be converted to a string.
   * @return {string} The resulting string.
   */
  (v: unknown): S;

  /**
   * Processes a template string with embedded values and returns a string.
   *
   * This method allows you to use template strings with embedded expressions.
   * It takes a `TemplateStringsArray` and an arbitrary number of `values`,
   * which are interpolated into the string and returned as a result.
   *
   * @param {TemplateStringsArray} s The template literal string array.
   * @param {any[]} v The values to be interpolated into the template string.
   * @return {string} The resulting string.
   */
  (s: TemplateStringsArray, ...v: any[]): S;

  /**
   * Whether the output supports ANSI color and styles.
   *
   * @return {boolean}
   */
  isSupported(): B;

  /**
   * Remove ANSI styling codes.
   *
   * @param {string} s
   * @return {string}
   */
  strip(s: S): S;

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
  ansi256(n: N): A;

  /**
   * Alias for ansi256.
   *
   * @param {number} n in range [0, 255].
   */
  fg(n: N): A;

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
  bgAnsi256(n: N): A;

  /**
   * Alias for bgAnsi256.
   *
   * @param {number} n in range [0, 255].
   */
  bg(n: N): A;

  /**
   * Set RGB values for foreground color.
   *
   * @param {number} r The red value, in range [0, 255].
   * @param {number} g The green value, in range [0, 255].
   * @param {number} b The blue value, in range [0, 255].
   */
  rgb(r: N, g: N, b: N): A;

  /**
   * Set RGB values for background color.
   *
   * @param {number} r The red value, in range [0, 255].
   * @param {number} g The green value, in range [0, 255].
   * @param {number} b The blue value, in range [0, 255].
   */
  bgRgb(r: N, g: N, b: N): A;

  /**
   * Set HEX value for foreground color.
   *
   * @param {string} s The hex value.
   */
  hex(s: S): A;

  /**
   * Set HEX value for background color.
   *
   * @param {string} s The hex value.
   */
  bgHex(s: S): A;

  /**
   * Extends the current `Ansis` instance with additional colors.
   *
   * For example:
   *
   * const myTheme = {
   *   apple: '#4FA83D',
   *   pink: '#FF75D1',
   * };
   *
   * It works w/o return:
   * ansis.extend(myTheme);
   * const { apple, pink, red } = ansis;
   *
   * @param c A record of new colors to add, with either a string or an object containing `open` and `close` sequences.
   * @return void.
   */
  extend<U extends S>(c: Record<U, S | P>): asserts this is A & Record<U, A>;
}

/**
 * The ANSI escape sequences for starting and ending the current style.
 */
type P = { open: S; close: S };

// Combine static and dynamic properties
type A = SP & DP & P;

// Named alias for "A" type (Don't remove it!)
type Ansis = A;

// Note: define constants with only unique declarations,
// E.g. the methods rgb and bgRgb have the same arguments and return, therefore we need it only once.

declare const
  /**
   * @param {number?} level The color level: 0 - no colors, 1 - 16 colors, 2 - 256 colors, 3 - truecolor. Defaults is auto detected.
   */
  Ansis: new (level?: N) => A,
  // declare all styles and colors of type Ansis
  a: A,
  isSupported: () => B,
  strip: (s: S) => S,
  extend: A['extend'],

  fg: A['fg'],
  rgb: A['rgb'],
  hex: A['hex'];

// Named exports
export {
  a as default,
  Ansis,

  // Exporting these methods is required if the `module` compiler option is `node16,
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
