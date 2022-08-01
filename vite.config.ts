import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import viteImagemin from 'vite-plugin-imagemin';
// 在服务端获取配置参数

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {},
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/vars.scss";',
      },
    },
  },
  server: {
    port: 9003,
    host: true,
    proxy: {
      '^/api/.*': {
        target: 'http://192.168.2.16', // 内网地址（线上开发打开）
        changeOrigin: true, // 支持跨域
        rewrite: (path) => path.replace(/^\/api/, '/'),
      },
    },
  },
  plugins: [
    vue(),
    Components({
      dts: resolve(__dirname, './typings/vue-components.d.ts'),
      resolvers: [ElementPlusResolver()],
    }),
    ,
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: resolve(__dirname, './typings/auto-import.d.ts'),
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
