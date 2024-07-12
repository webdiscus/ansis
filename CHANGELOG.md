# Change log

## 3.2.1 (2024-07-12)

- chore: reduce unpacked size by ~ 1 KB
- docs: optimize README for NPM

## 3.2.0 (2024-04-24)

- feat: add `ansis.isSupported()` method to detect color support

## 3.1.1 (2024-04-15)

- fix: interpret FORCE_COLOR=false or FORCE_COLOR=0 as force disable colors\
  others values, e.g., FORCE_COLOR=true or FORCE_COLOR=1 - force enable colors.\
  See https://force-color.org.

## 3.1.0 (2024-04-10)

- feat: add detection of color support when using PM2 process manager

## 3.0.3 (2024-04-09)

- chore: add rollup-plugin-cleanup to remove comments from d.ts file for dist, that save yet 3 KB
- chore: update license year

## 3.0.2 (2024-04-08)

- chore: create mini version of README for NPM to minify package size
- docs: update readme

## 3.0.1 (2024-04-01)

- refactor: improve code
- chore: reduce code bundle size from 3.8 KB to 3.4 KB
- chore: update benchmark
- chore: update compare tests
- test: add more tests
- docs: improve readme

## 3.0.0 (2024-03-29)

- feat: add detection of color spaces support: TrueColor, 256 colors, 16 colors, no color
- feat: add fallback for supported color space: truecolor —> 256 colors —> 16 colors —> no colors
- perform: improve performance for `hex()` function
- chore: size increased from 3.2 KB to 3.8 KB as new features were added
- test: switch from jest to vitest
- test: add tests for new features
- docs: update readme for color spaces support

### BREAKING CHANGE

In the new major version `3.x` are removed unused styles and methods.

> ⚠️ Warning
>
> Before update, please check your code whether is used deleted styles and methods.

### Support Node.js

Drop supports for Node <= `14`. Minimal supported version is `15.0.0` (Released 2020-10-20).
In the theory the `v3` can works with Node`12`, but we can't test it.

### Deleted styles

The `not widely supported` styles are deleted:

- `faint` (alias for dim), replace in your code with `dim`
- `doubleUnderline`, replace in your code with `underline`
- `frame`, replace in your code with `underline`
- `encircle`, replace in your code with `underline`
- `overline`, replace in your code with `underline`

### Deleted methods

The methods are deleted:

- `ansi`, replace in your code with `ansi256` or `fg`
- `bgAnsi`, replace in your code with `bgAnsi256` or `bg`

### Deleted clamp in functions

The clamp (0, 255) for the ANSI 256 codes and RGB values is removed, because is unused.
You should self check the function arguments.

The affected functions:

- `ansi256` and `fg` (alias to ansi256) - expected a code in the range `0 - 255`
- `bgAnsi256` and `bg` (alias to bgAnsi256) - expected a code in the range`0 - 255`
- `rgb` - expected r, g, b values in the range `0 - 255`
- `bgRgb` - expected r, g, b values in the range `0 - 255`

## 2.3.0 (2024-02-15)

- feat: add detection of additional terminals, thanks @dse, [colors.js:issue #42](https://github.com/DABH/colors.js/issues/42)
- test: add test to detect various terminals

## 2.2.0 (2024-02-03)

- feat: add supports the argument as `number`
- test: add tests for new feature
- chore: add features compare of different libs, just run: `npm run compare`
- chore: add compare example on [stackblitz](https://stackblitz.com/edit/compare-colorize-libraries?file=index.js)
- docs: update readme

## 2.1.0 (2024-01-30)

- feat: add `bgGrey` and `bgGray` aliases for `bgBlackBright`
- refactor: optimize source code
- test: refactor tests
- docs: update readme

## 2.0.3 (2023-12-14)

- fix(index.d.ts): use function overload to make the tagged template have the correct type, #16

## 2.0.2 (2023-11-14)

- fix: could not find a declaration file for module 'ansis'

## 2.0.1 (2023-11-03)

- fix: missing exports of ansis.strip() and ansis.export() functions (issue was introduced in v2.0.0)
- refactor: optimize code to reduce distributed size
- test: add test for generated npm package in CJS and ESM mode
- test: add test for env variables and CLI flags
- test: add test to detect Deno
- test: add test to detect Next.js runtime
- docs: update readme

## 2.0.0 (2023-11-03)

- feat: add supports the Deno
- feat: add supports the Next.js `edge` runtime
- feat(CHANGE): add named import for `ansis`:\
  NEW named import: `import { red } from 'ansis'`.\
  If you use `TypeScript` and your IDE show the error: `TS2307: Cannot find module ansis/colors`,\
  then you should use the new syntax,
  update you code: `import { red } from 'ansis/colors'` --> `import { red } from 'ansis'`.
- feat(DEPRECATE): OLD named import `import { red } from 'ansis/colors'` is deprecated, use the NEW named import
- feat(DEPRECATE): instead of the `ansi` use `ansi256` or alias `fg`
- feat(DEPRECATE): instead of the `bgAnsi` use `bgAnsi256` or alias `bg`
- feat: optimize named export
- feat: reduce the size of dist/ directory
- chore: update dev dependencies, new jest requires node.js >= 14

## 1.6.0-beta.0 (2023-11-01)

- feat: add supports the Deno
- feat: add supports the Next.js `edge` runtime
- test: add tests for isSupported() function
- chore: update dev dependencies

## 1.5.6 (2023-09-21)

- chore: update dev dependencies
- chore: add SECURITY.md
- chore: add PULL_REQUEST_TEMPLATE.md
- chore: update ISSUE_TEMPLATE
- docs: update readme

## 1.5.5 (2022-09-22)

- refactor: optimize code to reduce size by 120 bytes
- test: add test for isSupported() function
- docs: update readme, add example screenshots

## 1.5.4 (2022-09-14)

- fix: visible style with nested template strings

## 1.5.3 (2022-09-14)

- fix: set correct aliases for bgAnsi and fg methods by named export
- chore: refactor examples
- docs: update readme

## 1.5.2 (2022-09-10)

- fix: regard the value of the environment variable FORCE_COLOR=0 to force disable colors
- test: add tests for FORCE_COLOR
- docs: update readme

## 1.5.1 (2022-09-08)

- fix: add missing export for CJS mode in package.json
- test: add manual tests for CJS and ESM mode

## 1.5.0 (2022-09-08)

- DEPRECATE v1.5.0, because missing exports main for CJS mode, fixed in v1.5.1

## 1.5.0 (2022-09-08)

- feat: add supports the nested template literal syntax:
  ```js
  console.log(red`red ${yellow`yellow ${green`green`} yellow`} red`)
  ```
- feat: add named export of colors with supports for chained syntax:
  ```js
  import { red, green, yellow } from 'ansis/colors';
  console.log(red.bold.underline`text`);
  ```
- feat: add extending of base colors with named custom truecolor
  ```js
  import ansis from 'ansis';
  ansis.extend({ orange: '#FFAB40' });
  console.log(ansis.orange.bold('text'));
  ```
- fix: corrected declarations in `index.d.ts`
- chore: add `AnsiStyles`, `AnsiColors` and AnsiColorsExtend types in `index.d.ts`
- refactor: optimize size of distributed bundle from 3.7KB to 3.1KB
- docs: add usage in CLI

## 1.4.0 (2022-07-02)

- feat: add method strip() to remove all ANSI codes from string

## 1.3.6 (2022-04-27)

- build: properly generated distribution package, bump to last stable version 1.3.6
- chore: update dev packages

## 1.3.5 (2022-04-27)

- DEPRECATED: this version is broken

## 1.3.4 (2022-01-30)

- feat: optimize distributed code size to smaller than `4 KB`

## 1.3.3 (2022-01-24)

- feat: add UK spelling alias `grey` for `gray`
- chore: update dev dependencies
- docs: update readme

## 1.3.2 (2021-12-30)

- feat: add bundle generation for ESM
- build: auto generate bundles for ESM and CommonJS at npm publish

## 1.3.1 (2021-12-29)

- fix: usage for CommonJS: `const ansis = require('ansis').default;` --> `const ansis = require('ansis');`

## 1.3.0 (2021-12-29)

- feat: add support CommonJS (now supported ESM and CommonJS)
- feat: add aliases: `.fg()` for `.ansi256()` and `.bg()` for `.bgAnsi256()` methods
- fix: some inner param types
- chore: remove examples from NPM package (it can be cloned und run local)

## 1.2.2 (2021-12-28)

- fix: the path of examples in package.json

## 1.2.1 (2021-12-28)

- chore: add demo examples of all features
- docs: update readme

## 1.2.0 (2021-12-27)

- feat: add supports the environment variables `NO_COLOR` `FORCE_COLOR` and flags `--no-color` `--color`
- feat: add aliases `ansi` for `ansi256` and `bgAnsi` for `bgAnsi256`
- docs: add to readme the compare of most popular ANSI libraries

## 1.1.1 (2021-12-27)

- feat: add the class Ansis to create more independent instances to increase the performance by benchmark
- feat: improve performance
- refactor: code refactoring
- docs: update readme

## 1.1.0 (2021-12-25)

- feat: add supports the use of `open` and `close` properties for each style
- fix: codes for methods ansi256() and bgAnsi256()
- chore: added demo to npm package
- chore: update package.json
- docs: update readme

## 1.0.0 (2021-12-24)

First release
