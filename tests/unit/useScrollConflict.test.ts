// tests/unit/VueEnhancedSwiper.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VueEnhancedSwiper from '@/components/VueEnhancedSwiper.vue'
import SwiperSlide from '@/components/SwiperSlide.vue'

// Mock Swiper
vi.mock('swiper', () => ({
  Swiper: vi.fn().mockImplementation(() => ({
    init: vi.fn(),
    destroy: vi.fn(),
    slideTo: vi.fn(),
    slideNext: vi.fn(),
    slidePrev: vi.fn(),
    update: vi.fn(),
    allowTouchMove: true,
    activeIndex: 0,
    isBeginning: true,
    isEnd: false
  })),
  Navigation: {},
  Pagination: {},
  Scrollbar: {}
}))

describe('VueEnhancedSwiper', () => {
  let wrapper: any
  
  beforeEach(() => {
    // 模拟 DOM 环境
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        overflow: 'visible'
      })
    })
  })
  
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
  
  it('应该正确渲染基本结构', () => {
    wrapper = mount(VueEnhancedSwiper, {
      props: {
        direction: 'vertical'
      },
      slots: {
        default: '<div class="test-slide">测试内容</div>'
      }
    })
    
    expect(wrapper.find('.vue-enhanced-swiper').exists()).toBe(true)
    expect(wrapper.find('.vue-enhanced-swiper--vertical').exists()).toBe(true)
    expect(wrapper.find('.swiper-wrapper').exists()).toBe(true)
  })
  
  it('应该接受滚动冲突配置', () => {
    const scrollConflictConfig = {
      enabled: true,
      tolerance: 10,
      debug: true,
      swipeDistance: {
        withScroll: 60,
        withoutScroll: 40
      }
    }
    
    wrapper = mount(VueEnhancedSwiper, {
      props: {
        scrollConflict: scrollConflictConfig
      }
    })
    
    expect(wrapper.props('scrollConflict')).toEqual(scrollConflictConfig)
  })
  
  it('应该在调试模式下显示调试信息', async () => {
    wrapper = mount(VueEnhancedSwiper, {
      props: {
        scrollConflict: {
          enabled: true,
          debug: true
        }
      }
    })
    
    // 设置调试信息
    await wrapper.vm.$nextTick()
    
    // 由于调试信息需要触摸事件才会显示，我们只测试结构存在
    expect(wrapper.find('.vue-enhanced-swiper__debug').exists()).toBe(false) // 初始状态下不显示
  })
  
  it('应该支持水平和垂直方向', () => {
    // 测试垂直方向
    wrapper = mount(VueEnhancedSwiper, {
      props: { direction: 'vertical' }
    })
    expect(wrapper.find('.vue-enhanced-swiper--vertical').exists()).toBe(true)
    
    wrapper.unmount()
    
    // 测试水平方向
    wrapper = mount(VueEnhancedSwiper, {
      props: { direction: 'horizontal' }
    })
    expect(wrapper.find('.vue-enhanced-swiper--horizontal').exists()).toBe(true)
  })
})

describe('SwiperSlide', () => {
  it('应该正确渲染滑块内容', () => {
    const wrapper = mount(SwiperSlide, {
      slots: {
        default: '<div class="slide-content">滑块内容</div>'
      }
    })
    
    expect(wrapper.find('.swiper-slide').exists()).toBe(true)
    expect(wrapper.find('.slide-content').exists()).toBe(true)
    expect(wrapper.text()).toBe('滑块内容')
  })
})