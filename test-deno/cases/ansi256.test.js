import { assertEquals } from 'https://deno.land/std/assert/mod.ts';

// import env variables to simulate ANSI 256 color space
import '../../test/env/ansi256-colors.js';

//import ansis, { hex, fg } from '../../src/index.mjs'; // for debugging only
import ansis, { hex, fg } from 'ansis';

Deno.test('isSupported()', () => {
  const received = ansis.isSupported();
  const expected = true;
  assertEquals(received, expected);
});

Deno.test('ansi 256', () => {
  const received = fg(40)`foo`;
  const expected = '\x1b[38;5;40mfoo\x1b[39m';
  assertEquals(received, expected);
});

Deno.test('fallback to 256', () => {
  const received = hex('#00c200')`foo`;
  const expected = '\x1b[38;5;40mfoo\x1b[39m';
  assertEquals(received, expected);
});
