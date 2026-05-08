import { describe, test, expect } from 'vitest';
import { esc } from '../../utils/helpers.js';

// import env variables to simulate truecolor in CLI
import '../../env/truecolor.js';

//import { Ansis } from '../../../src/index.mjs'; //  // for debugging only
import { Ansis } from 'ansis'; // test npm package

// workaround: create new instance of Ansis to enable using the extended color as a sub-chain item
const ansis = new Ansis();

ansis.extend({
  orange: '#FFAB40',
});

const { orange, red, underline } = ansis;

describe('extend colors', () => {
  test(`extended color can be used in style chain`, () => {
    console.log(ansis.orange.italic('orange italic'));
    console.log(ansis.italic.orange('italic orange'));

    console.log(red('red'));
    console.log(orange.underline('orange underline'));

    // TODO: doesn't work!
    //console.log(underline.orange('underline orange'));

    const received = ansis.italic.orange('foo');
    const expected = '\x1b[3m\x1b[38;2;255;171;64mfoo\x1b[39m\x1b[23m';
    expect(received).toEqual(expected);
  });

  test('destructured extended color can be chained with base style', () => {
    ansis.extend({ orange: '#FFAB40' });

    const { orange } = ansis;

    const received = orange.bold('text');
    const expected = '\x1b[38;2;255;171;64m\x1b[1mtext\x1b[22m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test('extended color can be used as a sub-chain item', () => {
    const ansis = new Ansis();
    ansis.extend({ orange: '#FFAB40' });

    const received = ansis.bold.orange('text');
    const expected = '\x1b[1m\x1b[38;2;255;171;64mtext\x1b[39m\x1b[22m';
    expect(esc(received)).toEqual(esc(expected));
  });
});
