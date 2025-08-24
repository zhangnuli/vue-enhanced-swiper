// tests/unit/useScrollConflict.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref } from 'vue'
import { useScrollConflict } from '@/composables/useScrollConflict'
import type { ScrollConflictConfig } from '@/types'

describe('useScrollConflict', () => {
  let container: HTMLElement
  let config: ScrollConflictConfig
  
  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div')
    document.body.appendChild(container)
    
    // 默认配置
    config = {
      enabled: true,
      mode: 'smart',
      gesture: {
        angleThreshold: 20,
        velocityThreshold: 0.5,
        distanceThreshold: 10,
        debounceTime: 16
      },
      boundary: {
        tolerance: 5,
        checkInterval: 50,
        cacheTimeout: 5000
      },
      priority: {
        strategy: 'auto',
        weights: {
          direction: 0.4,
          boundary: 0.5,
          velocity: 0.3,
          confidence: 0.2
        }
      }
    }
  })
  
  afterEach(() => {
    document.body.removeChild(container)
  })
  
  it('应该正确初始化', () => {
    const swiperContainer = ref(container)
    const result = useScrollConflict(swiperContainer, config)
    
    expect(result).toBeDefined()
    expect(result.gestureInfo).toBeDefined()
    expect(result.currentDecision).toBeDefined()
    expect(result.performanceMetrics).toBeDefined()
    expect(result.handleTouchMove).toBeTypeOf('function')
    expect(result.handleTouchStart).toBeTypeOf('function')
  })
  
  it('应该处理触摸开始事件', () => {
    const swiperContainer = ref(container)
    const { handleTouchStart } = useScrollConflict(swiperContainer, config)
    
    const mockTouchEvent = createMockTouchEvent({ x: 100, y: 100 })
    
    expect(() => handleTouchStart(mockTouchEvent)).not.toThrow()
  })
  
  it('应该处理触摸移动事件', async () => {
    const swiperContainer = ref(container)
    const { handleTouchMove, handleTouchStart } = useScrollConflict(swiperContainer, config)
    
    const startEvent = createMockTouchEvent({ x: 100, y: 100 })
    const moveEvent = createMockTouchEvent({ x: 100, y: 150 })
    
    handleTouchStart(startEvent)
    const result = await handleTouchMove(moveEvent)
    
    expect(typeof result).toBe('boolean')
  })
  
  it('应该在配置禁用时返回true', async () => {
    const disabledConfig = { ...config, enabled: false }
    const swiperContainer = ref(container)
    const { handleTouchMove } = useScrollConflict(swiperContainer, disabledConfig)
    
    const mockTouchEvent = createMockTouchEvent({ x: 100, y: 150 })
    const result = await handleTouchMove(mockTouchEvent)
    
    expect(result).toBe(true)
  })
})

// 测试工具函数
function createMockTouchEvent(point: { x: number; y: number }): TouchEvent {
  const touch = {
    clientX: point.x,
    clientY: point.y,
    identifier: 0,
    target: document.body
  }
  
  return {
    type: 'touchmove',
    touches: [touch],
    timeStamp: Date.now(),
    preventDefault: vi.fn(),
    target: document.body
  } as unknown as TouchEvent
}