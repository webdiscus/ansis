import ansis from 'ansis';
import colorNames from 'css-color-names' with { type: 'json' };

// columns from CLI arg (default 3): `node named-truecolors.js 2`
const columns = Math.max(1, Number(process.argv[2]) || 3);
// spaces between columns
const columnGap = 2;

// extended instance containing named truecolors
const color = ansis.extend(colorNames);

// sorted color names
const names = Object.keys(colorNames).sort((a, b) => a.localeCompare(b));

const getBgName = (name) => 'bg' + name[0].toUpperCase() + name.slice(1);

// prebuild colored raw parts
const items = names.map((name) => {
  const bgName = getBgName(name);
  return {
    left: color[name](`${name} `), // colorized foreground
    right: color[bgName].black(` ${bgName} `), // colorized background
  };
});

// compute max visible widths for left/right blocks
const maxLeftWidth = Math.max(...items.map((item) => ansis.strip(item.left).length));
const maxRightWidth = Math.max(...items.map((item) => ansis.strip(item.right).length));
const cellWidth = maxLeftWidth + maxRightWidth;

// build cells: pad inside (between left and right blocks), then pad after entire cell to fixed width
const cells = items.map((item) => {
  const leftWidth = ansis.strip(item.left).length;
  const padLeft = ' '.repeat(maxLeftWidth - leftWidth);
  const columnContent = item.left + padLeft + item.right;
  const columnWidth = ansis.strip(columnContent).length;
  const padAfter = ' '.repeat(cellWidth - columnWidth + columnGap);

  return columnContent + padAfter;
});

// layout: top->bottom, then next column
const rows = Math.ceil(cells.length / columns);
let out = '';

for (let row = 0; row < rows; row++) {
  let line = '';
  for (let col = 0; col < columns; col++) {
    const i = row + col * rows;
    if (i < cells.length) line += cells[i];
  }
  out += line.replace(/\s+$/, '') + '\n';
}

console.log(out);
