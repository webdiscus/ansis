'use strict';

// This is the wrapper to properly export defaults from the bundle generated via rollup.
// Note: the `./dist/bundle.cjs` file will be auto generate at `npm publish`.

const bundle = require('./dist/bundle.cjs');

module.exports = bundle.default;
module.exports.Ansis = bundle.Ansis;
