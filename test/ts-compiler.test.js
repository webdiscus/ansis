import { describe, test, beforeAll } from 'vitest';
import { executeTSFile } from './utils/helpers.js';

// import env variables to simulate truecolor in CLI
import './env/truecolor.js';

beforeAll(() => {
  // increase the default timeout (5000 ms) to avoid occasional timeouts on GitHub CI
}, 10_000);

// integration tests: compile TS into JS, execute compiled JS and compare the output with expected string
describe('imports', () => {
  // test various compiler for the default import

  test('CJS, default import, tsc', () => executeTSFile('ts/cjs-default-import', 'tsc'));
  test('CJS, default import, swc', () => executeTSFile('ts/cjs-default-import', 'swc'));
  test('CJS, default import, esbuild', () => executeTSFile('ts/cjs-default-import', 'esbuild'));
  test('CJS, link, tsc', () => executeTSFile('ts/cjs-link', 'tsc'));
  test('CJS, link, swc', () => executeTSFile('ts/cjs-link', 'swc'));
  test('CJS, link, esbuild', () => executeTSFile('ts/cjs-link', 'esbuild'));

  test('CJS, import * as ansis; tsc', () => executeTSFile('ts/cjs-default-import-as', 'tsc'));
  test('CJS, import * as ansis; swc', () => executeTSFile('ts/cjs-default-import-as', 'swc'));
  test('CJS, import * as ansis; esbuild', () => executeTSFile('ts/cjs-default-import-as', 'esbuild'));

  test('CJS, named import', () => executeTSFile('ts/cjs-named-import-simple'));
  test('ESM, named import', () => executeTSFile('ts/esm-named-import-simple'));
  test('ESM, named import, tsup', () => executeTSFile('ts/esm-named-import-simple', 'tsup_esm'));

  test('CJS, named import fn, tsc', () => executeTSFile('ts/cjs-named-import-color-func', 'tsc'));
  test('CJS, named import fn, swc', () => executeTSFile('ts/cjs-named-import-color-func', 'swc'));
  test('CJS, named import fn, esbuild', () => executeTSFile('ts/cjs-named-import-color-func', 'esbuild'));

  test('CJS, import ansis, { Ansis, red }; tsc', () => executeTSFile('ts/cjs-mix-import', 'tsc'));
  test('CJS, import ansis, { Ansis, red }; swc', () => executeTSFile('ts/cjs-mix-import', 'swc'));
  test('CJS, import ansis, { Ansis, red }; esbuild', () => executeTSFile('ts/cjs-mix-import', 'esbuild'));

  test('CJS, extend colors; tsc', () => executeTSFile('ts/cjs-extend-colors', 'tsc'));
  test('CJS, extend colors; swc', () => executeTSFile('ts/cjs-extend-colors', 'swc'));
  test('CJS, extend colors; esbuild', () => executeTSFile('ts/cjs-extend-colors', 'esbuild'));
});

describe('limit for legacy settings', () => {
  test(`CJS, require, module:node16, moduleResolution:node16, tsc`, () => executeTSFile('ts/cjs-node16-node16-require', 'tsc'));
  test(`ESM, import, module:node16, moduleResolution:node16, tsc`, () => executeTSFile('ts/esm-node16-node16-import', 'tsc'));
  test(`CJS, link, require, module:node16, moduleResolution:node16, tsc`, () => executeTSFile('ts/cjs-node16-node16-require-link', 'tsc'));
  test(`ESM, link, import, module:node16, moduleResolution:node16, tsc`, () => executeTSFile('ts/esm-node16-node16-import-link', 'tsc'));
});

describe('ESM, imports', () => {
  test('ESNext, tsc', () => executeTSFile('ts/esm-esnext', 'tsc'));
  test('Node16, tsc', () => executeTSFile('ts/esm-node16', 'tsc'));
  test('ESNext, tsup', () => executeTSFile('ts/esm-esnext', 'tsup_esm'));
  test('Node16, tsup', () => executeTSFile('ts/esm-node16', 'tsup_esm_node16'));
  test('ESNext, link, tsc', () => executeTSFile('ts/esm-esnext-link', 'tsc'));
  test('Node16, link, tsc', () => executeTSFile('ts/esm-node16-link', 'tsc'));
  test('ESNext, link, tsup', () => executeTSFile('ts/esm-esnext-link', 'tsup_esm'));
  test('Node16, link, tsup', () => executeTSFile('ts/esm-node16-link', 'tsc', 'build:tsup_esm_node16'));
});

describe('typescript = 5.4', () => {
  test('method extend, ES6', () => executeTSFile('ts/cjs-extend-colors-ts5.4', 'tsc'));
  test('link, ES6', () => executeTSFile('ts/cjs-link-ts5.4', 'tsc'));
});
