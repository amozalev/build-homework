import { Configuration } from "webpack";
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: Configuration = {
  entry: './src/webpack.tsx',
  output: {
    path: path.resolve(path.dirname('.'), 'dist/webpack'),
    filename: 'main.js',
    publicPath: '/webpack/'
  },
  resolve: {
    extensions: [".tsx", '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "tsconfig.json"
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              transform: {
                react: {
                    runtime: "automatic"
                }
              }
            },
          },
        },
        exclude: /(node_modules)/,
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        templateContent: "<body><div id=\"root\"></div></body>"
      })
  ],
  experiments: {
    css: true
  },
  devtool: 'hidden-source-map'
};

export default config;
