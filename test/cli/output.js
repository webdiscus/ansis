#!/usr/bin/env node
import { red, rgb, bgRgb, hex, bgHex } from '../../src/index.mjs';

// test output into terminal, depends on flags (--no-color, --color) and environment variables (NO_COLOR, FORCE_COLOR)

console.log(
  red('red') +
  '|' +
  rgb(80, 80, 80)('rgb') +
  '|' +
  bgRgb(80, 80, 80)('bgRgb') +
  '|' +
  hex('#fff')('hex') +
  '|' +
  bgHex('#fff')('bgHex'),
);