<h1 align="center">
    <a href="https://www.npmjs.com/package/ansis">
        <img width="323" src="doc/img/ansis-logo.png" alt="ansis"><br>
        ANSI Styling
    </a>
</h1>

---
[![npm version](https://badge.fury.io/js/ansis.svg)](https://www.npmjs.com/package/ansis)
[![codecov](https://codecov.io/gh/webdiscus/ansis/branch/master/graph/badge.svg?token=H7SFJONX1X)](https://codecov.io/gh/webdiscus/ansis)
[![node](https://img.shields.io/npm/dm/ansis)](https://www.npmjs.com/package/ansis)


Color styling of text for ANSI terminals using the SGR (Select Graphic Rendition) codes defined in the [ECMA-48](https://www.ecma-international.org/publications-and-standards/standards/ecma-48/) standard.\
This is improved and faster implementation for `Node.js`.

<a id="install" name="install" href="#install"></a>
## Install

```console
npm install ansis --save-dev
```

## Show ANSI demo
```
npm run demo
```

## Quick start

```js
import ansis from 'ansis';

console.log(ansis.green(`Hello ${ansis.inverse('ANSI')} World!`));
console.log(ansis.black.bgYellow(`Warning: `) + ansis.cyan(' /path/to/file.js ') + ansis.red(`not found!`) );
```
Output:

![output](doc/img/quik-start-output.png?raw=true "output")


## Features
  - supports ES modules, 100% vanilla JavaScript, compact code, no dependencies
  - powerful and lightweight library is faster than many others such as `chalk` `kleur` `ansi-colors` etc.
  - supports the standard de facto API of the `chalk`
  - supports 256 color and Truecolor
  - supports styles like: `bold`  `red` `yellowBright` `bgGreen` `bgCyanBright` ect.
  - supports chained styles, e.g.:
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
    ansis.hex('#FF88AA')('text');
    ansis.bgHex('#F8A')('text');
    ansis.ansi256(110)('text');
    ```
  - supports shortcut, e.g.:
    ```js
    const theme = {
      error: ansis.red.bold,
      info: ansis.cyan.italic,
      warning: ansis.black.bgYellowBright,
      ruby: ansis.hex('#E0115F'),
      bgAmber: ansis.bgHex('#FFBF00'),
    };

    theme.error('error');
    theme.info('info');
    theme.warning('warning');
    theme.ruby('Ruby color');
    theme.bgAmber('Amber background color');
    ```
  - supports the use of `open` and `close` properties for each style, e.g.:
    ```js
    const myStyle = ansis.bold.italic.black.bgHex('#ABCDEF');
    console.log(`Hello ${ansis.green.open}ANSI${ansis.green.close} World!`);
    console.log(`Hello ${myStyle.open}ANSI${myStyle.close} World!`);
    ```
  - supports correct break of style at `end of line`, e.g.:
    ```js
    ansis.bgGreen(`\nAnsis\nNew Line\nNext New Line\n`);
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
```
npm run bench
```


> ### Tested on
>
> MacBook Pro 16" M1 Max 64GB\
> macOS Monterey 12.1\
> Node.js v16.13.1\
> Terminal `iTerm2`

### Colorette bench
The benchmark used in [`colorette`](https://github.com/jorgebucaran/colorette/blob/main/bench/index.js).
```js
c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`);
```

```diff
  colors-js           1,152,114 ops/sec
  colorette           4,548,418 ops/sec
  picocolors          3,832,593 ops/sec
  cli-color             471,929 ops/sec
  color-cli             110,282 ops/sec
  ansi-colors         1,272,164 ops/sec
  kleur/colors        2,278,569 ops/sec
  kleur               2,223,929 ops/sec
  chalk               2,255,589 ops/sec
+ ansis               2,674,316 ops/sec
```

### Base styles
```js
styles.forEach((style) => c[style]('foo'));
```
```diff
  colors-js             475,774 ops/sec
  colorette           1,174,392 ops/sec
  picocolors          5,724,714 ops/sec
  cli-color             220,577 ops/sec
  color-cli              73,535 ops/sec
  ansi-colors           727,414 ops/sec
  kleur/colors        1,275,337 ops/sec
  kleur               3,843,212 ops/sec
  chalk               3,144,045 ops/sec
+ ansis               4,360,629 ops/sec
```

### Chained styles
```js
colors.forEach((color) => c[color].bold.underline.italic('foo'));
```
```diff
  colors-js                     138,219
  colorette             (not supported)
  picocolors            (not supported)
  cli-color                     144,837
  color-cli                      52,732
  ansi-colors                   158,921
  kleur/colors          (not supported)
  kleur                         514,035
  chalk                       1,234,573
+ ansis                       5,515,868

```

### Nested calls
```js
colors.forEach((color) => c[color](c.bold(c.underline(c.italic('foo')))));
```
```diff
  colors-js             165,202 ops/sec
  colorette             712,604 ops/sec
  picocolors            939,536 ops/sec
  cli-color              64,758 ops/sec
  color-cli              13,833 ops/sec
  ansi-colors           258,930 ops/sec
  kleur/colors          563,266 ops/sec
  kleur                 646,985 ops/sec
  chalk                 385,590 ops/sec
+ ansis                 554,813 ops/sec

```

### Nested styles
```js
c.red(`a red ${c.white('white')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.black('black')} red ${c.red('red')} red ${c.green('green')} red ${c.red('red')} red ${c.yellow('yellow')} red ${c.blue('blue')} red ${c.red('red')} red ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.green('green')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.red('red')} red ${c.red('red')} red ${c.yellow('yellow')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} message`);
```
```diff
  colors-js              89,529 ops/sec
  colorette             243,237 ops/sec
  picocolors            242,528 ops/sec
  cli-color              41,897 ops/sec
  color-cli              14,245 ops/sec
  ansi-colors           120,991 ops/sec
  kleur/colors          233,875 ops/sec
  kleur                 220,233 ops/sec
  chalk                 157,450 ops/sec
+ ansis                 205,393 ops/sec

```

### HEX colors
Only two libraries support truecolors methods: `ansis` and `chalk`
```js
c.hex('#FBA')('foo');
```
```diff
  colors-js             (not supported)
  colorette             (not supported)
  picocolors            (not supported)
  cli-color             (not supported)
  color-cli             (not supported)
  ansi-colors           (not supported)
  kleur/colors          (not supported)
  kleur                 (not supported)
  chalk               2,746,362 ops/sec
+ ansis               4,584,357 ops/sec
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
- [`chalk`][chalk]

## License

[ISC](https://github.com/webdiscus/ansis/blob/master/LICENSE)

[colors.js]: https://github.com/Marak/colors.js
[colorette]: https://github.com/jorgebucaran/colorette
[picocolors]: https://github.com/alexeyraspopov/picocolors
[cli-color]: https://github.com/medikoo/cli-color
[color-cli]: https://github.com/jaywcjlove/colors-cli
[ansi-colors]: https://github.com/doowb/ansi-colors
[kleur]: https://github.com/lukeed/kleur
[chalk]: https://github.com/chalk/chalk
