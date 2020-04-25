#!/usr/bin/node

const fs = require( 'fs' )
const path = require( 'path' )

const pkg = require( '../package.json' )

pkg.devDependencies = {}
pkg.scripts = {}
delete pkg.eslintIgnore

fs.writeFileSync( './dist/package.json', JSON.stringify( pkg, null, 2 ) )


