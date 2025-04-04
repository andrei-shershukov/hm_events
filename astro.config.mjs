// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: process.env.HOST_URL,
  base: process.env.HOST_BASE_PATH,
});
