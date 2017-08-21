'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '/src/js'),

    entry: [
        'babel-polyfill',
        './index'
    ],

    output: {
        /*path: path.join(__dirname, '/dist'),*/
        path: '//SRV-T-01/exam-frontEnd',
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },

    /*devtool: 'cheap-module-inline-source-map',*/

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

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': "jquery",
            moment: "moment",
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                unsafe: true
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '../../index.template.ejs',
            chunks:['main'],
            title: 'PermTestSystem'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules|bower_components/,
                include: [
                    path.resolve(__dirname, "src"),
                ],
                loader: 'babel',
                query: {
                    presets: ["es2015", "stage-0", "react"],
                    plugins: [['transform-runtime', {
                        helpers: false,
                        polyfill: false,
                        regenerator: true,
                    }],],
                }
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader"/*, {publicPath: './'}*/)
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"/*, {publicPath: './'}*/)
            },
            {
                test: /\.png$/,
                loader: "url-loader?file?&name=[path][name].[hash:6].[ext]&limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file?&name=[path][name].[hash:6].[ext]"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?file?&name=[path][name].[hash:6].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?file?&name=[path][name].[hash:6].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?&name=[path][name].[hash:6].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?file?&name=[path][name].[hash:6].[ext]&limit=10000&mimetype=image/svg+xml'
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
};