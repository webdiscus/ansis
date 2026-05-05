#!/usr/bin/env node

/**
 * Test terminal output controlled by CLI flags (`--no-color`, `--color`)
 * and environment variables (`NO_COLOR`, `FORCE_COLOR`).
 */

// import { red } from '../../src/index.mjs'; // for debugging only
import { red } from 'ansis';

console.log(red('_RED_'));