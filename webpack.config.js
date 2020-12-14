const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '.'),
        compress: true,
        port: 3000,
    },

    output: {
        library: 'main',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, "dist"), 
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/ 
            },
            {
                test: /\.wasm$/,
                loader: "wasm-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};