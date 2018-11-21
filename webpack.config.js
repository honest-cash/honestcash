module.exports = {
    entry: './src/hashtagApp.js',
    output: { 
        path: __dirname + "/public/js",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            }, {
                test: /\.css$/, 
                use: [ 'style-loader', 'css-loader' ]
            }, {
                test: /\.html$/,
                use: [ "html-loader" ],
                exclude: /node_modules/
            },
        ]
     }
};
