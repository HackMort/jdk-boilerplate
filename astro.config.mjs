import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://my-site.com', // Modify as you need
  build: {
    format: 'directory',
    assets: 'assets/js'
  },
  vite: {
    css: {
      devSourcemap: true
    },
    build: {
      minify: false,
      rollupOptions: {
        format: 'esm',
        output: {
          assetFileNames: 'assets/css/style[extname]'
        }
      }
    }
  }
})
