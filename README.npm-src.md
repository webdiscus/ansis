# Ansis

Enable ANSI colors in terminal output. [Docs on GitHub](https://github.com/webdiscus/ansis).

#

<p align="center">
  <a href="https://github.com/webdiscus/ansis">
    <img width="323" src="https://github.com/webdiscus/ansis/raw/master/docs/img/logo.png"><br>
  </a>
</p>


## Usage

```js
import ansis, { red, cyan, ansi256, hex } from 'ansis';

ansis.blueBright('file.txt')
red`Error: ${cyan(file)} not found!`
red.bgWhite`ERROR`
ansi256(214)`Orange`
hex('#E0115F').bold.underline('Truecolor!')
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
