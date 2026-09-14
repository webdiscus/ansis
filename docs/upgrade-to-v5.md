<a id="top" name="top"></a>
# Upgrade Ansis to v5

Ansis v5 is ESM-only for projects on Node.js 18+

Use ESM imports:

```js
import ansis, { red, green, bold } from 'ansis';
```

If your project requires CommonJS or TypeScript Node16 dual-package interop, use Ansis v4.

## TypeScript

TypeScript configs that depend on Node16 dual-package interop are not supported by v5.

The following setup belongs to the Ansis v4 compatibility line:

```json
{
	"compilerOptions":{
		"target":"es2022",
		"module":"Node16",
		"moduleResolution":"Node16",
		"verbatimModuleSyntax":true
	}
}
```

For Ansis v5, use a native ESM/bundler-style setup instead:

```json
{
	"compilerOptions":{
		"target":"es2022",
		"module":"ESNext",
		"moduleResolution":"Bundler",
		"verbatimModuleSyntax":true
	}
}
```

If your project must keep `module: "Node16"` / `moduleResolution: "Node16"`, use Ansis v4.