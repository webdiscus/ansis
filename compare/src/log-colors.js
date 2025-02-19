// FATAL ERROR in ./node_modules/@colors/colors/lib/colors.js 36:11-26
// Webpack can't resolve the lib.
import { updatePageInfo } from './ansi-check.js';

import('@colors/colors')
.then(({ default: lib }) => main(lib))
.catch((err) => {
  updatePageInfo('', true);
  console.log(err);
});

const packageName = 'Colors.js';

const main = (lib) => {
  window.onload = () => {
    let test = lib.red('red');
    updatePageInfo(test);
  };

  const label = (text) => lib.green(text);

  console.log(label(` ${packageName} `) + lib.red(` Red`));
};
