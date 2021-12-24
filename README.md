[![npm version](https://badge.fury.io/js/ansis.svg)](https://badge.fury.io/js/ansis)
[![codecov](https://codecov.io/gh/webdiscus/ansis/branch/master/graph/badge.svg?token=H7SFJONX1X)](https://codecov.io/gh/webdiscus/ansis)
[![node](https://img.shields.io/npm/dm/ansis)](https://www.npmjs.com/package/ansis)

# [ansis](https://www.npmjs.com/package/ansis) (ANSI styling)

Color styling of text for ANSI terminals using the SGR (Select Graphic Rendition) codes defined in the [ECMA-48](https://www.ecma-international.org/publications-and-standards/standards/ecma-48/) standard.\
This is improved and faster implementation for `Node.js`.


<a id="install" name="install" href="#install"></a>
## Install

```console
npm install ansis --save-dev
```

## Quick start

```js
import ansis from 'ansis';

console.log(ansis.green(`Hello ${ansis.inverse('ANSI')} World!`));
console.log(ansis.bgYellow(`Warning: `) + ansis.cyan(' /path/to/file.js ') + ansis.red(`not found!`) );
```
Output:

![output](doc/img/quik-start-output.png?raw=true "output")

## Features
  - supports ES modules, 100% vanilla JavaScript, compact code, no dependencies
  - powerful and lightweight library is faster than many others such as `chalk` `kleur` `ansi-colors` etc.
  - supports the standard de facto API of the `chalk`
  - supports 256 color and Truecolor
  - supports styles like: `bold`  `red` `yellowBright` `bgGreen` `bgCyanBright` ect.
  - supports chained styles e.g.:
    ```js
    ansis.red.bold.italic.underline('text');
    ```
  - supports nested styles like `colorette` `picocolors`, e.g.:
    ```js
    const c = ansis;
    c.red(`red ${c.italic.green('italic green')} red`);
    c.red(`${c.bold(`${c.italic(`${c.underline('underline')}italic`)}bold`)}red`);
    ```
  - supports methods for custom colors `rgb()` `hex()` `bgRgb()` `bgHex()` `ansi256()` `bgAnsi256()`:
    ```js
    ansis.rgb(255, 80, 200)('text');
    ansis.hex('#FF88AA')('text')
    ansis.bgHex('#F8A')('text')
    ansis.ansi256(110)('text')
    ```
  - supports shortcut, e.g.:
    ```js
    const theme = {
      error: ansis.red.bold,
      info: ansis.cyan.italic,
      warning: ansis.bgYellowBright,
      ruby: ansis.hex('#E0115F'),
      bgAmber: ansis.bgHex('#FFBF00'),
    }

    theme.error('error');
    theme.info('info');
    theme.warning('warning');
    theme.ruby('Ruby color');
    theme.bgAmber('Amber background color');
    ```

## Styles

`reset`
`inverse`
`hidden`
`visible`
`bold`
`dim`(alias`faint`)
`italic`
`underline`
`doubleUnderline`
`overline`
`strikethrough`(alias `strike`)
`frame`
`encircle`

## Foreground colors

`black`
`red`
`green`
`blue`
`magenta`
`cyan`
`white`
`gray`
`blackBright`
`redBright`
`greenBright`
`yellowBright`
`blueBright`
`magentaBright`
`cyanBright`
`whiteBright`

## Background colors
`bgBlack`
`bgRed`
`bgGreen`
`bgYellow`
`bgBlue`
`bgMagenta`
`bgCyan`
`bgWhite`
`bgGray`
`bgBlackBright`
`bgRedBright`
`bgGreenBright`
`bgYellowBright`
`bgBlueBright`
`bgMagentaBright`
`bgCyanBright`
`bgWhiteBright`

## 256 ANSI colors
See [ANSI color codes](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit).
```js
// foreground color
ansis.ansi256(96).bold('bold Bright Cyan');
// background color
ansis.bgAnsi256(105)('Bright Magenta');
```

## Truecolor

```js
// foreground color
ansis.hex('#E0115F').bold('bold Ruby');
ansis.hex('#96C')('Amethyst');
ansis.rgb(224, 17, 95).italic.underline('italic underline Ruby');

// background color
ansis.bgHex('#E0115F')('Ruby');
ansis.bgHex('#96C')('Amethyst');
ansis.bgRgb(224, 17, 95)('Ruby');
```

## Benchmark

### Initialize
```
cd ./bench
npm i
```

### Start benchmark
from directory `./bench/`
```
npm run bench
```


> ### Tested on
>
> Date: 24 dec 2021\
> MacBook Pro 16" M1 Max 64GB\
> macOS Monterey 12.1\
> Node.js v16.13.1\
> PhpStorm IDE Terminal

### Colorette bench
The benchmark used in [`colorette`](https://github.com/jorgebucaran/colorette/blob/main/bench/index.js).
```js
c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`);
```

```
  colors-js           1,119,016 ops/sec
  colorette           4,537,603 ops/sec
  picocolors          3,818,885 ops/sec
  cli-color             470,921 ops/sec
  color-cli             109,666 ops/sec
  ansi-colors         1,267,504 ops/sec
  kleur/colors        2,265,820 ops/sec
  kleur               2,216,547 ops/sec
  chalk               2,272,601 ops/sec
+ ansis               1,910,873 ops/sec
```

### Base styles
```js
c[style]('foo')
```
```
  colors-js             462,720 ops/sec
  colorette           1,492,260 ops/sec
  picocolors          5,736,444 ops/sec
  cli-color             222,377 ops/sec
  color-cli              73,354 ops/sec
  ansi-colors           719,913 ops/sec
  kleur/colors        1,446,799 ops/sec
  kleur               3,822,845 ops/sec
  chalk               3,151,919 ops/sec
+ ansis               4,248,414 ops/sec
```

### Chained styles
```js
c[style].bold.underline.italic('foo')
```
```
  colors-js             136,976 ops/sec
  colorette             (not supported)
  picocolors            (not supported)
  cli-color             142,024 ops/sec
  color-cli              52,604 ops/sec
  ansi-colors           159,209 ops/sec
  kleur/colors          (not supported)
  kleur                 511,077 ops/sec
  chalk               1,613,521 ops/sec
+ ansis               5,126,060 ops/sec

```

### Nested calls
```js
c[style](c.bold(c.underline(c.italic('foo'))))
```
```
  colors-js             165,526 ops/sec
  colorette             750,531 ops/sec
  picocolors            940,217 ops/sec
  cli-color              64,927 ops/sec
  color-cli              13,764 ops/sec
  ansi-colors           258,639 ops/sec
  kleur/colors          566,145 ops/sec
  kleur                 645,191 ops/sec
  chalk                 493,049 ops/sec
+ ansis                 354,148 ops/sec

```

### Nested styles
```js
c.red(`a red ${c.white('red')} red ${c.red('red')} red ${c.cyan('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.blue('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')}red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')}red ${c.green('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.magenta('red')} red ${c.red('red')}red ${c.red('red')} red ${c.cyan('red')} red ${c.red('red')} red ${c.red('red')} red ${c.yellow('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} message`);
```
```
  colors-js              91,036 ops/sec
  colorette             247,359 ops/sec
  picocolors            246,168 ops/sec
  cli-color              42,756 ops/sec
  color-cli              14,343 ops/sec
  ansi-colors           122,972 ops/sec
  kleur/colors          241,366 ops/sec
  kleur                 228,477 ops/sec
  chalk                 195,446 ops/sec
+ ansis                 210,382 ops/sec

```

### HEX colors
Only two libraries support truecolors methods: `ansis` and `chalk`
```js
c.hex('#FBA')('foo')
```
```
  colors-js             (not supported)
  colorette             (not supported)
  picocolors            (not supported)
  cli-color             (not supported)
  color-cli             (not supported)
  ansi-colors           (not supported)
  kleur/colors          (not supported)
  kleur                 (not supported)
  chalk               2,935,616 ops/sec
+ ansis               4,612,085 ops/sec
```

## Testing

`npm run test` will run the unit and integration tests.\
`npm run test:coverage` will run the tests with coverage.

## Also See

Most popular ANSI libraries for `Node.js`:
- [`colors.js`][colors.js]
- [`colorette`][colorette]
- [`picocolors`][picocolors]
- [`cli-color`][cli-color]
- [`color-cli`][color-cli]
- [`ansi-colors`][ansi-colors]
- [`kleur`][kleur]
- [`chalk`][kleur]

## License

[ISC](https://github.com/webdiscus/ansis/blob/master/LICENSE)

[colors.js]: https://github.com/Marak/colors.js
[colorette]: https://github.com/jorgebucaran/colorette
[picocolors]: https://github.com/alexeyraspopov/picocolors
[cli-color]: https://github.com/pugjs/pug
[color-cli]: https://github.com/jaywcjlove/colors-cli
[ansi-colors]: https://github.com/doowb/ansi-colors
[kleur]: https://github.com/lukeed/kleur
[chalk]: https://github.com/chalk/chalk
