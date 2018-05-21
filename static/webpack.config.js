const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UgligyJsPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';


const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'index.html',
    inject: 'body'
});



const ASSET_PATH = process.env.ASSET_PATH || '';



module.exports = {
    devtool: NODE_ENV == 'development' ? 'eval' : null,
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: ASSET_PATH,
        filename: 'assets/index.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    devServer: {
        historyApiFallback: {
            index: 'index.html',
        },
        contentBase: path.join(__dirname, '/'),
        inline: true
    },
    plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin("assets/boundle.css"), new UgligyJsPlugin()]
};