import { defineConfig } from 'vite'
import rollupPluginYaml from './plugins/rollup-plugin-yaml.js';

export default defineConfig({
  build: {
    ssr: true,
    outDir: 'dist/vite',
    minify: false,
    rollupOptions: {
      input: './src/index.js',
      plugins: [rollupPluginYaml()]
    },
  },
})
