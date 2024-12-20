<a id="top" name="top"></a>
<p align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="323" src="https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-logo.png" alt="ansis">
    <h1 align="center">ANSI Styles</h1>
  </a>
</p>

[![npm](https://img.shields.io/npm/v/ansis?logo=npm&color=brightgreen "npm package")](https://www.npmjs.com/package/ansis "download npm package")
[![node](https://img.shields.io/node/v/ansis)](https://nodejs.org)
[![Test](https://github.com/webdiscus/ansis/actions/workflows/test.yml/badge.svg)](https://github.com/webdiscus/ansis/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/webdiscus/ansis/branch/master/graph/badge.svg?token=H7SFJONX1X)](https://codecov.io/gh/webdiscus/ansis)
[![downloads](https://img.shields.io/npm/dm/ansis)](https://www.npmjs.com/package/ansis)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/ansis)](https://bundlephobia.com/package/ansis)

Colorize terminal with ANSI colors & styles, **smaller** and **faster** alternative to [Chalk][chalk] with additional useful [features](#features).

🚀 [Install and Quick Start](#install)

## Usage

```js
import ansis, { red, green, cyan, black, ansi256, hex } from 'ansis';

ansis.blueBright('file.txt')
green`Succeful!`
red`Error: ${cyan(file)} not found!`
black.bgYellow`Warning!`
ansi256(214)`Orange`
hex('#E0115F').bold.underline('TrueColor!')
```

## 👀 Why yet one lib?

- Quality is first, test coverage 100%. Long term support.
- Ansis has all [features](#features) that you need, compare with [similar libraries](#compare).
- Ansis is one of the smallest, [3.5 kB](https://bundlephobia.com/package/ansis@3.2.0) minified and only [2 kB](https://bundlephobia.com/package/ansis@3.2.0) minzipped.
- Ansis is one of the [fastest](#benchmark), faster than **Chalk** and **Picocolors** (in some use cases), see [benchmarks](#benchmark).
- Used
  by [NestJS](https://github.com/nestjs/nest), [Facebook/StyleX](https://github.com/facebook/stylex), [Sequelize](https://github.com/sequelize/sequelize), [Salesforce](https://github.com/salesforcecli/cli), [WebpackBar](https://github.com/unjs/webpackbar).

## ⚖️ Similar packages

The most popular similar libraries for Node.js:

[chalk][chalk], [kleur][kleur], [ansi-colors][ansi-colors], [kolorist][kolorist], [colorette][colorette], [picocolors][picocolors], [cli-color][cli-color], [colors-cli][colors-cli], [colors.js][colors.js]

- ✅ [Compare features](#compare)
- 💾 [Compare package sizes](#compare-size)
- 📊 [Benchmarks](#benchmark)

## 🔄 [Switch to Ansis](#switch-to-ansis)

Ansis provides a powerful, small, and fast solution with drop-in replacement of heavy or legacy libraries.

Today, the two [smallest](#compare-size) and [fastest](#benchmark) libraries are  `ansis` and `picocolors`.\
Both are recommended by the [ES Tooling](https://github.com/es-tooling) community as the best replacements for other alternatives.

- If you only use a single style, such as `red('foo')`, the best solution is `picocolors`.

- However, if you need more, like combining multiple styles (e.g., `red` + `bold` + `bgWhite`) or [ANSI256 colors](#256-colors) or [Truecolor](#truecolor) then `ansis` is the better choice.


> [!NOTE]
> If libraries such as `ansis` and `chalk` offer chained syntax, use it.\
> Avoid nested calls, as they are [much slower](#bench-3-styles) and less readable compared to chained syntax.\
> _**Keep your code clean and readable!**_
> ```js
> red.bold.bgWhite`Error`                    ✅ ansis: faster, shorter, readable
> pico.red(pico.bold(pico.bgWhite('Error'))) ❌ picocolor: slower, longer, unreadable
>
> red`Error: ${cyan.underline(file)} not found!`                   ✅ ansis 😊
> pico.red(`Error: ${pico.cyan(pico.underline(file))} not found!`) ❌ picocolor 🥴
> ```

- [Replacing `chalk`](#replacing-chalk)
- [Replacing `colorette`](#replacing-colorette) last updated [2 years ago](https://www.npmjs.com/package/colorette)
- [Replacing `picocolors`](#replacing-picocolors) last updated a [few months ago](https://www.npmjs.com/package/picocolors)
- [Replacing `ansi-colors`](#replacing-ansi-colors) last updated [3 years ago](https://www.npmjs.com/package/ansi-colors)
- [Replacing `kleur`](#replacing-kleur) last updated [2 years ago](https://www.npmjs.com/package/kleur)
- [Replacing `cli-color`](#replacing-cli-color) last updated [~1 year ago](https://www.npmjs.com/package/cli-color)

<a id="features" name="features"></a>

## 💡 Highlights

<div align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="830" src="https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-demo.png" alt="ansis">
  </a>
</div>

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/stackblitz-starters-gs2gve?file=index.js)

- Supports both **ESM** and **CommonJS**
- Supports **TypeScript**
- Supports **Bun**, **Deno**, **Next.JS** runtimes
- [Standard API](#base-colors)
- Drop-in replacement for [`chalk`](#replacing-chalk) [`colorette`](#replacing-colorette) [`picocolors`](#replacing-picocolors) [`ansi-colors`](#replacing-ansi-colors)
- Default and [named import](#named-import) `import ansis, { red, bold, ansi256, hex } from 'ansis'`
- [Chained syntax](#chained-syntax) `red.bold.underline('text')`
- [Nested **template strings**](#nested-syntax) ``` red`Error: ${blue`file.js`} not found!` ```
- [ANSI styles](#base-colors) `dim` **`bold`** _`italic`_ <u>`underline`</u> <s>`strikethrough`</s>
- [ANSI 16 colors](#base-colors) ``` red`Error!` ``` ``` redBright`Error!` ``` ``` bgRed`Error!` ``` ``` bgRedBright`Error!` ```
- [ANSI 256 colors](#256-colors) ``` fg(56)`violet` ``` ``` bg(208)`orange` ```
- [TrueColor](#truecolor) (**RGB**, **HEX**) ``` rgb(224, 17, 95)`Ruby` ``` ``` hex('#96C')`Amethyst` ```
- [Fallback](#fallback) to supported [color space](#color-support): TrueColor → 256 colors → 16 colors → no colors
- [Extending of base colors](#extend-colors) with named **True Colors**
- [Raw ANSI codes](#escape-codes) as `open` and `close` properties ``` `foo ${red.open}red{red.close} bar` ```
- [Strip ANSI codes](#strip) method `ansis.strip()`
- Detect [color support](#color-support) using `ansis.isSupported()` method
- Supports [environment variables](#cli-vars) `NO_COLOR` `FORCE_COLOR` and flags `--no-color` `--color`
- [Correct style break](#new-line) at the `end of line` when used `\n` in string
- Doesn't extend `String.prototype`
- Zero dependencies

<!--
## 🔆 What's New in v3

- **NEW** added detection of supported color space: TrueColor, 256 colors, 16 colors, no colors (black & white)
- **NEW** added fallback to supported color space: TrueColor —> 256 colors —> 16 colors —> no colors

> #### ⚠️ Warning
>
> The `v3` has the **BREAKING CHANGES** (removed not widely supported styles and DEPRECATIONS).\
> For details see the [changelog](https://github.com/webdiscus/ansis/blob/master/CHANGELOG.md#v3-0-0).
-->

## ❓Question / Feature Request / Bug

If you have discovered a bug or have a feature suggestion, feel free to create
an [issue](https://github.com/webdiscus/ansis/issues) on GitHub.

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

// defined a TrueColor as the constant
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
To extend base colors with custom color names for TrueColor use the `ansis.extend()` method.

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

## TrueColor

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
TrueColor —> 256 colors —> 16 colors —> no colors (black & white)
```

If you use the `hex()`, `rgb()` or `ansis256()` functions in a terminal not supported TrueColor or 256 colors, then colors will be interpolated.

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

#### [↑ top](#top)

<a id="cli-vars" name="cli-vars"></a>

## CLI

Defaults, the output in terminal console is colored and output in a file is uncolored.

### Environment variables

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

#### How to force enable 256 colors

If your environment supports 256 colors, but `ansis` detects only 16 or mono,
you can manually set the `TERM` variable with standard values: `screen-256color` or `xterm-256color`.

You can set the variable in CLI:

```
TERM=screen-256color node script.js
```

or directly in your script:

```js
process.env.TERM = 'screen-256color';
```

#### How to force enable truecolor

If your environment supports truecolor, but `ansis` detects only 256, 16 or mono,
you can manually set the `COLORTERM` variable with standard values: `truecolor` or `24bit`.

You can set the variable in CLI:

```
COLORTERM=truecolor node script.js
```

or directly in your script:

```js
process.env.COLORTERM = 'truecolor';
```

### CLI arguments

Use arguments `--no-color` or `--color=false` to disable colors and `--color` to enable ones.

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

#### [↑ top](#top)

<a id="color-support" name="color-support"></a>

## Color support

Ansis automatically detects the supported color space:

- TrueColor
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

| Terminal                         | ANSI 16<br>colors | ANSI 256<br>colors | True<br>Color |  env.<br>TERM  | env.<br>COLORTERM | Specifically ENV variables             |
|:---------------------------------|-------------------|:-------------------|:--------------|:--------------:|:-----------------:|:---------------------------------------|
| Azure CI                         | ✅                 | ❌                  | ❌             |      dumb      |                   | TF_BUILD<br>AGENT_NAME                 |
| GitHub CI                        | ✅                 | ✅                  | ✅             |      dumb      |                   | CI<br>GITHUB_ACTIONS                   |
| GitTea CI                        | ✅                 | ✅                  | ✅             |      dumb      |                   | CI<br>GITEA_ACTIONS                    |
| GitLab CI                        | ✅                 | ❌                  | ❌             |      dumb      |                   | CI<br>GITLAB_CI                        |
| Travis CI                        | ✅                 | ❌                  | ❌             |      dumb      |                   | TRAVIS                                 |
| PM2<br>not isTTY                 | ✅[^1]             | ✅[^1]              | ✅[^1]         |      dumb      |                   | PM2_HOME<br>pm_id                      |
| JetBrains TeamCity<br>>=2020.1.1 | ✅                 | ✅                  | ❌             |                |                   | TEAMCITY_VERSION                       |
| JetBrains IDEA                   | ✅                 | ✅                  | ✅             | xterm-256color |                   | TERMINAL_EMULATOR='JetBrains-JediTerm' |
| VS Code                          | ✅                 | ✅                  | ✅             | xterm-256color |     truecolor     |                                        |
| Windows<br>Terminal              | ✅                 | ✅                  | ✅[^2]         |                |                   |                                        |
| Windows<br>PowerShell            | ✅                 | ✅                  | ✅[^2]         |                |                   |                                        |
| macOS Terminal                   | ✅                 | ✅                  | ❌             | xterm-256color |                   |                                        |
| iTerm                            | ✅                 | ✅                  | ✅             | xterm-256color |     truecolor     |                                        |
| Terminal emulator Kitty          | ✅                 | ✅                  | ✅             |  xterm-kitty   |                   |                                        |

[^1]: Colors supported depends on actual terminal.
[^2]: The Windows terminal supports true color since Windows 10 revision 14931 (2016-09-21).

See also:

- [Truecolor Support in Output Devices](https://github.com/termstandard/colors#truecolor-support-in-output-devices).
- [So you want to render colors in your terminal](https://marvinh.dev/blog/terminal-colors/).

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
> **TrueColor**
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

| Npm package                  |                                                 Download tarball size |                  Unpacked Size | Code size |
|:-----------------------------|----------------------------------------------------------------------:|-------------------------------:|----------:|
| [`picocolors`][picocolors]   |       [2.6 kB](https://arve0.github.io/npm-download-size/#picocolors) |       [6.4 kB][npm-picocolors] |    2.6 kB
| [`ansis`][ansis]             |            [4.5 kB](https://arve0.github.io/npm-download-size/#ansis) |           [10.3 kB][npm-ansis] |    3.4 kB
| [`colorette`][colorette]     |        [4.9 kB](https://arve0.github.io/npm-download-size/#colorette) |       [17.0 kB][npm-colorette] |    3.4 kB
| [`kleur`][kleur]             |            [6.0 kB](https://arve0.github.io/npm-download-size/#kleur) |           [20.3 kB][npm-kleur] |    2.7 kB
| [`ansi-colors`][ansi-colors] |      [8.5 kB](https://arve0.github.io/npm-download-size/#ansi-colors) |     [26.1 kB][npm-ansi-colors] |    5.8 kB
| [`kolorist`][kolorist]       |         [8.7 kB](https://arve0.github.io/npm-download-size/#kolorist) |        [51.0 kB][npm-kolorist] |    6.8 kB
| [`colors.js`][colors.js]     |          [11.0 kB](https://arve0.github.io/npm-download-size/#colors) |       [39.5 kB][npm-colors.js] |   18.1 kB
| [`chalk`][chalk]             |           [13.1 kB](https://arve0.github.io/npm-download-size/#chalk) |           [43.7 kB][npm-chalk] |   16.4 kB
| [`cli-color`][cli-color]     | [13.8 (216 kB)](https://arve0.github.io/npm-download-size/#cli-color) | [39.6 (754 kB)][npm-cli-color] |   12.1 kB
| [`colors-cli`][colors-cli]   |     [361.7 kB](https://arve0.github.io/npm-download-size/#colors-cli) |     [511.0 kB][npm-colors-cli] |    8.7 kB

**Download size:** The gzipped size of the npm package.\
**Unpacked Size:** The size of the npm package in the `node_modules/` directory, `(incl. dependencies)`.\
**Code size**: The size of distributed code that will be loaded via `require` or `import` into your app.

See also:

- [npmjs](https://www.npmjs.com/package) - show install size of the published package, w/o dependencies
- [packagephobia](https://packagephobia.com) - show total install size, incl. dependencies
- [npm download size](https://arve0.github.io/npm-download-size) - show tarball and total download size
- [bundlephobia](https://bundlephobia.com) - useless, doesn't show real tarball size of the downloaded npm package

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
> Terminal `iTerm2`

---

> [!NOTE]
>
> In the tests, each library uses the **fastest** styling method available to compare the **absolute performance** of each library.
>
> In real practice, no one would use the **slowest** method (such as nested calls) to style a string when the library offers a **faster** and more concise chained method.
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
+  colorette@2.0.20    109.829.822 ops/sec
-  picocolors@1.1.1    108.598.201 ops/sec
   kleur@4.1.5          85.231.268 ops/sec
-> ansis@3.3.3          59.923.848 ops/sec  -45.4% (~2x slower than 1st place)
-  chalk@5.3.0          55.828.562 ops/sec  -49.2%
   kolorist@1.8.0       37.159.398 ops/sec
   ansi-colors@4.1.3    14.202.622 ops/sec
   colors@1.4.0          6.999.011 ops/sec
   cli-color@2.0.4       2.742.775 ops/sec
   colors-cli@1.0.33       913.542 ops/sec
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
+  ansis@3.3.3          59.838.727 ops/sec
-  picocolors@1.1.1     58.180.994 ops/sec   -2.8%
-  chalk@5.3.0          48.213.743 ops/sec  -19.4%
   colorette@2.0.20     33.308.706 ops/sec
   kolorist@1.8.0       13.320.722 ops/sec
   kleur@4.1.5           5.977.286 ops/sec
   ansi-colors@4.1.3     4.123.687 ops/sec
   colors@1.4.0          2.986.743 ops/sec
   cli-color@2.0.4       1.783.370 ops/sec
   colors-cli@1.0.33       690.808 ops/sec
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
+  ansis@3.3.3          59.602.490 ops/sec
-  chalk@5.3.0          42.015.098 ops/sec  -29.5%
-  picocolors@1.1.1     31.657.041 ops/sec  -46.9% (~2x slower than Ansis)
   colorette@2.0.20     14.499.195 ops/sec
   kolorist@1.8.0        6.902.305 ops/sec
   kleur@4.1.5           5.316.469 ops/sec
   ansi-colors@4.1.3     2.231.060 ops/sec
   colors@1.4.0          1.772.706 ops/sec
   cli-color@2.0.4       1.461.792 ops/sec
   colors-cli@1.0.33       555.396 ops/sec
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
+  ansis@3.3.3          58.094.313 ops/sec
-  chalk@5.3.0          36.304.684 ops/sec  -37.5%
-  picocolors@1.1.1     17.335.630 ops/sec  -70.2% (~3.4x slower than Ansis)
   colorette@2.0.20      8.705.424 ops/sec
   kleur@4.1.5           4.801.696 ops/sec
   kolorist@1.8.0        4.324.112 ops/sec
   ansi-colors@4.1.3     1.524.480 ops/sec
   colors@1.4.0          1.263.322 ops/sec
   cli-color@2.0.4       1.210.104 ops/sec
   colors-cli@1.0.33       484.108 ops/sec
```

### Deeply nested styles

The complex test with deeply nested styles.

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
+  colorette@2.0.20      1.101.447 ops/sec
-  picocolors@1.1.1      1.058.215 ops/sec
-> ansis@3.3.3             852.390 ops/sec  -22.6%
   kolorist@1.8.0          837.577 ops/sec
-  chalk@5.3.0             571.903 ops/sec  -48.0%
   kleur@4.1.5             466.172 ops/sec
   colors@1.4.0            452.397 ops/sec
   ansi-colors@4.1.3       380.633 ops/sec
   cli-color@2.0.4         215.335 ops/sec
   colors-cli@1.0.33        41.589 ops/sec
```

### Colorette bench

The benchmark used in [`colorette`](https://github.com/jorgebucaran/colorette/blob/main/bench/index.js).

```js
c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`)
```

```diff
+  picocolors@1.1.1      3.911.687 ops/sec
   colorette@2.0.20      3.901.652 ops/sec
-> ansis@3.3.3           2.992.624 ops/sec  -23.5%
   kolorist@1.8.0        2.555.819 ops/sec
-  chalk@5.3.0           2.544.110 ops/sec  -35.0%
   kleur@4.1.5           2.258.746 ops/sec
   ansi-colors@4.1.3     1.457.300 ops/sec
   colors@1.4.0          1.121.523 ops/sec
   cli-color@2.0.4         481.131 ops/sec
   colors-cli@1.0.33       115.755 ops/sec
```

### Picocolors complex bench

The [`picocolors`](https://github.com/alexeyraspopov/picocolors/blob/main/benchmarks/complex.mjs) benchmark, slightly modified.
Added a bit more complexity by applying 2 styles to the colorized word instead of one.

```js
let index = 1e8;
c.red('.') +
c.yellow('.') +
c.green('.') +
c.red.bold(' ERROR ') +
c.red('Add plugin ' + c.cyan.underline('name') + ' to use time limit with ' + c.cyan(++index));
```

```diff
+  picocolors@1.1.1      2,552,271 ops/sec
-> ansis@3.3.3           2,449,720 ops/sec  -4.0%
-  chalk@5.3.0           2,320,215 ops/sec  -9.0%
   colorette@2.0.20      2,279,859 ops/sec
   kleur@4.1.5           1,729,928 ops/sec
   kolorist@1.8.0        1,651,713 ops/sec
   ansi-colors@4.1.3       807,154 ops/sec
   colors@1.4.0            530,762 ops/sec
   cli-color@2.0.4         289,246 ops/sec
   colors-cli@1.0.33        96,758 ops/sec
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

## How to switch to `ansis`

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

[colors.js]: https://github.com/Marak/colors.js

[colorette]: https://github.com/jorgebucaran/colorette

[picocolors]: https://github.com/alexeyraspopov/picocolors

[cli-color]: https://github.com/medikoo/cli-color

[colors-cli]: https://github.com/jaywcjlove/colors-cli

[ansi-colors]: https://github.com/doowb/ansi-colors

[kleur]: https://github.com/lukeed/kleur

[kolorist]: https://github.com/marvinhagemeister/kolorist

[chalk]: https://github.com/chalk/chalk

[ansis]: https://github.com/webdiscus/ansis

[npm-colors.js]: https://www.npmjs.com/package/colors

[npm-colorette]: https://www.npmjs.com/package/colorette

[npm-picocolors]: https://www.npmjs.com/package/picocolors

[npm-cli-color]: https://www.npmjs.com/package/cli-color

[npm-colors-cli]: https://www.npmjs.com/package/colors-cli

[npm-ansi-colors]: https://www.npmjs.com/package/ansi-colors

[npm-kleur]: https://www.npmjs.com/package/kleur

[npm-kolorist]: https://www.npmjs.com/package/kolorist

[npm-chalk]: https://www.npmjs.com/package/chalk

[npm-ansis]: https://www.npmjs.com/package/ansis
