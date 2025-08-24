<template>
  <div 
    :class="slideClasses"
    :data-swiper-slide-index="virtualIndex"
  >
    <div v-if="zoom" class="swiper-zoom-container">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 标签名
  tag?: string
  // 是否启用缩放
  zoom?: boolean
  // 虚拟索引
  virtualIndex?: number
  // 自定义类名
  class?: string | string[] | Record<string, boolean>
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  zoom: false,
  virtualIndex: undefined,
  class: undefined
})

// 计算样式类
const slideClasses = computed(() => {
  const classes = ['swiper-slide']
  
  if (props.class) {
    if (typeof props.class === 'string') {
      classes.push(props.class)
    } else if (Array.isArray(props.class)) {
      classes.push(...props.class)
    } else {
      Object.entries(props.class).forEach(([key, value]) => {
        if (value) classes.push(key)
      })
    }
  }
  
  return classes
})
</script>

<style lang="scss" scoped>
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
  
  .swiper-zoom-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>