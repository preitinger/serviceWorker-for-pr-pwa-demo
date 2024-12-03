'use strict';
const path = require('path');

module.exports = {
    devtool: 'source-map',
	entry: './src/sw.ts',
	output: {
		filename: 'test.js',
		path: path.resolve(__dirname, 'distForTest')
	},
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
        extensionAlias: {
            '.ts': ['.js', '.ts'],
            '.cts': ['.cjs', '.cts'],
            '.mts': ['.mjs', '.mts']
        }
    }
};