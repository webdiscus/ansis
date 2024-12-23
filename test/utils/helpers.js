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
 * @param {Array<string>} env The environment variables.
 * @return {string} CLI output as result of execution.
 */
export const execScriptSync = (file, flags = [], env = []) => {
  let envVars = env.length ? '' + env.join(' ') + ' ' : '';

  // set ENV variables on Windows, e.g.: `set FORCE_COLOR=true | node app.js`
  if (isWin) {
    envVars = [];
    env.forEach((expression) => {
      envVars.push(`set ${expression} | `);
    });
  }

  const cmd = envVars + 'node ' + file + ' ' + flags.join(' ');
  const result = execSync(cmd);

  // replace last newline in result
  return result.toString().replace(/\n$/, '');
};

// TODO: get colorized output in process.stdout using child_process.execSync
// export const execScriptOutSync = (file, flags = [], env = []) => {
//   const envVars = env.length ? '' + env.join(' ') + ' ' : '';
//   const cmd = envVars + 'node ' + file + ' ' + flags.join(' ');
//
//   //const stdout = jest.spyOn(process.stdout, 'write').mockImplementation(() => {});
//   const stdout = jest.spyOn(process.stdout, 'write').mockImplementation(() => {});
//
//   const result = execSync(
//     cmd,
//     // reset stdio to enable isTTY for colorized output
//     { stdio: 'inherit' },
//     //{ stdio: [0, process.stdout, process.stderr] },
//     //{ stdio: [1] },
//   );
//
//   const { calls } = stdout.mock;
//   let output = calls.length > 0 ? calls[0][0] : '';
//
//   stdout.mockClear();
//   stdout.mockRestore();
//   console.log('--> ', { cmd, output, calls, stdout: stdout.mock }, stdout);
//   //console.log('--> ', result.toString());
//
//   return output;
// };

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
 * @return {Promise<void>}
 */
export const executeTSFile = (testPath, compiler = 'tsc') => {
  const compilers = {
    tsc: 'build',
    swc: 'build:swc',
    esbuild: 'build:esbuild',
  };

  const buildCompiler = compilers[compiler] || 'build';

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