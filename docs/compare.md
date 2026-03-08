# Compare the features of most popular libraries

<table>
  <tr>
    <th>Library</th>
    <th colspan="2">Colors support</th>
    <th colspan="4">Features</th>
  </tr>
  <tr>
    <th style='text-align:left'>
      <nobr>- <code>ESM</code> | <code>CJS</code></nobr><br>
      <nobr> - named import</nobr><br>
      <nobr>- naming colors</nobr>
    </th>
    <th><nobr>16 | 256 | 16m | 🌐</nobr></th>
    <th>Fallback</th>
    <th>Chained<br>syntax</th>
    <th>Nested<br>template<br>strings<br><code>`${}`</code><br></th>
    <th>LF<br><code>\n</code></th>
    <th>Supports<br>ENV vars<br>CLI flags</th>
  </tr>

  <tr>
    <td style='text-align:left'>
      <a href="https://github.com/webdiscus/ansis"><code>ansis</code></a><br>
      <code>ESM</code> <code>CJS</code><br>
      <nobr><code>✅ named import</code></nobr><br><code>✅ standard</code>
    </td>
    <td style='text-align:center'>✅ ✅ ✅ ✅</td>
    <td style='text-align:left'>→256<br>→16<br>→b&amp;w</td>
    <td style='text-align:center'>✅</td>
    <td style='text-align:center'>✅</td>
    <td style='text-align:center'>✅</td>
    <td style="text-align:left"><code>NO_COLOR</code><br><code>FORCE_COLOR</code><br><code>COLORTERM</code><br><code>--no-color</code><br><code>--color</code></td>
  </tr>

  <tr>
    <td style="text-align:left"><a href="https://github.com/chalk/chalk"><code>chalk v5</code></a><br><code>ESM</code><br><nobr><code>❌ named import</code></nobr><br><code>✅ standard</code></td>
    <td style="text-align:center">✅ ✅ ✅ ✅</td>
    <td>→256<br>→16<br>→b&amp;w</td>
    <td style="text-align:center">✅</td>
    <td style="text-align:center">❌</td>
    <td style="text-align:center">✅</td>
    <td style="text-align:left"><code>NO_COLOR</code><br><code>FORCE_COLOR</code><br><code>--no-color</code><br><code>--color</code></td>
  </tr>

<tr>
<td style="text-align:left"><a href="https://github.com/marvinhagemeister/kolorist"><code>kolorist</code></a><br><code>ESM</code> <code>CJS</code><br><nobr><code>✅ named import</code></nobr><br><code>❌ standard</code></td>
<td style="text-align:center">✅ ✅ ✅ ❌</td>
<td>→256<br>→b&amp;w</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:left"><code>NO_COLOR</code><br><code>FORCE_COLOR</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://github.com/medikoo/cli-color"><code>cli-color</code></a><br><code>CJS</code><br><nobr><code>❌ named import</code></nobr><br><code>✅ standard</code></td>
<td style="text-align:center">✅ ✅ ❌ 🛑</td>
<td>→16<br>→b&amp;w</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:left"><code>NO_COLOR</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://github.com/jaywcjlove/colors-cli"><code>colors-cli</code></a><br><code>CJS</code><br><nobr><code>❌ named import</code></nobr><br><code>❌ standard</code></td>
<td style="text-align:center">✅ ✅ ❌ 🛑</td>
<td>→b&amp;w</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">✅</td>
<td style="text-align:left"><code>--no-color</code><br><code>--color</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://github.com/DABH/colors.js"><code>colors.js</code></a><br><code>CJS</code><br><nobr><code>❌ named import</code></nobr><br><code>❌ standard</code></td>
<td style="text-align:center">✅ ❌ ❌ 🛑</td>
<td>→b&amp;w</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">✅</td>
<td style="text-align:left"><code>FORCE_COLOR</code><br><code>--no-color</code><br><code>--color</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://github.com/doowb/ansi-colors"><code>ansi-colors</code></a><br><code>CJS</code><br><nobr><code>❌ named import</code></nobr><br><code>✅ standard</code></td>
<td style="text-align:center">✅ ❌ ❌ ❌</td>
<td>❌</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">✅</td>
<td style="text-align:left"><code>FORCE_COLOR</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://github.com/jorgebucaran/colorette"><code>colorette</code></a><br><code>ESM</code> <code>CJS</code><br><nobr><code>✅ named import</code></nobr><br><code>✅ standard</code></td>
<td style="text-align:center">✅ ❌ ❌ 🛑</td>
<td>→b&amp;w</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:left"><code>NO_COLOR</code><br><code>FORCE_COLOR</code><br><code>--no-color</code><br><code>--color</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://github.com/alexeyraspopov/picocolors"><code>picocolors</code></a><br><code>CJS</code><br><nobr><code>❌ named import</code></nobr><br><code>✅ standard</code></td>
<td style="text-align:center">✅ ❌ ❌ ❌</td>
<td>→b&amp;w</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:left"><code>NO_COLOR</code><br><code>FORCE_COLOR</code><br><code>--no-color</code><br><code>--color</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://github.com/tinylibs/tinyrainbow"><code>tinyrainbow</code></a><br><code>ESM</code><br><nobr><code>❌ named import</code></nobr><br><code>✅ standard</code></td>
<td style="text-align:center">✅ ❌ ❌ ✅</td>
<td>→b&amp;w</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:left"><code>NO_COLOR</code><br><code>FORCE_COLOR</code><br><code>FORCE_TTY</code><br><code>--no-color</code><br><code>--color</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://github.com/lukeed/kleur"><code>kleur</code></a><br><code>ESM</code> <code>CJS</code><br><nobr><code>✅ named import</code></nobr><br><code>✅ standard</code></td>
<td style="text-align:center">❌ ❌ ❌ ✅<br><code>8</code> colors</td>
<td>→b&amp;w</td>
<td style="text-align:center">✅</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:left"><code>NO_COLOR</code><br><code>FORCE_COLOR</code></td>
</tr>

<tr>
<td style="text-align:left"><a href="https://nodejs.org/api/util.html#utilstyletextformat-text-options"><code>util.styleText()</code></a><br><code>Node ≥ 22</code><br><nobr><code>❌ named import</code></nobr><br><code>✅ standard</code></td>
<td style="text-align:center">✅ ❌ ❌ 🛑</td>
<td>→b&amp;w</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">❌</td>
<td style="text-align:center">?</td>
<td style="text-align:left"><code>NO_COLOR</code><br><code>FORCE_COLOR</code></td>
</tr>

</table>


### Legend

**Named import**
- ESM: `import { red, green, blue } from 'lib';`
- CJS: `const { red, green, blue } = require('lib');`

**Naming colors**
- standard: colors have [standard names](#base-colors), e.g.: `red`, `redBright`, `bgRed`, `bgRedBright`
- _non-standard_: colors have lib-specific names, e.g.: `brightRed`, `bgBrightRed`, `red_b`, `red_btt`

#### Colors support

- `16` - [ANSI 16 colors](#base-colors) like `red`, `redBright`, `bgRed`, `bgRedBright`

- `256` - [ANSI 256 colors](#256-colors) methods, e.g.:
  - [`ansis`][ansis]: `fg(n)`, `bg(n)`
  - [`chalk`][chalk]: `ansi256(n)`, `bgAnsi256(n)`
  - [`cli-color`][cli-color]: `xterm(n)`
  - [`colors-cli`][colors-cli]: `x<n>`

- `16m` - [Truecolor](#truecolor) methods, e.g.: `hex()`, `bgHex()`, `rgb()`, `bgRgb()`

- 🌐 - Colored output in [Chromium-based](#browsers-compatibility) browser console:
  - ✅ - colored output
  - ❌ - b&w output
  - 🛑 - **fatal error** by compilation or in runtime

- [Fallback](#fallback) - Truecolor → 256 colors → 16 colors → no colors

#### Features

- Chained syntax - `lib.red.bold('text')`

- Nested templates - ``` lib.red`text ${lib.cyan`nested`} text` ```

- `LF` - correct style break at `\n`:
  ```js
  console.log(bgGreen('\nAnsis\nNew Line\nNext New Line\n'))
  ```
  Outputs:\
  ![output](./img/break-style-nl.png?raw=true "break styles at EOL")