import { hex } from 'ansis';

// example from // https://github.com/facebook/stylex/blob/main/packages/cli/src/index.js
const primary = '#5B45DE';
const secondary = '#D573DD';
const sx = hex(secondary).bold;

console.log(
  hex(primary).bold`
   .d8888b.  888             888         ${sx`Y88b   d88P`}
  d88P  Y88b 888             888          ${sx`Y88b d88P`}
  Y88b.      888             888           ${sx`Y88o88P`}
   "Y888b.   888888 888  888 888  .d88b.    ${sx`Y888P`}
      "Y88b. 888    888  888 888 d8P  Y8b   ${sx`d888b`}
        "888 888    888  888 888 88888888  ${sx`d88888b`}
  Y88b  d88P Y88b.  Y88b 888 888 Y8b.     ${sx`d88P Y88b`}
   "Y8888P"   "Y888  "Y88888 888  "Y8888 ${sx`cd88P   Y88b`}
                         888
                    Y8b d88P
                     "Y88P"
`,
);
