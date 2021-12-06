import { defineNuxtConfig } from 'nuxt3'
import { resolve } from 'pathe'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    publicRuntimeConfig: {
      API_URL: process.env.API_ENDPOINT || 'http://localhost:8000',
    },
    alias: {
      'lib': resolve(__dirname, './lib'),
    },
    build: {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          }
        }
      },
    }
})

