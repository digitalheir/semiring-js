const webpack = require('webpack');
const path = require('path');
const libraryName = 'semiring';

const plugins = [
        new webpack.LoaderOptionsPlugin({
            options: {
                // tslint: {
                //     emitErrors: true,
                //     failOnHint: true
                // }
            }
        })
    ];

const outputFile = "index.js";
// outputFile = libraryName + '.' + VERSION + '.min.js';

var config = {
    entry: [
        __dirname + '/src/index.ts'
    ],
    devtool: 'source-map',
    mode: "production",
    output: {
        path: path.join(__dirname, '/'),
        filename: outputFile,
        library: libraryName,
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.tsx?$/,
            //     loader: 'tslint-loader',
            //     exclude: /node_modules/
            // },
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    plugins: plugins

    // Individual Plugin Options
};

module.exports = config;