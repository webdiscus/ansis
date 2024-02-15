/**
 * @param {Object?} mockThis The mock object of globalThis, used by unit test only.
 * @returns {boolean}
 */
export const isSupported = (mockThis) => {
  /**
   * Detect whether flags exist with `-` or `--` prefix in command-line arguments.
   *
   * @param {RegExp} regex The RegEx to match all possible flags.
   * @return {boolean}
   */
  const oneOfFlags = (regex) => !!argv.find((value) => regex.test(value));

  const _this = mockThis || globalThis;
  const isDeno = _this.Deno != null;
  const proc = _this.process || _this.Deno || {};

  // Node -> `argv`, Deno -> `args`
  const argv = proc.argv || proc.args || [];

  let env = {};

  try {
    // Deno requires the permission for the access to env, use the `--allow-env` flag: deno run --allow-env ./app.js
    env = isDeno ? proc.env.toObject() : proc.env || {};
  } catch (e) {
    // Deno: if interactive permission is not granted, do nothing, no colors
  }

  const FORCE_COLOR = 'FORCE_COLOR';
  const hasForceColor = FORCE_COLOR in env;
  const forceColorValue = env[FORCE_COLOR];
  const forceColor = forceColorValue === 'true' || parseInt(forceColorValue, 10) > 0;

  const isForceDisabled = 'NO_COLOR' in env
    || (hasForceColor && !forceColor)
    || oneOfFlags(/^-{1,2}(no-color|color=false|color=never)$/);

  const isForceEnabled = (hasForceColor && forceColor) || oneOfFlags(/^-{1,2}(color|color=true|color=always)$/);

  const isWin = (isDeno ? _this.Deno.build.os : proc.platform) === 'win32';
  const isTTY = isDeno ? _this.Deno.isatty(1) : proc.stdout && 'isTTY' in proc.stdout;

  // when Next.JS runtime is `edge`, process.stdout is undefined, but colors output is supported
  // runtime values supported colors: `nodejs`, `edge`, `experimental-edge`
  const isNextJS = (env.NEXT_RUNTIME || '').indexOf('edge') > -1;

  const isTerm = (isTTY || isNextJS) &&
    /^screen|^tmux|^xterm|^vt[1-5][0-9][0-9]|^ansi|color|cygwin|linux|mintty|rxvt/i.test(env.TERM);

  return !isForceDisabled && (isForceEnabled || isTerm || isWin || 'CI' in env);
};
