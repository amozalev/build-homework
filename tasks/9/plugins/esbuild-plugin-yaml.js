import * as fs from "node:fs";

function isNumber(val) {
  return !isNaN(val) && !isNaN(parseFloat(val));
}

export const esbuildPluginYaml = {
  name: "esbuildPluginYaml",
  setup(build) {
    build.onLoad({filter: /\.y(a)?ml$/}, async (args) => {
        let text = await fs.promises.readFile(args.path, 'utf8');

        const data = {};
        let curKey = '';
        const items = text.split("\n");
        for (const item of items) {
          const trimmedItem = item.trim();
          if (trimmedItem.endsWith(":")) {
            curKey = trimmedItem.split(":")[0];
            data[curKey] = [];
          }
          if (trimmedItem.startsWith("-")) {
            const value = trimmedItem.split("- ")[1];
            data[curKey].push(isNumber(value) ? +value : value);
          }
        }

        return {
          contents: JSON.stringify(data),
          loader: 'json',
        }
      }
    )
  }
}