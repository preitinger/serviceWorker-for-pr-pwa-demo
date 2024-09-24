const path = require('path')

module.exports = {
    entry: {
        bundle: path.join(__dirname, './src/sw.ts'),
    },

    output: {
        filename: 'sw.js',
        path: path.join(__dirname, 'dist'),
    },

    // mode: process.env.NODE_ENV || 'development',
    mode: 'production',

    watchOptions: {
        ignored: /node_modules|dist|\.js/g,
    },

    //   devtool: 'eval-cheap-module-source-map',
    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.json'],
        plugins: [],
    },

    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    },
}
