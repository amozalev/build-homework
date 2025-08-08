import * as fs from "node:fs";
import * as path from "node:path";
import css from "rollup-plugin-import-css";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import swc from '@rollup/plugin-swc';

const template = fs.readFileSync("./template.html", "utf-8");

export default {
    input: 'src/index.tsx',
    output: {
        // dir: './dist/rollup/',
        file: './dist/rollup/main.js',
        format: 'iife',
        assetFileNames: '[name][extname]',
    },
    // jsx: {
    //     mode: 'automatic'
    // },
    plugins: [
        // swc({
        //     jsc: {
        //         transform: {
        //             react: {
        //                 runtime: "automatic"
        //             }
        //         },
        //         parser: {
        //             jsx: true
        //         }
        //     },
        //     exclude: '**/*.css',
        // }),
        replace({'process.env.NODE_ENV': JSON.stringify('development')}),
        typescript(
        //     {
        //     tsconfig: "./tsconfig.json",
        // }
        ),
        nodeResolve(),
        commonjs(),
        css(),
        html({
            publicPath: '/rollup/',
            template: ({ attributes, bundle, files, publicPath, title }) => {
                const js = files.js.map(({fileName}) => `<script type="module" src="${publicPath}/${fileName}"></script>`);

                return `
                    <html>
                      <head>
                        ${title}
                        ${js.join("\n")}
                      </head>
                      <body>
                        <div id="root"></div>
                      </body>
                    </html>
                `
            }
        }),
    ],
    // external: ['react', 'react-dom'],
    // onwarn: function (warning) {
    //     console.warn(`== ${warning.message}`)
    // }
};
