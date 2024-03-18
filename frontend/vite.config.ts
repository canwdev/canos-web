import {defineConfig} from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    BUILD_TIMESTAMP: Date.now(),
  },
  base: './',
  build: {
    outDir: '../server/dist-frontend',
    minify: 'terser',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@server': fileURLToPath(new URL('../server/src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 12021,
    proxy: {
      '/dev_proxy': {
        target: 'http://localhost:12022',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev_proxy/, ''),
        ws: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/_variables.scss";`,
        // 临时修复：error during build: Error: This file is already being loaded.
        additionalData: fs.readFileSync('./src/styles/_variables.scss', {encoding: 'utf-8'})
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      dts: './src/auto-import.d.ts',
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
        'pinia',
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  optimizeDeps: {
    exclude: ['@viselect/vanilla'],
  },
})
