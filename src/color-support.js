import { SPACE_MONO, SPACE_16_COLORS, SPACE_256_COLORS, SPACE_TRUE_COLORS } from './color-spaces.js';

/**
 * Detect color space.
 *
 * Truecolor is supported by:
 * - some CI (e.g. GitHub CI)
 * - Windows (since Windows 10 revision 14931)
 * - iTerm, VSCode, JetBrains-JediTerm
 * - xterm-kitty
 *
 * @param {object} env
 * @param {boolean} isTTY
 * @return {number}
 */
const detectColorSpace = (env, isTTY) => {
  const inEnvSome = (arr) => arr.some(val => val in env);
  const { TERM: term, COLORTERM: colorterm } = env;

  // note: the order of checks is important
  // many terminals that support truecolor have TERM as `xterm-256colors` but do not set COLORTERM to `truecolor`
  // therefore they can be detected by specific EVN variables

  // note: first, CI environments must be detected since they are not TTY and often advertise themselves as `dumb` terminals

  // Azure DevOps CI
  // https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
  if ('TF_BUILD' in env) return SPACE_16_COLORS;

  // JetBrains TeamCity support 256 colors since 2020.1.1 (2020-06-23)
  if ('TEAMCITY_VERSION' in env) return SPACE_256_COLORS;

  // CI tools
  // https://github.com/watson/ci-info/blob/master/vendors.json
  if ('CI' in env) {
    // CI supports true colors
    if (inEnvSome(['GITHUB_ACTIONS', 'GITEA_ACTIONS'])) return SPACE_TRUE_COLORS;

    // others CI supports only 16 colors
    //if (env.CI_NAME === 'codeship' || env.CI_NAME === 'sourcehut') return SPACE_16_COLORS;
    //if (inEnvSome(['GITLAB_CI', 'TRAVIS', 'CIRCLECI', 'APPVEYOR', 'BUILDKITE', 'DRONE'])) return SPACE_16_COLORS;

    return SPACE_16_COLORS;
  }

  // unknown output or colors are not supported
  if (!isTTY || /-mono|dumb/i.test(term)) return SPACE_MONO;

  // terminals, that support truecolor, e.g., iTerm, VSCode
  if (colorterm === 'truecolor' || colorterm === '24bit') return SPACE_TRUE_COLORS;

  // kitty is GPU based terminal emulator
  if (term === 'xterm-kitty') return SPACE_TRUE_COLORS;

  // JetBrains IDEA: JetBrains-JediTerm
  // TODO: enable truecolor output in IDEA (defaults output 256 colors) if anybody need it
  //if (env.TERMINAL_EMULATOR?.include('JediTerm')) return SPACE_TRUE_COLORS;

  // note: check for 256 colors after ENV variables such as TERM, COLORTERM, TERMINAL_EMULATOR etc.
  // terminals, that support 256 colors, e.g., native macOS terminal
  if (/-256(colou?r)?$/i.test(term)) return SPACE_256_COLORS;

  // known terminals supporting 16 colors
  if (/^screen|^tmux|^xterm|^vt[1-5][0-9]([0-9])?|^ansi|color|cygwin|linux|mintty|rxvt/i.test(
    term)) return SPACE_16_COLORS;

  // note: for unknown terminals we allow truecolor output,
  // because all terminals supporting only 16 or 256 colors have already been detected above
  return SPACE_TRUE_COLORS;
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
  const hasFlag = (regex) => !!argv.find((value) => regex.test(value));

  const _this = mockThis || globalThis;
  const Deno = _this.Deno;
  const isDeno = Deno != null;
  const proc = _this.process || Deno || {};
  const stdout = proc.stdout;
  const platform = isDeno ? Deno.build.os : proc.platform;
  const isWin = platform === 'win32';

  // Node -> `argv`, Deno -> `args`
  const argv = proc.argv || proc.args || [];
  let env = proc.env || {};
  let colorSpace;

  if (isDeno) {
    try {
      // Deno requires the permission for the access to env, use the `--allow-env` flag: deno run --allow-env ./app.js
      env = env.toObject();
    } catch (e) {
      // Deno: if interactive permission is not granted, do nothing, no colors
      colorSpace = SPACE_MONO;
    }
  }

  const FORCE_COLOR = 'FORCE_COLOR';
  const hasForceColor = FORCE_COLOR in env;
  const forceColorValue = env[FORCE_COLOR];
  const forceColor = forceColorValue === 'true' || parseInt(forceColorValue, 10) > 0;

  const isForceDisabled = 'NO_COLOR' in env
    || (hasForceColor && !forceColor)
    // --no-color --color=false --color=never
    || hasFlag(/^-{1,2}(no-color|color=(false|never))$/);

  // --color --color=true --color=always
  const isForceEnabled = (hasForceColor && forceColor) || hasFlag(/^-{1,2}color=?(true|always)?$/);

  // when Next.JS runtime is `edge`, process.stdout is undefined, but colors output is supported
  // runtime values supported colors: `nodejs`, `edge`, `experimental-edge`
  const isNextJS = (env.NEXT_RUNTIME || '').indexOf('edge') > -1;
  // PM2 does not set process.stdout.isTTY, but colors may be supported (depends on actual terminal)
  const isPM2 = 'PM2_HOME' in env && 'pm_id' in env;
  const isTTY = isNextJS || isPM2 || (isDeno ? Deno.isatty(1) : stdout && 'isTTY' in stdout);

  if (isForceDisabled) return SPACE_MONO;

  if (colorSpace == null) {
    // truecolor support starts from Windows 10 build 14931 (2016-09-21), in 2024 we assume modern Windows is used
    colorSpace = isWin ? SPACE_TRUE_COLORS : detectColorSpace(env, isTTY);
  }

  return isForceEnabled && colorSpace === SPACE_MONO ? SPACE_TRUE_COLORS : colorSpace;
};
