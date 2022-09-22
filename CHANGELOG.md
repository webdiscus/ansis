# Change log

## 1.5.5 (2022-09-22)
- refactor: optimize code to reduce size by 120 bytes
- test: added test for isSupported() function
- docs: update readme, add example screenshots

## 1.5.4 (2022-09-14)
- fix: visible style with nested template strings

## 1.5.3 (2022-09-14)
- fix: set correct aliases for bgAnsi and fg methods by named export
- chore: refactor examples
- docs: update readme

## 1.5.2 (2022-09-10)
- fix: regard the value of the environment variable FORCE_COLOR=0 to force disable colors
- test: added tests for FORCE_COLOR
- docs: update readme

## 1.5.1 (2022-09-08)
- fix: added missing export for CJS mode in package.json
- test: added manual tests for CJS and ESM mode

## 1.5.0 (2022-09-08)
- DEPRECATE v1.5.0, because missing exports main for CJS mode, fixed in v1.5.1

## 1.5.0 (2022-09-08)
- feat: added supports the nested template literal syntax:
  ```js
  console.log(red`red ${yellow`yellow ${green`green`} yellow`} red`)
  ```
- feat: added named export of colors with supports for chained syntax:
  ```js
  import { red, green, yellow } from 'ansis/colors';
  console.log(red.bold.underline`text`);
  ```
- feat: added extending of base colors with named custom truecolor
  ```js
  import ansis from 'ansis';
  ansis.extend({ orange: '#FFAB40' });
  console.log(ansis.orange.bold('text'));
  ```
- fix: corrected declarations in `index.d.ts`
- chore: added `AnsiStyles`, `AnsiColors` and AnsiColorsExtend types in `index.d.ts`
- refactor: optimize size of distributed bundle from 3.7KB to 3.1KB
- docs: added usage in CLI

## 1.4.0 (2022-07-02)
- feat: add method strip() to remove all ANSI codes from string

## 1.3.6 (2022-04-27)
- build: properly generated distribution package, bump to last stable version 1.3.6
- chore: update dev packages

## 1.3.5 (2022-04-27)
- DEPRECATED: this version is broken

## 1.3.4 (2022-01-30)
- optimize distributed code size to smaller than `4 KB`

## 1.3.3 (2022-01-24)
- added UK spelling alias `grey` for `gray`
- update dev dependencies
- update readme

## 1.3.2 (2021-12-30)
- added bundle generation for ESM
- auto generate bundles for ESM and CommonJS at npm publish

## 1.3.1 (2021-12-29)
- fixed usage for CommonJS: `const ansis = require('ansis').default;` --> `const ansis = require('ansis');`

## 1.3.0 (2021-12-29)
- added support CommonJS (now supported ESM and CommonJS)
- added aliases: `.fg()` for `.ansi256()` and `.bg()` for `.bgAnsi256()` methods
- fixed some inner param types
- remove examples from NPM package (it can be cloned und run local)

## 1.2.2 (2021-12-28)
- fixed the path of examples in package.json

## 1.2.1 (2021-12-28)
- update examples: added demo of all features
- update readme

## 1.2.0 (2021-12-27)
- added supports the environment variables `NO_COLOR` `FORCE_COLOR` and flags `--no-color` `--color`
- added aliases `ansi` for `ansi256` and `bgAnsi` for `bgAnsi256`
- added to readme the compare of most popular ANSI libraries

## 1.1.1 (2021-12-27)
- added the class Ansis to create more independent instances to increase the performance by benchmark
- improve performance
- code refactoring
- update readme

## 1.1.0 (2021-12-25)
- added supports the use of `open` and `close` properties for each style
- added demo to npm package
- fixed codes for methods ansi256() and bgAnsi256()
- update package.json
- update readme

## 1.0.0 (2021-12-24)
First release
