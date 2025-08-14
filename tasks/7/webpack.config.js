import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve(import.meta.dirname, "dist/webpack"),
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.jsdelivr.net/npm/ejs@3.1.10/ejs.min.js"></script>
            </head>
            <body>
                <div id="root"></div>
            </body>
            </html>
          `,
    }),
  ],
  module: {
    rules: [
      {
        test: path.resolve(".", "./src/assets/logo.svg"),
        type: "asset/inline"
      },
      {
        test: /assets\/avatar.svg$/,
        type: "asset/resource"
      },
      {
        test: /template.ejs$/,
        type: "asset/source"
      },
      {
        test: /illustration.png$/,
        type: "asset/resource"
      },
      {
        test: /ad.inline.svg$/,
        type: "asset/inline"
      },
      {
        test: /data.json$/,
        type: "asset/source"
      }
    ],
  },
};

export default config;
