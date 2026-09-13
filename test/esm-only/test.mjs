import assert from 'node:assert/strict';

// force 256 colors support
process.env.FORCE_COLOR = '1';

const { default: ansis, Ansis, green, hex, red } = await import('ansis');
const color = new Ansis(3);

assert.equal(typeof Ansis, 'function');
assert.equal(typeof red, 'function');
assert.equal(typeof green, 'function');
assert.equal(typeof hex, 'function');
assert.equal(red('red'), '\x1b[31mred\x1b[39m');
assert.equal(green`green`, '\x1b[32mgreen\x1b[39m');
assert.equal(color.red.bold('red'), '\x1b[31m\x1b[1mred\x1b[22m\x1b[39m');
assert.equal(color.hex('#faff63').bold('hex'), '\x1b[38;2;250;255;99m\x1b[1mhex\x1b[22m\x1b[39m');

const ansis2 = new Ansis(3);
ansis2.extend({
	pink: '#FF75D1',
});

assert.equal(ansis2.pink('pink'), '\x1b[38;2;255;117;209mpink\x1b[39m');
assert.equal(ansis.strip(green('green')), 'green');