import { expect, describe, test } from 'vitest';

//import ansis from '../src/index.mjs'; // for debugging only
import ansis from 'ansis';
import { hexToRgb, rgbToAnsi256, ansi256To16 } from '../src/utils.js';

// output testing version
import('./utils/version.js');

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
  test(`black`, () => {
    const received = ansi256To16(0);
    const expected = 30;
    expect(expected).toEqual(received);
  });

  test(`white`, () => {
    const received = ansi256To16(7);
    const expected = 37;
    expect(expected).toEqual(received);
  });

  test(`whiteBright`, () => {
    const received = ansi256To16(15);
    const expected = 97;
    expect(expected).toEqual(received);
  });

  test(`ansi256To16(232) -> black`, () => {
    const received = ansi256To16(233);
    const expected = 30;
    expect(expected).toEqual(received);
  });

  test(`redBright`, () => {
    const received = ansi256To16(196);
    const expected = 91;
    expect(expected).toEqual(received);
  });

  test(`red`, () => {
    const received = ansi256To16(124);
    const expected = 31;
    expect(expected).toEqual(received);
  });

  test(`blue`, () => {
    const received = ansi256To16(20);
    const expected = 34;
    expect(expected).toEqual(received);
  });

  test(`blueBright`, () => {
    const received = ansi256To16(27);
    const expected = 94;
    expect(expected).toEqual(received);
  });

  test(`green`, () => {
    const received = ansi256To16(34);
    const expected = 32;
    expect(expected).toEqual(received);
  });

  test(`greenBright`, () => {
    const received = ansi256To16(82);
    const expected = 92;
    expect(expected).toEqual(received);
  });
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

describe('strip ANSI codes', () => {
  test(`red`, () => {
    const received = ansis.strip('Hello \x1b[31mWorld\x1b[0m!');
    const expected = 'Hello World!';
    expect(received).toEqual(expected);
  });

  test(`red.bold.underline`, () => {
    //const str = ansis.red.bold.underline('red.bold.underline');
    const str = '[31m[1m[4mred.bold.underline[24m[22m[39m';
    const received = ansis.strip(str);
    const expected = 'red.bold.underline';
    expect(received).toEqual(expected);
  });

  test(`foo red bar bold baz`, () => {
    //const str = `foo ${ansis.red`red`} bar ${ansis.bold`bold`} baz`;
    const str = 'foo [31mred[39m bar [1mbold[22m baz';
    const received = ansis.strip(str);
    const expected = 'foo red bar bold baz';
    expect(received).toEqual(expected);
  });
});