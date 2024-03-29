import path from 'path';
import { expect, describe, test } from 'vitest';
import { esc, execScriptSync } from './utils/helpers.js';

const TEST_PATH = path.resolve('./test/');

describe('Usage `ansis` npm package', () => {
  test(`CommonJS mode`, () => {
    const filename = path.join(TEST_PATH, './package/cjs/test.cjs');
    const received = execScriptSync(filename, ['--color']);
    const expected =
      '\x1b[38;5;227m\x1b[7m -= [ansis package] CommonJS =- \x1b[27m\x1b[39m\n' +
      '\x1b[31m\x1b[1m\x1b[4mred.bold.underline(\'red\')\x1b[24m\x1b[22m\x1b[39m\n' +
      '\x1b[31m\x1b[1m\x1b[4mansis.red.bold.underline(red)\x1b[24m\x1b[22m\x1b[39m\n' +
      '\x1b[38;2;250;255;99m\x1b[1mhex(\'#FFAB40\').bold(\'#63ffc6\')\x1b[22m\x1b[39m\n' +
      '\x1b[38;2;250;255;99m\x1b[1mansis.hex(\'#FFAB40\').bold(#63ffc6)\x1b[22m\x1b[39m\n' +
      '\x1b[38;2;255;117;209mansis.pink\x1b[39m\n' +
      '\x1b[38;2;255;171;64mansis.orange\x1b[39m\n' +
      '\x1b[38;2;255;171;64m\x1b[1mansis.orange.bold\x1b[22m\x1b[39m\n' +
      '\x1b[1m\x1b[31mansis2.bold.red\x1b[39m\x1b[22m\n' +
      '\x1b[38;2;255;117;209mextend: ansis2.pink\x1b[39m\n' +
      '\x1b[3m\x1b[38;2;255;171;64mextend: ansis2.italic.orange\x1b[39m\x1b[23m\n' +
      'colored:  \x1b[32mgreen text\x1b[39m\n' +
      'striped:  green text\n' +
      '--- OLD  named import: \x1b[33mconst { magenta, cyan, blue } = require(\'ansis/colors\');\x1b[39m\n' +
      '\x1b[35mmagenta\x1b[39m\n' +
      '\x1b[36m\x1b[1mcyan bold\x1b[22m\x1b[39m\n' +
      '\x1b[34m\x1b[3mblue italic\x1b[23m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });

  test(`ESM mode`, () => {
    const filename = path.join(TEST_PATH, './package/esm/test.mjs');
    const received = execScriptSync(filename, ['--color']);
    const expected =
      '\x1b[38;5;208m\x1b[7m -= [ansis package] ESM =- \x1b[27m\x1b[39m\n' +
      '\x1b[31m\x1b[1m\x1b[4mred.bold.underline(\'red\')\x1b[24m\x1b[22m\x1b[39m\n' +
      '\x1b[31m\x1b[1m\x1b[4mansis.red.bold.underline(red)\x1b[24m\x1b[22m\x1b[39m\n' +
      '\x1b[38;2;250;255;99m\x1b[1mhex(\'#FFAB40\').bold(\'#63ffc6\')\x1b[22m\x1b[39m\n' +
      '\x1b[38;2;250;255;99m\x1b[1mansis.hex(\'#FFAB40\').bold(#63ffc6)\x1b[22m\x1b[39m\n' +
      '\x1b[38;2;255;117;209mansis.pink\x1b[39m\n' +
      '\x1b[38;2;255;171;64mansis.orange\x1b[39m\n' +
      '\x1b[38;2;255;171;64m\x1b[1mansis.orange.bold\x1b[22m\x1b[39m\n' +
      '\x1b[1m\x1b[31mansis2.bold.red\x1b[39m\x1b[22m\n' +
      '\x1b[38;2;255;117;209mextend: ansis2.pink\x1b[39m\n' +
      '\x1b[3m\x1b[38;2;255;171;64mextend: ansis2.italic.orange\x1b[39m\x1b[23m\n' +
      'colored:  \x1b[32mgreen text\x1b[39m\n' +
      'striped:  green text\n' +
      '--- OLD  named import: \x1b[33mimport { magenta, cyan, blue } from \'ansis/colors\';\x1b[39m\n' +
      '\x1b[35mmagenta\x1b[39m\n' +
      '\x1b[36m\x1b[1mcyan bold\x1b[22m\x1b[39m\n' +
      '\x1b[34m\x1b[3mblue italic\x1b[23m\x1b[39m';
    expect(esc(received)).toEqual(esc(expected));
  });
});