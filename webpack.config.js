const webpack = require("webpack");

require('dotenv').config();

const API_URLS = {
  prod: "https://honest.cash/api",
  dev: "https://beta.honest.cash/api",
  local: "http://localhost:8080/api"
};

module.exports = (env, argv) => {
  console.log(`BUILDING MODE: "${argv.env}"`);

  return {
    entry: {
      app: "./src/app/app.ts",
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
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(argv.env),
            __API_URL__: JSON.stringify(API_URLS[argv.env])
        })

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
}};
