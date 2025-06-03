// NOTE:
// Test it w/o the `--allow-env` flag to simulate deny permissions,
// that should leads to no color output.

import { hex } from '../../src/index.mjs';
//import ansis, { hex } from 'ansis';

console.log(hex('#a167fa')('\n>> Deno color output\n'));
