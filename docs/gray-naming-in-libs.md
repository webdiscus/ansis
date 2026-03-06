### Color naming in libraries: `gray` vs `grey` vs `blackBright`

The same ANSI codes `90` (_gray_) and `100` (_bgGray_) are named differently in various libraries.

| Library                     | Standard<br>`gray`<br>`bgGray` | UK spelling<br>`grey`<br>`bgGrey` | Spec-style<br>&nbsp;`blackBright`<br>`bgBlackBright` |
|:----------------------------|:------------------------------:|:---------------------------------:|:----------------------------------------------------:|
| [ansis][ansis]              |               ✅                |                 ❌                 |                          ❌                           |
| [yoctocolors][yoctocolors]  |               ✅                |                 ❌                 |                          ❌                           |
| [kolorist][kolorist]        |               ✅                |                 ❌                 |                          ❌                           |
| [colors.js][colors.js]      |               ✅                |                 ✅                 |                          ❌                           |
| [picocolors][picocolors]    |               ✅                |                 ❌                 |                          ✅                           |
| [tinyrainbow][tinyrainbow]  |               ✅                |                 ❌                 |                          ✅                           |
| [colorette][colorette]      |               ✅                |                 ❌                 |                          ✅                           |
| [chalk][chalk]              |               ✅                |                 ✅                 |                          ✅                           |
| [ansi-colors][ansi-colors]  |               ✅                |                 ✅                 |                          ✅                           |
| [kleur][kleur] (8 colors)   |               ✅                |                 ✅                 |                          -                           |
| [cli-color][cli-color]      |               ❌                |                 ❌                 |                          ✅                           |
| [colors-cli][colors-cli]    |               ❌                |                 ❌                 |                          ✅                           |
| [styleText][styleText-mods] |               ✅                |                 ✅                 |                          ✅                           |

Ansis prefers the more intuitive and commonly used names `gray` and `bgGray`,  **_avoiding redundant aliases_**.

[colors.js]: https://github.com/DABH/colors.js

[colorette]: https://github.com/jorgebucaran/colorette

[picocolors]: https://github.com/alexeyraspopov/picocolors

[cli-color]: https://github.com/medikoo/cli-color

[colors-cli]: https://github.com/jaywcjlove/colors-cli

[ansi-colors]: https://github.com/doowb/ansi-colors

[kleur]: https://github.com/lukeed/kleur

[kolorist]: https://github.com/marvinhagemeister/kolorist

[chalk]: https://github.com/chalk/chalk

[yoctocolors]: https://github.com/sindresorhus/yoctocolors

[ansis]: https://github.com/webdiscus/ansis

[tinyrainbow]: https://github.com/tinylibs/tinyrainbow

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

[npm-tinyrainbow]: https://www.npmjs.com/package/tinyrainbow

[styleText]: https://nodejs.org/api/util.html#utilstyletextformat-text-options

[styleText-mods]: https://nodejs.org/api/util.html#modifiers