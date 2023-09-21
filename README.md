<div align="center">
  <h1 align="center">
    <a href="https://www.npmjs.com/package/ansis">
      <img width="323" src="docs/img/ansis-logo.png" alt="ansis"><br>
      ANSI Styling
    </a>
  </h1>
  <div>The Node.js library for formatting text in terminal with ANSI colors & styles</div>
</div>

---
[![npm](https://img.shields.io/npm/v/ansis?logo=npm&color=brightgreen "npm package")](https://www.npmjs.com/package/ansis "download npm package")
[![node](https://img.shields.io/node/v/ansis)](https://nodejs.org)
[![Test](https://github.com/webdiscus/ansis/actions/workflows/test.yml/badge.svg)](https://github.com/webdiscus/ansis/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/webdiscus/ansis/branch/master/graph/badge.svg?token=H7SFJONX1X)](https://codecov.io/gh/webdiscus/ansis)
[![node](https://img.shields.io/npm/dm/ansis)](https://www.npmjs.com/package/ansis)

Ansis is the tiny and faster compatible alternative to [Chalk][chalk] with even more useful features.
Colorize your output in a terminal with clean syntax, e.g., ``` green`Hello World!` ``` ``` red`Error!` ``` ``` black.bgYellow`Warning!` ```.

**Why yet one lib?**\
See [comparison](https://github.com/webdiscus/ansis#compare-most-popular-ansi-libraries) and [benchmarks](https://github.com/webdiscus/ansis#benchmark) of most popular Node.js libraries:\
[`chalk`][chalk], [`colors.js`][colors.js], [`colorette`][colorette], [`picocolors`][picocolors], [`kleur`][kleur], [`ansi-colors`][ansi-colors], [`cli-color`][cli-color], [`colors-cli`][colors-cli].

<div align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="830" src="docs/img/ansis-demo.png" alt="ansis">
  </a>
</div>

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/stackblitz-starters-gs2gve?file=index.js)


## Highlights

- supports both **ESM** and **CommonJS**
- up to **x3.5 faster** than **chalk**, [see benchmarks](#benchmark)
- dist code is **3 KB** only
- [standard API](#base-colors) like **chalk**
- default and [named import](#named-import) `import { red, bold, rgb } from 'ansis/colors'`
- [chained syntax](#chained-syntax) `red.bold('text')`
- [nested **template strings**](#nested-syntax) ``` red`R ${green`G`} R` ```
- [ANSI 256 colors](#256-colors) and [Truecolor](#truecolor) (**RGB**, **HEX**)
- [extending of base colors](#extend-colors) with named **truecolors**
- [ANSI codes](#escape-codes) as `open` and `close` property for each style ``` `Hello ${red.open}World${red.close}!` ```
- [strip ANSI codes](#strip) method `ansis.strip()`
- [correct style break](#new-line) at the `end of line` when used `\n` in string
- supports the [environment variables](#cli-vars) `NO_COLOR` `FORCE_COLOR` and flags `--no-color` `--color`
- **auto detects** color support
- **TypeScript** friendly
- zero dependencies


<a id="install" name="install" href="#install"></a>
## Install

```bash
npm install ansis
```


## Usage

You can import module and named colors with ESM or CommonJS syntax.

```js
// ESM
import ansis from 'ansis';
import { red, green, blue } from 'ansis/colors';

// CommonJS
const ansis = require('ansis');
const { red, green, blue } = require('ansis/colors');

// default import
console.log(ansis.green(`Success!`));

// named import
console.log(green('Success!'));

// template string
console.log(green`Success!`);

// chained syntax
console.log(green.bold`Success!`);

// nested syntax
console.log(red`The ${blue.underline`file.js`} not found!`);

```

Basic example `Hello World!`:

```js
import { red, black, inverse, reset } from 'ansis/colors';

console.log(green`Hello ${inverse`ANSI`} World!
${black.bgYellow`Warning:`} ${cyan`/path/to/file.js`} ${red`not found!`}`);
```

Output:\
![screenshot "Hello ANSI World!"](docs/img/quik-start-output.png?raw=true)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/stackblitz-starters-sx74bl?file=index.js)


<a id="named-import" name="named-import" href="#named-import"></a>
## Named import

The `ansis` supports both the `default import` and `named import`.


```js
// default import
import ansis from 'ansis';

ansis.red.bold('text');
```

You can import named colors, styles and functions. All imported colors and styles are `chainable`.

```js
// named import
import { red, hex, italic } from 'ansis/colors';

red.bold('text');
```

<a id="template-literals" name="template-literals" href="#template-literals"></a>
## Template literals

The `ansis` supports both the function syntax `red('error')` and template literals ``` red`error` ```.

The `template literals` allow you to make a complex template more readable and shorter.\
The `function syntax` can be used to colorize a variable.

```js
import { red } from 'ansis/colors';

let message = 'error';

red(message);
red`text`;
red`text ${message} text`;
```


<a id="chained-syntax" name="chained-syntax" href="#chained-syntax"></a>
## Chained syntax

All colors, styles and functions are chainable. Each color or style can be combined in any order.

```js
import { red, bold, italic, hex } from 'ansis/colors';

red.bold`text`;
hex('#FF75D1').bgCyan.bold`text`;
bold.bgHex('#FF75D1').cyan`text`;
italic.bold.yellow.bgMagentaBright`text`;
```


<a id="nested-syntax" name="nested-syntax" href="#nested-syntax"></a>
## Nested syntax

You can nest functions and template strings within each other.
None of the other libraries (chalk, kleur, colorette, colors.js etc.) support nested template strings.

Nested template strings:
```js
import { red, green } from 'ansis/colors';

red`red ${green`green`} red`;
```

Deep nested chained styles:
```js
import { red, green, cyan, magenta, yellow, italic, underline } from 'ansis/colors';

red(`red ${italic(`red italic ${underline(`red italic underline`)}`)} red`);

// deep nested chained styles
green(
  `green ${yellow(
    `yellow ${magenta(
      `magenta ${cyan(
        `cyan ${red.italic.underline`red italic underline`} cyan`,
      )} magenta`,
    )} yellow`,
  )} green`,
);
```

Output:\
![screenshot nested styles](docs/img/ansis-nested.png?raw=true)

Multiline nested template strings:
```js
import { red, green, hex, visible, inverse } from 'ansis/colors';

// defined a truecolor as the constant
const orange = hex('#FFAB40');

let cpu = 33;
let ram = 44;
let disk = 55;

// normal colors
visible`
CPU:  ${red`${cpu}%`}
RAM:  ${green`${ram}%`}
DISK: ${orange`${disk}%`}
`;

// inversed colors
inverse`
CPU:  ${red`${cpu}%`}
RAM:  ${green`${ram}%`}
DISK: ${orange`${disk}%`}
`;
```

Output:\
![screenshot multiline nested](docs/img/ansis-multiline-nested.png?raw=true)


<a id="base-colors" name="base-colors" href="#base-colors"></a>
## Base colors and styles

Colors and styles have standard names used by many popular libraries, such as [chalk][chalk], [colorette][colorette], [kleur][kleur].

| Foreground colors     | Background colors | Styles                                     |
|:----------------------|:------------------|--------------------------------------------|
| `black`               | `bgBlack`         | `dim` (alias`faint`)                       |
| `red`                 | `bgRed`           | **`bold`**                                 |
| `green`               | `bgGreen`         | _`italic`_                                 |
| `yellow`              | `bgYellow`        | <u>`underline`</u>                         |
| `blue`                | `bgBlue`          | <s>`strikethrough`</s> (alias `strike`)    |
| `magenta`             | `bgMagenta`       | `doubleUnderline` (_not widely supported_) |
| `cyan`                | `bgCyan`          | `overline` (_not widely supported_)        |
| `white`               | `bgWhite`         | `frame` (_not widely supported_)           |
| `gray` (alias `grey`) | `bgGray`          | `encircle` (_not widely supported_)        |
| `blackBright`         | `bgBlackBright`   | `inverse`                                  |
| `redBright`           | `bgRedBright`     | `visible`                                  |
| `greenBright`         | `bgGreenBright`   | `hidden`                                   |
| `yellowBright`        | `bgYellowBright`  | `reset`                                    |
| `blueBright`          | `bgBlueBright`    |                                            |
| `magentaBright`       | `bgMagentaBright` |                                            |
| `cyanBright`          | `bgCyanBright`    |                                            |
| `whiteBright`         | `bgWhiteBright`   |                                            |


<a id="extend-colors" name="extend-colors" href="#extend-colors"></a>
## Extend base colors

Defaults, the imported `ansis` instance contains [base styles and colors](#base-colors).
To extend base colors with custom color names for truecolor use the `ansis.extend()` method.

```js
import ansis from 'ansis';

// extend base colors
ansis.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

// the custom colors are available under namespace `ansis`
ansis.pink('text');
ansis.orange('text');
```

Usage example with TypeScript:
```ts
import ansis, { AnsiColorsExtend } from 'ansis';

// extend base colors
ansis.extend({
  pink: '#FF75D1',
  orange: '#FFAB40',
});

const write = (style: AnsiColorsExtend<'pink' | 'orange'>, message: string) => {
  console.log(ansis[style](message));
}

write('red', 'message'); // base color OK
write('pink', 'message'); // extended color OK
write('orange', 'message'); // extended color OK
write('unknown', 'message'); // TypeScript Error
```


<a id="256-colors" name="256-colors" href="#256-colors"></a>
## ANSI 256 colors

The pre-defined set of 256 colors.

<div align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="830" src="docs/img/ansi256.png" alt="ANSI 256 colors">
  </a>
</div>

| Code range | Description                               |
|-----------:|-------------------------------------------|
|      0 - 7 | standard colors                           |
|     8 - 15 | bright colors                             |
|   16 - 231 | 6 × 6 × 6 cube (216 colors)               |
|  232 - 255 | grayscale from black to white in 24 steps |

Foreground function: `ansi256(code)` has short alias `fg(code)`\
Background function: `bgAnsi256(code)` has short alias `bg(code)`

> The `ansi256()` and `bgAnsi256()` methods are implemented for compatibility with the `chalk` API.

See [ANSI color codes](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit).

```js
import { bold, ansi256, fg, bgAnsi256, bg } from 'ansis/colors';

// foreground color
ansi256(96)`Bright Cyan`;
fg(96)`Bright Cyan`;

// background color
bgAnsi256(105)`Bright Magenta`;
bg(105)`Bright Magenta`;

// function is chainable
ansi256(96).bold`bold Bright Cyan`;

// function is avaliable in each style
bold.ansi256(96).underline`bold underline Bright Cyan`;

// you can combine the functions and styles in any order
bgAnsi256(105).ansi256(96)`cyan text on magenta background`
bg(105).fg(96)`cyan text on magenta background`
```


<a id="truecolor" name="truecolor" href="#truecolor"></a>
## Truecolor

You can use the `hex` or `rgb` format.

Foreground function: `hex()` `rgb()`\
Background function: `bgHex()` `bgRgb()`

```js
import { bold, hex, rgb, bgHex, bgRgb} from 'ansis/colors';

// foreground color
hex('#E0115F').bold`bold Ruby`;
hex('#96C')`Amethyst`;
rgb(224, 17, 95).italic`italic Ruby`;

// background color
bgHex('#E0115F')`Ruby`;
bgHex('#96C')`Amethyst`;
bgRgb(224, 17, 95)`Ruby`;

// you can combine the functions and styles in any order
bold.hex('#E0115F').bgHex('#96C')`ruby bold text on amethyst background`
```

<a id="escape-codes" name="escape-codes" href="#escape-codes"></a>
## Use ANSI codes

You can use the [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors_and_Styles) with `open` and `close` properties for each style.

```js
import { red, bold } from 'ansis/colors';

// each style has `open` and `close` properties
console.log(`Hello ${red.open}ANSI${red.close} World!`);

// you can defiene own style which will have the `open` and `close` properties
const myStyle = bold.italic.black.bgHex('#E0115F');

console.log(`Hello ${myStyle.open}ANSI${myStyle.close} World!`);
```

<a id="strip" name="strip" href="#strip"></a>
## Strip ANSI codes

The Ansis class contains the method `strip()` to remove all ANSI codes from string.

```js
import ansis from 'ansis';

const ansiString = ansis.green`Hello World!`;
const string = ansis.strip(ansiString);
```

The variable `string` will contain the pure string without ANSI codes.


<a id="new-line" name="new-line" href="#new-line"></a>
## New lines

Supports correct style break at the `end of line`.

```js
import { bgGreen } from 'ansis/colors';

console.log(bgGreen`\nAnsis\nNew Line\nNext New Line\n`);
```

![output](docs/img/break-style-nl.png?raw=true "break styles at EOL")


<a id="shortcuts" name="shortcuts" href="#shortcuts"></a>
## Shortcuts / Themes

Define your own themes:

```js
import ansis from 'ansis';

const theme = {
  error: ansis.red.bold,
  info: ansis.cyan.italic,
  warning: ansis.black.bgYellowBright,
  ruby: ansis.hex('#E0115F'),
};

theme.error('error');
theme.info('info');
theme.warning('warning');
theme.ruby('Ruby color');
```


<a id="cli-vars" name="cli-vars" href="#cli-vars"></a>
## CLI

Defaults, the output in terminal console is colored and output in a file is uncolored.

### Environment variables
_example.js_
```js
import ansis from 'ansis';

console.log(ansis.red`COLOR`);
```

```
$ node example.js           #=> color
$ node example.js > log.txt #=> no color
```

To force disable or enable colored output use environment variables `NO_COLOR` and `FORCE_COLOR`.

```
$ NO_COLOR=1 node example.js              #=> force disable colors
$ FORCE_COLOR=0 node example.js           #=> force disable colors
$ FORCE_COLOR=1 node example.js > log.txt #=> force enable colors
```

> **Note**
>
> The `NO_COLOR` variable should be presents with any not empty value.
> The value is not important, see standard description by [NO_COLOR](https://no-color.org/).\
> `NO_COLOR=1` `NO_COLOR=true` disable colors
>
> The `FORCE_COLOR` variable should be presents with one of values:\
> `FORCE_COLOR=0`  force disable colors\
> `FORCE_COLOR=1`  force enable colors


### Arguments for executable script
If you have an executable script.\
_example.js_
```js
#!/usr/bin/env node
import ansis from 'ansis';

console.log(ansis.red`COLOR`);
```

Use arguments `--no-color` or `--color=false` to disable colors and `--color` to enable ones.
```
$ ./example.js                        #=> color
$ ./example.js --no-color             #=> no color
$ ./example.js --color=false          #=> no color

$ ./example.js > log.txt              #=> no color
$ ./example.js --color > log.txt      #=> color
$ ./example.js --color=true > log.txt #=> color
```


<a id="compare" href="#compare"></a>
## Comparison of most popular libraries

| Library<br>______________<br> - name<br> - code size<br> - named import    |               Naming colors                | ANSI 256<br>colors | True-<br>color | Chained<br>syntax | Nested<br>template strings | New<br>Line | Supports<br>CLI params                                   |
|:---------------------------------------------------------------------------|:------------------------------------------:|:------------------:|:--------------:|:-----------------:|:--------------------------:|:-----------:|:---------------------------------------------------------|
| [`colors.js`][colors.js]<br>**18.1KB**<br><nobr>`❌ named import`</nobr>    | <nobr>_non-standard_</nobr><br>`16` colors |         ❌          |       ❌        |         ✅         |             ❌              |      ✅      | only<br>`FORCE_COLOR`<br>`--no-color`<br>`--color`       |
| [`colors-cli`][colors-cli]<br>**8.6KB**<br><nobr>`❌ named import`</nobr>   | <nobr>_non-standard_</nobr><br>`16` colors |         ✅          |       ❌        |         ✅         |             ❌              |      ✅      | only<br>`--no-color`<br>`--color`                        |
| [`cli-color`][cli-color]<br><nobr>`❌ named import`</nobr>                  |        **standard**<br>`16` colors         |         ✅          |       ❌        |         ✅         |             ❌              |      ❌      | only<br>`NO_COLOR`                                       |
| [`ansi-colors`][ansi-colors]<br>**5.8KB**<br><nobr>`❌ named import`</nobr> |        **standard**<br>`16` colors         |         ❌          |       ❌        |         ✅         |             ❌              |      ✅      | only<br>`FORCE_COLOR`                                    |
| [`colorette`][colorette]<br>**3.3KB**<br><nobr>`✅ named import`</nobr>     |        **standard**<br>`16` colors         |         ❌          |       ❌        |         ❌         |             ❌              |      ❌      | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`picocolors`][picocolors]<br>**2.6KB**<br><nobr>`❌ named import`</nobr>   |         **standard**<br>`8` colors         |         ❌          |       ❌        |         ❌         |             ❌              |      ❌      | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`kleur`][kleur]<br>**2.7KB**<br><nobr>`✅ named import`</nobr>             |         **standard**<br>`8` colors         |         ❌          |       ❌        |         ✅         |             ❌              |      ❌      | only<br>`NO_COLOR`<br>`FORCE_COLOR`                      |
| [`chalk`][chalk]<br>**15KB**<br><nobr>`❌ named import`</nobr>              |        **standard**<br>`16` colors         |         ✅          |       ✅        |         ✅         |             ❌              |      ✅      | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`ansis`][ansis]<br>**3.2KB**<br><nobr>`✅ named import`</nobr>             |        **standard**<br>`16` colors         |         ✅          |       ✅        |         ✅         |             ✅              |      ✅      | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |


> **Note**
>
> **Code size**\
> The size of distributed code that will be loaded via `require` or `import` into your app. It's not a package size.
>
> **Named import**\
> `import { red, green, blue } from 'lib';`\
> or\
> `const { red, green, blue } = require('lib');`
>
> **Naming colors**
>  - standard: colors have [standard names](#base-colors-and-styles), e.g.: `red`, `redBright`, `bgRed`, `bgRedBright`
>  - _non-standard_: colors have lib-specific names, e.g.: `brightRed`, `bgBrightRed`, `red_b`, `red_btt`
>
> **ANSI 256 colors**
>
> The method names:
>  - [`colors-cli`][colors-cli]: `x<n>`
>  - [`cli-color`][cli-color]: `xterm(n)`
>  - [`chalk`][chalk]: `ansi256(n)` `bgAnsi256(n)`
>  - [`ansis`][ansis]: `ansi256(n)` `bgAnsi256(n)` `fg(n)` `bg(n)`
>
> **Truecolor**
>
> The method names:
>  - [`chalk`][chalk]: `hex()` `rgb()`
>  - [`ansis`][ansis]: `hex()` `rgb()`
>
> **Chained syntax**\
> `lib.red.bold('text')`
>
> **Nested template strings**\
> ``` lib.red`text ${lib.cyan`nested`} text` ```
>
> **New line**\
> Correct break styles at `end-of-line`.
> ```
> lib.bgGreen(`First Line
> Next Line`);
> ```


## Show ANSI demo

```bash
git clone https://github.com/webdiscus/ansis.git
cd ./ansis
npm i
npm run demo
```

<a id="benchmark" href="#benchmark"></a>

## Benchmark

### Setup

```bash
git clone https://github.com/webdiscus/ansis.git
cd ./ansis/bench
npm i
```

### Run benchmark

```bash
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
+  colorette           4,572,582 ops/sec   very fast
   picocolors          3,841,124 ops/sec   very fast
-> ansis               2,669,734 ops/sec   fast
   kleur/colors        2,281,415 ops/sec   fast
   chalk               2,287,146 ops/sec   fast
   kleur               2,228,639 ops/sec   fast
   ansi-colors         1,265,615 ops/sec   slow
   colors.js           1,158,572 ops/sec   slow
   cli-color             470,320 ops/sec   too slow
   colors-cli            109,811 ops/sec   too slow
```

### Base colors

```js
const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
colors.forEach((color) => c[color]('foo'));
```

```diff
+  picocolors          8,265,628 ops/sec  very fast
-> ansis               6,197,754 ops/sec  fast
   kleur               5,455,121 ops/sec  fast
   chalk               4,428,884 ops/sec  fast
   kleur/colors        2,074,111 ops/sec  slow
   colorette           1,874,506 ops/sec  slow
   ansi-colors         1,010,628 ops/sec  slow
   colors.js             640,101 ops/sec  too slow
   cli-color             305,690 ops/sec  too slow
   colors-cli            104,962 ops/sec  too slow
```

### Chained styles

```js
colors.forEach((color) => c[color].bold.underline.italic('foo'));
```

```diff
+  ansis               5,515,868 ops/sec  very fast
   chalk               1,234,573 ops/sec  fast
   kleur                 514,035 ops/sec  slow
   ansi-colors           158,921 ops/sec  too slow
   cli-color             144,837 ops/sec  too slow
   colors.js             138,219 ops/sec  too slow
   colors-cli             52,732 ops/sec  too slow
   kleur/colors  (not supported)
   colorette     (not supported)
   picocolors    (not supported)
```

### Nested calls

```js
colors.forEach((color) => c[color](c.bold(c.underline(c.italic('foo')))));
```

```diff
+  picocolors            942,592 ops/sec  very fast
   colorette             695,350 ops/sec  fast
   kleur                 648,195 ops/sec  fast
   kleur/colors          561,111 ops/sec  fast
-> ansis                 558,575 ops/sec  fast
   chalk                 497,292 ops/sec  fast
   ansi-colors           260,316 ops/sec  slow
   colors.js             166,425 ops/sec  slow
   cli-color              65,561 ops/sec  too slow
   colors-cli             13,800 ops/sec  too slow
```

### Nested styles

```js
c.red(
  `a red ${c.white('white')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.black('black')} red ${c.red(
    'red'
  )} red ${c.green('green')} red ${c.red('red')} red ${c.yellow('yellow')} red ${c.blue('blue')} red ${c.red(
    'red'
  )} red ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
    'red'
  )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
    'red'
  )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.green(
    'green'
  )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
    'red'
  )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.magenta(
    'magenta'
  )} red ${c.red('red')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.red('red')} red ${c.red(
    'red'
  )} red ${c.yellow('yellow')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red(
    'red'
  )} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} message`
);
```

```diff
+  picocolors            243,975 ops/sec  very fast
   colorette             243,139 ops/sec  very fast
   kleur/colors          234,132 ops/sec  very fast
   kleur                 221,446 ops/sec  very fast
-> ansis                 211,868 ops/sec  very fast
   chalk                 189,960 ops/sec  fast
   ansi-colors           121,451 ops/sec  slow
   colors.js              89,633 ops/sec  too slow
   cli-color              41,657 ops/sec  too slow
   colors-cli             14,264 ops/sec  too slow
```

### Deep nested styles

```js
c.green(
  `green ${c.cyan(
    `cyan ${c.red(
      `red ${c.yellow(
        `yellow ${c.blue(
          `blue ${c.magenta(`magenta ${c.underline(`underline ${c.italic(`italic`)} underline`)} magenta`)} blue`
        )} yellow`
      )} red`
    )} cyan`
  )} green`
);
```

```diff
+  colorette           1,131,757 ops/sec  very fast
   picocolors          1,002,649 ops/sec  very fast
-> ansis                 882,220 ops/sec  fast
   chalk                 565,965 ops/sec  fast
   kleur/colors          478,547 ops/sec  fast
   kleur                 464,004 ops/sec  fast
   colors.js             451,592 ops/sec  fast
   ansi-colors           362,733 ops/sec  slow
   cli-color             213,441 ops/sec  slow
   colors-cli             40,340 ops/sec  too slow
```

### HEX colors

Only two libraries supported truecolor methods: `ansis` and `chalk`

```js
c.hex('#FBA')('foo');
```

```diff
+  ansis               4,944,572 ops/sec  very fast
   chalk               2,891,684 ops/sec  fast
   colors.js             (not supported)
   colorette             (not supported)
   picocolors            (not supported)
   cli-color             (not supported)
   colors-cli            (not supported)
   ansi-colors           (not supported)
   kleur/colors          (not supported)
   kleur                 (not supported)
```

## Testing

`npm run test` will run the unit and integration tests.\
`npm run test:coverage` will run the tests with coverage.

## Also See

Most popular ANSI libraries for `Node.js`:

- [colors.js][colors.js]
- [colorette][colorette]
- [picocolors][picocolors]
- [cli-color][cli-color]
- [colors-cli][colors-cli]
- [ansi-colors][ansi-colors]
- [kleur][kleur]
- [chalk][chalk]

## License

[ISC](https://github.com/webdiscus/ansis/blob/master/LICENSE)

[colors.js]: https://github.com/Marak/colors.js
[colorette]: https://github.com/jorgebucaran/colorette
[picocolors]: https://github.com/alexeyraspopov/picocolors
[cli-color]: https://github.com/medikoo/cli-color
[colors-cli]: https://github.com/jaywcjlove/colors-cli
[ansi-colors]: https://github.com/doowb/ansi-colors
[kleur]: https://github.com/lukeed/kleur
[chalk]: https://github.com/chalk/chalk
[ansis]: https://github.com/webdiscus/ansis
