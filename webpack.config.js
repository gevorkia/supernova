module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
};

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "./bundle.js",
//   },
//   devtool: "source-map",
// };