const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const HTMLPlagin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
    new HTMLPlagin({
      inject: true,
      template: path.resolve("./index.html"),
    }),
  ],
};
