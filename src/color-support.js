import { SPACE_MONO, SPACE_16COLORS, SPACE_256COLORS, SPACE_TRUECOLOR } from './color-spaces.js';

/**
 * Detect color space.
 *
 * Truecolor is supported by:
 * - some CI (e.g. GitHub CI)
 * - Windows (since Windows 10 revision 14931)
 * - iTerm, VSCode, JetBrains-JediTerm
 * - xterm-kitty
 *
 * See console programs supporting TrueColor https://github.com/termstandard/colors#truecolor-support-in-output-devices
 *
 * @param {object} env
 * @param {boolean} isTTY
 * @param {boolean} isWin
 * @return {number}
 */
let detectColorSpace = (env, isTTY, isWin) => {
  let someEnv = (arr) => arr.some(val => val in env);
  let { TERM: term, COLORTERM: colorterm } = env;

  // note: the order of checks is important
  // many terminals that support truecolor have TERM as `xterm-256colors` and `COLORTERM=truecolor`
  // or do not set COLORTERM to `truecolor`
  // therefore they can be detected by specific EVN variables

  // Common COLORTERM Values: `truecolor` or `24bit`, `ansi256`, `ansi`
  // terminals, that support truecolor, e.g., iTerm, VSCode
  if (colorterm === 'truecolor' || colorterm === '24bit') return SPACE_TRUECOLOR;
  if (colorterm === 'ansi256') return SPACE_256COLORS;
  if (colorterm === 'ansi') return SPACE_16COLORS;

  // note: first, CI environments must be detected since they are not TTY and often advertise themselves as `dumb` terminals

  // Azure DevOps CI
  // https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
  if ('TF_BUILD' in env) return SPACE_16COLORS;

  // JetBrains TeamCity support 256 colors since 2020.1.1 (2020-06-23)
  if ('TEAMCITY_VERSION' in env) return SPACE_256COLORS;

  // CI tools
  // https://github.com/watson/ci-info/blob/master/vendors.json
  if ('CI' in env) {
    // CI supports true colors
    if (someEnv(['GITHUB_ACTIONS', 'GITEA_ACTIONS'])) return SPACE_TRUECOLOR;

    // others CI supports only 16 colors
    //if (env.CI_NAME === 'codeship' || env.CI_NAME === 'sourcehut') return SPACE_16COLORS;
    //if (someEnv(['GITLAB_CI', 'TRAVIS', 'CIRCLECI', 'APPVEYOR', 'BUILDKITE', 'DRONE'])) return SPACE_16COLORS;

    return SPACE_16COLORS;
  }

  // unknown output or colors are not supported
  if (!isTTY || /-mono|dumb/i.test(term)) return SPACE_MONO;

  // truecolor support starts from Windows 10 build 14931 (2016-09-21), in 2024 we assume modern Windows is used
  if (isWin) return SPACE_TRUECOLOR;

  // kitty is GPU based terminal emulator, xterm-direct indicates truecolor support
  if (/^xterm-(kitty|direct)$/i.test(term)) return SPACE_TRUECOLOR;

  // JetBrains IDEA: JetBrains-JediTerm
  // TODO: enable truecolor output in IDEA (defaults output 256 colors) if anybody need it
  //if (env.TERMINAL_EMULATOR?.include('JediTerm')) return SPACE_TRUECOLOR;

  // note: check for 256 colors after ENV variables such as TERM, COLORTERM, TERMINAL_EMULATOR etc.
  // terminals, that support 256 colors, e.g., native macOS terminal
  if (/-256(colou?r)?$/i.test(term)) return SPACE_256COLORS;

  // known terminals supporting 16 colors
  if (/^screen|^tmux|^xterm|^vt[1-5][0-9]([0-9])?|^ansi|color|cygwin|linux|mintty|rxvt/i.test(term)) return SPACE_16COLORS;

  // note: for unknown terminals we allow truecolor output,
  // because all terminals supporting only 16 or 256 colors have already been detected above
  return SPACE_TRUECOLOR;
};

/**
 * @param {Object?} mockThis The mock object of globalThis, used by unit test only.
 * @return {number}
 */
export const getColorSpace = (mockThis) => {
  /**
   * Detect whether flags exist with `-` or `--` prefix in command-line arguments.
   *
   * @param {RegExp} regex The RegEx to match all possible flags.
   * @return {boolean}
   */
  let hasFlag = (regex) => !!argv.find((value) => regex.test(value));

  let _this = mockThis || globalThis;
  let Deno = _this.Deno;
  let isDeno = Deno != null;
  let proc = _this.process || Deno || {};
  let stdout = proc.stdout;
  let platform = isDeno ? Deno.build.os : proc.platform;
  let isWin = platform === 'win32';

  // Node -> `argv`, Deno -> `args`
  let argv = proc.argv || proc.args || [];
  let env = proc.env || {};
  let colorSpace = -1;

  if (isDeno) {
    try {
      // Deno requires the permission for the access to env, use the `--allow-env` flag: deno run --allow-env ./app.js
      env = env.toObject();
    } catch (e) {
      // Deno: if interactive permission is not granted, do nothing, no colors
      colorSpace = SPACE_MONO;
    }
  }

  // When FORCE_COLOR is present and not an empty string (regardless of its value, except `false` or `0`),
  // it should force the addition of ANSI color.
  // See https://force-color.org

  let FORCE_COLOR = 'FORCE_COLOR';
  let forceColorValue = env[FORCE_COLOR];
  let forceColorNum = parseInt(forceColorValue);
  let forceColor = forceColorValue === 'false' ? SPACE_MONO : isNaN(forceColorNum) ? SPACE_TRUECOLOR : forceColorNum;

  let isForceDisabled = 'NO_COLOR' in env
    || forceColor === SPACE_MONO
    // --no-color --color=false --color=never
    || hasFlag(/^-{1,2}(no-color|color=(false|never))$/);

  // --color --color=true --color=always
  let isForceEnabled = (FORCE_COLOR in env && forceColor) || hasFlag(/^-{1,2}color=?(true|always)?$/);

  // when Next.JS runtime is `edge`, process.stdout is undefined, but colors output is supported
  // runtime values supported colors: `nodejs`, `edge`, `experimental-edge`
  let isNextJS = (env.NEXT_RUNTIME || '').indexOf('edge') > -1;

  // PM2 does not set process.stdout.isTTY, but colors may be supported (depends on actual terminal)
  let isPM2 = 'PM2_HOME' in env && 'pm_id' in env;

  // is used in any shell if GPG is installed
  let isGPG_TTY = 'GPG_TTY' in env;

  // whether the output is supported
  let isTTY = isGPG_TTY || isPM2 || isNextJS || (isDeno ? Deno.isatty(1) : stdout && 'isTTY' in stdout);

  // optimisation: placed here to reduce the size of the compiled bundle
  if (isForceDisabled) return SPACE_MONO;

  if (colorSpace < 0) {
    colorSpace = detectColorSpace(env, isTTY, isWin);
  }

  return isForceEnabled && colorSpace === SPACE_MONO ? SPACE_TRUECOLOR : colorSpace;
};
