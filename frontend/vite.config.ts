import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import {fileURLToPath, URL} from 'url'
import {VitePWA} from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.png', 'favicon-192.png', 'favicon-512.png'],
    //   manifest: {
    //     name: '',
    //     short_name: '',
    //     description: '',
    //     theme_color: '#83B253',
    //     icons: [
    //       {
    //         src: 'favicon-192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'favicon-512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    // }),
    vue(),
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
})
