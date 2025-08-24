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
      entry: {
        // 多入口构建
        index: resolve(__dirname, 'src/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts'),
        composables: resolve(__dirname, 'src/composables/index.ts')
      },
      formats: ['es', 'cjs', 'umd'],
      name: 'VueEnhancedSwiper',
      fileName: (format, entryName) => {
        const formatMap = {
          es: 'mjs',
          cjs: 'cjs',
          umd: 'umd.js'
        }
        return `${entryName}.${formatMap[format as keyof typeof formatMap]}`
      }
    },
    
    rollupOptions: {
      // 外部依赖处理
      external: [
        'vue',
        'swiper',
        'swiper/vue',
        'swiper/modules'
      ],
      
      output: [
        // ES Module 格式
        {
          format: 'es',
          dir: 'dist/esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          globals: {
            vue: 'Vue',
            swiper: 'Swiper',
            'swiper/vue': 'SwiperVue'
          }
        },
        
        // CommonJS 格式
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          globals: {
            vue: 'Vue',
            swiper: 'Swiper',
            'swiper/vue': 'SwiperVue'
          }
        },
        
        // UMD 格式
        {
          format: 'umd',
          name: 'VueEnhancedSwiper',
          dir: 'dist/umd',
          entryFileNames: '[name].umd.js',
          globals: {
            vue: 'Vue',
            swiper: 'Swiper',
            'swiper/vue': 'SwiperVue'
          }
        }
      ]
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