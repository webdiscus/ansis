import { exec, execFileSync } from 'child_process';
import util from 'util';
import { expect } from 'vitest';

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __testDirname = resolve(join(__dirname, '../'));

const isWin = process.platform === 'win32';

// Promisify exec for ease of testing
const execPromise = util.promisify(exec);

/**
 * Build a minimal environment for child processes used in CLI tests.
 *
 * This avoids inheriting unrelated parent environment variables such as
 * `VITEST_*`, IDE-specific variables, and user shell settings,
 * so external environment state does not affect test results.
 *
 * @returns {Record<string, string>}
 */
const getDefaultProcessEnv = () => {
  let defaults = isWin
    ? {
      SystemRoot: process.env.SystemRoot,
      SYSTEMROOT: process.env.SYSTEMROOT,
      ComSpec: process.env.ComSpec,
      PATHEXT: process.env.PATHEXT,
      TEMP: process.env.TEMP,
      TMP: process.env.TMP,
      USERPROFILE: process.env.USERPROFILE,
      HOME: process.env.HOME,
    }
    : {
      HOME: process.env.HOME,
      LANG: process.env.LANG,
      TMPDIR: process.env.TMPDIR,
      TMP: process.env.TMP,
      TEMP: process.env.TEMP,
    };

  return Object.fromEntries(Object.entries(defaults).filter(([, value]) => value != null));
};

/**
 * Escape the slash `\` in ESC-symbol.
 * Use it to show by an error the received ESC sequence string in console output.
 *
 * @param {string} str
 * @returns {string}
 */
export const esc = (str) => str.replace(/\x1b/g, '\\x1b');

/**
 * Return content of file as string.
 *
 * @param {string} file
 * @return {any}
 */
export const readTextFileSync = (file) => {
  if (!fs.existsSync(file)) {
    throw new Error(`\nERROR: the file "${file}" not found.`);
  }
  let content = fs.readFileSync(file, 'utf-8');

  // ensue that the correct line endings are used across different operating systems
  return isWin ? content.replace(/\r\n/g, '\n') : content;
};

/**
 * Execute a JavaScript file synchronously and return its stdout output.
 *
 * @param {string} file The file path to execute with `node`.
 * @param {string[]} [flags=[]] CLI flags passed to the script.
 * @param {Record<string, string | number | boolean>} [env={}] Environment variables merged into the minimal child process environment.
 * @param {{ isTTY?: boolean }} [options={}] Child process runtime overrides.
 * @returns {string} Stdout output with the trailing newline removed.
 */
export const execScriptSync = (file, flags = [], env = {}, options = {}) => {
  let output = '';
  let { isTTY = true } = options;

  const bootstrap = `
    import { pathToFileURL } from 'url';

    const [file, ...flags] = process.argv.slice(1);
    process.argv = ['node', file, ...flags];
    if (${isTTY}) {
      process.stdout.isTTY = true;
      process.stderr.isTTY = true;
    }
    await import(pathToFileURL(file));
  `;

  try {
    output = execFileSync(process.execPath, ['--input-type=module', '-e', bootstrap, file, ...flags], {
      env: {
        ...getDefaultProcessEnv(),
        ...env,
      },
    });
  } catch (error) {
    console.error('Error executing command:', error.message);
  }

  // replace last newline in result
  return output.toString().replace(/\r?\n$/, '');
};

export const getCompareFileContents = function(
  receivedFile,
  expectedFile,
  filter = /.(js|out)$/,
) {
  return filter.test(receivedFile) && filter.test(expectedFile)
    ? { received: readTextFileSync(receivedFile), expected: readTextFileSync(expectedFile) }
    : { received: '', expected: '' };
};

/**
 * Execute TS file and compare output result with expected file.
 *
 * @param {string} testPath The path to test directory relative to `test/` folder.
 * @param {'tsc'|'swc'|'esbuild'} compiler  The compiler, defaults `tsc`.
 * @param {string|null?} script
 * @return {Promise<void>}
 */
export const executeTSFile = (testPath, compiler = 'tsc', script = null) => {
  const compilers = {
    tsc: 'build',
    swc: 'build:swc',
    esbuild: 'build:esbuild',
    tsup_esm: 'build:tsup_esm',
  };

  const buildCompiler = script ? script : compilers[compiler] || 'build';

  const cmd = `cd ./test/${testPath} && npm run ${buildCompiler}`;
  return execPromise(cmd).then((result) => {
    const receivedFile = join(__testDirname, testPath, 'dist/index.out');
    const expectedFile = join(__testDirname, testPath, 'expected/index.out');
    const { received, expected } = getCompareFileContents(receivedFile, expectedFile);

    this.result = { received, expected };

    expect(received).toEqual(expected);
  })
  //debugging inner errors
  .catch((error) => {
    let message;
    //console.log('>> err: ', error);
    if (typeof error === 'string') {
      message = '\n' + error;
    } else if('stdout' in error && 'stderr' in error) {
      message = error.stdout + '\n' + error.stderr;
    } else {
      message = '\n' + error.toString();
    }

    expect.fail(testPath + message);
  });

};
