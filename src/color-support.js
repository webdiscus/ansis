import { LEVEL_UNDEFINED, LEVEL_BW, LEVEL_16COLORS, LEVEL_256COLORS, LEVEL_TRUECOLOR } from './color-levels.js';
import { keys, separator } from './misc.js';

// Optimisation: declare variables here for more compact code shape after compilation
let term;

/**
 * Auto detect color level.
 *
 * Truecolor is supported by:
 * - some CI (e.g. GitHub CI)
 * - Windows (since Windows 10 revision 14931)
 * - iTerm, VSCode, JetBrains-JediTerm
 * - xterm-kitty
 *
 * See console programs supporting TrueColor https://github.com/termstandard/colors#truecolor-support-in-output-devices
 *
 * @param {object} proc The node process.
 * @param {object} env The node environment.
 * @param {string} envKeys All env keys squashed to string.
 * @return {number}
 */
let autoDetectLevel = (proc, env,  envKeys) => {
  // Optimisation: The Terser inlines a function at use place, so we can split the logic on small functions.

  // PM2 does not set process.stdout.isTTY, but color output may still be supported, depends on the actual terminal.
  // PM2 always sets PM2_HOME to a non-empty (truthy) value when running in either fork or cluster mode.
  let detectPM2 = () => env.PM2_HOME;

  // In the Next.js `edge` runtime, process.stdout is undefined, but colored output is still supported.
  // Runtime values that support colors: `nodejs`, `edge`, `experimental-edge`.
  let detectNextJs = () => /edge/.test(env.NEXT_RUNTIME);

  // Size optimization: intentionally returns a falsy/truthy value instead of a boolean.
  let isTTY = () => detectPM2() || detectNextJs() || proc.stdout?.isTTY;

  let isWin = () => proc.platform === 'win32';

  // Note: the order of checks is important!

  // 1) Detect terminals supporting TrueColor by COLORTERM
  // Most modern terminals use `TERM=xterm-256color` with `COLORTERM=truecolor`.
  // COLORTERM values: `truecolor` or `24bit`, `ansi256`, `ansi`
  // Terminals that set COLORTERM=truecolor: iTerm, VSCode, `xterm-kitty`, KDE Konsole.

  let level = {
    '24bit': LEVEL_TRUECOLOR,
    truecolor: LEVEL_TRUECOLOR,
    ansi256: LEVEL_256COLORS,
    ansi: LEVEL_16COLORS,
  }[env.COLORTERM];

  term = env.TERM;

  if (level) return level;

  // 2) Detect color support in CI.
  // Note: CI environments are not TTY and often advertise themselves as `dumb` terminals.

  // CI tools
  // https://github.com/watson/ci-info/blob/master/vendors.json
  if (env.CI) {
    // CI supports truecolor: GITHUB_ACTIONS
    if (/,GITHUB/.test(envKeys)) return LEVEL_TRUECOLOR;

    // others CI supports only 16 colors, e.g. when env contains:
    // - CI_NAME === codeship | sourcehut
    // - GITLAB_CI | CIRCLECI | TRAVIS | APPVEYOR | BUILDKITE | DRONE | BITBUCKET_BUILD_NUMBER | AZURE_HTTP_USER_AGENT

    return LEVEL_16COLORS;
  }

  // 3) Detect unknown output or colors are not supported
  if (!isTTY() || term === 'dumb') return LEVEL_BW;

  // 4) Truecolor support starts from Windows 10 build 14931 (2016-09-21), today we assume modern Windows is used
  if (isWin()) return LEVEL_TRUECOLOR;

  // 5) Detect terminals supporting 256 colors

  // Note: check for 256 colors after ENV variables such as TERM, COLORTERM.
  // Terminals, that support 256 colors:
  // - screen-256color
  // - xterm-256color
  // - rxvt-256color
  // - putty-256color
  // - mintty-256color
  // - linux-256color
  // - tmux-256color
  // - ansi-256color
  if (/-256/.test(term)) return LEVEL_256COLORS;

  // 6) Defaults, 16-color output for unknown terminals,
  // as all known terminals supporting 256 colors or truecolor have already been detected above.
  // To enable truecolor in unknown terminals, set the `COLORTERM=24bit` environment variable.

  // Known terminals supporting 16 colors:
  // - xterm
  // - xterm-color
  // - screen-color
  // - ansi, ansi-x3.64, ansi.sysk
  // - linux - Linux virtual console (tty1, tty2, SSH, etc.)
  // - tmux - Terminal emulator
  // - tmux - Terminal tmux installed on macOS has `tmux-256color` name
  // - cygwin - Cygwin terminal
  // - mintty - Default terminal emulator for Cygwin
  // - putty-color
  // - rxvt-color - terminal emulator for X Window System
  // - vt100,vt102,vt110,vt220,vt240,vt320,vt420,vt520 - names historically used with Unix

  return LEVEL_16COLORS;
};

/**
 * @param {Object?} thisRef The globalThis or mock object used by unit tests.
 * @return {number}
 */
export const getLevel = (thisRef) => {
  // Note: In Deno 2.0+, the `process` is available globally
  let proc = thisRef.process ?? {};
  let argv = proc.argv ?? [];
  let env = proc.env ?? {};
  let colorLevel = LEVEL_BW;

  try {
    // keys(env) triggers a Deno permission request; throws if access is denied
    // stringify environment variable keys to check for specific ones using a RegExp
    let envKeys = separator + keys(env).join(separator);
    colorLevel = autoDetectLevel(proc, env, envKeys);
  } catch (error) {
    // if the permission is not granted, environment variables have no effect, even variables like FORCE_COLOR will be ignored
    // env now points to a new empty object to avoid Deno requests for every env access in code below
    env = {};
  }

  // Auto-detected color level, fallback to 16 colors if detection fails.
  let enabledColorLevel = colorLevel || LEVEL_16COLORS;

  // FORCE_COLOR=false        // disables colors
  // FORCE_COLOR=0            // disables colors
  // FORCE_COLOR=1            // 16 colors
  // FORCE_COLOR=2            // 256 colors
  // FORCE_COLOR=3            // truecolor
  // FORCE_COLOR=true         // auto-detect, fallback to 16 colors if detection fails
  // FORCE_COLOR=''           // auto-detect, fallback to 16 colors if detection fails
  // FORCE_COLOR=<any other string> // auto-detect, fallback to 16 colors if detection fails
  // See also:
  //  - https://force-color.org
  //  - https://nodejs.org/api/tty.html#writestreamhascolorscount-env
  //  - https://nodejs.org/api/cli.html#force_color1-2-3

  // Resolve FORCE_COLOR to a final color level.
  let FORCE_COLOR = 'FORCE_COLOR';
  let forceColorValue = env[FORCE_COLOR];
  let forcedLevel =
    {
      false: LEVEL_BW,
      0: LEVEL_BW,
      1: LEVEL_16COLORS,
      2: LEVEL_256COLORS,
      3: LEVEL_TRUECOLOR,
    }[forceColorValue] ?? enabledColorLevel;

  // If multiple color flags are present, the last one wins.
  let colorFlag = LEVEL_UNDEFINED;
  let value;
  for (value of argv) {
    if (/^--color=?(true|always)?$/.test(value)) colorFlag = enabledColorLevel;
    if (/^--(no-color|color=(false|never))$/.test(value)) colorFlag = LEVEL_BW;
  }

  // Detect browser support
  if (thisRef.window?.chrome) return LEVEL_TRUECOLOR;

  // Priority rule: auto-detected color < NO_COLOR < CLI flags < FORCE_COLOR

  // 1) FORCE_COLOR has highest priority.
  if (FORCE_COLOR in env) return forcedLevel;

  // 2) CLI flags override NO_COLOR.
  if (~colorFlag) return colorFlag;

  // 3) NO_COLOR disables colors when set to a non-empty value. Empty string '' has no effect.
  if (env.NO_COLOR) return LEVEL_BW;

  // 4) Auto-detected color.
  return colorLevel;
};
