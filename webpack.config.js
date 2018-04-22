const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;

// configuration for prod
const prodConfig = {
    name: 'PROD',
    // 'source-map' option makes source maps be placed in separate
    // files while keeping the original js file small. The option
    // used in DEV ('inline-source-map') will join the 2 files which
    // is too costly.
    devtool: 'source-map',
    extraPlugins: [
        new UglifyJSPlugin({ sourceMap: true })
    ]
};

// configuration for testing
const testConfig = {
    name: 'DEV',
    // 'inline-source-map' option was picked since it works well with
    // karma/jasmine see https://github.com/TypeStrong/ts-loader for
    // more details on the issue.
    devtool: 'inline-source-map',
    extraPlugins: []
};

const envConfig = process.env.ENV === 'test' ? testConfig : prodConfig;
const version = process.env.TRAVIS_COMMIT || 'SNAPSHOT';
const build = new Date().toISOString();

console.log(`
Environment: ${envConfig.name}
Version: ${version}
Build date: ${build}
`);

module.exports = {
    entry: {
        'page1': './src/sunny.ts',
        'page2': './src/sound/index.ts'
    },
    devtool: envConfig.devtool,
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
        new DefinePlugin({
            __VERSION__: JSON.stringify(version),
            __BUILD__: JSON.stringify(build)
        }),
        new HtmlWebpackPlugin({
            title: 'Sunset/Sunrise',
            chunks: ['page1'],
            filename: 'sunny.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Audio Visualization',
            chunks: ['page2'],
            filename: 'sound.html'
        })
    ].concat(envConfig.extraPlugins),
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
