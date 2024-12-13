# NPM package

### Optimisation for NPM repository.

The files from the `package/` will be coped to `dist/` via `rollup`, see the `rollup.config.js`.

> Note:
> - the `./package.npm.json` works only from installed package via `npm install ansis`.
> - the `./package.json` configured for local usage, e.g. to build distributive, run test, bench.

The files for NPM package will be published from the `dist/` directory.

This allows you to reduce the package size and use a different `package.json` optimized only for the NPM package.

### Publish for public access

```
npm run publish:public
```

### Publish beta version

```
npm run publish:beta
```

### Unpublish beta

```
npm deprecate ansis@<version-beta.0> "remove beta version"
```

```
npm unpublish ansis@<version-beta.0>
```
