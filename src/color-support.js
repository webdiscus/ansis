import { LEVEL_UNDEFINED, LEVEL_BW, LEVEL_16COLORS, LEVEL_256COLORS, LEVEL_TRUECOLOR } from './color-levels.js';
import { keys, separator } from './misc.js';

/**
 * Detect color level.
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
let detectColors = (env, isTTY, isWin) => {
  let term = env.TERM;
  let envKeys = separator + keys(env).join(separator);

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
  }[env.COLORTERM]

  if (level) return level;

  // 2) Detect color support in CI.
  // Note: CI environments are not TTY and often advertise themselves as `dumb` terminals.

  // Azure DevOps CI
  // https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
  if (!!env.TF_BUILD) return LEVEL_16COLORS;

  // JetBrains TeamCity support 256 colors since 2020.1.1 (2020-06-23), TEAMCITY_VERSION in env
  if (/,TEAMCI/.test(envKeys)) return LEVEL_256COLORS;

  // CI tools
  // https://github.com/watson/ci-info/blob/master/vendors.json
  if (!!env.CI) {
    // CI supports truecolor: GITHUB_ACTIONS, GITEA_ACTIONS
    if (/,GIT(HUB|EA)/.test(envKeys)) return LEVEL_TRUECOLOR;

    // others CI supports only 16 colors, e.g. when env contains:
    // - CI_NAME === codeship | sourcehut
    // - GITLAB_CI | TRAVIS | CIRCLECI |APPVEYOR | BUILDKITE | DRONE

    return LEVEL_16COLORS;
  }

  // 3) Detect unknown output or colors are not supported
  if (!isTTY || term === 'dumb') return LEVEL_BW;

  // 4) Truecolor support starts from Windows 10 build 14931 (2016-09-21), in 2025 we assume modern Windows is used
  if (isWin) return LEVEL_TRUECOLOR;

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
 * @param {Object?} mockThis The mock object of globalThis, used by unit test only.
 * @return {number}
 */
export const getLevel = (mockThis) => {
  /**
   * Detect whether flags exist in command-line arguments.
   *
   * @param {RegExp} regex The RegEx to match all possible flags.
   * @return {boolean}
   */
  let hasFlag = (regex) => argv?.some((value) => regex.test(value));

  let _this = mockThis ?? globalThis;
  let Deno = _this.Deno;
  let isDeno = !!Deno;
  let proc = _this.process || Deno || {};

  // Node -> `argv`, Deno -> `args`
  let argv = proc.argv ?? proc.args;
  let env = proc.env ?? {};
  let colorLevel = LEVEL_UNDEFINED;

  if (isDeno) {
    try {
      // Deno requires the permission for the access to env, use the `--allow-env` flag: deno run --allow-env ./app.js
      env = env.toObject();
    } catch (e) {
      // Deno: if interactive permission is not granted, do nothing, no colors
      colorLevel = LEVEL_BW;
    }
  }

  // PM2 does not set process.stdout.isTTY, but colors may be supported (depends on actual terminal)
  let isPM2 = !!env.PM2_HOME && !!env.pm_id;

  // when Next.JS runtime is `edge`, process.stdout is undefined, but colors output is supported
  // runtime values supported colors: `nodejs`, `edge`, `experimental-edge`

  // whether the output is supported
  let isTTY = isPM2 || env.NEXT_RUNTIME?.includes('edge') || (isDeno ? Deno.isatty(1) : !!proc.stdout?.isTTY);

  // enforce a specific color support:
  // FORCE_COLOR=false   // disables colors
  // FORCE_COLOR=0       // disables colors
  // FORCE_COLOR=true    // auto detects the supported colors (if no color detected, enforce truecolor)
  // FORCE_COLOR=(unset) // auto detects the supported colors (if no color detected, enforce truecolor)
  // FORCE_COLOR=1       // 16 colors
  // FORCE_COLOR=2       // 256 colors
  // FORCE_COLOR=3       // truecolor
  // See:
  //  - https://force-color.org
  //  - https://nodejs.org/api/tty.html#writestreamhascolorscount-env
  //  - https://nodejs.org/api/cli.html#force_color1-2-3

  let FORCE_COLOR = 'FORCE_COLOR';
  let forceColorValue = env[FORCE_COLOR];

  // mapping FORCE_COLOR values to color level values
  let forceLevel = {
    false: LEVEL_BW,
    0: LEVEL_BW,
    1: LEVEL_16COLORS,
    2: LEVEL_256COLORS,
    3: LEVEL_TRUECOLOR,
  }[forceColorValue] ?? LEVEL_UNDEFINED;

  // if FORCE_COLOR is present and is neither 'false' nor '0', OR has one of the flags: --color --color=true --color=always
  let isForceEnabled = (FORCE_COLOR in env && forceLevel) || hasFlag(/^--color=?(true|always)?$/);

  if (isForceEnabled) colorLevel = forceLevel;

  // if colorLevel === LEVEL_UNDEFINED, attempt to detect color level, returns 0, 1, 2 or 3
  if (!~colorLevel) colorLevel = detectColors(env, isTTY, (isDeno ? Deno.build.os : proc.platform) === 'win32');

  // if force disabled: FORCE_COLOR=0 or FORCE_COLOR=false
  if (!forceLevel
    || !!env.NO_COLOR
    // --no-color --color=false --color=never
    || hasFlag(/^--(no-color|color=(false|never))$/)) return LEVEL_BW;

  // Detect browser support
  if (!!_this.window?.chrome) return LEVEL_TRUECOLOR;

  // API Rule: If color output is force enabled but the color level is detected as B&W (e.g., TERM is dumb),
  // enable truecolor since color depth support does not matter.

  // Optimisation: `!colorLevel` is equivalent to `colorLevel === LEVEL_BW`
  return isForceEnabled && !colorLevel ? LEVEL_TRUECOLOR : colorLevel;
};
