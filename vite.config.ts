/*
 * @Author: Yufeng CHEN
 * @Date: 2022-04-24 09:49:19
 * @LastEditors: Yufeng CHEN
 * @LastEditTime: 2023-03-17 11:42:56
 * @FilePath: /test-x6-vue-shape-build-error-mvp-demo/vite.config.ts
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint' // 引入vite-plugin-vue
import compressPlugin from 'vite-plugin-compression'

const lib = defineConfig({
  base: './',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@antv/x6',
        replacement: '@antv/x6/lib',
      },
      {
        find: '@antv/x6-vue-shape',
        replacement: '@antv/x6-vue-shape/lib',
      },
    ],
  },
  build: {
    minify: 'terser',
    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 警报门槛，限制大文件大小
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      // 静态资源分类打包
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        // 静态资源分拆打包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
          return null
        },
      },
    },
  },
  plugins: [
    vue(),
    compressPlugin({
      deleteOriginFile: false,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    eslintPlugin({
      include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'], // eslint要检查的文件
    }),
  ],
  server: {
    port: 8816,
    open: true,
    cors: true,
    hmr: true,
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '',
      },
    },
  },
})

export default ({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  return lib
}
