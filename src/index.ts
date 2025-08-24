// src/index.ts - 主入口文件

import type { App } from 'vue'
import { VueEnhancedSwiper, SwiperSlide } from './components'
import type { 
  VueEnhancedSwiperProps,
  VueEnhancedSwiperEmits,
  VueEnhancedSwiperInstance,
  ScrollConflictConfig,
  GestureInfo,
  BoundaryInfo,
  Decision
} from './types'

// 导出组件
export {
  VueEnhancedSwiper,
  SwiperSlide
}

// 组合式函数内联在组件中，无需单独导出

// 导出类型
export type {
  VueEnhancedSwiperProps,
  VueEnhancedSwiperEmits,
  VueEnhancedSwiperInstance,
  ScrollConflictConfig,
  GestureInfo,
  BoundaryInfo,
  Decision
}

// 安装插件接口
export interface InstallOptions {
  componentName?: string
  slideComponentName?: string
  globalProperties?: boolean
}

// 安装函数
export function install(app: App, options: InstallOptions = {}) {
  const {
    componentName = 'VueEnhancedSwiper',
    slideComponentName = 'SwiperSlide',
    globalProperties = false
  } = options
  
  // 注册全局组件
  app.component(componentName, VueEnhancedSwiper)
  app.component(slideComponentName, SwiperSlide)
  
  // 添加全局属性（可选）
  if (globalProperties) {
    app.config.globalProperties.$VueEnhancedSwiper = VueEnhancedSwiper
  }
}

// 默认导出
const VueEnhancedSwiperPlugin = {
  install,
  VueEnhancedSwiper,
  SwiperSlide
}

export default VueEnhancedSwiperPlugin

// 自动安装（在浏览器环境中使用script标签引入时）
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}