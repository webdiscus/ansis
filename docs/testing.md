# Testing CLI output

Ansis automatically detects the supported color level (none, 16, 256, or truecolor) based on the environment.

To ensure consistent test results across different terminals and environments,
you can explicitly set the desired color level using one of the supported environment variables:
`NO_COLOR`, `FORCE_COLOR` or `COLORTERM`.

> [!IMPORTANT]
>
> You must define the environment variable _before_ importing `ansis`.
>
> ```js
> process.env.NO_COLOR = '1'; // ❌ Doesn't work
> import { red } from 'ansis'; // <- Too late! NO_COLOR is undefined when ansis loaded
> ```
>
> Instead, create a separate file to set the environment variable and import it first:
> ```js
> import './no-color.js';       // ✅ Sets env variable early
> import { red } from 'ansis';  // NO_COLOR is defined
> ```

### Disable colors in tests

To ensure consistent test output without ANSI codes, you can disable color rendering using the `NO_COLOR` environment variable.

#### Disable via Environment Variable

Create a file: _no-color.js_:

```js
process.env.NO_COLOR = '1';
```

Import this file first in your test:
```js
import './no-color.js'; // disables colors
import { expect, test } from 'vitest';
import { red } from 'ansis';

console.log(red('foo')); // Output: plain "foo", no ANSI codes

test('output should not contain ANSI codes', () => {
  const output = red('foo');
  expect(output).toBe('foo');
});
```

#### Strip ANSI Codes with `ansis.strip()`

Alternatively, use `ansis.strip()` to remove color codes from strings in your tests:

```js
import { expect, describe, test } from 'vitest';
import ansis, { red } from 'ansis';

test('should remove ANSI codes from output', () => {
  const output = red('foo');
  expect(ansis.strip(output)).toBe('foo');
});
```

### Force truecolor

File: _enable-truecolor.js_:

```js
process.env.COLORTERM = 'truecolor';
```

Test file:
```js
import './enable-truecolor.js'; // enables truecolor
import { red, fg, hex } from 'ansis';

console.log(hex('#FFAB40')('orange')); // uses native ANSI RGB
console.log(fg(200)('pink'));          // uses ANSI 256
console.log(red('red'));               // uses ANSI 16
```

### Force 256 colors

File: _enable-256colors.js_:

```js
process.env.COLORTERM = 'ansi256';
```

Test file:
```js
import './enable-256colors.js'; // enables 256 colors
import { red, fg, hex } from 'ansis';

console.log(hex('#FFAB40')('orange')); // fallback to ANSI 256 colors
console.log(fg(200)('pink'));          // uses ANSI 256 colors
console.log(red('red'));               // uses ANSI 16 colors
```

### Force 16 colors

File: _enable-16colors.js_:

```js
process.env.COLORTERM = 'ansi';
```

Test file:
```js
import './enable-16colors.js'; // enables 16 colors
import { red, fg, hex } from 'ansis';

console.log(hex('#FFAB40')('orange')); // fallback to ANSI 16 colors (e.g., bright red)
console.log(fg(200)('pink'));          // fallback to ANSI 16 colors (e.g., bright magenta)
console.log(red('red'));               // uses ANSI 16 colors
```