var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        app: "./public/app/App.js",
        client: "./public/app/Client.js"
    },
    output: {
        filename: "public/build/[name].js",
        sourceMapFilename: "public/build/[name].map",
    },
    devtool: '#source-map',
    
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query:{
                    presets:['react','es2015']
                }
            }
        ]
    }

}