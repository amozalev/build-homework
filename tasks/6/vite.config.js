import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {defineConfig} from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: "/vite/",
    build: {
        outDir: "./dist/vite",
        rollupOptions: {
            input: [resolve(__dirname, 'index.html'), "./src/entry.js", "./src/performance.js"],
            output: {
                entryFileNames: "[name].js"
            }
        },
        assetsDir: ".",
    }
})