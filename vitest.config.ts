import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  test: {
    // 测试环境
    environment: 'jsdom',
    
    // 全局设置
    globals: true,
    
    // 测试文件匹配模式
    include: [
      'src/**/__tests__/**/*.{test,spec}.{js,ts,tsx}',
      'src/**/*.{test,spec}.{js,ts,tsx}',
      'tests/unit/**/*.{test,spec}.{js,ts,tsx}'
    ],
    
    // 排除文件
    exclude: [
      'node_modules',
      'dist',
      'docs',
      'examples'
    ],
    
    // 覆盖率配置
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'tests/',
        'docs/',
        'examples/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/index.ts' // 仅导出文件
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    
    // 设置文件
    setupFiles: [
      './tests/setup.ts'
    ],
    
    // 测试超时
    testTimeout: 10000,
    
    // 并发设置
    threads: true,
    maxThreads: 4
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src')
    }
  }
})