'use strict';

// This is the generic module loader for both ESM and CommonJS.
// Note:
//   - the file will be coped to ./dist directory as index.js via rollup.
//   - the `./dist/colors.js` file will be auto generated via rollup at `npm publish`.

const colors = require('./colors.js');
module.exports = colors.default;
module.exports.Ansis = colors.Ansis;
