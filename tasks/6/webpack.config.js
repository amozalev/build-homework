import * as path from "node:path";


const config = {
    entry: {
        entry: "./src/entry.js",
        performance: "./src/performance.js"
    },
    output: {
        path: path.resolve(path.dirname("."), "dist/webpack"),
        filename: "[name].js",
        publicPath: "/webpack/"
    }
};

export default config;