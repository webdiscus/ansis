# Building

This document describes how Ansis builds, tests, and publishes the v5 ESM package and the v4 dual compatibility packages from the same source code.

## Package Versions

- `v5` is the current package version. It is ESM-only for native modern ESM projects on Node.js 18+.
- `v4` is the dual CJS+ESM compatibility version for CommonJS and TypeScript Node16 dual-package interop.
- The repository uses one branch and one shared source code for both versions.

## Source Files

- `src/index.js` contains the core implementation.
- `src/index.mjs` contains the public ESM export surface with the default export and named exports.
- The v5 ESM build uses `src/index.mjs` as its entrypoint and bundles `src/index.js` into the same output file.

## Build Outputs

`npm run build` generates three package artifacts:

```text
dist/dual-node10
dist/dual-node14
dist/esm
```

- `dist/dual-node10` is the v4 dual package for Node.js 10+.
- `dist/dual-node14` is the v4 dual package for Node.js 14+.
- `dist/esm` is the v5 ESM-only package for Node.js 18+.

## Package Templates

Package-specific metadata is stored in `package/` and copied to `dist/` by Rollup:

```text
package/dual-node10/package.json
package/dual-node10/README.md

package/dual-node14/package.json
package/dual-node14/package-test.json
package/dual-node14/README.md

package/esm/package.json
package/esm/README.md
```

Version rules:

- root `package.json` uses the current v5 version.
- `package/esm/package.json` uses the current v5 version.
- `package/dual-node14/package.json` uses the current v4 version.
- `package/dual-node10/package.json` uses the current v4 version with the `-node10` suffix.

## Tests

The root test suite installs `ansis` from `dist/dual-node14` and keeps testing the v4 dual package behavior:

```json
"ansis":"file:dist/dual-node14"
```

The v5 ESM-only artifact is tested in an isolated fixture:

```text
test/esm-only
```

That fixture installs the v5 artifact as a normal consumer package:

```json
"ansis":"file:../../dist/esm"
```

Use these commands:

```sh
npm run test:esm-build-and-test
npm run test:esm-test
```

- `test:esm-build-and-test` builds all package artifacts and then runs the ESM-only fixture test.
- `test:esm-test` runs the ESM-only fixture test against an existing `dist/esm` artifact.

## Pack And Publish

Check npm package contents:

```sh
npm run pack:check
npm run pack:check-dual
npm run pack:check-dual-node10
```

- `pack:check` checks the current v5 ESM package.
- `pack:check-dual` checks the v4 dual Node.js 14+ package.
- `pack:check-dual-node10` checks the v4 dual Node.js 10+ package.

Publish packages:

```sh
npm run publish:public
npm run publish:beta
npm run publish:public-dual
npm run publish:beta-dual
npm run publish:public-dual-node10
```

- `publish:public` publishes `dist/esm` as the current v5 package.
- `publish:beta` publishes `dist/esm` with the `beta` tag.
- `publish:public-dual` publishes `dist/dual-node14` as the v4 dual package.
- `publish:beta-dual` publishes `dist/dual-node14` with the `beta` tag.
- `publish:public-dual-node10` publishes `dist/dual-node10` with the `node10` tag.

## CI

GitHub Actions builds all package artifacts once and uploads `dist/`.

The Node.js 18+ test matrix downloads that build artifact, installs dependencies without rebuilding, runs the root test suite, and runs `npm run test:esm-test`.

The legacy Node.js 14/16 job replaces the root package metadata with `package/dual-node14/package-test.json` before installing dependencies and running tests. This keeps the legacy job on the v4 dual package.
