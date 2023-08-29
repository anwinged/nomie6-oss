import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';
import loadVersion from 'vite-plugin-package-version';
import manifest from './manifest';
import path from 'path';
import svelteSVG from 'vite-plugin-svelte-svg';
import rollupPluginsSvelte from 'rollup-plugin-svelte-svg';

export default defineConfig({
  optimizeDeps: {
    allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils'],
    exclude: ['canvas-confetti', 'tributejs', 'svelte-navigator'],
  },
  build: {
    rollupOptions: {
      plugins: [rollupPluginsSvelte],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve('/src'),
    },
  },
  plugins: [
    svelte(),
    loadVersion.default(),
    svelteSVG({
      svgoConfig: {}, // See https://github.com/svg/svgo#configuration
    }),
    VitePWA({
      manifest: manifest,
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      },
    }),
  ],
});
