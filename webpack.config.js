const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
    entry: './src/index.ts',
    // 'devtool' option was picked to work well with karma stuff
    // see https://github.com/TypeStrong/ts-loader for more details
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configFile: 'tslint.json',
                    emitErrors: true,
                    failOnHint: true
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // Caution that ugly shrinks the size but break source-map
        // new UglifyJSPlugin(),
        new DefinePlugin({
            __VERSION__: JSON.stringify(process.env.TRAVIS_COMMIT || 'SNAPSHOT'),
            __BUILD__: JSON.stringify(new Date().toISOString())
        }),
        new HtmlWebpackPlugin({
            title: 'Test Output'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
