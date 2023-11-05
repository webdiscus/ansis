import ansis from 'ansis';

const colorizeASCII = ({ ascii, data }, paddingLeft = 5) => {
  // start index in logo is 1, because first char is \n
  let i = 1,
    row = 0,
    out = '',
    char,
    code;

  do {
    for (let charIdx = 0; charIdx < data.length; charIdx++) {
      let { width, codes } = data[charIdx];
      // last char width +1 (\n)
      if (charIdx === data.length - 1) width++;
      if (charIdx === 0) out += ''.padStart(paddingLeft);
      for (let charWidthIdx = 0; charWidthIdx < width; charWidthIdx++) {
        char = ascii[i++];
        code = Array.isArray(codes) ? codes[row] : codes + row;
        out += ansis.ansi256(code)(char);
      }
    }
    row++;
  } while (char);

  return out;
};

// The ASCII logo powered by https://patorjk.com/software/taag/#p=testall&h=1&f=Graceful&t=ANSIS
const logo = {
  ascii: `
 █████╗ ███╗   ██╗███████╗██╗███████╗
██╔══██╗████╗  ██║██╔════╝██║██╔════╝
███████║██╔██╗ ██║███████╗██║███████╗
██╔══██║██║╚██╗██║╚════██║██║╚════██║
██║  ██║██║ ╚████║███████║██║███████║
╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝╚══════╝
`,
  data: [
    { width: 8, codes: [76, 77, 78, 79, 80, 81] },
    { width: 10, codes: 196 },
    { width: 8, codes: 226 },
    { width: 3, codes: 214 },
    { width: 8, codes: [26, 27, 32, 33, 39, 45] },
  ],
};

let out = colorizeASCII(logo, 5);

export { out as ansisLogo };
