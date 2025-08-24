<template>
  <div 
    ref="swiperContainer"
    class="vue-enhanced-swiper"
    :class="`vue-enhanced-swiper--${direction}`"
  >
    <div 
      ref="swiperWrapper" 
      class="swiper-wrapper"
    >
      <slot />
    </div>
    
    <!-- 调试信息 -->
    <div 
      v-if="scrollConflict.debug && debugInfo" 
      class="vue-enhanced-swiper__debug"
    >
      <div><strong>动作:</strong> {{ debugInfo.action }}</div>
      <div><strong>原因:</strong> {{ debugInfo.reason }}</div>
      <div v-if="debugInfo.boundary">
        <strong>边界:</strong> 
        顶部: {{ debugInfo.boundary.atTop ? '是' : '否' }}
        底部: {{ debugInfo.boundary.atBottom ? '是' : '否' }}
      </div>
      <div><strong>滑动:</strong> {{ debugInfo.deltaY }}px</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Swiper } from 'swiper'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'

// 简化的配置接口
interface ScrollConflictConfig {
  enabled: boolean
  tolerance?: number
  debug?: boolean
  swipeDistance?: {
    withScroll?: number    // 有滚动元素时的滑动距离阈值，默认50px
    withoutScroll?: number // 无滚动元素时的滑动距离阈值，默认30px
  }
}

// 组件 Props
interface Props {
  direction?: 'horizontal' | 'vertical'
  loop?: boolean
  speed?: number
  autoplay?: boolean | { delay: number }
  navigation?: boolean
  pagination?: boolean
  scrollbar?: boolean
  scrollConflict?: ScrollConflictConfig
  modelValue?: number
  activeIndex?: number
}

// 组件 Emits
interface Emits {
  (e: 'update:modelValue', index: number): void
  (e: 'update:activeIndex', index: number): void
  (e: 'slideChange', swiper: Swiper): void
  (e: 'scrollConflict', data: any): void
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  loop: false,
  speed: 300,
  autoplay: false,
  navigation: false,
  pagination: false,
  scrollbar: false,
  scrollConflict: () => ({
    enabled: true,
    tolerance: 5,
    debug: false,
    swipeDistance: {
      withScroll: 50,    // 有滚动元素时需要50px滑动距离
      withoutScroll: 30  // 无滚动元素时需要30px滑动距离
    }
  }),
  modelValue: 0,
  activeIndex: 0
})

const emit = defineEmits<Emits>()

// 模板引用
const swiperContainer = ref<HTMLElement>()
const swiperWrapper = ref<HTMLElement>()

// 组件状态
const swiperInstance = ref<Swiper | null>(null)
const debugInfo = ref<any>(null)

// 滚动冲突处理
let startY = 0
let isHandlingTouch = false

// 查找可滚动的父元素
function findScrollableParent(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element
  
  while (current && current !== document.body) {
    const style = getComputedStyle(current)
    const isScrollable = ['auto', 'scroll'].includes(style.overflowY) ||
                       ['auto', 'scroll'].includes(style.overflow)
    
    if (isScrollable && current.scrollHeight > current.clientHeight) {
      return current
    }
    
    current = current.parentElement
  }
  
  return null
}

// 检查滚动边界
function checkBoundary(element: HTMLElement) {
  const { scrollTop, scrollHeight, clientHeight } = element
  const tolerance = props.scrollConflict.tolerance || 5
  
  const atTop = scrollTop <= tolerance
  const atBottom = scrollTop >= scrollHeight - clientHeight - tolerance
  
  return { atTop, atBottom, canScrollUp: !atTop, canScrollDown: !atBottom }
}

// 处理触摸事件
function handleTouchStart(event: TouchEvent): void {
  const touch = event.touches[0]
  startY = touch.clientY
  isHandlingTouch = true
  
  if (props.scrollConflict.debug) {
    console.log('Touch Start:', startY)
  }
}

function handleTouchMove(event: TouchEvent): boolean {
  if (!props.scrollConflict.enabled || !isHandlingTouch) {
    return true // 允许默认行为
  }
  
  const target = event.target as HTMLElement
  const scrollableElement = findScrollableParent(target)
  
  // 如果没有找到滚动元素，直接允许 swiper 处理
  if (!scrollableElement) {
    if (props.scrollConflict.debug) {
      debugInfo.value = {
        action: 'swiper',
        reason: '无滚动元素',
        timestamp: Date.now()
      }
    }
    return true // 允许 swiper 处理
  }
  
  // 检查滚动方向和边界
  const boundary = checkBoundary(scrollableElement)
  const touch = event.touches[0]
  const deltaY = touch.clientY - startY
  
  let shouldAllowSwiper = false
  
  // 更严格的边界检测：必须明确在边界且有明显滑动距离
  const threshold = props.scrollConflict.swipeDistance?.withScroll || 50
  const minDistance = Math.min(threshold * 0.4, 20) // 最小检测距离，不超过阈值的40%
  
  if (deltaY > minDistance && boundary.atTop) {
    shouldAllowSwiper = true // 向上滑动且已到顶部
  }
  
  if (deltaY < -minDistance && boundary.atBottom) {
    shouldAllowSwiper = true // 向下滑动且已到底部
  }
  
  if (props.scrollConflict.debug) {
    debugInfo.value = {
      action: shouldAllowSwiper ? 'swiper' : 'content',
      reason: shouldAllowSwiper 
        ? (deltaY > 0 ? '已到顶部，向上滑动' : '已到底部，向下滑动')
        : '内容可滚动',
      boundary,
      deltaY: Math.round(deltaY),
      scrollTop: scrollableElement.scrollTop,
      timestamp: Date.now()
    }
    
    emit('scrollConflict', debugInfo.value)
  }
  
  return shouldAllowSwiper
}

function handleTouchEnd(): void {
  isHandlingTouch = false
}

// 初始化 Swiper
async function initSwiper() {
  if (!swiperContainer.value) return

  // 构建 Swiper 配置
  const swiperOptions: SwiperOptions = {
    direction: props.direction,
    loop: props.loop,
    speed: props.speed,
    modules: [Navigation, Pagination, Scrollbar],
    
    // 基础配置
    slidesPerView: 1,
    spaceBetween: 0,
    
    // 导航配置
    navigation: props.navigation ? {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    } : false,
    
    // 分页配置
    pagination: props.pagination ? {
      el: '.swiper-pagination',
      clickable: true,
    } : false,
    
    // 滚动条配置
    scrollbar: props.scrollbar ? {
      el: '.swiper-scrollbar',
      hide: true,
    } : false,
    
    // 自动播放配置
    autoplay: typeof props.autoplay === 'object' ? props.autoplay : 
              props.autoplay ? { delay: 3000 } : false,

    // 事件处理
    on: {
      slideChange: (swiper: Swiper) => {
        emit('update:modelValue', swiper.activeIndex)
        emit('update:activeIndex', swiper.activeIndex)
        emit('slideChange', swiper)
      }
    }
  }

  // 创建 Swiper 实例
  swiperInstance.value = new Swiper(swiperContainer.value, swiperOptions)
  
  // 设置初始索引
  if (props.modelValue > 0) {
    swiperInstance.value.slideTo(props.modelValue, 0)
  }
  
  // 如果启用滚动冲突处理，设置触摸事件
  if (props.scrollConflict.enabled) {
    setupTouchHandling()
  }
}

// 最终解决方案 - 完全禁用swiper触摸，手动控制
function setupTouchHandling() {
  if (!swiperContainer.value || !swiperInstance.value) return
  
  // 完全禁用swiper的触摸功能
  swiperInstance.value.allowTouchMove = false
  
  const container = swiperContainer.value
  let currentScrollableElement: HTMLElement | null = null
  
  container.addEventListener('touchstart', (event: TouchEvent) => {
    const target = event.target as HTMLElement
    currentScrollableElement = findScrollableParent(target)
    handleTouchStart(event)
    
    if (props.scrollConflict.debug) {
      debugInfo.value = {
        action: currentScrollableElement ? 'detection' : 'swiper',
        reason: currentScrollableElement ? '检测到滚动元素' : '无滚动元素',
        boundary: currentScrollableElement ? checkBoundary(currentScrollableElement) : undefined,
        timestamp: Date.now()
      }
      emit('scrollConflict', debugInfo.value)
    }
  }, { passive: true })
  
  container.addEventListener('touchmove', (event: TouchEvent) => {
    if (!currentScrollableElement) {
      return // 无滚动元素，允许默认行为
    }
    
    const shouldAllowSwiper = handleTouchMove(event)
    
    // 更新调试信息
    if (props.scrollConflict.debug) {
      const boundary = checkBoundary(currentScrollableElement)
      debugInfo.value = {
        action: shouldAllowSwiper ? 'swiper' : 'content',
        reason: shouldAllowSwiper 
          ? '到达边界，准备切换页面' 
          : '内容可滚动',
        boundary,
        deltaY: Math.round((event.touches[0].clientY - startY)),
        timestamp: Date.now()
      }
      emit('scrollConflict', debugInfo.value)
    }
  }, { passive: true })
  
  container.addEventListener('touchend', (event: TouchEvent) => {
    if (!isHandlingTouch) {
      return
    }
    
    // 如果没有滚动元素，直接手动触发swiper切换
    if (!currentScrollableElement) {
      const deltaY = event.changedTouches[0].clientY - startY
      const threshold = props.scrollConflict.swipeDistance?.withoutScroll || 30
      if (Math.abs(deltaY) > threshold) { // 使用配置的滑动距离
        if (deltaY > 0) {
          swiperInstance.value?.slidePrev()
        } else {
          swiperInstance.value?.slideNext()
        }
        
        if (props.scrollConflict.debug) {
          debugInfo.value = {
            action: 'swiper-triggered',
            reason: `无滚动元素，直接切换: ${deltaY > 0 ? '上一页' : '下一页'}`,
            deltaY: Math.round(deltaY),
            timestamp: Date.now()
          }
          emit('scrollConflict', debugInfo.value)
        }
      }
      
      handleTouchEnd(event)
      return
    }
    
    // 检查是否应该触发swiper切换
    const boundary = checkBoundary(currentScrollableElement)
    const deltaY = event.changedTouches[0].clientY - startY
    
    let shouldTriggerSwiper = false
    
    // 更严格的条件：必须到边界且有足够的滑动距离
    const threshold = props.scrollConflict.swipeDistance?.withScroll || 50
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0 && boundary.atTop) {
        shouldTriggerSwiper = true
        swiperInstance.value?.slidePrev() // 向上滑动，上一页
      } else if (deltaY < 0 && boundary.atBottom) {
        shouldTriggerSwiper = true
        swiperInstance.value?.slideNext() // 向下滑动，下一页
      }
    }
    
    if (props.scrollConflict.debug) {
      debugInfo.value = {
        action: shouldTriggerSwiper ? 'swiper-triggered' : 'content-end',
        reason: shouldTriggerSwiper 
          ? `手动触发页面切换: ${deltaY > 0 ? '上一页' : '下一页'}` 
          : '内容滚动结束',
        boundary,
        deltaY: Math.round(deltaY),
        timestamp: Date.now()
      }
      emit('scrollConflict', debugInfo.value)
    }
    
    handleTouchEnd(event)
    currentScrollableElement = null
  }, { passive: true })
}

// 销毁 Swiper
function destroySwiper() {
  if (swiperInstance.value) {
    swiperInstance.value.destroy(true, true)
    swiperInstance.value = null
  }
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newIndex) => {
  if (swiperInstance.value && newIndex !== swiperInstance.value.activeIndex) {
    swiperInstance.value.slideTo(newIndex)
  }
})

// 监听 activeIndex 变化
watch(() => props.activeIndex, (newIndex) => {
  if (swiperInstance.value && newIndex !== swiperInstance.value.activeIndex) {
    swiperInstance.value.slideTo(newIndex)
  }
})

// 生命周期
onMounted(() => {
  initSwiper()
})

onBeforeUnmount(() => {
  destroySwiper()
})

// 暴露方法给父组件
defineExpose({
  swiper: swiperInstance,
  slideTo: (index: number, speed?: number) => {
    swiperInstance.value?.slideTo(index, speed)
  },
  slideNext: () => {
    swiperInstance.value?.slideNext()
  },
  slidePrev: () => {
    swiperInstance.value?.slidePrev()
  }
})
</script>

<style scoped>
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
@import 'swiper/css/scrollbar';

.vue-enhanced-swiper {
  width: 100%;
  height: 100%;
  position: relative;
}

.vue-enhanced-swiper__debug {
  position: fixed;
  top: 50px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 1000;
  font-family: monospace;
  min-width: 200px;
}

.vue-enhanced-swiper__debug > div {
  margin: 2px 0;
}
</style>