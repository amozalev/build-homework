import esbuild from "esbuild";
import {esbuildPluginYaml} from "./plugins/esbuild-plugin-yaml.js";

const options = {
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "esm",
  outdir: "dist/esbuild",
  plugins: [esbuildPluginYaml]
};

esbuild.build(options).catch(() => process.exit(1));
