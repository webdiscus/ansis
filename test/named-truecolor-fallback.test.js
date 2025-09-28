import { describe, test, expect, vi } from 'vitest';

import colorNames from 'css-color-names';
import { Ansis } from 'ansis';

describe('fallback named colors', () => {
  const ansis16m = new Ansis(3); // force init with truecolor
  const ansis256 = new Ansis(2); // force init with 256 colors
  const ansis16 = new Ansis(1); // force init with 16 colors
  const ansisBW = new Ansis(0); // force init with black & white

  test('original orange color', async () => {
    const color = ansis16m.extend(colorNames);
    const received = color.orange('orange');
    const expected = '[38;2;255;165;0morange[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('original bgOrange color', async () => {
    const color = ansis16m.extend(colorNames);
    const received = color.bgOrange('orange');
    const expected = '[48;2;255;165;0morange[49m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('fallback orange to 256 colors', async () => {
    const color = ansis256.extend(colorNames);
    const received = color.orange('orange');
    const expected = '[38;5;214morange[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('fallback bgOrange to 256 colors', async () => {
    const color = ansis256.extend(colorNames);
    const received = color.bgOrange('orange');
    const expected = '[48;5;214morange[49m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('fallback orange to 16 colors', async () => {
    const color = ansis16.extend(colorNames);
    const received = color.orange('orange');
    const expected = '[93morange[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('fallback bgOrange to 16 colors', async () => {
    const color = ansis16.extend(colorNames);
    const received = color.bgOrange('orange');
    const expected = '[103morange[49m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('fallback orange to BW colors', async () => {
    const color = ansisBW.extend(colorNames);
    const received = color.orange('orange');
    const expected = 'orange';
    expect(received).toEqual(expected);
  });

  test('fallback bgOrange to BW colors', async () => {
    const color = ansisBW.extend(colorNames);
    const received = color.bgOrange('orange');
    const expected = 'orange';
    expect(received).toEqual(expected);
  });
});