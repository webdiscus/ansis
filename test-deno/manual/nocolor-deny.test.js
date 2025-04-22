import { assertEquals } from 'https://deno.land/std/assert/mod.ts';

// NOTE:
// Test it w/o the `--allow-env` flag to simulate deny permissions,
// that should leads to no color output.

//import ansis, { hex } from '../src/index.mjs';
import ansis, { hex } from 'ansis';

Deno.test('no color', () => {
  const received = hex('#00c200')`foo`;
  const expected = 'foo';
  assertEquals(received, expected);
});

Deno.test('isSupported()', () => {
  const received = ansis.isSupported();
  const expected = false;
  assertEquals(received, expected);
});
