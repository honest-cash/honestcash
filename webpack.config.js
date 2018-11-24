module.exports = {
    entry: './src/hashtagApp.js',
    mode: 'production',
    output: { 
        path: __dirname + "/public/js",
        filename: 'bundle.js'
    },
    optimization:{
        // minimize: false, // <---- disables uglify.
        // minimizer: [new UglifyJsPlugin()] if you want to customize it.
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [ 'ts-loader' ],
                exclude: /node_modules/
            }, {
                test: /\.css$/, 
                use: [ 'style-loader', 'css-loader' ]
            }, {
                test: /\.html$/,
                use: [ "html-loader" ],
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    }
};
