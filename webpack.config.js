require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      app: "./src/app/app.ts",
      editor: "./src/editor/editor.ts",
      welcome: "./src/welcome/welcome.ts",
      appBundle: glob.sync("./public/libraries/app/**/*.js"),
      editorBundle: glob.sync("./public/libraries/editor/**/*.js"),
      appEditorBundle: glob.sync("./public/libraries/app-editor/**/*.js"),
      appWelcomeBundle: glob.sync("./public/libraries/app-welcome/**/*.js"),
    },
    mode: process.env.MODE || "production",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "[name].[contenthash].js",
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          appBundle: {
            test: /[\\/]public[\\/]libraries[\\/]app[\\/]/,
            name: 'app-bundle',
            chunks: 'all'
          },
          editorBundle: {
            test: /[\\/]public[\\/]libraries[\\/]editor[\\/]/,
            name: 'editor-bundle',
            chunks: 'all'
          },
          appEditorBundle: {
            test: /[\\/]public[\\/]libraries[\\/]app-editor[\\/]/,
            name: 'app-editor-bundle',
            chunks: 'all'
          },
          appWelcomeBundle: {
            test: /[\\/]public[\\/]libraries[\\/]app-welcome[\\/]/,
            name: 'app-welcome-bundle',
            chunks: 'all'
          }
        }
      }
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
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/webpack-templates/editor.html',
        filename: 'editor.html',
        hash: true,
        excludeChunks: ['appBundle', 'appWelcomeBundle']
      }),
      new HtmlWebpackPlugin({
        template: './public/webpack-templates/welcome.html',
        filename: 'welcome.html',
        hash: true,
        excludeChunks: ['appBundle', 'appEditorBundle', 'editorBundle']
      }),
      new HtmlWebpackPlugin({
        template: './public/webpack-templates/app.html',
        filename: 'app.html',
        hash: true,
        excludeChunks: ['editorBundle']
      }),
      new webpack.HashedModuleIdsPlugin(),
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
