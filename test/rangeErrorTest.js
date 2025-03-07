import { red } from '../dist/index.mjs';

let string = 'red';

for (let i = 0; i < 1_000_000; i++) {
  string += `\x1b[39m`;
}

// test: should output the `red` string in red, w/o RangeError: Maximum call stack size exceeded
// https://github.com/jorgebucaran/colorette/issues/104
console.log(red(string));