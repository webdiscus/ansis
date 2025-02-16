import { exec, execSync } from 'child_process';
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
 * Return output of javascript file.
 *
 * @param {string} file The file path to execute.
 * @param {Array<string>} flags The CLI flags.
 * @param {Object} env The environment variables.
 * @return {string} CLI output as result of execution.
 */
export const execScriptSync = (file, flags = [], env = {}) => {
  let output = '';

  try {
    output = execSync(`node ${file} ${flags.join(' ')}`, {
      env: {
        ...process.env, // preserve existing environment variables
        ...env,
      },
      args: flags,
      //stdio: 'inherit', // pass stdout/stderr directly to the console
    });

  } catch (error) {
    console.error('Error executing command:', error.message);
  }

  // replace last newline in result
  return output.toString().replace(/\n$/, '');
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
    // execution result
    //console.log('>> result: ', result);

    const receivedFile = join(__testDirname, testPath, 'dist/index.out');
    const expectedFile = join(__testDirname, testPath, 'expected/index.out');
    const { received, expected } = getCompareFileContents(receivedFile, expectedFile);

    this.result = { received, expected };

    expect(received).toEqual(expected);
  });
  // debugging inner errors
  // .catch((error) => {
  //   let message;
  //   //console.log('>> err: ', error);
  //   if (typeof error === 'string') {
  //     message = '\n' + error;
  //   } else if('stdout' in error && 'stderr' in error) {
  //     message = error.stdout + '\n' + error.stderr;
  //   } else {
  //     message = '\n' + error.toString();
  //   }
  //
  //   expect.fail(testPath + message);
  // });

};