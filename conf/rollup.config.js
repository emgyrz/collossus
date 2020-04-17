import path from 'path'
import copy from 'rollup-plugin-copy'
import { uglify } from 'rollup-plugin-uglify'
import typescript from '@rollup/plugin-typescript'

const DISTDIR = './dist'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: path.join( DISTDIR, 'index.umd.js' ),
      format: 'umd',
      name: 'collections'
    },
    plugins: [
      typescript(),
      uglify(),
      copy( {
        targets: [ {
          src: [
            'src/**/*.js.flow',
            'package.json',
            'tsconfig.json',
            '.flowconfig',
            'README.md',
            'LICENSE',
          ],
          dest: DISTDIR,
        } ],
        verbose: true,
        flatten: false,
      } )
    ],
  },
  {
    input: './src/index.ts',
    preserveModules: true,
    output: {
      dir: DISTDIR,
      format: 'es',
    },
    plugins: [
      typescript( { tsconfig: './tsconfig.json' } ),
      // uglify(),
    ],
  }
]
