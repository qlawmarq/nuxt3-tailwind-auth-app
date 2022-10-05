import { defineNuxtConfig } from "nuxt";
import { resolve } from "pathe";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  telemetry: false,
  alias: {
    lib: resolve(__dirname, "./lib"),
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});
