/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 扩展 Window 接口
declare global {
  interface Window {
    Vue?: any
    VueEnhancedSwiper?: any
  }
}

export {}