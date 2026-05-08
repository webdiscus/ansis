import { describe, expect, test } from 'vitest';
import { esc } from '../../utils/helpers.js';

import '../../env/truecolor.js';

import ansis from 'ansis';

describe('nested styles', () => {
  test(`nested styles`, () => {
    const received = ansis.red('foo' + ansis.underline.bgBlue('bar') + '!');
    const expected = '\x1b[31mfoo\x1b[4m\x1b[44mbar\x1b[49m\x1b[24m!\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`nested prop.parent`, () => {
    const received = ansis.green.bold.underline(`foo ${ansis.red.italic('bar')} foo`);
    const expected = '\x1b[32m\x1b[1m\x1b[4mfoo \x1b[31m\x1b[3mbar\x1b[23m\x1b[32m foo\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`chained styles`, () => {
    const received = ansis.green.bold.underline.italic('foo');
    const expected = '\x1b[32m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`nested function calls`, () => {
    const received = ansis.cyan(ansis.bold(ansis.underline(ansis.italic('foo'))));
    const expected = '\x1b[36m\x1b[1m\x1b[4m\x1b[3mfoo\x1b[23m\x1b[24m\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`nested multi styles using template strings`, () => {
    const rgb = ansis.rgb(100, 80, 155);
    const received = ansis.red
      `begin ${rgb.bold('RGB')} ${ansis.yellow('yellow')} red ${ansis.italic.cyan('italic cyan')} red ${ansis.red(
        'red')} red ${ansis.underline.green.italic(`underline italic green ${ansis.rgb(80, 120, 200)(
        'underline italic blue')} underline italic green`)} red ${ansis.cyan('cyan')} red ${ansis.bold.yellow(
        'bold yellow')} red ${ansis.green('green')} end`;

    const expected = '\x1b[31mbegin \x1b[38;2;100;80;155m\x1b[1mRGB\x1b[22m\x1b[31m \x1b[33myellow\x1b[31m red \x1b[3m\x1b[36mitalic cyan\x1b[31m\x1b[23m red \x1b[31mred\x1b[31m red \x1b[4m\x1b[32m\x1b[3munderline italic green \x1b[38;2;80;120;200munderline italic blue\x1b[32m underline italic green\x1b[23m\x1b[31m\x1b[24m red \x1b[36mcyan\x1b[31m red \x1b[1m\x1b[33mbold yellow\x1b[31m\x1b[22m red \x1b[32mgreen\x1b[31m end\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});
