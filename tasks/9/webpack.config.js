import path from "node:path";

const config = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    library: {
      type: 'module'
    },
    path: path.resolve(import.meta.dirname, "dist/webpack"),
  },
  module: {
    rules: [
      {
        test: /\.y(a)?ml$/,
        use: path.resolve(import.meta.dirname, "plugins/yaml-loader.js"),
      }
    ]
  },
  experiments: {
    outputModule: true
  }
};

export default config;
