import nodeResolve from 'rollup-plugin-node-resolve';
export default {
  input: 'src/js/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    sourcemap: 'inline'
  },
  plugins: [nodeResolve({ jsnext: true, main: true })]
};
