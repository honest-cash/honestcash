module.exports = {
    entry: './src/hashtagApp.js',
    mode: 'production',
    output: {
        path: __dirname + "/public/js",
        filename: 'bundle.js'
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
    plugins: [
        /**
        new Uglify({
            uglifyOptions: {
                cache: true,
                ecma: 7,
                compress: {
                    warnings: false,
                    // Disabled because of an issue with Uglify breaking seemingly valid code:
                    // https://github.com/facebookincubator/create-react-app/issues/2376
                    // Pending further investigation:
                    // https://github.com/mishoo/UglifyJS2/issues/2011
                    comparisons: false,
                },
                mangle: {
                    keep_fnames: true,
                    reserved: ["BigInteger","ECPair","Point"],
                },
                output: {
                    //comments: false,
                    // Turned on because emoji and regex is not minified properly using default
                    // https://github.com/facebookincubator/create-react-app/issues/2488
                    //ascii_only: true,
                },
            },
        }),
         */
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    }
};
