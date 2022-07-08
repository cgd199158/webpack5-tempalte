import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
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
  plugins: [
    vue(),
    Components({
      dts: resolve(__dirname, './src/types/vue-components.d.ts'),
      resolvers: [ElementPlusResolver()],
    }),
    ,
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: resolve(__dirname, './src/types/auto-import.d.ts'),
    }),
  ],
});
