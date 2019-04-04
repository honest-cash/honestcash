require('dotenv').config();

module.exports = {
    entry: {
      app: "./src/app/app.ts",
      editor: "./src/editor/editor.ts",
      welcome: "./src/welcome/welcome.ts"
    },
    mode: process.env.MODE || "production",
    output: {
      path: __dirname + "/public/js",
      filename: "[name].js",
    },
    devtool: process.env.MODE === "development" ? "source-map" : "",
    module: {
      rules: [
        {
            test: /\.(js|ts)?$/,
            loader: "ts-loader",
            exclude: [ __dirname + "/node_modules/" ],
            options: {
                transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
            }
        }, {
            test: /\.(css|less)?$/, 
            use: [{
              loader: 'style-loader' // creates style nodes from JS strings
            }, {
              loader: 'css-loader' // translates CSS into CommonJS
            }, {
              loader: 'less-loader' // compiles Less to CSS
            }]
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
        }, {
          test: /\.ts$/,
          enforce: 'pre',
          use: [
            {
                loader: 'tslint-loader',
                options: { /* Loader options go here */ }
            }
          ]
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
        extensions: [ ".tsx", ".ts", ".js" ]
    }
};
