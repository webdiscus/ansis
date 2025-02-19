import { updatePageInfo } from './ansi-check.js';

const packageName = 'colors-cli';

import('colors-cli')
.then(({ default: lib }) => main(lib))
.catch((err) => {
  updatePageInfo('', true);
  console.log(err);
});

const main = (lib) => {
  window.onload = () => {
    let test = lib.red('red');
    updatePageInfo(test);
  };

  const label = (text) => lib.green(text);

  console.log(label(` ${packageName} `) + lib.red(` Red`));
};
