import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import {terser} from 'rollup-plugin-terser'
import wcbuilder from '@author.io/rollup-plugin-wcbuilder'

const input = './src/element.js'
const outfile = 'author-menu.js'
const outdir = './dist'
const format = 'iife'
const pkg = require('./package.json')
const banner = `// Copyright (c) ${(new Date()).getFullYear()} ${pkg.author.name}. ${pkg.license} licensed.\n// ${pkg.name} v${pkg.version} available at ${pkg.repository.url.replace(/git\+|https:\/\/|\.git/gi, '')}\n// Last Build: ${(new Date().toLocaleString({ timeZone: 'UTC'}))}`

const options = {
	dependencies: [
		// tag names of dependee elements
	]
}

const babelConfig = {
	presets: [['@babel/preset-env', { modules: false }]]
}

const output = file => {
	return {
		name: 'AuthorMenuElement',
		file: `${outdir}/${outfile.replace(require('path').extname(outfile), '')}${file}`,
		format,
		banner,
		sourcemap: true
	}
}

export default [
	// Standard (Minified ES6)
	{
		input,
		plugins: [
			wcbuilder(options),
			terser()
		],
		output: [
			output('.min.js')
		]
	},

	// Legacy (Transpiled & Minified ES5)
	{
		input,
		plugins: [
			wcbuilder(options),
			babel(babelConfig),
			uglify()
		],
		output: [
			output('.es5.min.js')
		]
	},

	// Development: Standard (Unminified ES6)
	{
		input,
		plugins: [
			wcbuilder(options)
		],
		output: [
			output('.js')
		]
	},

	// Development: Legacy (Transpiled & Unminified ES5)
	{
		input,
		plugins: [
			wcbuilder(options),
			babel(babelConfig)
		],
		output: [
			output('.es5.js')
		]
	}
]
