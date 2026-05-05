import { describe, test, expect, vi } from 'vitest';

import colorNames from 'css-color-names';
import ansis, { Ansis } from 'ansis';

// truecolor level
const level = 3;

let getBgName = (name) => 'bg' + name[0].toUpperCase() + name.slice(1);

// mock ansis to ensure it always uses the required colorNames level,
// independent of what would be auto-detected
vi.mock('ansis', async () => {
  const { Ansis } = await vi.importActual('ansis');
  const ansis = new Ansis(3); // force init with level
  return { default: ansis, Ansis }
});

describe('extend with named colors', () => {
  test('foreground pink via hex', async () => {
    // colorNames.pink => #ffc0cb
    const received = ansis.hex(colorNames.pink)('Pink Foreground via HEX');
    const expected = '[38;2;255;192;203mPink Foreground via HEX[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('background pink via hex', async () => {
    // colorNames.pink => #ffc0cb
    const received = ansis.bgHex(colorNames.pink).black('Pink Background via HEX');
    const expected = '[48;2;255;192;203m[30mPink Background via HEX[39m[49m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('foreground helper for named colors', async () => {
    const color = (name) => {
      const hex = colorNames[name.toLowerCase()];
      if (!hex) throw new Error(`unknown color: ${name}`);
      return ansis.hex(hex);
    };

    //const received = color('Orange').underline('Orange Foreground via helper');
    const received = ansis.hex(colorNames['orange']).underline('Orange Foreground via helper');
    const expected = '[38;2;255;165;0m[4mOrange Foreground via helper[24m[39m';

    console.log(received);
    expect(received).toEqual(expected);
  });

  test('background helper for named colors', async () => {
    const bgColor = (name) => {
      const hex = colorNames[name.toLowerCase()];
      if (!hex) throw new Error(`unknown color: ${name}`);
      return ansis.bgHex(hex);
    };

    const received = bgColor('Orange').black.underline('Orange Background via helper');
    const expected = '[48;2;255;165;0m[30m[4mOrange Background via helper[24m[39m[49m';

    console.log(received);
    expect(received).toEqual(expected);
  });

  test('extended via new instance', async () => {
    const ansis = new Ansis(level).extend(colorNames);
    const received = ansis.pink('Pink');
    const expected = '[38;2;255;192;203mPink[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('extended via ansis.extend()', async () => {
    const color = ansis.extend(colorNames);
    const received = color.pink('Pink');
    const expected = '[38;2;255;192;203mPink[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('extended bg color', async () => {
    const color = ansis.extend(colorNames);
    const received = color.bgPink.black('Pink Background');
    const expected = '[48;2;255;192;203m[38;2;0;0;0mPink Background[39m[49m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('styled extended colorNames', async () => {
    const ansis = new Ansis(level).extend(colorNames);
    const received = ansis.pink.underline('Pink');
    const expected = '[38;2;255;192;203m[4mPink[24m[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('print all named truecolor', async () => {
    const ansis = new Ansis(level).extend(colorNames);
    const names = Object.keys(colorNames);
    //const received = names.map((name) => ansis[name](name)).join('\n');
    const received = names.map((name) => {
      const bgName = getBgName(name);
      return ansis[name](`${name} `) + ansis[bgName].black(` ${bgName} `);
    }).join('\n');

    console.log(received);

    expect(received).toMatchSnapshot();
  });

  test('open/close properties in extended colorNames', async () => {
    const ansis = new Ansis(level).extend(colorNames);
    const style = ansis.pink;
    const received = style.open + 'Pink' + style.close;

    const expected = '[38;2;255;192;203mPink[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

  test('open/close properties in extended colorNames, chained', async () => {
    const ansis = new Ansis(level).extend(colorNames);
    const style = ansis.pink.underline;
    const received = style.open + 'Pink' + style.close;

    const expected = '[38;2;255;192;203m[4mPink[24m[39m';
    console.log(received);
    expect(received).toEqual(expected);
  });

});