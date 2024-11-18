import {defineConfig, loadEnv} from 'vite'
import {fileURLToPath, URL} from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

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
        '@server': fileURLToPath(new URL('../backend/src', import.meta.url)),
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
          additionalData: `@import "@/styles/_variables.scss";`,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      // VueDevTools(),
      AutoImport({
        dts: './src/auto-import.d.ts',
        imports: ['vue', 'pinia'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dirs: [],
        resolvers: [ElementPlusResolver()],
      }),
    ],
    optimizeDeps: {
      exclude: ['@viselect/vanilla'],
      include: [
        `monaco-editor/esm/vs/language/json/json.worker`,
        `monaco-editor/esm/vs/language/css/css.worker`,
        `monaco-editor/esm/vs/language/html/html.worker`,
        `monaco-editor/esm/vs/language/typescript/ts.worker`,
        `monaco-editor/esm/vs/editor/editor.worker`,
      ],
    },
  }
})
