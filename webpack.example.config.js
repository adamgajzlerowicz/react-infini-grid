const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP = path.join(__dirname, 'example/src');
const BUILD = path.join(__dirname, 'example/lib');


module.exports = {
    entry: {
        index: APP,
    },
    output: {
        path: BUILD,
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {test: /\.css$/, loader: "style-loader!css-loader"}

        ]
    },

    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};