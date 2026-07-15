# Testing CLI output

Ansis automatically detects the supported color level from the runtime environment.
In tests, pass a mock `globalThis` object to make auto-detection predictable.

## Mock auto-detection

Create an `Ansis` instance with a mock `globalThis` object to control what Ansis sees during auto-detection:

```js
import { Ansis } from 'ansis';

const color = new Ansis({
  process: {
    env: { FORCE_COLOR: '1' },
    argv: ['node', 'test.js'],
    stdout: { isTTY: false },
    platform: 'linux',
  },
});

console.log(color.level);      // 1
console.log(color.red('foo')); // colored output
```

This keeps tests isolated: no global `process.env` mutation, no import-order setup file, and no dependency on the actual terminal.

## Disable colors

Use a strict color level when the test only needs plain output:

```js
import { Ansis } from 'ansis';

const color = new Ansis(0);

console.log(color.red('foo')); // foo
```

Or use a mock environment when the test specifically covers `NO_COLOR` behavior:

```js
import { Ansis } from 'ansis';

const color = new Ansis({
  process: {
    env: { NO_COLOR: '1' },
    argv: ['node', 'test.js'],
    stdout: { isTTY: true },
    platform: 'linux',
  },
});

console.log(color.red('foo')); // foo
```

## Force color levels

Use `FORCE_COLOR` to test the environment-variable behavior:

```js
import { Ansis } from 'ansis';

const truecolor = new Ansis({
  process: {
    env: { FORCE_COLOR: '3' },
    argv: ['node', 'test.js'],
    stdout: { isTTY: false },
    platform: 'linux',
  },
});

console.log(truecolor.level); // 3
```

Use a strict constructor level when the test does not need to cover environment-variable parsing:

```js
import { Ansis } from 'ansis';

const basicColor = new Ansis(1);
const ansi256 = new Ansis(2);
const truecolor = new Ansis(3);
```

## Test CLI flags

Pass CLI flags through the mocked `process.argv`:

```js
import { Ansis } from 'ansis';

const color = new Ansis({
  process: {
    env: { NO_COLOR: '1' },
    argv: ['node', 'test.js', '--color'],
    stdout: { isTTY: false },
    platform: 'linux',
  },
});

console.log(color.level); // 1
```

If multiple CLI color flags are present, the last one wins:

```js
import { Ansis } from 'ansis';

const color = new Ansis({
  process: {
    env: {},
    argv: ['node', 'test.js', '--no-color', '--color'],
    stdout: { isTTY: false },
    platform: 'linux',
  },
});

console.log(color.level); // 1
```

## Test the default instance

The default export and named styles are initialized when `ansis` is imported.
If you test them directly, define environment variables before importing `ansis`.

This is too late:

```js
process.env.NO_COLOR = '1';
import { red } from 'ansis';
```

Use a setup file imported before `ansis`:

```js
// no-color.js
process.env.NO_COLOR = '1';
```

```js
import './no-color.js';
import { red } from 'ansis';

console.log(red('foo')); // foo
```

## Disable colors for imported app code

Ansis detects the color level once, when it is imported.
To override the auto-detected color level in tests, import a setup file that defines the desired value in `process.env` before importing the app code that uses Ansis.

```js
// no-color.js
process.env.NO_COLOR = '1';
```

```js
// app.js
import color from 'ansis';

export function formatMessage(message) {
  return color.red(message);
}
```

```js
import { expect, test } from 'vitest';

import './no-color.js'; // import the setup file before any file that uses ansis
import { formatMessage } from './app.js';

test('disables colors for imported app code', () => {
  expect(formatMessage('foo')).toBe('foo');
});
```

## Strip ANSI codes

When the test does not care about color detection, strip ANSI escape sequences from the output:

```js
import { expect, test } from 'vitest';
import ansis, { red } from 'ansis';

test('plain text output', () => {
  expect(ansis.strip(red('foo'))).toBe('foo');
});
```