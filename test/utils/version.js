import { Ansis } from 'ansis';

// create instance with force color output because vitest is not TTY
const color = new Ansis(1);

const pkg = require('../../node_modules/ansis/package.json');

console.log(color.bgYellowBright.black` TEST the Ansis version `, color.greenBright(pkg.version));