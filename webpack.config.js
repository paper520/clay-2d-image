var webpack = require('webpack');
module.exports = {
    entry: ['./src/entry.js'],
    output: {
        path: __dirname,
        filename: 'build/main.js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: ['vue-loader']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpg|jpeg|gif|bmp)$/,
            loader: ['file-loader?limit=7000&name=build/assets/[name].[ext]']
        }]
    }
};
