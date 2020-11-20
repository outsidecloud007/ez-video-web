const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./app.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist/view'),
    },
    module: {
        rules: [{
                test: /.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }, {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/, 
                use: [
                    'style-loader', 
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new CopyWebpackPlugin({
            patterns: [
                { from: './css', to: './css' },
                { from: './pics', to: './pics' },
                { from: './index.html', to: './index.html' },
                { from: './dist/view', to: '../../../server/view' }
            ]
        })
    ],
    devServer: {
        port: 9000
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
};