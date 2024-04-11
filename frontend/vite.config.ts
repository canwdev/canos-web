import {defineConfig, loadEnv} from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import {fileURLToPath, URL} from 'node:url'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// 不扫描这些文件夹
const filesNeedToExclude = ['src-tauri']
const filesPathToExclude = filesNeedToExclude.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url))
})

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())
  console.log('vite config mode', mode)
  return {
    define: {
      BUILD_TIMESTAMP: Date.now(),
    },
    base: env.VITE_PROXY_BASE || './',
    build: {
      outDir: '../server/dist-frontend',
      minify: 'terser',
      emptyOutDir: true,
      rollupOptions: {
        external: [...filesPathToExclude],
      },
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
          additionalData:
            mode === 'development'
              ? `@import "@/styles/_variables.scss";`
              : fs.readFileSync('./src/styles/_variables.scss', {encoding: 'utf-8'}),
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      // VueDevTools(),
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
        dirs: [],
        resolvers: [NaiveUiResolver()],
      }),
    ],
    optimizeDeps: {
      exclude: ['@viselect/vanilla'],
    },
  }
})
