// color levels
export const LEVEL_UNDEFINED = -1;
export const LEVEL_BW = 0;
export const LEVEL_16COLORS = 1;
export const LEVEL_256COLORS = 2;
export const LEVEL_TRUECOLOR = 3;

// color level descriptions used in the benchmark
export const colorLevels = {};

colorLevels[LEVEL_BW] = 'black and white';
colorLevels[LEVEL_16COLORS] = '16 colors';
colorLevels[LEVEL_256COLORS] = '256 colors';
colorLevels[LEVEL_TRUECOLOR] = 'truecolor';
