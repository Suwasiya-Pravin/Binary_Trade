const path = require("path");

module.exports = {
  // Add your Webpack configuration options here
  module: {
    rules: [
        {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
            exclude: /node_modules\/react-razorpay/
          },
    ],
  },
};
