require('../env/truecolor.js');

const assert = require('assert');
const { Ansis } = require('ansis');

// workaround: create new instance of Ansis to enable using the extended color as a sub-chain item
const ansis = new Ansis();

ansis.extend({
  orange: '#FFAB40',
});

const { orange, red, underline, fg, bg, hex } = ansis;

// alias test to it
const test = it;

describe('truecolor', function () {
  test('red', function () {
    const received = ansis.red('test');
    const expected = '\u001B[31mtest\u001B[39m';
    assert.strictEqual(received, expected);
  });

  test(`hex('#A00')(123)`, () => {
    const num = 123;
    const received = hex('#A00')(num);
    const expected = '\x1b[38;2;170;0;0m123\x1b[39m';
    assert.strictEqual(received, expected);
  });

  test(`hex() Truecolor samples`, () => {
    const received = `${hex('#FF701F')`Orange`}, ${hex('#FF007F')`Rose`}, ${hex('#5C0120')`Bordeaux`}`;
    const expected = '\x1b[38;2;255;112;31mOrange\x1b[39m, \x1b[38;2;255;0;127mRose\x1b[39m, \x1b[38;2;92;1;32mBordeaux\x1b[39m';
    console.log('Truecolor: ', received);
    assert.strictEqual(received, expected);
  });

  test(`ansis.fg(97)`, () => {
    const received = fg(97)('foo');
    const expected = '\x1b[38;5;97mfoo\x1b[39m';
    assert.strictEqual(received, expected);
  });

  test(`ansis.bg(97)`, () => {
    const received = ansis.bg(97)('foo');
    const expected = '\x1b[48;5;97mfoo\x1b[49m';
    assert.strictEqual(received, expected);
  });
});

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
    assert.strictEqual(received, expected);
  });
});
