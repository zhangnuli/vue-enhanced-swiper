// tests/setup.ts - 测试设置文件

import { vi } from 'vitest'

// Mock DOM APIs
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    overflowY: 'auto',
    overflow: 'auto'
  })
})

Object.defineProperty(document, 'elementsFromPoint', {
  value: vi.fn(() => [])
})

Object.defineProperty(window, 'ResizeObserver', {
  value: vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn()
  }))
})

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now())
  }
})

// 全局测试配置
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn()
}