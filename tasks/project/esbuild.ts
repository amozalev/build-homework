import fs from "node:fs";
import esbuild from 'esbuild';
import {htmlPlugin} from '@craftamap/esbuild-plugin-html';

const options = {
    entryPoints: ["./src/index.tsx"],
    bundle: true,
    metafile: true,
    outdir: './dist/esbuild',
    tsconfig: "tsconfig.json",
    publicPath: '/esbuild/',
    jsx: "automatic",
    loader: {
        ".ts": "ts",
        ".tsx": "tsx",
        ".css": "css",
        ".html": "copy"
    },
    plugins: [
        htmlPlugin({
            files: [
                {
                    entryPoints: ["src/index.tsx"],
                    scriptLoading: 'defer',
                    title: 'App by Esbuild',
                    filename: 'index.html',
                    htmlTemplate: `
                    <!DOCTYPE html>
                    <html lang="en">
                      <head>
                        <meta charset="utf-8" />
                      </head>
                      <body>
                      <div id="root"></div>
                      </body>
                    </html>
                `
                }
            ]
        })
    ],
    sourcemap: 'external',
};

(async function () {
    await esbuild.build(options).catch(e => console.log('==', e));
})();
