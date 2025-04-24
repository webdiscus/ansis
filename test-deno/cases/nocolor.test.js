import { assertEquals } from 'https://deno.land/std/assert/mod.ts';

// NOTE:
// Test it with the `--allow-env` flag

// import env variables to simulate no color, it works only with `--allow-env` flag
import '../../test/env/no-color.js';

//import ansis, { hex } from '../../src/index.mjs';
import ansis, { hex } from 'ansis';

Deno.test('isSupported()', () => {
  const received = ansis.isSupported();
  const expected = false;
  assertEquals(received, expected);
});

Deno.test('no color', () => {
  const received = hex('#00c200')`foo`;
  const expected = 'foo';
  assertEquals(received, expected);
});
