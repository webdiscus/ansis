import ansis from 'ansis';
import colorNames from 'css-color-names' with { type: 'json' };

// columns from CLI arg (default 3): `node named-truecolors.js 4`
const COLS = Math.max(1, Number(process.argv[2]) || 3);
const GAP = 2; // spaces between columns

const color = ansis.extend(colorNames);
const names = Object.keys(colorNames).sort((a, b) => a.localeCompare(b));

const getBgName = (name) => 'bg' + name[0].toUpperCase() + name.slice(1);

// prebuild raw colored parts (no trailing cell padding yet)
const items = names.map((name) => {
  const bgName = getBgName(name);
  return {
    name,
    left: color[name](`${name} `),
    right: color[bgName].black(` ${bgName} `),
  };
});

// compute max visible widths for left/right blocks
const maxLeftVis = Math.max(...items.map((x) => ansis.strip(x.left).length));
const maxRightVis = Math.max(...items.map((x) => ansis.strip(x.right).length));
const cellWidth = maxLeftVis + maxRightVis; // visible chars, without GAP

// build cells: pad inside (after left), then pad after entire cell to fixed width
const cells = items.map((x) => {
  const leftVis = ansis.strip(x.left).length;
  const padLeft = ' '.repeat(maxLeftVis - leftVis);
  const core = x.left + padLeft + x.right; // colored cell content
  const coreVis = ansis.strip(core).length; // visible width of the cell (no GAP)
  const padAfter = ' '.repeat(cellWidth - coreVis + GAP); // pad to fixed width + gap

  return core + padAfter;
});

// lay out in column-major order: top->bottom, then next column
const rows = Math.ceil(cells.length / COLS);
let out = '';
for (let r = 0; r < rows; r++) {
  let line = '';
  for (let c = 0; c < COLS; c++) {
    const i = r + c * rows;
    if (i < cells.length) line += cells[i];
  }
  out += line.replace(/\s+$/, '') + '\n';
}

console.log(out);
