import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import { minify } from 'terser';

// Helpers
//
// - Display the size of a directory's content:
//   find ./dist -type f -exec stat -f"%z" {} + | awk '{s+=$1} END {print s}'

// last ECMA version compatible with node.js 12
//const ecma = 2019;
const ecma = 2021;

const terserOptions = {
  ecma,
  // https://github.com/terser/terser#compress-options
  compress: {
    ecma,
    passes: 2,
    inline: true,
    //module: true, // omit 'use strict'
  },
  toplevel: true,
}

// use this options only for debugging
const debugTerserOptions = {
  ecma,
  compress: false,
  keep_fnames: true,
}

function removeComments(string){
  //Takes a string of code, not an actual function.
  return string.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g,'').trim();//Strip comments
}

export default [
  {
    input: 'src/index.js',
    output: [
      {
        intro: '/* Auto generated by rollup.\nUse `npm run build` to create new version. */',
        exports: 'named',
        file: './dist/index.js',
        format: 'cjs',
        strict: false,  // disable "use strict"
        esModule: false, // prevents __esModule property
      },
    ],
    plugins: [
      replace({
        preventAssignment: false, // allow modifying exports
        // the order of exports is other than is needed
        // firstly must be defined default export
        'exports.Ansis = Ansis': 'module.exports = ansis',
        // then on the next line can be named and default export,
        // `ansis.default = ansis` is needed for tsc using default import, e.g. `import ansis from 'ansis'`
        'exports.default = ansis': 'ansis.default = ansis',
      }),
      terser(terserOptions),
      copy({
        targets: [
          {
            src: 'src/index.mjs',
            dest: 'dist/',
            transform: async (contents, name) => (await minify(contents.toString(), { ecma: 2015 })).code,
          },

          // minify d.ts file generated after cleanup
          {
            src: 'src/index.d.ts',
            rename: 'index.d.ts',
            dest: 'dist/',
            transform: (contents, name) => {
              return removeComments(contents.toString()).
                // remove insignificant spaces, new lines and trailing commas
                replaceAll(/\n/g, '').
                replaceAll(/\s{2,}/g, ' ').
                replaceAll(': ', ':').
                replaceAll(' | ', '|').
                replaceAll(' & ', '&').
                replaceAll(' = ', '=').
                replaceAll(' =', '=').
                replaceAll('=|', '=').
                replaceAll('=> ', '=>').
                replaceAll(', ', ',').
                replaceAll('{ ', '{').
                replaceAll(' {', '{').
                replaceAll(' }', '}').
                replaceAll('; ', ';').
                replaceAll(' ;', ';').
                replaceAll(',}', '}').
                replaceAll(';}', '}');
            },
          },

          { src: 'package.npm.json', dest: 'dist/', rename: 'package.json' },
          { src: 'README.npm.md', dest: 'dist/', rename: 'README.md' },
          { src: 'LICENSE', dest: 'dist/' },
        ],
      }),
    ],
  },
];
