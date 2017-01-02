const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP = path.join(__dirname, 'dev');
const BUILD = path.join(__dirname, 'lib');
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8081;

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
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0', 'airbnb']
                }
            },

            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        // hot: true,
        progress: true,
        stats: 'errors-only',
        host: HOST,
        port: PORT,
        outputPath: BUILD,
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './dev/template.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),

    ]
};