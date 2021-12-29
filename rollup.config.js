export default {
  input: 'src/index.js',
  output: {
    intro: '/* DON`T MODIFY THIS FILE!\nUse `npm run build:cjs` to create this CommonJS bundle. */',
    exports: 'named',
    file: './src/commonjs/index.cjs',
    format: 'cjs',
  },
};
