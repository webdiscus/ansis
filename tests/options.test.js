import { Ansis } from '../src/index.js';
import assert from 'node:assert';

export function testStreamOption() {
  const mockStream = { isTTY: true };
  const ansis = new Ansis({ stream: mockStream });
  assert.strictEqual(ansis.enabled, true);
  console.log('testStreamOption passed');
}

testStreamOption();