import esbuild from "esbuild";


const options = {
    entryPoints: ["./src/**/*.js"],
    outdir: "./dist/esbuild",
    bundle: true,
    publicPath: "/esbuild/",
    loader: {
        ".js": "js"
    }
}

esbuild.build(options).catch(() => process.exit(1));