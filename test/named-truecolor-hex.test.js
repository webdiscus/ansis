import { describe, test, expect, vi } from 'vitest';

import colorNames from 'css-color-names';
import ansis, { Ansis } from 'ansis';

// truecolor level
const level = 3;

// mock ansis to ensure it always uses the required colorNames level,
// independent of what would be auto-detected
vi.mock('ansis', async () => {
  const { Ansis } = await vi.importActual('ansis');
  const ansis = new Ansis(3); // force init with level
  return { default: ansis, Ansis }
});

describe('use colorNames name with ansis.hex()', () => {
  test('simple', async () => {
    // colorNames.pink => #ffc0cb
    const received = ansis.hex(colorNames.pink)('Pink via HEX');
    const expected = '[38;2;255;192;203mPink via HEX[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('helper', async () => {
    const truecolor = (name) => {
      const hex = colorNames[name.toLowerCase()];
      if (!hex) throw new Error(`unknown color: ${name}`);
      return ansis.hex(hex);
    };

    const received = truecolor('Orange').underline('Orange via HEX');
    const expected = '[38;2;255;165;0m[4mOrange via HEX[24m[39m';

    console.log(received);
    expect(received).toEqual(expected);
  });

  test('single extended colorNames via new instance', async () => {
    const ansis = new Ansis(level).extend(colorNames);
    const received = ansis.pink('Pink');
    const expected = '[38;2;255;192;203mPink[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('single extended colorNames', async () => {
    const color = ansis.extend(colorNames);
    const received = color.pink('Pink');
    const expected = '[38;2;255;192;203mPink[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('single styled extended colorNames', async () => {
    const ansis = new Ansis(level).extend(colorNames);
    const received = ansis.pink.underline('Pink');
    const expected = '[38;2;255;192;203m[4mPink[24m[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('print all named truecolor', async () => {
    const ansis = new Ansis(level).extend(colorNames);
    const names = Object.keys(colorNames);
    const received = names.map((name) => ansis[name](name)).join('\n');

    console.log(received);

    expect(received).toMatchSnapshot();
  });
});