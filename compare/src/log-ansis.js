import { updatePageInfo } from './ansi-check.js';
import spectrum from '../spectrum.js';

const labelName = 'Ansis';

// test successful load of an async module in runtime
import('ansis')
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

  const label = (text) => lib.bgGreen.whiteBright.bold(text);

  console.log(label(` ${labelName} `) + lib.red(` Red`));
  console.log(label(` ${labelName} `) + lib.green(` Green`));
  console.log(label(` ${labelName} `) + lib.blue(` Blue`));
  console.log(label(` ${labelName} `) + lib.hex('#B57EDC')(` TrueColor Lavenders`));

  let spectrumColors = '';
  spectrum.forEach(color => {spectrumColors += lib.hex(color)('█');});
  console.log(spectrumColors);
};
