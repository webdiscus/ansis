import { Ansis } from './index';

export declare function ansi256(code: number): Ansis;
export declare function ansi(code: number): Ansis;
export declare function fg(code: number): Ansis;
export declare function bgAnsi256(code: number): Ansis;
export declare function bgAnsi(code: number): Ansis;
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
