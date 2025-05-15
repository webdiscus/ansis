require('../env/truecolor.js');

const assert = require('assert');
const ansis = require('ansis');

// alias test to it
const test = it;

describe('ansis basic', function () {
  test('ansis.red', function () {
    const received = ansis.red('test');
    const expected = '\u001B[31mtest\u001B[39m';
    assert.strictEqual(received, expected);
  });

  test('ansis.bold.blue', function () {
    const received = ansis.bold.blue('test');
    const expected = '\u001B[1m\u001B[34mtest\u001B[39m\u001B[22m';
    assert.strictEqual(received, expected);
  });
});
