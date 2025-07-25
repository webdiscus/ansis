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

// BasicColors
type C = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

// BrightColors
type H = `${C}Bright`;

/**
 * Base ANSI Colors
 */
export type AnsiColors =
  | 'black' | C | 'gray' | H
  | `bg${'Black' | Capitalize<C> | 'Gray' | Capitalize<H>}`;

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

/**
 * Set ANSI code.
 *
 * @param {number} n The number in range [0, 255].
 *
 * @return {Ansis}
 */
type Q = (n: N) => A;

/**
 * Set HEX value.
 *
 * @param {string} s The hex value.
 *
 * @return {Ansis}
 */
type L = (s: S) => A;

/**
 * Set RGB values.
 *
 * @param {number} r The red value, in range [0, 255].
 * @param {number} g The green value, in range [0, 255].
 * @param {number} b The blue value, in range [0, 255].
 *
 * @return {Ansis}
 */
type R = (r: N, g: N, b: N) => A;

// Short alias
type A = Ansis;

type Ansis = {
    /**
     * Color support level.
     * Automatically detected by default.
     *
     * Levels:
     * 0 – No color (black & white)
     * 1 – Basic ANSI (16 colors)
     * 2 – Extended ANSI (256 colors)
     * 3 – Truecolor (24-bit RGB)
     *
     * @readonly
     */
    level: N;

    /**
     * Opening ANSI escape code for a style or color.
     */
    open: S;

    /**
     * Closing ANSI escape code for a style or color.
     */
    close: S;

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
     * Set [256-color ANSI code](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) for foreground color.
     */
    fg: Q;

    /**
     * Set [256-color ANSI code](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) for background color.
     */
    bg: Q;

    /**
     * Set RGB for foreground color.
     */
    rgb: R;

    /**
     * Set RGB for background color.
     */
    bgRgb: R;

    /**
     * Set HEX value for foreground color.
     */
    hex: L;

    /**
     * Set HEX value for background color.
     */
    bgHex: L;

    /**
     * Whether the output supports ANSI color and styles.
     *
     * @return {boolean}
     */
    isSupported(): boolean;

    /**
     * Remove ANSI styling codes.
     *
     * @param {string} s
     * @return {string}
     */
    strip(s: S): S;

    /**
     * Extends Ansis with additional colors.
     *
     * For example:
     *
     * const myTheme = {
     *   apple: '#4FA83D',
     *   pink: '#FF75D1',
     * };
     *
     * const custom = ansis.extend(myTheme);
     *
     * @param {string | { open: string; close: string }} c A record of new colors to add, with either a string or an object containing `open` and `close` sequences.
     * @return {Ansis} Return extended instance.
     */
    extend<U extends S>(c: Record<U, S | { open: S; close: S }>): A & Record<U, A>;
  }
  // Dynamic properties
  & { [K in AnsiStyles | AnsiColors]: A };

// Note: define constants with only unique declarations,
// E.g. the methods rgb and bgRgb have the same arguments and return, therefore we need it only once.

declare const
  /**
   * @param {number?} n The color level: 0 - no colors, 1 - 16 colors, 2 - 256 colors, 3 - truecolor. Defaults is auto detected.
   */
  Ansis: new (n?: N) => A,
  // declare all styles and colors of type Ansis
  a: A,
  fg: Q,
  rgb: R,
  hex: L;

// Named exports
export {
  a as default,
  Ansis,
  fg,
  fg as bg,
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
  a as redBright,
  a as greenBright,
  a as yellowBright,
  a as blueBright,
  a as magentaBright,
  a as cyanBright,
  a as whiteBright,

  // Background colors
  a as bgBlack,
  a as bgRed,
  a as bgGreen,
  a as bgYellow,
  a as bgBlue,
  a as bgMagenta,
  a as bgCyan,
  a as bgWhite,
  a as bgGray,
  a as bgRedBright,
  a as bgGreenBright,
  a as bgYellowBright,
  a as bgBlueBright,
  a as bgMagentaBright,
  a as bgCyanBright,
  a as bgWhiteBright,
};
