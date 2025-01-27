// color spaces
export const SPACE_UNDEFINED = -1;
export const SPACE_BW = 0;
export const SPACE_16COLORS = 1;
export const SPACE_256COLORS = 2;
export const SPACE_TRUECOLOR = 3;

// color space descriptions used in the benchmark
export const colorSpaces = {};

colorSpaces[SPACE_BW] = 'black and white';
colorSpaces[SPACE_16COLORS] = '16 colors';
colorSpaces[SPACE_256COLORS] = '256 colors';
colorSpaces[SPACE_TRUECOLOR] = 'truecolor';
