export default function rollupPluginYaml() {
  return {
    name: "rollup-plugin-yaml",
    transform: (code, id) => {
      if (id.endsWith(".yml") || id.endsWith(".yaml")) {
        const data = {};

        let curKey = '';
        const items = code.split("\n");
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

        return `export default ${JSON.stringify(data)};`;
      }

      return null;
    }
  }
}

function isNumber(val) {
  return !isNaN(val) && !isNaN(parseFloat(val));
}