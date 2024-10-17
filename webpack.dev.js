const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        host: '0.0.0.0',
        compress: true,
        port: 9000,
        historyApiFallback: true,
        allowedHosts: "all",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader', 
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: { 
                                quietDeps: true
                            },
                        }
                    }
                ],
            },
            {
                test: /\.njk$/,
                use: [
                    {
                        loader: 'simple-nunjucks-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
        ],
    },
});