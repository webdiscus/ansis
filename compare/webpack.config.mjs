import path from 'path';
import url, { URL } from 'node:url';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  output: {
    // open in a browser a generated HTML file in the `dist/` directory
    // then open browser console, if you see colored output, then the used module works
    path: path.join(__dirname, 'dist/'),
    clean: true,
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        ansis: { import: './src/index.eta', data: { pkg: 'ansis' } },
        chalk: { import: './src/index.eta', data: { pkg: 'chalk' } },
        kolorist: { import: './src/index.eta', data: { pkg: 'kolorist' } },
        'cli-color': { import: './src/index.eta', data: { pkg: 'cli-color' } },
        'colors-cli': { import: './src/index.eta', data: { pkg: 'colors-cli' } },
        //colors: { import: './src/index.eta', data: { pkg: 'colors' } }, // <= FATAL ERROR by import
        'ansi-colors': { import: './src/index.eta', data: { pkg: 'ansi-colors' } },
        //colorette: { import: './src/index.eta', data: { pkg: 'colorette' } }, // <= FATAL ERROR by import
        picocolors: { import: './src/index.eta', data: { pkg: 'picocolors' } },
        tinyrainbow: { import: './src/index.eta', data: { pkg: 'tinyrainbow' } },
        kleur: { import: './src/index.eta', data: { pkg: 'kleur' } },
      },
      js: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
      },
    }),
  ],
};
