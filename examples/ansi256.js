import { fg, bg } from '../src/index.js';

let out;
let n;
let textCol;

// 0..15: 16 colors
out = '';
let prefix = '';
for (let i = 0; i <= 7; i++) {
  if (i < 10) prefix = ' ';
  else prefix = '';
  out += bg(i).whiteBright('  ' + prefix + i.toString() + '  ');
}

for (let i = 8; i <= 15; i++) {
  if (i < 10) prefix = ' ';
  else prefix = '';
  out += bg(i).black('  ' + prefix + i.toString() + '  ');
}
out += '\n\n';

// 16..231: 6 × 6 × 6 cube (216 colors)
const generate216colors = (textCol, offset = 0) => {
  let size = 6 * 6 * 3;
  let cols = 18;
  let startColorNum = 16;
  let row = 0;
  let out = '';
  let color;

  for (let i = 0; i < size; i++) {
    let prefix = '';

    if (offset === cols) {
      offset = 0;
      out += '\n';
      row++;
    } else if (offset === cols / 3 || offset === cols * 2 / 3) {
      out += ' '.padStart(3);
    }

    color = startColorNum + (i + 18 * row);

    if (color < 10) prefix = '  ';
    else if (color < 100) prefix = ' ';
    out += '' + fg(textCol).bg(color)(prefix + ' ' + color.toString() + ' ') + '';
    offset++;
  }

  return out + '\n';
};

out += generate216colors(15, 0);
out += generate216colors(0, 18);

// 232..255: grayscale from black to white in 24 steps
textCol = 15;
n = 0;
for (let i = 232; i <= 255; i++) {
  if (i > 243) textCol = 0;
  if (n % 12 === 0) out += '\n';

  out += fg(textCol).bg(i)('   ' + i.toString() + '  ');
  n++;
}

//console.log(out);
export { out as ansi256Table };
