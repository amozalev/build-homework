export default function yamlLoader(source) {
  const data = {};

  let curKey = '';
  const items = source.split("\n");
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

function isNumber(val) {
  return !isNaN(val) && !isNaN(parseFloat(val));
}