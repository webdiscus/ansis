<a id="top" name="top"></a>
<div align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="323" src="https://github.com/webdiscus/ansis/raw/master/docs/img/logo.png" alt="ansis">
  </a>
  <h1 align="center">ANSI Styles</h1>
</div>

[![npm](https://img.shields.io/npm/v/ansis?logo=npm&color=brightgreen "npm package")](https://www.npmjs.com/package/ansis "download npm package")
[![node](https://img.shields.io/node/v/ansis)](https://nodejs.org)
[![Test](https://github.com/webdiscus/ansis/actions/workflows/test.yml/badge.svg)](https://github.com/webdiscus/ansis/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/webdiscus/ansis/branch/master/graph/badge.svg?token=H7SFJONX1X)](https://codecov.io/gh/webdiscus/ansis)
[![downloads](https://img.shields.io/npm/dm/ansis)](https://www.npmjs.com/package/ansis)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/ansis)](https://bundlephobia.com/package/ansis)


A [small](#compare-size) and [fast](#benchmark) Node.js library for applying ANSI colors and styles in terminal output.\
Ansis provides all the [features](#features) you need, you can compare with [similar libraries](#compare).\
Ansis is [faster](#benchmark) than **Chalk** and **Picocolors** (in some use cases), see [benchmarks](#benchmark).


### 🚀 [Install and Quick Start](#install) 🔄 [Why switch to Ansis](#why-switch-to-ansis)


<div align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="830" src="https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-demo.png" alt="ansis">
  </a>
</div>

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/stackblitz-starters-gs2gve?file=index.js)

## 🛠️ Usage

```js
import ansis, { red, green, cyan, black, ansi256, hex } from 'ansis';

ansis.blueBright('file.txt')
green`Succeful!`
red`Error: ${cyan(file)} not found!`
black.bgYellow`Warning!`
ansi256(214)`Orange`
hex('#E0115F').bold.underline('Truecolor!')
```

## ⚖️ Similar libraries

The most popular Node.js libraries similar to Ansis:

[chalk][chalk], [picocolors][picocolors], [colorette][colorette], [kleur][kleur], [ansi-colors][ansi-colors], [kolorist][kolorist], [cli-color][cli-color], [colors-cli][colors-cli], [colors.js][colors.js]

✅ [Compare features](#compare) 📦 [Compare package sizes](#compare-size) 📊 [Benchmarks](#benchmark)

<a id="features" name="features"></a>

## 💡 Highlights

- Supports **ESM**, **CommonJS**, **TypeScript**
- Supports **Bun**, **Deno**, **Next.JS** runtimes
- Drop-in [replacement](#why-switch-to-ansis) for [`chalk`](#replacing-chalk) [`colorette`](#replacing-colorette) [`picocolors`](#replacing-picocolors) [`ansi-colors`](#replacing-ansi-colors)
- Default and [named import](#named-import) `import ansis, { red, bold, ansi256, hex } from 'ansis'`
- [Chained syntax](#chained-syntax) `red.bold.underline('text')`
- [Nested **template strings**](#nested-syntax) ``` red`Error: ${blue`file.js`} not found!` ```
- [ANSI styles](#base-colors) `dim` **`bold`** _`italic`_ <u>`underline`</u> <s>`strikethrough`</s>
- [ANSI 16 colors](#base-colors) ``` red`Error!` ``` ``` redBright`Error!` ``` ``` bgRed`Error!` ``` ``` bgRedBright`Error!` ```
- [ANSI 256 colors](#256-colors) ``` fg(56)`violet` ``` ``` bg(208)`orange` ```
- [Truecolor](#truecolor) (**RGB**, **HEX**) ``` rgb(224, 17, 95)`Ruby` ``` ``` hex('#96C')`Amethyst` ```
- [Fallback](#fallback) to supported [color space](#color-support): Truecolor → 256 colors → 16 colors → no colors
- [Extending of base colors](#extend-colors) with named **Truecolor**
- [Raw ANSI codes](#escape-codes) as `open` and `close` properties ``` `foo ${red.open}red{red.close} bar` ```
- [Strip ANSI codes](#strip) method `ansis.strip()`
- Automatically detects [color support](#color-support) across a wide range of [environments](#color-support)
- Supports [environment variables](#cli-vars) `NO_COLOR` `FORCE_COLOR` and [flags](#cli-flags) `--no-color` `--color`
- Set [COLORTERM](#using-env-colorterm) variable to test applications with 16, 256, or true-color
- [Correct style break](#new-line) at the `end of line` when used `\n` in string
- Doesn't extend `String.prototype`
- Zero dependencies
- Test coverage 100%. Long term support.

## 🌍 Used by

[NestJS](https://github.com/nestjs/nest), [Facebook/StyleX](https://github.com/facebook/stylex), [Sequelize](https://github.com/sequelize/sequelize), [Salesforce](https://github.com/salesforcecli/cli), [Oclif](https://github.com/oclif/core), [WebpackBar](https://github.com/unjs/webpackbar)


<!--
## 🔆 What's New in v3

- **NEW** added detection of supported color space: Truecolor, 256 colors, 16 colors, no colors (black & white)
- **NEW** added fallback to supported color space: Truecolor —> 256 colors —> 16 colors —> no colors

> #### ⚠️ Warning
>
> The `v3` has the **BREAKING CHANGES** (removed not widely supported styles and DEPRECATIONS).\
> For details see the [changelog](https://github.com/webdiscus/ansis/blob/master/CHANGELOG.md#v3-0-0).
-->

## ❓Question / Feature Request / Bug

If you have discovered a bug or have a feature suggestion, feel free to create
an [issue](https://github.com/webdiscus/ansis/issues) on GitHub.


<a id="why-switch-to-ansis" name="why-switch-to-ansis"></a>

## 🔄 [Why switch to Ansis](#switch-to-ansis)

Today, the two [smallest](#compare-size) and [fastest](#benchmark) libraries are  `ansis` and `picocolors`.
Both are [recommended](https://github.com/es-tooling/module-replacements/blob/main/docs/modules/chalk.md) by the [ES Tooling](https://github.com/es-tooling) community as replacements for older, bulkier libraries.

### 📦 Unpacked size

The package size in `node_modules` directory:

- `picocolors`: [6.4 kB][npm-picocolors] - A micro library with only basic features.
- `аnsis`: [7.0 kB][npm-ansis] - A powerful library containing all the features you need.
- `chalk`:  [44.2 kB][npm-chalk] - Provides similar functionality to Ansis.

### ⚡ Performance

- `picocolors`: The fastest when applying a single style (e.g., `red`) only.
- `аnsis`: The fastest when applying two or more styles (e.g., `red` + `bgWhite`).
- `chalk`: Slower than both **Ansis** and **Picocolors** in all use cases.

### 🔧 Maintenance

Only `ansis`, `chalk`, and `picocolors` are actively maintained, unlike many other libraries:

- `colorette`: Last updated [2 years ago][npm-colorette]
- `ansi-colors`: Last updated [3 years ago][npm-ansi-colors]
- `kleur`: Last updated [2 years ago][npm-kleur]
- `cli-color`: Last updated [~1 year ago][npm-cli-color]
- `colors-cli`: Last updated [1 year ago][npm-colors-cli]
- `colors.js`: Last updated [1 year ago][npm-colors.js]


### 🤔 Which One Should You Use?

- If you only use a single style, e.g., `red('foo')`, **Picocolors** is the best solution.

- However, if you need more, like combining multiple styles (e.g., `red` + `bold` + `bgWhite`),\
  [256 colors](#256-colors), [Truecolor](#truecolor),
  or support for a wide range of [environments](#color-support),
  then **Ansis** is the better choice.


Explore the list of [features](#compare), [package sizes](#compare-size), and [benchmarks](#benchmark) compared to similar libraries.

> [!TIP]
>
> Use the chained syntax provided by libraries like `ansis` and `chalk`.\
> Avoid nested calls, as they are [much slower](#bench-3-styles) and less readable than the chained syntax.\
> _**Keep your code clean and readable!**_

#### Usage examples
```js
import ansis, { red, green, cyan } from 'ansis' // ✅✅ supports both default and named imports
import chalk from 'chalk'                       // ✅❌ doesn't support named import
import pico from 'picocolors'                   // ✅❌ doesn't support named import

ansis.red('Error')                         //      ansis ❌ slower than picocolors
chalk.red('Error')                         //      chalk ❌ slower than ansis
pico.red('Error')                          // picocolors ✅ fastest

red.bold.bgWhite`Error`                    //      ansis ✅✅✅ fastest, short, readable
chalk.red.bold.bgWhite('Error')            //      chalk ❌☑️✅ slower, short, readable
pico.red(pico.bold(pico.bgWhite('Error'))) // picocolors ❌❌❌ slowest, long, unreadable

green`Create ${blue.bold`React`} app.`                     //      ansis ✅ usability 😊
chalk.green(`Create ${chalk.blue.bold('React')} app.`)     //      chalk ☑️ usability 🙂
pico.green(`Create ${pico.blue(pico.bold('React'))} app.`) // picocolors ❌ usability 🥴
```

> [!TIP]
> Ansis supports **nested template strings**, so you can colorize text without using parentheses.

## [How to switch to Ansis](#switch-to-ansis)

- [Replacing `chalk`](#replacing-chalk)
- [Replacing `colorette`](#replacing-colorette)
- [Replacing `picocolors`](#replacing-picocolors)
- [Replacing `ansi-colors`](#replacing-ansi-colors)
- [Replacing `kleur`](#replacing-kleur)
- [Replacing `cli-color`](#replacing-cli-color)

---

#### [↑ top](#top)

<a id="install" name="install"></a>

## Install and Quick Start

```bash
npm install ansis
```

You can import default module or named colors with ESM or CommonJS syntax.

```js
// ESM default import
import ansis from 'ansis';
// ESM named import
import { red, green, blue } from 'ansis';
```

or

```js
// CommonJS default import
const ansis = require('ansis');
// CommonJS named import
const { red, green, blue } = require('ansis');
```

See the list of the [ANSI colors and styles](#base-colors).

```js
console.log(ansis.green('Success!'));
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
import { red, black, inverse, reset } from 'ansis';

console.log(green`Hello ${inverse`ANSI`} World!
${black.bgYellow`Warning:`} ${cyan`/path/to/file.js`} ${red`not found!`}`);
```

Output:\
![screenshot "Hello ANSI World!"](https://github.com/webdiscus/ansis/raw/master/docs/img/quik-start-output.png?raw=true)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/stackblitz-starters-sx74bl?file=index.js)

#### [↑ top](#top)

<a id="named-import" name="named-import"></a>

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
import { red, hex, italic } from 'ansis';

red.bold('text');
```

Default import and named import can be combined.

```js
// default and named import
import ansis, { red } from 'ansis';

const redText = red('text'); // colorized ANSI string
const text = ansis.strip(redText); // pure string without ANSI codes
```

<a id="template-literals" name="template-literals"></a>

## Template literals

The `ansis` supports both the function syntax `red('error')` and template literals ``` red`error` ```.

The `template literals` allow you to make a complex template more readable and shorter.\
The `function syntax` can be used to colorize a variable.

```js
import { red } from 'ansis';

let message = 'error';

red(message);
red`text`;
red`text ${message} text`;
```

<a id="chained-syntax" name="chained-syntax"></a>

## Chained syntax

All colors, styles and functions are chainable. Each color or style can be combined in any order.

```js
import { red, bold, italic, hex } from 'ansis';

red.bold`text`;
hex('#FF75D1').bgCyan.bold`text`;
bold.bgHex('#FF75D1').cyan`text`;
italic.bold.yellow.bgMagentaBright`text`;
```

#### [↑ top](#top)

<a id="nested-syntax" name="nested-syntax"></a>

## Nested syntax

You can nest functions and template strings within each other.
None of the other libraries (chalk, kleur, colorette, colors.js etc.) support nested template strings.

Nested template strings:

```js
import { red, green } from 'ansis';

red`red ${green`green`} red`;
```

Deep nested chained styles:

```js
import { red, green, cyan, magenta, yellow, italic, underline } from 'ansis';

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
![screenshot nested styles](https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-nested.png?raw=true)

Multiline nested template strings:

```js
import { red, green, hex, visible, inverse } from 'ansis';

// defined a Truecolor as the constant
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
![screenshot multiline nested](https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-multiline-nested.png?raw=true)

#### [↑ top](#top)

<a id="base-colors" name="base-colors"></a>

## Base ANSI 16 colors and styles

Colors and styles have standard names used by many popular libraries, such
as [chalk], [colorette], [picocolors], [kleur].

| Foreground colors                                         | Background colors                                               | Styles                                  |
|:----------------------------------------------------------|:----------------------------------------------------------------|-----------------------------------------|
| `black`                                                   | `bgBlack`                                                       | `dim`                                   |
| `red`                                                     | `bgRed`                                                         | **`bold`**                              |
| `green`                                                   | `bgGreen`                                                       | _`italic`_                              |
| `yellow`                                                  | `bgYellow`                                                      | <u>`underline`</u>                      |
| `blue`                                                    | `bgBlue`                                                        | <s>`strikethrough`</s> (alias `strike`) |
| `magenta`                                                 | `bgMagenta`                                                     | `inverse`                               |
| `cyan`                                                    | `bgCyan`                                                        | `visible`                               |
| `white`                                                   | `bgWhite`                                                       | `hidden`                                |
| `blackBright`<br>aliases:<br>`grey`<br>`gray` US spelling | `bgBlackBright`<br>aliases:<br>`bgGrey`<br>`bgGray` US spelling | `reset`                                 |
| `redBright`                                               | `bgRedBright`                                                   |                                         |
| `greenBright`                                             | `bgGreenBright`                                                 |                                         |
| `yellowBright`                                            | `bgYellowBright`                                                |                                         |
| `blueBright`                                              | `bgBlueBright`                                                  |                                         |
| `magentaBright`                                           | `bgMagentaBright`                                               |                                         |
| `cyanBright`                                              | `bgCyanBright`                                                  |                                         |
| `whiteBright`                                             | `bgWhiteBright`                                                 |                                         |

<a id="extend-colors" name="extend-colors"></a>

## Extend base colors

Defaults, the imported `ansis` instance contains [base styles and colors](#base-colors).
To extend base colors with custom color names for Truecolor use the `ansis.extend()` method.

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

#### [↑ top](#top)

<a id="256-colors" name="256-colors"></a>

## ANSI 256 colors

The pre-defined set of 256 colors.

<div align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="830" src="https://github.com/webdiscus/ansis/raw/master/docs/img/ansi256.png" alt="ANSI 256 colors">
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

#### Fallback

If a terminal supports only 16 colors then ANSI 256 colors will be interpolated into base 16 colors.

<div align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="830" src="https://github.com/webdiscus/ansis/raw/master/docs/img/ansi256-fallback.png" alt="Fallback ANSI 256 colors to 16 colors">
  </a>
</div>

#### Usage example

```js
import { bold, ansi256, fg, bgAnsi256, bg } from 'ansis';

// foreground color
ansi256(96)`Bright Cyan`;
fg(96)`Bright Cyan`; // alias for ansi256

// background color
bgAnsi256(105)`Bright Magenta`;
bg(105)`Bright Magenta`; // alias for bgAnsi256

// function is chainable
ansi256(96).bold`bold Bright Cyan`;

// function is avaliable in each style
bold.ansi256(96).underline`bold underline Bright Cyan`;

// you can combine the functions and styles in any order
bgAnsi256(105).ansi256(96)`cyan text on magenta background`
bg(105).fg(96)`cyan text on magenta background`
```

<a id="truecolor" name="truecolor"></a>

## Truecolor

You can use the `hex` or `rgb` format.

Foreground function: `hex()` `rgb()`\
Background function: `bgHex()` `bgRgb()`

```js
import { bold, hex, rgb, bgHex, bgRgb } from 'ansis';

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

#### [↑ top](#top)

<a id="fallback" name="fallback"></a>

## Fallback

The `ansis` supports fallback to supported color space.

```
Truecolor —> 256 colors —> 16 colors —> no colors (black & white)
```

If you use the `hex()`, `rgb()` or `ansis256()` functions in a terminal not supported Truecolor or 256 colors, then colors will be interpolated.

![output](https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-fallback.png?raw=true "Fallback to ANSI colors")

#### [↑ top](#top)

<a id="escape-codes" name="escape-codes"></a>

## Use ANSI codes

You can use the [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors_and_Styles) with `open`
and `close` properties for each style.

```js
import { red, bold } from 'ansis';

// each style has `open` and `close` properties
console.log(`Hello ${red.open}ANSI${red.close} World!`);

// you can defiene own style which will have the `open` and `close` properties
const myStyle = bold.italic.black.bgHex('#E0115F');

console.log(`Hello ${myStyle.open}ANSI${myStyle.close} World!`);
```

<a id="strip" name="strip"></a>

## Strip ANSI codes

The Ansis class contains the method `strip()` to remove all ANSI codes from string.

```js
import ansis from 'ansis';

const ansiString = ansis.green`Hello World!`;
const string = ansis.strip(ansiString);
```

The variable `string` will contain the pure string without ANSI codes.

#### [↑ top](#top)

<a id="new-line" name="new-line"></a>

## New lines

Supports correct style break at the `end of line`.

```js
import { bgGreen } from 'ansis';

console.log(bgGreen`\nAnsis\nNew Line\nNext New Line\n`);
```

![output](https://github.com/webdiscus/ansis/raw/master/docs/img/break-style-nl.png?raw=true "break styles at EOL")

<a id="shortcuts" name="shortcuts"></a>

## Shortcuts / Themes

Define your own themes:

```js
import ansis from 'ansis';

const theme = {
  info: ansis.cyan.italic,
  warn: ansis.black.bgYellowBright,
  error: ansis.red.bold,
  ruby: ansis.hex('#E0115F'),
};

theme.info('info');
theme.warn('warning');
theme.error('error');
theme.ruby('Ruby color');
```

---

#### [↑ top](#top)

<a id="cli-vars" name="cli-vars"></a>

## CLI environment variables

Defaults, the output in terminal console is colored and output in a file is uncolored.

To force disable or enable colored output use environment variables `NO_COLOR` and `FORCE_COLOR`.

The `NO_COLOR` variable should be presents with any not empty value.
The value is not important, e.g., `NO_COLOR=1` `NO_COLOR=true` disable colors.\
See standard description by [NO_COLOR](https://no-color.org/).

The `FORCE_COLOR` variable should be presents with one of values:\
`FORCE_COLOR=0` force disable colors\
`FORCE_COLOR=1` force enable colors\
See standard description by [FORCE_COLOR](https://force-color.org/).

For example, _app.js_:

```js
import { red } from 'ansis';

console.log(red`red color`);
```

Execute the script in a terminal:

```
$ node app.js           # colored output in terminal
$ node app.js > log.txt # output in file without ANSI codes

$ NO_COLOR=1 node app.js              # force disable colors, non colored output in terminal
$ FORCE_COLOR=0 node app.js           # force disable colors, non colored output in terminal
$ FORCE_COLOR=1 node app.js > log.txt # force enable colors, output in file with ANSI codes
```

<a id="using-env-colorterm" name="using-env-colorterm"></a>

#### Using `COLORTERM`

The `COLORTERM` environment variable is used by terminal emulators to indicate support for colors.
Its value can vary depending on the terminal emulator and the level of color support provided.

The commonly used values supported by `ansis`:

- `truecolor` or `24bit` - 16 million colors
- `ansi256` - ANSI 256 colors
- `ansi` - basic ANSI 16 colors

You can set the variable in cmd before running the Node script:

```
COLORTERM=truecolor node script.js # force use truecolor
COLORTERM=ansi256 node script.js   # force use 256 colors
COLORTERM=ansi node script.js      # force use 16 olors
```

To set the color level in a script, create a JS file in which you define the `COLORTERM` environment variable with the needed value,
and import this file before `ansis`.

This can be useful, for example, for testing your cli application to ensure that the test results will be the same
regardless of the supported color level in different environments and terminals.

#### Force use truecolor

_level-truecolor.js_

```js
process.env.COLORTERM = 'truecolor';
```
your script file:
```js
import './level-truecolor'; // <= force use truecolor
import { red, ansi256, hex } from 'ansis';

console.log(hex('#FFAB40')('orange')); // native ANSI RGB color value
console.log(ansi256(200)('pink'));     // native ANSI 256 color value
console.log(red('red'));               // native ANSI 16 color value
```

#### Force use 256 colors

_level-256colors.js_

```js
process.env.COLORTERM = 'ansi256';
```
your script file:
```js
import './level-256colors'; // <= force use 256 colors
import { red, ansi256, hex } from 'ansis';

console.log(hex('#FFAB40')('orange')); // fallback to ANSI 256 color value
console.log(ansi256(200)('pink'));     // native ANSI 256 color value
console.log(red('red'));               // native ANSI 16 color value
```

#### Force use base 16 colors

_level-16colors.js_

```js
process.env.COLORTERM = 'ansi';
```
your script file:
```js
import './level-16colors'; // <= force use 16 olors
import { red, ansi256, hex } from 'ansis';

console.log(hex('#FFAB40')('orange')); // fallback to ANSI 16 color value - `bright red`
console.log(ansi256(200)('pink'));     // fallback to ANSI 16 color value - `bright magenta`
console.log(red('red'));               // native ANSI 16 color value
```

#### [↑ top](#top)

<a id="cli-flags" name="cli-flags"></a>

### CLI arguments

Use cmd arguments `--no-color` or `--color=false` to disable colors and `--color` to enable ones.

For example, an executable script _app.js_:

```js
#!/usr/bin/env node
import { red } from 'ansis';

console.log(red`red color`);
```

Execute the script in a terminal:

```
$ ./app.js                        # colored output in terminal
$ ./app.js --no-color             # non colored output in terminal
$ ./app.js --color=false          # non colored output in terminal

$ ./app.js > log.txt              # output in file without ANSI codes
$ ./app.js --color > log.txt      # output in file with ANSI codes
$ ./app.js --color=true > log.txt # output in file with ANSI codes
```

> **Warning**
>
> The command line arguments have a higher priority than environment variable.

---

#### [↑ top](#top)

<a id="color-support" name="color-support"></a>

## Color support

Ansis automatically detects the supported color space:

- Truecolor
- ANSI 256 colors
- ANSI 16 colors
- black & white (no colors)

Ansis has the method `isSupported()` that returns a `boolean` value whether the output supports ANSI color and styles.

```js
import ansis from 'ansis';

console.log('Color output: ', ansis.isSupported());
```

There is no standard way to detect which color space is supported.
The most common way to detect color support is to check the `TERM` and `COLORTERM` environment variables.
CI systems can be detected by checking for the existence of the `CI` and other specifically environment variables.
Combine that with the knowledge about which operating system the program is running on, and we have a decent enough way to detect colors.

| Terminal                          | ANSI 16<br>colors | ANSI 256<br>colors | True<br>Color |  env.<br>TERM  | env.<br>COLORTERM | Specifically ENV variables             |
|:----------------------------------|-------------------|:-------------------|:--------------|:--------------:|:-----------------:|:---------------------------------------|
| Azure CI                          | ✅                 | ❌                  | ❌             |      dumb      |                   | TF_BUILD<br>AGENT_NAME                 |
| GitHub CI                         | ✅                 | ✅                  | ✅             |      dumb      |                   | CI, GITHUB_ACTIONS                     |
| GitTea CI                         | ✅                 | ✅                  | ✅             |      dumb      |                   | CI, GITEA_ACTIONS                      |
| GitLab CI                         | ✅                 | ❌                  | ❌             |      dumb      |                   | CI, GITLAB_CI                          |
| Travis CI                         | ✅                 | ❌                  | ❌             |      dumb      |                   | TRAVIS                                 |
| PM2<br>not isTTY                  | ✅[^1]             | ✅[^1]              | ✅[^1]         |      dumb      |                   | PM2_HOME<br>pm_id                      |
| JetBrains TeamCity<br>>=2020.1.1  | ✅                 | ✅                  | ❌             |                |                   | TEAMCITY_VERSION                       |
| JetBrains IDEA                    | ✅                 | ✅                  | ✅             | xterm-256color |                   | TERMINAL_EMULATOR='JetBrains-JediTerm' |
| VS Code                           | ✅                 | ✅                  | ✅             | xterm-256color |     truecolor     |                                        |
| Windows<br>Terminal               | ✅                 | ✅                  | ✅[^2]         |                |                   |                                        |
| Windows<br>PowerShell             | ✅                 | ✅                  | ✅[^2]         |                |                   |                                        |
| macOS Terminal                    | ✅                 | ✅                  | ❌             | xterm-256color |                   |                                        |
| iTerm                             | ✅                 | ✅                  | ✅             | xterm-256color |     truecolor     |                                        |
| Terminal emulator Kitty           | ✅                 | ✅                  | ✅             |  xterm-kitty   |                   |                                        |
| Terminal emulator KDE Konsole     | ✅                 | ✅                  | ✅             |  xterm-direct  |                   |                                        |

[^1]: Colors supported depends on actual terminal.\
[^2]: The Windows terminal supports true color since Windows 10 revision 14931 (2016-09-21).

See also:

- [Truecolor Support in Output Devices](https://github.com/termstandard/colors#truecolor-support-in-output-devices).
- [So you want to render colors in your terminal](https://marvinh.dev/blog/terminal-colors/).

---

#### [↑ top](#top)

<a id="compare" name="compare"></a>

## Compare the features of most popular libraries

Run the command to see the support of some features by various libraries:

```
npm run compare
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/compare-colorize-libraries?file=index.js)

| Library<br><nobr>________________</nobr><br> - named import<br>- naming colors |  ANSI 16 colors   | ANSI 256<br>colors | True<br>Color | Chained<br>syntax | Nested<br>template strings | New<br>Line | Fallback to colors  | Supports<br>ENV vars<br>CLI flags                        |
|:-------------------------------------------------------------------------------|:-----------------:|:------------------:|:-------------:|:-----------------:|:--------------------------:|:-----------:|---------------------|:---------------------------------------------------------|
| [`ansis`][ansis]<br><nobr>`✅ named import`</nobr><br>`✅ standard`              |         ✅         |         ✅          |       ✅       |         ✅         |             ✅              |      ✅      | →256<br>→16<br>→b&w | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`chalk`][chalk]<br><nobr>`❌ named import`</nobr><br>`✅ standard`              |         ✅         |         ✅          |       ✅       |         ✅         |             ❌              |      ✅      | →256<br>→16<br>→b&w | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`kolorist`][kolorist]<br><nobr>`✅ named import`</nobr><br>`❌ standard`        |         ✅         |         ✅          |       ✅       |         ❌         |             ❌              |      ❌      | →256<br>→b&w        | `NO_COLOR`<br>`FORCE_COLOR`                              |
| [`cli-color`][cli-color]<br><nobr>`❌ named import`</nobr><br>`✅ standard`      |         ✅         |         ✅          |       ❌       |         ✅         |             ❌              |      ❌      | →16<br>→b&w         | `NO_COLOR`                                               |
| [`colors-cli`][colors-cli]<br><nobr>`❌ named import`</nobr><br>`❌ standard`    |         ✅         |         ✅          |       ❌       |         ✅         |             ❌              |      ✅      | →b&w                | `--no-color`<br>`--color`                                |
| [`colors.js`][colors.js]<br><nobr>`❌ named import`</nobr><br>`❌ standard`      |         ✅         |         ❌          |       ❌       |         ✅         |             ❌              |      ✅      | →b&w                | `FORCE_COLOR`<br>`--no-color`<br>`--color`               |
| [`ansi-colors`][ansi-colors]<br><nobr>`❌ named import`</nobr><br>`✅ standard`  |         ✅         |         ❌          |       ❌       |         ✅         |             ❌              |      ✅      | ❌                   | `FORCE_COLOR`                                            |
| [`colorette`][colorette]<br><nobr>`✅ named import`</nobr><br>`✅ standard`      |         ✅         |         ❌          |       ❌       |         ❌         |             ❌              |      ❌      | →b&w                | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`picocolors`][picocolors]<br><nobr>`❌ named import`</nobr><br>`✅ standard`    | ✅<br>since v1.1.0 |         ❌          |       ❌       |         ❌         |             ❌              |      ❌      | →b&w                | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`kleur`][kleur]<br><nobr>`✅ named import`</nobr><br>`✅ standard`              | ❌<br> `8` colors  |         ❌          |       ❌       |         ✅         |             ❌              |      ❌      | →b&w                | `NO_COLOR`<br>`FORCE_COLOR`                              |

> **Note**
>
> **Named import**\
> ESM\
> `import { red, green, blue } from 'lib';`\
> CJS\
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

#### [↑ top](#top)

<a id="compare-size" name="compare-size"></a>

## Compare the size of most popular packages

| Npm package                  |                                                  Download tarball size |                  Unpacked Size | Code size |
|:-----------------------------|-----------------------------------------------------------------------:|-------------------------------:|----------:|
| [`picocolors`][picocolors]   |        [2.6 kB](https://arve0.github.io/npm-download-size/#picocolors) |       [6.4 kB][npm-picocolors] |    2.6 kB
| [`ansis`][ansis]             |             [3.8 kB](https://arve0.github.io/npm-download-size/#ansis) |            [7.0 kB][npm-ansis] |    3.4 kB
| [`colorette`][colorette]     |         [4.9 kB](https://arve0.github.io/npm-download-size/#colorette) |       [17.0 kB][npm-colorette] |    3.4 kB
| [`kleur`][kleur]             |             [6.0 kB](https://arve0.github.io/npm-download-size/#kleur) |           [20.3 kB][npm-kleur] |    2.7 kB
| [`ansi-colors`][ansi-colors] |       [8.5 kB](https://arve0.github.io/npm-download-size/#ansi-colors) |     [26.1 kB][npm-ansi-colors] |    5.8 kB
| [`kolorist`][kolorist]       |          [8.7 kB](https://arve0.github.io/npm-download-size/#kolorist) |        [51.0 kB][npm-kolorist] |    6.8 kB
| [`colors.js`][colors.js]     | [11.1 kB](https://arve0.github.io/npm-download-size/#@colors%2fcolors) |       [41.5 kB][npm-colors.js] |   18.1 kB
| [`chalk`][chalk]             |            [13.1 kB](https://arve0.github.io/npm-download-size/#chalk) |           [43.7 kB][npm-chalk] |   16.4 kB
| [`cli-color`][cli-color]     |  [13.8 (216 kB)](https://arve0.github.io/npm-download-size/#cli-color) | [39.6 (754 kB)][npm-cli-color] |   12.1 kB
| [`colors-cli`][colors-cli]   |      [361.7 kB](https://arve0.github.io/npm-download-size/#colors-cli) |     [511.0 kB][npm-colors-cli] |    8.7 kB

**Download size:** The gzipped size of the npm package.\
**Unpacked Size:** The size of the npm package in the `node_modules/` directory, `(incl. dependencies)`.\
**Code size**: The size of distributed code that will be loaded via `require` or `import` into your app.

See also:

- [npmjs](https://www.npmjs.com/package) - show install size of the published package, w/o dependencies
- [packagephobia](https://packagephobia.com) - show total install size, incl. dependencies
- [npm download size](https://arve0.github.io/npm-download-size) - show tarball and total download size
- [bundlephobia](https://bundlephobia.com) - useless, doesn't show real tarball size of the downloaded npm package

---

#### [↑ top](#top)

## Show ANSI demo

```bash
git clone https://github.com/webdiscus/ansis.git
cd ./ansis
npm i
npm run demo
```

<a id="benchmark" name="#benchmark"></a>

## Benchmarks

To measure performance is used [benchmark.js](https://github.com/bestiejs/benchmark.js).

> [!WARNING]
>
> ‼️ **Don't trust** other test results using [vitest benchmark](https://vitest.dev/config/#benchmark).
>
> The `vitest benchmark` generate FALSE/**unreal** results.\
> For example, the results of the simple bench:
> ```
> chalk.red('foo') -  7.000.000 ops/sec
> ansis.red('foo') - 23.000.000 ops/sec (x3 faster is WRONG result)
> ```
>
> The actual performance results of Chalk and Ansis in this test are very similar.

### Run benchmarks

```bash
git clone https://github.com/webdiscus/ansis.git
cd ./ansis
npm i
npm run build
npm run bench
```

> ### Tested on
>
> MacBook Pro 16" M1 Max 64GB\
> macOS Sequoia 15.1\
> Node.js v22.11.0\
> Terminal `iTerm2` v3.5.0

---

> [!NOTE]
>
> In the tests, each library uses the **fastest** styling method available to compare the **absolute performance** of each library.
>
> In real practice, no one would use the **slowest** method (such as nested calls) to style a string when the library provides a **faster** and a **shorter** chained method.
>
> For example:
>
> ```js
> lib.red.bold.bgWhite(' ERROR ')           // ✅ faster, shorter, readable
> lib.red(lib.bold(lib.bgWhite(' ERROR '))) // ❌ slower, longer, unreadable
> ```

### Simple bench

The simple test uses only single style.
Picocolors, Colorette and Kleur do not support [chained syntax](#chained-syntax) or [correct style break](#new-line) (wenn used ``` `\n` ``` in a string),
so they are the fastest in this simple use case. _No function, no performance overhead_.

```js
ansis.red('foo')
chalk.red('foo')
picocolors.red('foo')
...
```

```diff
+  picocolors@1.1.1    109.212.939 ops/sec
   colorette@2.0.20    108.044.800 ops/sec
   kleur@4.1.5          87.800.739 ops/sec
-> ansis@3.5.0          60.606.043 ops/sec  -44.5%
-  chalk@5.3.0          55.702.479 ops/sec  -48.9%
   kolorist@1.8.0       37.069.069 ops/sec
   ansi-colors@4.1.3    14.364.378 ops/sec
   colors@1.4.0          7.060.583 ops/sec
   cli-color@2.0.4       2.753.751 ops/sec
   colors-cli@1.0.33       897.746 ops/sec
```

<a id="bench-2-styles" name="bench-2-styles"></a>
### Using 2 styles

Using only 2 styles, picocolors is already a bit slower, because using the [chained syntax](#chained-syntax) is faster than nested calls.

```js
ansis.red.bold('foo')
chalk.red.bold('foo')
picocolors.red(picocolors.bold('foo')) // chained syntax is not supported
...
```

```diff
+  ansis@3.5.0          60.468.181 ops/sec
-  picocolors@1.1.1     58.777.183 ops/sec    -2.8%
-  chalk@5.3.0          47.789.020 ops/sec   -21.5%
   colorette@2.0.20     33.387.988 ops/sec
   kolorist@1.8.0       13.420.047 ops/sec
   kleur@4.1.5           5.972.681 ops/sec
   ansi-colors@4.1.3     4.086.412 ops/sec
   colors@1.4.0          3.018.244 ops/sec
   cli-color@2.0.4       1.817.039 ops/sec
   colors-cli@1.0.33       695.601 ops/sec
```

<a id="bench-3-styles" name="bench-3-styles"></a>
### Using 3 styles

Using 3 styles, picocolors is 2x slower than ansis.

```js
ansis.red.bold.bgWhite('foo')
chalk.red.bold.bgWhite('foo')
picocolors.red(picocolors.bold(picocolors.bgWhite('foo'))) // chained syntax is not supported
...
```

```diff
+  ansis@3.5.0          59.463.640 ops/sec
-  chalk@5.3.0          42.166.783 ops/sec  -29.0%
-  picocolors@1.1.1     32.434.017 ops/sec  -45.5% (~2x slower than Ansis)
   colorette@2.0.20     13.008.117 ops/sec
   kolorist@1.8.0        5.608.244 ops/sec
   kleur@4.1.5           5.268.630 ops/sec
   ansi-colors@4.1.3     2.145.517 ops/sec
   colors@1.4.0          1.686.728 ops/sec
   cli-color@2.0.4       1.453.611 ops/sec
   colors-cli@1.0.33       590.467 ops/sec
```

### Using 4 styles

In rare cases, when using 4 styles, picocolors becomes 3.4x slower than ansis.

```js
ansis.red.bold.underline.bgWhite('foo')
chalk.red.bold.underline.bgWhite('foo')
picocolors.red(picocolors.bold(picocolors.underline(picocolors.bgWhite('foo')))) // chained syntax is not supported
...
```

```diff
+  ansis@3.5.0          59.104.535 ops/sec
-  chalk@5.3.0          36.147.547 ops/sec  -38.8%
-  picocolors@1.1.1     17.581.709 ops/sec  -70.2% (~3x slower than Ansis)
   colorette@2.0.20      7.981.171 ops/sec
   kleur@4.1.5           4.825.665 ops/sec
   kolorist@1.8.0        3.729.880 ops/sec
   ansi-colors@4.1.3     1.514.053 ops/sec
   colors@1.4.0          1.229.999 ops/sec
   cli-color@2.0.4       1.210.931 ops/sec
   colors-cli@1.0.33       481.073 ops/sec
```

### Deeply nested styles

The complex test with deeply nested single styles.

```js
c.green(
  `green ${c.cyan(
    `cyan ${c.red(
      `red ${c.yellow(
        `yellow ${c.blue(
          `blue ${c.magenta(`magenta ${c.underline(`underline ${c.italic(`italic`)} underline`)} magenta`)} blue`,
        )} yellow`,
      )} red`,
    )} cyan`,
  )} green`,
)
```

```diff
+  colorette@2.0.20      1.110.056 ops/sec
-  picocolors@1.1.1      1.073.299 ops/sec
-> ansis@3.5.0             847.246 ops/sec  -23.7%
   kolorist@1.8.0          847.110 ops/sec
-  chalk@5.3.0             573.942 ops/sec  -48.3%
   kleur@4.1.5             471.285 ops/sec
   colors@1.4.0            439.588 ops/sec
   ansi-colors@4.1.3       382.862 ops/sec
   cli-color@2.0.4         213.351 ops/sec
   colors-cli@1.0.33        41.097 ops/sec
```

### Colorette bench

The benchmark used in [`colorette`](https://github.com/jorgebucaran/colorette/blob/main/bench/index.js) for single styles.

```js
c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`)
```

```diff
+  picocolors@1.1.1      3.861.384 ops/sec
   colorette@2.0.20      3.815.039 ops/sec
-> ansis@3.5.0           2.918.269 ops/sec  -24.4%
   kolorist@1.8.0        2.548.564 ops/sec
-  chalk@5.3.0           2.502.850 ops/sec  -35.2%
   kleur@4.1.5           2.229.023 ops/sec
   ansi-colors@4.1.3     1.426.279 ops/sec
   colors@1.4.0          1.123.139 ops/sec
   cli-color@2.0.4         481.708 ops/sec
   colors-cli@1.0.33       114.570 ops/sec
```

### Picocolors complex bench

The [`picocolors`](https://github.com/alexeyraspopov/picocolors/blob/main/benchmarks/complex.mjs) benchmark, slightly modified.
Added a bit more complexity by applying two styles to the colored word instead of one.

```js
let index = 1e8;
c.red('.') +
c.yellow('.') +
c.green('.') +
c.red.bold(' ERROR ') +
c.red('Add plugin ' + c.cyan.underline('name') + ' to use time limit with ' + c.cyan(++index));
```

```diff
+  picocolors@1.1.1      2.601.559 ops/sec
-> ansis@3.5.0           2.501.227 ops/sec   -3.8%
   colorette@2.0.20      2.326.491 ops/sec
-  chalk@5.3.0           2.129.106 ops/sec  -18.1%
   kleur@4.1.5           1.780.496 ops/sec
   kolorist@1.8.0        1.685.703 ops/sec
   ansi-colors@4.1.3       838.542 ops/sec
   colors@1.4.0            533.362 ops/sec
   cli-color@2.0.4         287.558 ops/sec
   colors-cli@1.0.33        97.463 ops/sec
```

> [!NOTE]
>
> In this test, which is closer to practical use, each library uses the **fastest** styling method available.
>
> So, `chalk`, `ansis`, `ansi-colors`, `cli-color`, `colors-cli` and `colors` uses chained method, e.g. `c.red.bold(' ERROR ')`.
> While `picocolors`, `colorette` and `kolorist` uses nested calls, e.g. `c.red(c.bold(' ERROR '))`, because doesn't support the chained syntax.


---

#### [↑ top](#top)

<a id="switch-to-ansis" name="switch-to-ansis"></a>

## How to switch to Ansis

Ansis is a powerful, small, and fast replacement that requires **no code migration** for many similar libraries.\
Just replace your `import ... from ...` or `require(...)` to `ansis`.

<a id="replacing-chalk" name="replacing-chalk"></a>

### Drop-in replacement for [chalk], no migration required

```diff
- import chalk from 'chalk';
+ import chalk from 'ansis';
```

Ansis supports the Chalk syntax and is compatible* with [styles and color names](https://github.com/chalk/chalk?tab=readme-ov-file#styles), so you don't need to modify the
original code:

```js
chalk.red.bold('Error!');

// colorize "Error: file not found!"
chalk.red(`Error: ${chalk.cyan.bold('file')} not found!`);

// ANSI 256 colors
chalk.ansi256(93)('Violet color');
chalk.bgAnsi256(194)('Honeydew, more or less');

// truecolor
chalk.hex('#FFA500').bold('Bold orange color');
chalk.rgb(123, 45, 67).underline('Underlined reddish color');
chalk.bgHex('#E0115F')('Ruby');
chalk.bgHex('#96C')('Amethyst');
```

> [!WARNING]
>
> Ansis doesn't not support the `overline` style, because it's **not widely supported** and no one uses it.\
> Check you code and remove the `overline` style:
>
> ```diff
> - chalk.red.overline('text');
> + chalk.red('text');
> ```

Optionally, you can rewrite the same code to make it even shorter and cleaner:

```js
import { red, cyan, ansi256, bgAnsi256, fg, bg, hex, rgb, bgHex, bgRgb } from 'ansis';

red.bold('Error!'); // using parentheses
red.bold`Error!`;   // using template string

// colorize "Error: file not found!"
red`Error: ${cyan.bold`file`} not found!`;

// ANSI 256 colors
ansi256(93)`Violet color`;
bgAnsi256(194)`Honeydew, more or less`;
fg(93)`Violet color`; // alias for ansi256
bg(194)`Honeydew, more or less`;  // alias for bgAnsi256

// truecolor
hex('#FFA500').bold`Bold orange color`;
rgb(123, 45, 67).underline`Underlined reddish color`;
bgHex('#E0115F')`Ruby`;
bgHex('#96C')`Amethyst`;
```

#### [↑ top](#top)

<a id="replacing-colorette" name="replacing-colorette"></a>

### Drop-in replacement for [colorette], no migration required

```diff
- import { red, bold, underline } from 'colorette';
+ import { red, bold, underline } from 'ansis';
```

Ansis is fully compatible with `colorette` [styles and color names](https://github.com/jorgebucaran/colorette#supported-colors), so you don't need to modify the
original code:

```js
red.bold('Error!');
bold(`I'm ${red(`da ba ${underline("dee")} da ba`)} daa`);
```

Optionally, you can rewrite the same code to make it even shorter and cleaner:

```js
red.bold`Error!`;
bold`I'm ${red`da ba ${underline`dee`} da ba`} daa`;
```

#### [↑ top](#top)

<a id="replacing-picocolors" name="replacing-picocolors"></a>

### Drop-in replacement for [picocolors], no migration required

```diff
- import pico from 'picocolors';
+ import pico from 'ansis';
```

Ansis is fully compatible with `picocolors` [styles and color names](https://github.com/alexeyraspopov/picocolors#usage), so you don't need to modify the
original code:

```js
pico.red(pico.bold('text'));
pico.red(pico.bold(variable));

// colorize "Error: file not found!"
pico.red('Error: ' + pico.cyan(pico.bold('file')) + ' not found!');
```

Optionally, you can rewrite the same code to make it even shorter and cleaner:

```js
import { red, cyan } from 'ansis';

red.bold`text`;
red.bold(variable);

// colorize "Error: file not found!"
red`Error: ${cyan.bold`file`} not found!`
```

#### [↑ top](#top)

<a id="replacing-ansi-colors" name="replacing-ansi-colors"></a>

### Drop-in replacement for [ansi-colors], no migration required

```diff
- const c = require('ansi-colors');
+ const c = require('ansis');
```

Ansis is fully compatible with `ansi-color` [styles and color names](https://github.com/doowb/ansi-colors#available-styles), so you don't need to modify the
original code:

```js
c.red.bold('Error!');

// colorize "Error: file not found!"
c.red(`Error: ${c.cyan.bold('file')} not found!`);
```

Optionally, you can rewrite the same code to make it even shorter and cleaner:

```js
import { red, cyan } from 'ansis';

red.bold('Error!'); // using parentheses
red.bold`Error!`;   // using template string

// colorize "Error: file not found!"
red`Error: ${cyan.bold`file`} not found!`;
```

#### [↑ top](#top)

<a id="replacing-kleur" name="replacing-kleur"></a>

### Migration from [kleur]

```diff
- import { red, green, yellow, cyan } from 'kleur';
+ import { red, green, yellow, cyan } from 'ansis';
```

Ansis is fully compatible with `kleur` [styles and color names](https://github.com/lukeed/kleur#api),
but Kleur `v3.0` no longer uses Chalk-style syntax (magical getter):

```js
green().bold().underline('this is a bold green underlined message');
yellow(`foo ${red().bold('red')} bar ${cyan('cyan')} baz`);
```

If you uses chained methods then it requires a simple code modification.
Just replace `().` with `.`:

```js
green.bold.underline('this is a bold green underlined message');
yellow(`foo ${red.bold('red')} bar ${cyan('cyan')} baz`);
```

Optionally, you can rewrite the same code to make it even shorter and cleaner:

```js
yellow`foo ${red.bold`red`} bar ${cyan`cyan`} baz`;
```

#### [↑ top](#top)

<a id="replacing-cli-color" name="replacing-cli-color"></a>

### Migration from [cli-color]

```diff
- const clc = require('cli-color');
+ const clc = require('ansis');
```

Ansis is compatible* with `cli-color` [styles and color names](https://github.com/medikoo/cli-color#colors):

```js
clc.red.bold('Error!');

// colorize "Error: file not found!"
clc.red(`Error: ${c.cyan.bold('file')} not found!`);
```

> [!WARNING]
>
> Ansis doesn't not support the `blink` style, because it's **not widely supported** and no one uses it.\
> Check you code and remove the `blink` style:
>
> ```diff
> - clc.red.blink('text');
> + clc.red('text');
> ```

If you use ANSI 256 color functions `xterm` or `bgXterm`, these must be replaced with `ansi256` `fn` or `bgAnsi256` `bg`:

```diff
- clc.xterm(202).bgXterm(236)('Orange text on dark gray background');
+ clc.ansi256(202).bgAnsi256(236)('Orange text on dark gray background');
```

Optionally, you can rewrite the same code to make it even shorter and cleaner:

```js
import { red, cyan, fg, bg } from 'ansis';

red.bold`Error!`;

// colorize "Error: file not found!"
red`Error: ${cyan.bold`file`} not found!`;

fg(202).bg(236)`Orange text on dark gray background`;
```

---

#### [↑ top](#top)

## Testing

`npm run test` will run the unit and integration tests.\
`npm run test:coverage` will run the tests with coverage.

---

#### [↑ top](#top)

## License

[ISC](https://github.com/webdiscus/ansis/blob/master/LICENSE)

[colors.js]: https://github.com/DABH/colors.js

[colorette]: https://github.com/jorgebucaran/colorette

[picocolors]: https://github.com/alexeyraspopov/picocolors

[cli-color]: https://github.com/medikoo/cli-color

[colors-cli]: https://github.com/jaywcjlove/colors-cli

[ansi-colors]: https://github.com/doowb/ansi-colors

[kleur]: https://github.com/lukeed/kleur

[kolorist]: https://github.com/marvinhagemeister/kolorist

[chalk]: https://github.com/chalk/chalk

[ansis]: https://github.com/webdiscus/ansis

[npm-colors.js]: https://www.npmjs.com/package/@colors/colors

[npm-colorette]: https://www.npmjs.com/package/colorette

[npm-picocolors]: https://www.npmjs.com/package/picocolors

[npm-cli-color]: https://www.npmjs.com/package/cli-color

[npm-colors-cli]: https://www.npmjs.com/package/colors-cli

[npm-ansi-colors]: https://www.npmjs.com/package/ansi-colors

[npm-kleur]: https://www.npmjs.com/package/kleur

[npm-kolorist]: https://www.npmjs.com/package/kolorist

[npm-chalk]: https://www.npmjs.com/package/chalk

[npm-ansis]: https://www.npmjs.com/package/ansis
