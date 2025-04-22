import { SPACE_UNDEFINED, SPACE_BW, SPACE_16COLORS, SPACE_256COLORS, SPACE_TRUECOLOR } from './color-spaces.js';
import { keys, separator } from './misc.js';

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
  // Use `echo $TERM` command to display terminal name in `env.TERM`.
  let term = env.TERM;
  let envKeys = separator + keys(env).join(separator);

  // note: the order of checks is important
  // many terminals that support truecolor have TERM as `xterm-256colors` and `COLORTERM=truecolor`
  // or do not set COLORTERM to `truecolor`
  // therefore they can be detected by specific ENV variables

  // 1) Detect color support in COLORTERM
  // Common COLORTERM Values: `truecolor` or `24bit`, `ansi256`, `ansi`
  // Terminals supporting truecolor: iTerm, VSCode

  let colorspace = {
    '24bit': SPACE_TRUECOLOR,
    truecolor: SPACE_TRUECOLOR,
    ansi256: SPACE_256COLORS,
    ansi: SPACE_16COLORS,
  }[env.COLORTERM]

  if (colorspace) return colorspace

  // 2) Detect color support in CI,
  // since in CI environments are not TTY and often advertise themselves as `dumb` terminals

  // Azure DevOps CI
  // https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
  if (!!env.TF_BUILD) return SPACE_16COLORS;

  // JetBrains TeamCity support 256 colors since 2020.1.1 (2020-06-23), TEAMCITY_VERSION in env
  if (/,TEAMCI/.test(envKeys)) return SPACE_256COLORS;

  // CI tools
  // https://github.com/watson/ci-info/blob/master/vendors.json
  if (!!env.CI) {
    // CI supports truecolor: GITHUB_ACTIONS, GITEA_ACTIONS
    if (/,GIT(HUB|EA)/.test(envKeys)) return SPACE_TRUECOLOR;

    // others CI supports only 16 colors
    //if (env.CI_NAME === 'codeship' || env.CI_NAME === 'sourcehut') return SPACE_16COLORS;
    //if (/,(GITLAB_CI|TRAVIS|CIRCLECI|APPVEYOR|BUILDKITE|DRONE)/.test(envKeys)) return SPACE_16COLORS;

    return SPACE_16COLORS;
  }

  // 3) Detect unknown output or colors are not supported
  if (!isTTY || /-mono|dumb/i.test(term)) return SPACE_BW;

  // 4) Truecolor support starts from Windows 10 build 14931 (2016-09-21), in 2025 we assume modern Windows is used
  if (isWin) return SPACE_TRUECOLOR;

  // 5) Detect terminal emulator with truecolor support

  // kitty or KDE terminal
  // - xterm-kitty
  // - xterm-direct
  if (/term-(kit|dir)/.test(term)) return SPACE_TRUECOLOR;

  // JetBrains IDEA: JetBrains-JediTerm
  // TODO: enable truecolor output in IDEA (defaults output 256 colors) if anybody need it
  //if (env.TERMINAL_EMULATOR?.include('JediTerm')) return SPACE_TRUECOLOR;

  // 6) Detect terminal emulator with 256 color support

  // note: check for 256 colors after ENV variables such as TERM, COLORTERM, TERMINAL_EMULATOR etc.
  // terminals, that support 256 colors, e.g., native macOS terminal
  // - screen-256color
  // - xterm-256color
  // - rxvt-256color
  // - putty-256color
  // - mintty-256color
  // - linux-256color
  // - tmux-256color
  // - ansi-256color
  if (/-256/.test(term)) return SPACE_256COLORS;

  // 7) Detect terminal emulator with 16 color support

  // Known terminals supporting 16 colors.
  // - screen-color
  // - xterm-color
  // - ansi, ansi-x3.64, ansi.sysk
  // - linux - Linux virtual console (tty1, tty2, SSH, etc.)
  // - tmux - Terminal emulator
  // - tmux - Terminal tmux installed on macOS has `tmux-256color` name
  // - cygwin - Cygwin terminal
  // - mintty - Default terminal emulator for Cygwin
  // - putty-color
  // - rxvt-color - terminal emulator for X Window System
  // - vt100,vt102,vt110,vt220,vt240,vt320,vt420,vt520 - names historically used with Unix
  if (/scr|xterm|tty|ansi|color|[nm]ux|vt|cyg/.test(term)) return SPACE_16COLORS;

  // 8) For unknown terminals we allow truecolor output,
  // since all terminals supporting only 16 or 256 colors have already been detected above

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
  let hasFlag = (regex) => argv.some((value) => regex.test(value));

  let _this = mockThis || globalThis;
  let proc = _this.process || {};
  let argv = proc.argv || [];
  let colorSpace = SPACE_UNDEFINED;
  let env = proc.env || {};
  let isDeno = !!_this.Deno;

  // In deno 2.0+, the `process` is available globally
  if (isDeno) {
    try {
      // Trigger Deno request to env access, by deny permission throws an error
      keys(env);
    } catch (error) {
      // if the permission is not granted, environment variables have no effect, even variables like FORCE_COLOR will be ignored
      // env now points to a new empty object to avoid Deno requests for every env access in code below
      env = {};
      colorSpace = SPACE_BW;
    }
  }

  // PM2 does not set process.stdout.isTTY, but colors may be supported (depends on actual terminal)
  let isPM2 = !!env.PM2_HOME && !!env.pm_id;

  // when Next.JS runtime is `edge`, process.stdout is undefined, but colors output is supported
  // runtime values supported colors: `nodejs`, `edge`, `experimental-edge`

  // whether the output is supported
  let isTTY = isPM2 || env.NEXT_RUNTIME?.includes('edge') || !!proc.stdout?.isTTY;

  // enforce a specific color support:
  // FORCE_COLOR=false   // 2 colors (no color)
  // FORCE_COLOR=0       // 2 colors (no color)
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
  let forceColorNum = parseInt(forceColorValue);
  let forceColor = isNaN(forceColorNum) ? forceColorValue === 'false' ? 0 : SPACE_UNDEFINED : forceColorNum;

  // if FORCE_COLOR is present and is neither 'false' nor '0', OR has one of the flags: --color --color=true --color=always
  let isForceEnabled = (FORCE_COLOR in env && forceColor) || hasFlag(/^-{1,2}color=?(true|always)?$/);

  // ignore edge case for unsupported value, e.g. if value > 3
  if (isForceEnabled) colorSpace = forceColor;

  // if color space is undefined attempt to detect one with additional method, returns 0, 1, 2 or 3
  // size optimisation: place the `isWin` variable as expression directly in function argument
  if (colorSpace < SPACE_BW) colorSpace = detectColorSpace(env, isTTY, proc.platform === 'win32');

  // if force disabled
  if (!forceColor
    || !!env.NO_COLOR
    // --no-color --color=false --color=never
    || hasFlag(/^-{1,2}(no-color|color=(false|never))$/)) return SPACE_BW;

  // optimisation: `!colorSpace` is equivalent to `colorSpace === SPACE_BW`
  // detect browser support: !!_this.window?.chrome
  return (isForceEnabled && !colorSpace) || !!_this.window?.chrome ? SPACE_TRUECOLOR : colorSpace;
};
