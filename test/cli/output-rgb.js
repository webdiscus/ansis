#!/usr/bin/env node

/**
 * Test terminal output controlled by CLI flags (`--no-color`, `--color`)
 * and environment variables (`NO_COLOR`, `FORCE_COLOR`).
 */

// import { rgb } from '../../src/index.mjs'; // for debugging only
import { rgb } from 'ansis';

console.log(rgb(255, 46, 135)('_PINK_'));