import { expect, describe, test } from 'vitest';

import { hexToRgb, rgbToAnsi256, ansi256To16 } from '../../src/color-math.js';

let rgbToAnsi16 = (r, g, b) => ansi256To16(rgbToAnsi256(r, g, b));

describe('convert HEX to RGB', () => {
  test(`hexToRgb('FFAA99')`, () => {
    const received = hexToRgb('FFAA99');
    const expected = [255, 170, 153];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('#FFAA99')`, () => {
    const received = hexToRgb('#FFAA99');
    const expected = [255, 170, 153];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('#FA9')`, () => {
    const received = hexToRgb('#FA9');
    const expected = [255, 170, 153];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('#000')`, () => {
    const received = hexToRgb('#000');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('#000000')`, () => {
    const received = hexToRgb('#000000');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`invalid hexToRgb('#F')`, () => {
    const received = hexToRgb('#F');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`invalid hexToRgb('#F8')`, () => {
    const received = hexToRgb('#F8');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`invalid hexToRgb('#FF88')`, () => {
    const received = hexToRgb('#FF88');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`invalid hexToRgb('#FF88E')`, () => {
    const received = hexToRgb('#FF88E');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });

  test(`hexToRgb('invalid')`, () => {
    const received = hexToRgb('invalid');
    const expected = [0, 0, 0];
    expect(expected).toEqual(received);
  });
});

describe('convert RGB to ANSI 256', () => {
  test(`rgbToAnsi256(7, 7, 7) lowest grayscale`, () => {
    const received = rgbToAnsi256(7, 7, 7);
    const expected = 16;
    expect(expected).toEqual(received);
  });

  test(`rgbToAnsi256(249, 249, 249) highest grayscale`, () => {
    const received = rgbToAnsi256(249, 249, 249);
    const expected = 231;
    expect(expected).toEqual(received);
  });

  test(`rgbToAnsi256(127, 127, 127) grayscale`, () => {
    const received = rgbToAnsi256(127, 127, 127);
    const expected = 244;
    expect(expected).toEqual(received);
  });

  test(`rgbToAnsi256(16, 16, 16) grayscale`, () => {
    const received = rgbToAnsi256(15, 15, 15);
    const expected = 233;
    expect(expected).toEqual(received);
  });

  test(`rgbToAnsi256(127, 63, 63) color`, () => {
    const received = rgbToAnsi256(200, 16, 16);
    const expected = 160;
    expect(expected).toEqual(received);
  });
});

describe('convert ANSI 256 to ANSI 16', () => {
  // Reference table: index is the ANSI 256-color code (0..255),
  // value is the expected ANSI 16-color SGR foreground code (30..37, 90..97).
  const expected = [
    30, 31, 32, 33, 34, 35, 36, 37, 90, 91, 92, 93, 94, 95, 96, 97, 30, 30, 30, 34, 34, 94, 30, 30, 30, 34, 34, 94, 30, 30, 30, 34, 34, 94, 32, 32, 32, 36, 36, 96, 32, 32, 32, 36,
    36, 96, 92, 92, 92, 96, 96, 96, 30, 30, 30, 34, 34, 94, 30, 30, 30, 34, 34, 94, 30, 30, 30, 34, 34, 94, 32, 32, 32, 36, 36, 96, 32, 32, 32, 36, 36, 96, 92, 92, 92, 96, 96, 96,
    30, 30, 30, 34, 34, 94, 30, 30, 30, 34, 34, 94, 30, 30, 30, 34, 34, 94, 32, 32, 32, 36, 36, 96, 32, 32, 32, 36, 36, 96, 92, 92, 92, 96, 96, 96, 31, 31, 31, 35, 35, 95, 31, 31,
    31, 35, 35, 95, 31, 31, 31, 35, 35, 95, 33, 33, 33, 37, 37, 97, 33, 33, 33, 37, 37, 97, 93, 93, 93, 97, 97, 97, 31, 31, 31, 35, 35, 95, 31, 31, 31, 35, 35, 95, 31, 31, 31, 35,
    35, 95, 33, 33, 33, 37, 37, 97, 33, 33, 33, 37, 37, 97, 93, 93, 93, 97, 97, 97, 91, 91, 91, 95, 95, 95, 91, 91, 91, 95, 95, 95, 91, 91, 91, 95, 95, 95, 93, 93, 93, 97, 97, 97,
    93, 93, 93, 97, 97, 97, 93, 93, 93, 97, 97, 97, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37,
  ];

  test('reference table covers all 256 codes', () => {
    expect(expected).toHaveLength(256);
  });

  for (let code = 0; code < 256; code++) {
    test(`code ${code} -> ${expected[code]}`, () => {
      expect(ansi256To16(code)).toBe(expected[code]);
    });
  }
});

describe('convert RGB to ANSI 16', () => {
  test(`redBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#ff6e67'));
    const expected = 91;
    expect(expected).toEqual(received);
  });

  test(`red`, () => {
    const received = rgbToAnsi16(...hexToRgb('#c91b00'));
    const expected = 31;
    expect(expected).toEqual(received);
  });

  test(`blue`, () => {
    const received = rgbToAnsi16(...hexToRgb('#0225c7'));
    const expected = 34;
    expect(expected).toEqual(received);
  });

  test(`blueBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#6871ff'));
    const expected = 94;
    expect(expected).toEqual(received);
  });

  test(`green`, () => {
    const received = rgbToAnsi16(...hexToRgb('#00c200'));
    const expected = 32;
    expect(expected).toEqual(received);
  });

  test(`greenBright`, () => {
    const received = rgbToAnsi16(...hexToRgb('#5ffa68'));
    const expected = 92;
    expect(expected).toEqual(received);
  });
});