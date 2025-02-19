// FATAL ERROR in ./node_modules/colorette/index.js
// Can't resolve 'tty'...
import { updatePageInfo } from './ansi-check.js';

import('colorette')
.then(({ default: lib }) => main(lib))
.catch((err) => {
  updatePageInfo('', true);
  console.log(err);
});

const packageName = 'Colorette';

const main = (lib) => {
  window.onload = () => {
    let test = lib.red('red');
    updatePageInfo(test);
  };

  const label = (text) => lib.green(text);

  console.log(label(` ${packageName} `) + lib.red(` Red`));
};
