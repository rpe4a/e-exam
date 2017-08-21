'use strict';

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    context: path.join(__dirname, '/src/js'),

    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './index'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },

    devtool: 'cheap-module-inline-source-map',

    resolve: {
        modulesDirectories: ['node_modules', 'src', 'bower_components'],
        extension: ['', '.js', '.scss', '.css'],
        alias: [
            { jquery: "bower_components/jquery/dist/jquery.js" },
            { moment: 'bower_components/moment/min/moment.min.js' }
        ]
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        extension: ['', '.js'],
        moduleTempaltes: ['*-loader', '*']
    },

    watchoptions: {
        aggregateTimeot: 100
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': "jquery",
            moment: "moment",
        }),
    ],

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            {
                test: /\.css$/,
                loader: 'style!css!postcss?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /bower_components\/bootstrap\/js\//,
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /bower_components\/moment\/min\/js\//,
                loader: 'imports?this=>window'
            },
            /*{
                test: /bower_components\/eonasdan-bootstrap-datetimepicker\/src\/js\/js\//,
                loader: 'imports?moment=moment'
            },*/
            {
                test: /tinymce\/(langs)\/js\//,
                loaders: [
                    'imports?this=>window'
                ]
            }
        ]
    },

    postcss: function () {
        return [autoprefixer({
            browsers: ['last 2 versions', '> 1%']
        }), precss];
    },
}