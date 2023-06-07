import { defineConfig } from 'astro/config'

function changeAstroComponentEntryFilenameToJs (filename) {
  const name = filename.split('.')[0]

  let sanitized = name
  if (/[A-Z]/.test(name)) {
    sanitized = name
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .slice(1)
  }

  sanitized = sanitized.replace(/ /g, '-')

  return `${sanitized}.js`
}

// https://astro.build/config
export default defineConfig({
  site: 'https://my-site.com', // Modify as you need
  compressHTML: false,
  build: {
    format: 'directory',
    assets: 'assets'
  },
  vite: {
    appType: 'mpa',
    css: {
      devSourcemap: true
    },
    build: {
      minify: false,
      cssMinify: false,
      rollupOptions: {
        output: {
          /**
           * Function that generates the file name for assets.
           *
           * To set up a custom name for a styles files, you should add
           * a regular comment as follow:
           *
           * {outputFileName:<file-name>}
           *
           * When <file-name> can be replaced for the name we want the final css file has
           *
           * @param {Object} asset - The object representing the asset.
           * @returns {string} - The generated file name.
           */
          assetFileNames: asset => {
            // Regular expression to search for custom file name
            const regex = /\{outputFileName:(.*?)\}/
            const name = asset.name
            const source = asset.source
            const ext = name.substring(name.lastIndexOf('.'), name.length)
            const hasCustomFilename = source.match(regex) // Check if the asset has a custom file name

            switch (ext) {
              case '.css':
                if (hasCustomFilename && hasCustomFilename.length > 0) {
                  let customFilename = hasCustomFilename[1]
                  customFilename = customFilename.replace(/ /g, '-')
                  return `assets/css/${customFilename}${ext}`
                } else {
                  return `assets/css/${name}`
                }
              case '.js':
                return `assets/js/${name}`
              default:
                return name
            }
          },
          /**
           * Function that generates the file name for entry files.
           *
           * @param {Object} entry - The object representing the entry file.
           * @returns {string} - The generated file name.
           */
          entryFileNames: entry => {
            let name = 'assets/js/[name].[hash].js'
            const moduleIds = entry.moduleIds

            if (moduleIds && moduleIds.length > 0) {
              name = moduleIds[0].split('/').pop().split('?')[0] // Extract the file name from the module ID
              const isAstroFile = name.includes('.astro') // Check if it is an Astro file
              if (isAstroFile) {
                name = changeAstroComponentEntryFilenameToJs(name)
              }
            }

            return `assets/js/${name}`
          }
          // chunkFileNames: 'assets/js/[name].[hash].js'
        }
      }
    }
  }
})
