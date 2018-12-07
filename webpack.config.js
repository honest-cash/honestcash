module.exports = {
    entry: {
        app: './src/app/app.js',
        editor: './src/editor/editor.ts'
    },
    mode: 'development',
    output: {
        path: __dirname + "/public/js",
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)?$/,
                loader: 'ts-loader',
                exclude: [ __dirname + '/node_modules/' ],
                options: {
                    transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
                }
            }, {
                test: /\.css$/, 
                use: [ 'style-loader', 'css-loader' ]
            }, {
                test: /\.html$/,
                use: [ "html-loader" ],
            }, {
                test: require.resolve("blueimp-file-upload"),
                loader: "imports-loader?define=>false"
              },
              {
                test: require.resolve("medium-editor-insert-plugin"),
                loader: "imports-loader?define=>false"
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
