#!/usr/bin/env node

import ansis, { bg, bgRgb, black, rgb, white, whiteBright } from '../../../src/index.mjs';

const env = process.env;
const write = (value) => process.stdout.write(value);

let value = (name, received) => `  ${name}: ${String(received)}\n`;

let renderAnsi256Table = () => {
  for (let index = 0; index < 256; index++) {
    let textColor = index < 16 || (index >= 232 && index < 244) ? whiteBright : black;
    write(textColor.bg(index)(` ${String(index).padStart(3, ' ')} `));
    if ((index + 1) % 16 === 0) write('\n');
  }
};

let renderTrueColorGradient = (render) => {
  for (let index = 0; index < 64; index++) {
    let ratio = index / 63;
    let red = Math.round(255 * ratio);
    let green = Math.round(255 * (1 - Math.abs(index - 31.5) / 31.5));
    let blue = Math.round(255 * (1 - ratio));
    write(render(red, green, blue));
  }
  write('\n');
};

write('\n');
write(' === Color support checker ===\n');
write('\n');
write('Runtime\n');
write(value('process.version', process.version));
write(value('process.platform', process.platform));
write(value('process.stdout.isTTY', process.stdout?.isTTY));
write(value('process.stderr.isTTY', process.stderr?.isTTY));
write(value('process.env.TERM', env.TERM));
write(value('process.env.COLORTERM', env.COLORTERM));
write(value('process.env.NO_COLOR', env.NO_COLOR));
write(value('process.env.FORCE_COLOR', env.FORCE_COLOR));
write(value('process.env.CI', env.CI));
write(value('process.env.GITHUB_ACTIONS', env.GITHUB_ACTIONS));
write(value('process.env.PM2_HOME', env.PM2_HOME));
write(value('process.env.NEXT_RUNTIME', env.NEXT_RUNTIME));
write('\n');
write('Ansis\n');
write(value('ansis.level', ansis.level));
write(value('ansis.isSupported()', ansis.isSupported()));
write('\n');
write('Visual check: colored samples should render as colors, not as ANSI escape codes.\n');
write('\n');

write('ANSI 16 colors\n');
[
  ansis.black,
  ansis.red,
  ansis.green,
  ansis.yellow,
  ansis.blue,
  ansis.magenta,
  ansis.cyan,
  ansis.white,
  ansis.gray,
  ansis.redBright,
  ansis.greenBright,
  ansis.yellowBright,
  ansis.blueBright,
  ansis.magentaBright,
  ansis.cyanBright,
  ansis.whiteBright,
].forEach((color, index) => {
  write(color(String(index).padStart(2, '0')));
  write(' ');
});
write('\n');
write('\n');

write('ANSI 256 colors\n');
renderAnsi256Table();
write('\n');

write('TrueColor foreground\n');
renderTrueColorGradient((red, green, blue) => rgb(red, green, blue)('●'));
write('\n');

write('TrueColor background\n');
renderTrueColorGradient((red, green, blue) => bgRgb(red, green, blue)('·'));
write('\n');
write('\n');