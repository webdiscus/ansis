import { execSync } from 'child_process';

/**
 * Escape the slash `\` in ESC-symbol.
 * Use it to show by an error the received ESC sequence string in console output.
 *
 * @param {string} str
 * @returns {string}
 */
export const esc = (str) => str.replace(/\x1b/g, '\\x1b');

/**
 * Return output of javascript file.
 *
 * @param {string} file
 * @param {Array<string>} flags
 * @param {Array<string>} env
 * @return {string}
 */
export const execScriptSync = (file, flags = [], env = []) => {
  const envVars = env.length ? '' + env.join(' ') + ' ' : '';
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