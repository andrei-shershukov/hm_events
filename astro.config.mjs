import yaml from '@rollup/plugin-yaml'
// @ts-check
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: process.env.HOST_URL,
  base: process.env.HOST_BASE_PATH,
  env: {
    schema: {
      ASTRO_MOBILE_BREAKPOINT: envField.number({
        context: 'client',
        access: 'public',
        default: 640,
      }),
    },
  },
  vite: {
    plugins: [yaml()],
  },
})
