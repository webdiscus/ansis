<a id="top" name="top"></a>
# Upgrade Ansis to v4

## 1) Upgrade to Deno v2 (if used)

This version supports Deno 2.0 and newer.

## 2) Replace `strike` with `strikethrough`

```diff
- ansis.strike('text')
+ ansis.strikethrough('text')
```

## 3) Replace `grey` and `blackBright` with `gray`

```diff
- ansis.grey('text')
- ansis.blackBright('text')
+ ansis.gray('text')
```

## 4) Replace `bgGrey` and `bgBlackBright` with `bgGray`

```diff
- ansis.bgGrey('text')
- ansis.bgBlackBright('text')
+ ansis.bgGray('text')
```

## 5) Replace `ansi256()` with  `fg()`

```diff
- ansis.ansi256(196)('Error')
+ ansis.fg(196)('Error')
```

## 6) Replace `bgAnsi256()` with `bg()`

```diff
- ansis.bgAnsi256(21)('Info')
+ ansis.bg(21)('Info')
```

## 7) Update the `extend()` method

The new `extend()` method now returns an extended instance instead of modifying the original instance in-place.
To migrate, assign the result of `extend()` to a new variable (**avoid reassigning the original instance**):

```diff
import ansis from 'ansis';

- ansis.extend({ pink: '#FF75D1' });
+ const colors = ansis.extend({ pink: '#FF75D1' });

- console.log(ansis.pink.bold('foo'));
+ console.log(colors.pink.bold('foo'));
```

Alternatively:
```diff
- import ansis from 'ansis';
+ import { Ansis } from 'ansis';

- ansis.extend({ pink: '#FF75D1' });
+ const ansis = new Ansis().extend({ pink: '#FF75D1' });

console.log(ansis.pink.bold('foo'));
```

## 8) Define `AnsiColorsExtend` type manually

If you previously imported the `AnsiColorsExtend` type, you’ll now need to define it manually as it has been removed from Ansis.
Below is how you can define and use it in your TypeScript code:

```diff
- import ansis, { AnsiColorsExtend } from 'ansis';
+ import ansis, { AnsiColors } from 'ansis';

+ type AnsiColorsExtend<T extends string> = AnsiColors | (T & Record<never, never>);

const myTheme = {
  orange: '#FFAB40',
};

// Extend ansis with custom colors
const colors = ansis.extend(myTheme);

// Custom logger supporting both built-in and extended styles
const log = (style: AnsiColorsExtend<keyof typeof myTheme>, message: string) => {
  console.log(colors[style](message));
}

log('orange', 'message'); // extended color
```

This change ensures compatibility with the latest version of Ansis, as the `AnsiColorsExtend` type is no longer included by default.