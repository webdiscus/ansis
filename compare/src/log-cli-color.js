import { updatePageInfo } from './ansi-check.js';

// test: catch exception by load of an async module in runtime
import('cli-color')
.then(({ default: lib }) => main(lib))
.catch((err) => {
  updatePageInfo('', true);
  console.log(err);
});

const packageName = 'cli-color';

const main = (lib) => {
  window.onload = () => {
    let test = lib.red('red');
    updatePageInfo(test);
  };

  const label = (text) => lib.green(text);

  console.log(label(` ${packageName} `) + lib.red(` Red`));
};
