import { describe, expect, test } from 'vitest';

import { Ansis } from 'ansis';

const { red } = new Ansis(1);

// Should not throw RangeError: Maximum call stack size exceeded.
// https://github.com/jorgebucaran/colorette/issues/104
describe('large string with ANSI sequences', () => {
  test(`no RangeError`, () => {
    let string = 'red';

    for (let i = 0; i < 1_000_000; i++) {
      string += `\x1b[39m`;
    }

    const received = red(string);

    expect(received.startsWith('\x1b[31mred')).toEqual(true);
    expect(received.endsWith('\x1b[39m')).toEqual(true);
  });
});
