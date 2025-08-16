export default function jsonLoader(jsonStr) {
  return `module.exports = ${jsonStr}`;
}