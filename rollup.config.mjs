import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'chiefMartinezSdkWrapper.js',
  output: {
    file: 'chiefMartinezSdkWrapper.bundle.js',
    format: 'umd',
    name: 'ChiefMartinezSDK',
    exports: 'named'
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs()
  ]
};
