import esbuild from "esbuild";
import {htmlPlugin} from "@craftamap/esbuild-plugin-html";
import inlineImage from 'esbuild-plugin-inline-image';

const options = {
  entryPoints: ["./src/index.js"],
  bundle: true,
  metafile: true,
  outdir: "dist/esbuild",
  assetNames: 'assets/[name]',
  publicPath: 'http://localhost:3000/esbuild/',
  loader: {
    ".svg": "copy",
    ".ejs": "text",
    ".png": "file",
    ".json": "text"
  },
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: ["src/index.js"],
          filename: "index.html",
          htmlTemplate: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.jsdelivr.net/npm/ejs@3.1.10/ejs.min.js"></script>
            </head>
            <body>
                <div id="root">
                </div>
            </body>
            </html>
          `,
        },
      ],
    }),
    inlineImage({
      // extensions: ["svg"]
      limit: ({path}) => {
        const img = path.split("/").at(-1);
        return img === "logo.svg" || img === "ad.inline.svg";
      }
    })
  ],
};

esbuild.build(options).catch(() => process.exit(1));
