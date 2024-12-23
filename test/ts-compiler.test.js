import { describe, test } from 'vitest';
import { executeTSFile } from './utils/helpers.js';

// import env variables to simulate truecolor color space in CLI
import './env/color-space.truecolor.js';

// integration tests: compile TS into JS, execute compiled JS and compare the output with expected string
describe('imports', () => {
  test('import { red }', () => executeTSFile('ts/named-import-simple'));

  test('import { red, ansi256 }; tsc', () => executeTSFile('ts/named-import-color-func', 'tsc'));
  test('import { red, ansi256 }; swc', () => executeTSFile('ts/named-import-color-func', 'swc'));
  test('import { red, ansi256 }; esbuild', () => executeTSFile('ts/named-import-color-func', 'esbuild'));

  // test various compiler for the default import
  test('import ansis; tsc', () => executeTSFile('ts/default-import', 'tsc'));
  test('import ansis; swc', () => executeTSFile('ts/default-import', 'swc'));
  test('import ansis; esbuild', () => executeTSFile('ts/default-import', 'esbuild'));

  test('import * as ansis; tsc', () => executeTSFile('ts/default-import-as', 'tsc'));
  test('import * as ansis; swc', () => executeTSFile('ts/default-import-as', 'swc'));
  test('import * as ansis; esbuild', () => executeTSFile('ts/default-import-as', 'esbuild'));

  test('import ansis, { Ansis, red }; tsc', () => executeTSFile('ts/mix-import', 'tsc'));
  test('import ansis, { Ansis, red }; swc', () => executeTSFile('ts/mix-import', 'swc'));
  test('import ansis, { Ansis, red }; esbuild', () => executeTSFile('ts/mix-import', 'esbuild'));

  test('extend colors; tsc', () => executeTSFile('ts/extend-colors', 'tsc'));
  test('extend colors; swc', () => executeTSFile('ts/extend-colors', 'swc'));
  test('extend colors; esbuild', () => executeTSFile('ts/extend-colors', 'esbuild'));
});