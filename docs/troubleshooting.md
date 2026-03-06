# ⚙️ Troubleshooting

1. [🔴 TS1479: The current file is a CommonJS module whose imports will produce require calls](#troubleshooting-ts1479)
2. [🟡 ESLint: Caution: `ansis` also has a named export](#troubleshooting-eslint-named-export)

<a name="troubleshooting-ts1479"></a>
### 🔴 TS1479: The current file is a CommonJS module whose imports will produce require calls

If you're using TypeScript in CommonJS project with the following `tsconfig.json` settings:

```json
{
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "Node16"
  }
}
```

Then TypeScript will treat `.ts` files as either ESM or CommonJS based on the file extension or the `type` field in package.json:
- `.mts` - always ES module
- `.cts` - always CommonJS
- `.ts` - ESM only if `"type": "module"` is set in `package.json`

Using `import` or `import type` in a file that is treated as CommonJS causes the error:
```
TS1479: The current file is a CommonJS module whose imports will produce require calls.
```

> [!WARNING]
> When using `"moduleResolution": "Node16"` or `"NodeNext"`, TypeScript enforces strict ESM rules.\
> If your project is in CommonJS mode (`"type": "commonjs"`),
> it does not allow importing `ansis` using `import ansis from 'ansis'`, even with `esModuleInterop` enabled.

#### Solutions

- Use `.mts` file extension. This forces the file to be treated as an ES module.
- Set `"type": "module"` in your `package.json` to tread a `.ts` file as an ES module:
  ```json
  {
    "type": "module"
  }
  ```
  Then this works:
  ```ts
  import ansis, { type AnsiColors, Ansis, red, greenBright, hex } from 'ansis';
  ```
- Use CommonJS `require()` (no type imports)
  ```ts
  const ansis = require('ansis');
  const { Ansis, red, greenBright, hex } = ansis;
  ```
> [!CAUTION]
> You cannot use `import type` in CommonJS files under `"moduleResolution": "Node16"` or `"NodeNext"`
- Switch to `"moduleResolution": "node"` (if possible)\
  With `"moduleResolution": "node"` you can use `import` and `import type` in CommonJS files without errors:
  ```json
  {
    "compilerOptions": {
      "module": "Node16",
      "moduleResolution": "node",
      "esModuleInterop": true
    }
  }
  ```
  Use this only if your project doesn't rely on the strict behavior of `"Node16"`.


<a name="troubleshooting-eslint-named-export"></a>
### 🟡 ESLint: Caution: `ansis` also has a named export

If you use a default import:

```ts
import ansis from 'ansis';

console.log(ansis.red('Error!'));
```

ESLint may show this warning:

> ESLint: Caution: `ansis` also has a named export `red`. Check if you meant to write `import {red} from 'ansis'` instead. (import/no-named-as-default-member)

> [!NOTE]
> This warning is shown because `ansis` is a **dual** package: it provides both a default export and named exports.
> ESLint's `import/no-named-as-default-member` rule is triggered when you import the default export and use its named properties,
> to help catch possible mistakes with import syntax in dual-export modules.

#### Solutions

- Use named import (**preferred**):
  ```ts
  import { red } from 'ansis';

  console.log(red('Error!'));
  ```

- If you want to keep existing code unchanged, use a namespace import (**alternative**):
  ```ts
  import * as ansis from 'ansis';

  console.log(ansis.red('Error!'));
  ```

- Disable the rule for a single line:
  ```ts
  // eslint-disable-next-line import/no-named-as-default-member
  import ansis from 'ansis';

  console.log(ansis.red('Error!'));
  ```

- Disable the rule globally in your ESLint config (**not recommended**):
  ```js
  // .eslintrc.js
  module.exports = {
    // ...
    rules: {
      'import/no-named-as-default-member': 'off'
    }
  }
  ```