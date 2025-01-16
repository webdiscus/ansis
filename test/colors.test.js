import { describe, test, expect } from 'vitest';

// import env variables to simulate truecolor color space in CLI
import './env/truecolor.js';

//import { Ansis, red } from '../src/index.mjs'; //  // for debugging only
import { Ansis, red } from 'ansis'; // test npm package

// workaround: create new instance of Ansis to enable using the extended color as a sub-chain item
const ansis = new Ansis();

ansis.extend({
  orange: '#FFAB40',
})

const { orange, red, underline } = ansis;

describe('experiments with API', () => {
  test(`extend colors`, () => {
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
});