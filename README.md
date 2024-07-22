<p align="center">
  <a href="https://www.npmjs.com/package/ansis">
    <img width="323" src="https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-logo.png" alt="ansis"><br>
    ANSI Styling
  </a>
</p>

---
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

<a id="top" name="top"></a>

## 👀 Why yet one lib?

- Quality is first, test coverage 100%.
- Ansis has all [features](#features) that you need, compare with [other libraries](#compare).
- Ansis is one of the smallest, [3.5 KB](https://bundlephobia.com/package/ansis@3.2.0) only.
- Ansis is one of the [fastest](#benchmark), up to **x3 faster** than **Chalk**, [see benchmarks](#benchmark).
- Ansis is stable, continuously developing and improving.
- Ansis is open for your [feature requests](https://github.com/webdiscus/ansis/issues).
- Quick response to issues.
- Long term support.

## ⚖️ Similar packages

Most popular ANSI libraries for Node.js:

[chalk][chalk], [kleur][kleur], [ansi-colors][ansi-colors], [kolorist][kolorist], [colorette][colorette], [picocolors][picocolors], [cli-color][cli-color], [colors-cli][colors-cli], [colors.js][colors.js]

- ✅ [Compare features](#compare)
- 💾 [Compare package sizes](#compare-size)
- 📊 [Benchmarks](#benchmark)

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
- [Standard API](#base-colors), drop-in replacement for **Chalk**
  ```diff
  - import chalk from 'chalk';
  + import chalk, { red } from 'ansis';
  ```
  ```js
  chalk.red.bold('Error!'); // <- Chalk like syntax works fine with Ansis
  red.bold('Error!');       // <- the same result with Ansis
  red.bold`Error!`;         // <- the same result with Ansis
  ```
- Default and [named import](#named-import) `import ansis, { red, bold, ansi256, hex } from 'ansis'`
- [Chained syntax](#chained-syntax) `red.bold.underline('text')`
- [Nested **template strings**](#nested-syntax) ``` red`RED ${green`GREEN`} RED` ```
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

## 🔆 What's New in v3

- **NEW** added detection of supported color space: TrueColor, 256 colors, 16 colors, no colors (black & white)
- **NEW** added fallback to supported color space: TrueColor —> 256 colors —> 16 colors —> no colors

> #### ⚠️ Warning
>
> The `v3` has the **BREAKING CHANGES** (removed not widely supported styles and DEPRECATIONS).\
> For details see the [changelog](https://github.com/webdiscus/ansis/blob/master/CHANGELOG.md#v3-0-0).

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
as [chalk][chalk], [colorette][colorette], [kleur][kleur].

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

| Library<br><nobr>________________</nobr><br> - name<br> - named import<br>- naming colors | ANSI base colors | ANSI 256<br>colors | True<br>Color | Chained<br>syntax | Nested<br>template strings | New<br>Line | Fallback to colors  | Supports<br>ENV vars<br>CLI flags                        |
|:------------------------------------------------------------------------------------------|:----------------:|:------------------:|:-------------:|:-----------------:|:--------------------------:|:-----------:|---------------------|:---------------------------------------------------------|
| [`chalk`][chalk]<br><nobr>`❌ named import`</nobr><br>`✅ standard`                         |   `16` colors    |         ✅          |       ✅       |         ✅         |             ❌              |      ✅      | →256<br>→16<br>→b&w | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`ansis`][ansis]<br><nobr>`✅ named import`</nobr><br>`✅ standard`                         |   `16` colors    |         ✅          |       ✅       |         ✅         |             ✅              |      ✅      | →256<br>→16<br>→b&w | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`kolorist`][kolorist]<br><nobr>`✅ named import`</nobr><br>`❌ standard`                   |   `16` colors    |         ✅          |       ✅       |         ❌         |             ❌              |      ❌      | →256<br>❌<br>→b&w   | `NO_COLOR`<br>`FORCE_COLOR`                              |
| [`cli-color`][cli-color]<br><nobr>`❌ named import`</nobr><br>`✅ standard`                 |   `16` colors    |         ✅          |       ❌       |         ✅         |             ❌              |      ❌      | →16<br>→b&w         | `NO_COLOR`                                               |
| [`colors-cli`][colors-cli]<br><nobr>`❌ named import`</nobr><br>`❌ standard`               |   `16` colors    |         ✅          |       ❌       |         ✅         |             ❌              |      ✅      | ❌<br>→b&w           | `--no-color`<br>`--color`                                |
| [`colors.js`][colors.js]<br><nobr>`❌ named import`</nobr><br>`❌ standard`                 |   `16` colors    |         ❌          |       ❌       |         ✅         |             ❌              |      ✅      | →b&w                | `FORCE_COLOR`<br>`--no-color`<br>`--color`               |
| [`ansi-colors`][ansi-colors]<br><nobr>`❌ named import`</nobr><br>`✅ standard`             |   `16` colors    |         ❌          |       ❌       |         ✅         |             ❌              |      ✅      | ❌                   | `FORCE_COLOR`                                            |
| [`kleur`][kleur]<br><nobr>`✅ named import`</nobr><br>`✅ standard`                         |    `8` colors    |         ❌          |       ❌       |         ✅         |             ❌              |      ❌      | →b&w                | `NO_COLOR`<br>`FORCE_COLOR`                              |
| [`colorette`][colorette]<br><nobr>`✅ named import`</nobr><br>`✅ standard`                 |   `16` colors    |         ❌          |       ❌       |         ❌         |             ❌              |      ❌      | →b&w                | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |
| [`picocolors`][picocolors]<br><nobr>`❌ named import`</nobr><br>`✅ standard`               |    `8` colors    |         ❌          |       ❌       |         ❌         |             ❌              |      ❌      | →b&w                | `NO_COLOR`<br>`FORCE_COLOR`<br>`--no-color`<br>`--color` |

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

| Npm package                  | Require size |                   Install size |                                                         Download size |
|:-----------------------------|-------------:|-------------------------------:|----------------------------------------------------------------------:|
| [`chalk`][chalk]             |      16.4 kB |           [43.7 kB][npm-chalk] |           [13.1 kB](https://arve0.github.io/npm-download-size/#chalk) |
| [`ansis`][ansis]             |       3.4 kB |           [11.4 kB][npm-ansis] |            [4.6 kB](https://arve0.github.io/npm-download-size/#ansis) |
| [`kolorist`][kolorist]       |       6.8 kB |        [51.0 kB][npm-kolorist] |         [8.7 kB](https://arve0.github.io/npm-download-size/#kolorist) |
| [`cli-color`][cli-color]     |      12.1 kB | [39.6 / 754 kB][npm-cli-color] | [13.8 / 216 kB](https://arve0.github.io/npm-download-size/#cli-color) |
| [`colors-cli`][colors-cli]   |       8.7 kB |     [511.0 kB][npm-colors-cli] |     [361.7 kB](https://arve0.github.io/npm-download-size/#colors-cli) |
| [`colors.js`][colors.js]     |      18.1 kB |       [39.5 kB][npm-colors.js] |          [11.0 kB](https://arve0.github.io/npm-download-size/#colors) |
| [`ansi-colors`][ansi-colors] |       5.8 kB |     [26.1 kB][npm-ansi-colors] |      [8.5 kB](https://arve0.github.io/npm-download-size/#ansi-colors) |
| [`kleur`][kleur]             |       2.7 kB |           [20.3 kB][npm-kleur] |            [6.0 kB](https://arve0.github.io/npm-download-size/#kleur) |
| [`colorette`][colorette]     |       3.4 kB |       [17.0 kB][npm-colorette] |        [4.9 kB](https://arve0.github.io/npm-download-size/#colorette) |
| [`picocolors`][picocolors]   |       2.1 kB |       [5.1 kB][npm-picocolors] |       [2.4 kB](https://arve0.github.io/npm-download-size/#picocolors) |

**Require size**: The size of distributed code that will be loaded via `require` or `import` into your app.\
**Install size:** The unpacked size of the npm package in the `node_modules/` directory.\
**Download size:** The gzipped size of the npm package.

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

> ‼️ **Warning**
>
> **Don't trust** other test results using [vitest benchmark](https://vitest.dev/config/#benchmark).
>
> The `vitest benchmark` generate FALSE/**unreal** results.\
> For example, the results of the simple bench:
> ```
> chalk.red('foo') -  7.000.000 ops/sec
> ansis.red('foo') - 23.000.000 ops/sec (x3 faster is WRONG result)
> ```
>
> The real performance results of `chalk` and `ansis` in this test are very close.

### Run benchmarks

```bash
git clone https://github.com/webdiscus/ansis.git
cd ./ansis
npm i
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
-> ansis               2,725,758 ops/sec   fast
   chalk               2,287,146 ops/sec   fast
   kleur/colors        2,281,415 ops/sec   fast
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
const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
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
   kleur/colors        (not supported)
   colorette           (not supported)
   picocolors          (not supported)
```

### Nested calls

```js
const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
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
  `a red ${c.white('white')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.black('black')} red ${c.red('red')} red
  ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red
  ${c.green('green')} red ${c.red('red')} red ${c.yellow('yellow')} red ${c.blue('blue')} red ${c.red('red')} red
  ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red
  ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red
  ${c.black('black')} red ${c.yellow('yellow')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red
  ${c.yellow('yellow')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red
  ${c.green('green')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red
  ${c.magenta('magenta')} red ${c.red('red')} red ${c.red('red')} red ${c.cyan('cyan')} red ${c.red('red')} red
  ${c.cyan('cyan')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red ${c.red('red')} red message`
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
-> ansis                 882,220 ops/sec  very fast
   chalk                 565,965 ops/sec  fast
   kleur/colors          478,547 ops/sec  fast
   kleur                 464,004 ops/sec  fast
   colors.js             451,592 ops/sec  fast
   ansi-colors           362,733 ops/sec  slow
   cli-color             213,441 ops/sec  slow
   colors-cli             40,340 ops/sec  too slow
```

### HEX colors

Only two libraries support TrueColor: `ansis` and `chalk`

```js
c.hex('#FBA')('foo');
```

```diff
+  ansis               4,944,572 ops/sec  very fast
   chalk               2,891,684 ops/sec  fast
   colors.js           (not supported)
   colorette           (not supported)
   picocolors          (not supported)
   cli-color           (not supported)
   colors-cli          (not supported)
   ansi-colors         (not supported)
   kleur/colors        (not supported)
   kleur               (not supported)
```

#### [↑ top](#top)

## Testing

`npm run test` will run the unit and integration tests.\
`npm run test:coverage` will run the tests with coverage.

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

---

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
