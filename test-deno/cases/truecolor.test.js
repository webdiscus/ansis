import { assertEquals } from 'https://deno.land/std/assert/mod.ts';

// import env variables to simulate ANSI 256 color space
import '../../test/env/truecolor.js';

//import ansis, { hex} from '../../src/index.mjs'; // for debugging only
import ansis, { hex } from 'ansis';

Deno.test('isSupported()', () => {
  const received = ansis.isSupported();
  const expected = true;
  assertEquals(received, expected);
});

Deno.test('truecolor', () => {
  const received = hex('#00c200')`foo`;
  const expected = '\x1b[38;2;0;194;0mfoo\x1b[39m';
  assertEquals(received, expected);
});
