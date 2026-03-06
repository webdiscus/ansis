<a id="top" name="top"></a>
## How to switch to Ansis

Ansis is a powerful, small, and fast replacement for many similar libraries.\
Just replace your `import ... from ...` or `require(...)` to `ansis`.

- [Migrating from `chalk`](#replacing-chalk)
- [Migrating from `colorette`](#replacing-colorette)
- [Migrating from `picocolors`](#replacing-picocolors)
- [Migrating from `ansi-colors`](#replacing-ansi-colors)
- [Migrating from `kleur`](#replacing-kleur)
- [Migrating from `cli-color`](#replacing-cli-color)


<a id="replacing-chalk" name="replacing-chalk"></a>

### Migrating from [chalk]

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

// truecolor
chalk.hex('#FFA500').bold('Bold orange color');
chalk.rgb(123, 45, 67).underline('Underlined reddish color');
chalk.bgHex('#E0115F')('Ruby');
chalk.bgHex('#96C')('Amethyst');
```

> [!WARNING]
>
> If used ANSI 256 colors functions, replace them with Ansis equivalents:
> ```diff
> - chalk.ansi256(196)('Error');
> + ansis.fg((196)('Error');
>
> - chalk.bgAnsi256(21)('Info');
> + ansis.bg(21)('Info');
> ```

> [!WARNING]
>
> Ansis doesn't not support the `overline` style, because it's **not widely supported** and no one uses it.\
> Check you code and replace the `overline` style with standard `underline`:
>
> ```diff
> - chalk.red.overline('text');
> + ansis.red.underline('text');
> ```

> [!WARNING]
>
> Ansis support the common standard [`gray` color name](./gray-naming-in-libs.md), not `grey` (UK spelling).
>
> ```diff
> - chalk.grey('text');
> + ansis.gray('text');
>
> - chalk.bgGrey('text');
> + ansis.bgGray('text');
> ```

Optionally, you can rewrite the same code to make it even shorter and cleaner:

```js
import { red, cyan, fg, bg, hex, rgb, bgHex, bgRgb } from 'ansis';

red.bold('Error!'); // using parentheses
red.bold`Error!`;   // using template string

// colorize "Error: file not found!"
red`Error: ${cyan.bold`file`} not found!`;

// ANSI 256 colors
fg(93)`Violet color`; // equivalent for chalk.ansi256()
bg(194)`Honeydew, more or less`;  // equivalent for chalk.bgAnsi256()

// truecolor
hex('#FFA500').bold`Bold orange color`;
rgb(123, 45, 67).underline`Underlined reddish color`;
bgHex('#E0115F')`Ruby`;
bgHex('#96C')`Amethyst`;
```

**Migrating from Chalk v4**

When used the `keyword` color model, e.g. `chalk.keyword('orange')`
extend ansis instance with [named colors](../README.md#extend-colors).

```js
import ansis from 'ansis';
import colorNames from 'css-color-names'; // install color names package (~6 kB)

const color = ansis.extend(colorNames);

// alternatively define a custom subset with only the names you actually use:
//const color = ansis.extend({ orange: '#ffa500' });
```

Now you can use named color on extended `color` instance:

```diff
- chalk.keyword('orange')('text');
+ color.orange('text');

- chalk.bgKeyword('orange')('text');
+ color.bgOrange('text');
```


#### [↑ top](#top)

<a id="replacing-colorette" name="replacing-colorette"></a>

### Migrating from [colorette]

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

### Migrating from [picocolors]

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

### Migrating from [ansi-colors]

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

### Migrating from [kleur]

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

### Migrating from [cli-color]

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

If you use ANSI 256 color functions, replace `xterm` with `fg` and `bgXterm` replace `bg`:

```diff
- clc.xterm(202).bgXterm(236)('Orange text on dark gray background');
+ clc.fg(202).bg(236)('Orange text on dark gray background');
```

Optionally, you can rewrite the same code to make it even shorter and cleaner:

```js
import { red, cyan, fg, bg } from 'ansis';

red.bold`Error!`;

// colorize "Error: file not found!"
red`Error: ${cyan.bold`file`} not found!`;

fg(202).bg(236)`Orange text on dark gray background`;
```

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