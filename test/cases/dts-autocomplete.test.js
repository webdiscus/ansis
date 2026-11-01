import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';
import { beforeAll, describe, expect, test } from 'vitest';

// The IDE autocomplete comes from the TypeScript language service.
// These tests ask the same service for completions in virtual files that import the `ansis` package.
// This checks `index.d.ts` the way an editor uses it, without an IDE.

const CURSOR = '<cursor>';

const toPosix = (file) => file.split(path.sep).join('/');
const root = toPosix(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'));
const tsFile = `${root}/__autocomplete__.ts`;
const jsFile = `${root}/__autocomplete__.js`;

const sources = new Map();
const versions = new Map();

const options = {
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ES2022,
  strict: true,
  allowJs: true,
  noEmit: true,
  skipLibCheck: true,
  types: [],
};

const readSource = (file) => (sources.has(file) ? sources.get(file) : ts.sys.readFile(file));

const host = {
  getScriptFileNames: () => [...sources.keys()],
  getScriptVersion: (file) => String(versions.get(file) ?? 0),
  getScriptSnapshot: (file) => {
    const text = readSource(file);
    return text === undefined ? undefined : ts.ScriptSnapshot.fromString(text);
  },
  getCurrentDirectory: () => root,
  getCompilationSettings: () => options,
  getDefaultLibFileName: (opts) => ts.getDefaultLibFilePath(opts),
  fileExists: (file) => sources.has(file) || ts.sys.fileExists(file),
  readFile: readSource,
  readDirectory: ts.sys.readDirectory,
  directoryExists: ts.sys.directoryExists,
  getDirectories: ts.sys.getDirectories,
};

const service = ts.createLanguageService(host, ts.createDocumentRegistry());

/**
 * Return the names suggested at the cursor position.
 *
 * @param {string} code The source code with the `<cursor>` marker.
 * @param {string} [file] The virtual file name, its extension defines TS or JS.
 * @return {string[]}
 */
const completions = (code, file = tsFile) => {
  const position = code.indexOf(CURSOR);
  sources.set(file, code.replace(CURSOR, ''));
  versions.set(file, (versions.get(file) ?? 0) + 1);

  const result = service.getCompletionsAtPosition(file, position, {});
  return result ? result.entries.map((entry) => entry.name) : [];
};

// The names that are expected, but not suggested. An empty array means all are suggested.
const missing = (names, expected) => expected.filter((name) => !names.includes(name));

const styles = ['reset', 'inverse', 'hidden', 'visible', 'bold', 'dim', 'italic', 'underline', 'strikethrough'];
const colors = ['black', 'gray', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
const brightColors = ['redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'];
const bgColors = ['bgBlack', 'bgGray', 'bgRed', 'bgWhite', 'bgRedBright', 'bgBlueBright', 'bgWhiteBright'];
const methods = ['level', 'open', 'close', 'fg', 'bg', 'rgb', 'bgRgb', 'hex', 'bgHex', 'link', 'isSupported', 'strip', 'extend'];

// the first call loads the TypeScript libs, it can be slow on a CI runner
beforeAll(() => {
  completions(`import ansis from 'ansis';\nansis.${CURSOR}`);
}, 30_000);

describe('autocomplete of the d.ts', () => {
  test('default export suggests styles, colors, background colors and methods', () => {
    const names = completions(`import ansis from 'ansis';\nansis.${CURSOR}`);

    expect(missing(names, [...styles, ...colors, ...brightColors, ...bgColors, ...methods])).toEqual([]);
  });

  test('named color export suggests chained styles', () => {
    const names = completions(`import { red } from 'ansis';\nred.${CURSOR}`);

    expect(missing(names, ['bold', 'underline', 'italic', 'bgCyan', 'hex', 'rgb'])).toEqual([]);
  });

  test('new instance suggests styles and colors', () => {
    const names = completions(`import { Ansis } from 'ansis';\nconst color = new Ansis();\ncolor.${CURSOR}`);

    expect(missing(names, [...styles, ...colors, ...bgColors, ...methods])).toEqual([]);
  });

  test('extended instance suggests custom colors and their background colors', () => {
    const names = completions(
      `import ansis from 'ansis';\nconst color = ansis.extend({ pink: '#FF75D1', orange: '#FFAB40' });\ncolor.${CURSOR}`
    );

    expect(missing(names, ['pink', 'orange', 'bgPink', 'bgOrange', 'red', 'bold'])).toEqual([]);
  });

  test('AnsiColors suggests color names in a string parameter', () => {
    const names = completions(
      `import { AnsiColors } from 'ansis';\n` +
      `declare function write(style: AnsiColors, message: string): void;\n` +
      `write('${CURSOR}', 'message');`
    );

    expect(missing(names, [...colors, ...brightColors, ...bgColors])).toEqual([]);
    // styles are not colors
    expect(names.includes('bold')).toBe(false);
  });

  test('AnsiColorsExtend keeps suggesting the base colors', () => {
    const names = completions(
      `import { AnsiColors } from 'ansis';\n` +
      `type AnsiColorsExtend<T extends string> = AnsiColors | (T & Record<never, never>);\n` +
      `declare function write(style: AnsiColorsExtend<'pink' | 'orange'>, message: string): void;\n` +
      `write('${CURSOR}', 'message');`
    );

    expect(missing(names, [...colors, ...brightColors, ...bgColors])).toEqual([]);
  });

  test('JavaScript file gets the suggestions from the d.ts', () => {
    const names = completions(`import ansis from 'ansis';\nansis.${CURSOR}`, jsFile);

    expect(missing(names, ['red', 'bold', 'hex', 'bgRed', 'strip', 'extend'])).toEqual([]);
  });
});
