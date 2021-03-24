import rm from 'rimraf'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

rm.sync('dist')

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'esm',
    },
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/umd/index.js',
      format: 'iife',
      name: 'VueUsePopperjs',
      globals: {
        vue: 'Vue',
        '@popperjs/core': 'Popper',
      },
    },
    {
      file: 'dist/umd/index.min.js',
      format: 'iife',
      name: 'VueUsePopperjs',
      globals: {
        vue: 'Vue',
        '@popperjs/core': 'Popper',
      },
      plugins: [terser()],
    },
  ],
  plugins: [typescript(), json()],
}
