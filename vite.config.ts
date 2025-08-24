import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    // TypeScript 声明文件生成
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
      outputDir: 'dist/types',
      staticImport: true,
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueEnhancedSwiper',
      fileName: (format) => `vue-enhanced-swiper.${format}.js`
    },
    
    rollupOptions: {
      // 外部依赖处理
      external: ['vue', 'swiper', 'swiper/modules'],
      output: {
        globals: {
          vue: 'Vue',
          swiper: 'Swiper'
        }
      }
    },
    
    // 代码分割配置
    chunkSizeWarningLimit: 1000,
    
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: {
        keep_classnames: true,
        keep_fnames: true
      }
    },
    
    // Source map
    sourcemap: true,
    
    // CSS 配置
    cssCodeSplit: true,
    
    // 目标浏览器
    target: 'es2015'
  },
  
  // CSS 预处理器配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src')
    }
  }
})