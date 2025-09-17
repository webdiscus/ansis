import { describe, test, expect, vi } from 'vitest';

import color from 'color-name';
import ansis from 'ansis';

// mock ansis to ensure it always uses the required color level,
// independent of what would be auto-detected
vi.mock('ansis', async () => {
  const { Ansis } = await vi.importActual('ansis');
  const ansis = new Ansis(3); // force init with level 3 for truecolor
  return { default: ansis, Ansis }
});

describe('use color name with ansis.rgb()', () => {
  test('simple', async () => {
    // color.pink => [ 255, 192, 203 ]
    const received = ansis.rgb(...color.pink)('Pink via RGB');
    const expected = '[38;2;255;192;203mPink via RGB[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('helper', async () => {
    const truecolor = (name) => {
      const rgb = color[name.toLowerCase()];
      if (!rgb) throw new Error(`unknown color: ${name}`);
      return ansis.rgb(...rgb);
    };

    const received = truecolor('Orange').underline('Orange via RGB');
    const expected = '[38;2;255;165;0m[4mOrange via RGB[24m[39m';

    console.log(received);
    expect(received).toEqual(expected);
  });
});