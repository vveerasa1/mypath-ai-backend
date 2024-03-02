const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node', 
    entry: './server.js', 
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    externals: [nodeExternals()], // Exclude node_modules from the bundle
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
          },
        ],
      },
    // Additional configuration goes here
  };