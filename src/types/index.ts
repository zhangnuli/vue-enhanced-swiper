// src/types/index.ts - 完整类型定义文件

import type { Swiper, SwiperOptions } from 'swiper/types'

// === 基础类型 ===
export interface TouchPoint {
  x: number
  y: number
  timestamp: number
}

export type GestureDirection = 'up' | 'down' | 'left' | 'right' | 'diagonal'

export interface GestureInfo {
  direction: GestureDirection
  velocity: number
  displacement: { x: number; y: number }
  angle: number
  distance: number
  confidence: number
  timestamp: number
}

export interface BoundaryInfo {
  canScrollUp: boolean
  canScrollDown: boolean
  canScrollLeft: boolean
  canScrollRight: boolean
  scrollTop: number
  scrollLeft: number
  maxScrollTop: number
  maxScrollLeft: number
  timestamp: number
}

export type ScrollChain = HTMLElement[]

export interface DecisionScores {
  swiper: number
  content: number
}

export interface Decision {
  action: 'swiper' | 'content'
  confidence: number
  reasoning: string
  scores?: DecisionScores
  processingTime?: number
}

export interface DecisionContext {
  gesture: GestureInfo
  scrollChain: ScrollChain
  boundaries: BoundaryInfo[]
}

// === 简化的配置类型 ===

export interface ScrollConflictConfig {
  enabled: boolean
  tolerance?: number
  debug?: boolean
  swipeDistance?: {
    withScroll?: number    // 有滚动元素时的滑动距离阈值，默认50px
    withoutScroll?: number // 无滚动元素时的滑动距离阈值，默认30px
  }
}

export interface SelectorsConfig {
  scrollable: string[]
  ignore: string[]
  priority: string[]
}

export interface PerformanceConfig {
  enabled: boolean
  cacheSize: number
  cacheTTL: number
  enableWebWorker: boolean
  throttleTime: number
}

export interface DebugConfig {
  enabled: boolean
  showGesture: boolean
  showBoundary: boolean
  showPerformance: boolean
}

// === 事件类型 ===
export interface ScrollConflictEvent {
  gesture: GestureInfo
  scrollChain: ScrollChain
  decision: Decision
  originalEvent: TouchEvent
  preventDefault: () => void
  allowSwiper: () => void
  allowScroll: () => void
}

export interface BoundaryEvent {
  element: HTMLElement
  direction: GestureDirection
  canContinue: boolean
  boundaries: BoundaryInfo
}

export interface PerformanceMetrics {
  avgProcessTime: number
  frameDropCount: number
  cacheHitRate: number
  memoryUsage?: number
  gestureAnalysisTime?: number
  boundaryCheckTime?: number
}

// === Vue 组件 Props 类型 ===
export interface VueEnhancedSwiperProps extends Partial<SwiperOptions> {
  // Swiper 基础配置
  direction?: 'horizontal' | 'vertical'
  loop?: boolean
  speed?: number
  autoplay?: boolean | object
  navigation?: boolean | object
  pagination?: boolean | object
  scrollbar?: boolean | object
  
  // 增强功能配置
  scrollConflict?: ScrollConflictConfig
  
  // Vue 特有属性
  modelValue?: number  // v-model 支持
  activeIndex?: number // 同步活动索引
}

// === Vue 组件 Emits 类型 ===
export interface VueEnhancedSwiperEmits {
  // Vue v-model 支持
  'update:modelValue': [value: number]
  'update:activeIndex': [index: number]
  'update:isBeginning': [isBeginning: boolean]
  'update:isEnd': [isEnd: boolean]
  
  // Swiper 原生事件
  slideChange: [swiper: Swiper]
  slideChangeTransitionStart: [swiper: Swiper]
  slideChangeTransitionEnd: [swiper: Swiper]
  touchStart: [swiper: Swiper, event: TouchEvent]
  touchMove: [swiper: Swiper, event: TouchEvent]
  touchEnd: [swiper: Swiper, event: TouchEvent]
  
  // 增强功能事件
  scrollConflict: [event: ScrollConflictEvent]
  boundaryReached: [event: BoundaryEvent]
  gestureAnalyzed: [gesture: GestureInfo]
  decisionMade: [decision: Decision]
  performanceUpdate: [metrics: PerformanceMetrics]
}

// === 组件实例类型 ===
export interface VueEnhancedSwiperInstance {
  // Swiper 实例引用
  $swiper: Swiper | null
  
  // 内部状态
  isReady: boolean
  currentGesture: GestureInfo | null
  currentDecision: Decision | null
  performanceMetrics: PerformanceMetrics
  
  // 公开方法
  slideNext: (speed?: number) => void
  slidePrev: (speed?: number) => void
  slideTo: (index: number, speed?: number) => void
  update: () => void
  destroy: () => void
  
  // 增强功能方法
  enableScrollConflict: () => void
  disableScrollConflict: () => void
  resetGestureAnalyzer: () => void
  getScrollChain: (element: HTMLElement) => ScrollChain
  checkBoundaries: (element: HTMLElement) => BoundaryInfo
}

// === 工具类型 ===
export interface VelocityTracker {
  reset: () => void
  calculate: (touchHistory: TouchPoint[]) => number
}

export interface CacheEntry<T = any> {
  value: T
  timestamp: number
  accessCount: number
}

// === 默认配置类型 ===
export interface DefaultConfig {
  scrollConflict: Required<ScrollConflictConfig>
  selectors: Required<SelectorsConfig>
  performance: Required<PerformanceConfig>
  debug: Required<DebugConfig>
}