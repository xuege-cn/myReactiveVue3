const path = require('path')

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_module/,
            options: {
                presets: ['@babel/preset-env']
            }
        }]
    }
}