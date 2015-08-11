module.exports = {
  entry: {
    app: ["./App.js"]
  },
  output: {
    path: "./build",
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.elm?$/,
        exclude: /node_modules/,
        loader: 'elm-webpack-loader',
      }
    ]
  }
};
