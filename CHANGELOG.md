# Change log

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
