<p align="center">
  <a href="https://github.com/webdiscus/ansis">
    <img width="323" src="https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-logo.png"><br>
    ANSI Styling
  </a>
</p>

---
[![codecov](https://codecov.io/gh/webdiscus/ansis/branch/master/graph/badge.svg?token=H7SFJONX1X)](https://codecov.io/gh/webdiscus/ansis)
[![node](https://img.shields.io/npm/dm/ansis)](https://www.npmjs.com/package/ansis)
[![size](https://img.shields.io/bundlephobia/minzip/ansis)](https://bundlephobia.com/package/ansis)

Colorize terminal with ANSI colors & styles, smaller and faster alternative to Chalk.

🚀 [Install and Quick Start](https://github.com/webdiscus/ansis#install)

✅ [Compare features](https://github.com/webdiscus/ansis#compare) with similar packages

📊 [Benchmarks](https://github.com/webdiscus/ansis#benchmark)

📖 [Read full docs on GitHub](https://github.com/webdiscus/ansis)

## Usage

```js
import ansis, { red, green, black, ansi256, hex } from 'ansis';

ansis.cyan('file')
green('Ok')
red`Error`
black.bgYellow`Warning`
ansi256(214)`Orange`
hex('#E0115F').bold('TrueColor')
```

## Highlights

![ANSI demo](https://github.com/webdiscus/ansis/raw/master/docs/img/ansis-demo.png)

- Supports ESM, CJS, TypeScript, Bun, Deno, Next.JS
- Named import: `import ansis, { red, bold, hex } from 'ansis'`
- Chained syntax: `red.bold.underline('text')`
- Nested template strings: ``` red`RED ${green`GREEN`} RED` ```
- ANSI styles: `dim` **`bold`** _`italic`_ <u>`underline`</u> <s>`strikethrough`</s>
- ANSI 16 colors: ``` red`Error!` ``` ``` redBright`Error!` ``` ``` bgRed`Error!` ``` ``` bgRedBright`Error!` ```
- ANSI 256 colors: ``` fg(56)`violet` ``` ``` bg(208)`orange` ```
- TrueColor: ``` rgb(224, 17, 95)`Ruby` ``` ``` hex('#96C')`Amethyst` ```
- Color fallback: TrueColor → 256 colors → 16 colors → no colors
- Raw ANSI codes: ``` `foo ${red.open}bar{red.close} foo` ```
- Strip ANSI codes: `ansis.strip()`
- Detect color support: `ansis.isSupported()`
- Supports CLI: `NO_COLOR` `FORCE_COLOR` `--no-color` `--color`
- Correct style break at the `end of line` when used `\n`
- Doesn't extend `String.prototype`
- No dependencies
