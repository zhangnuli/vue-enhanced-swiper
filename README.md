# Vue Enhanced Swiper

🚀 增强版 Vue 3 移动端轮播组件，解决嵌套滚动冲突问题

[![npm version](https://badge.fury.io/js/vue-enhanced-swiper.svg)](https://www.npmjs.com/package/vue-enhanced-swiper)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🎯 **智能冲突解决** - 自动识别内部滚动与轮播切换的手势冲突
- 🔧 **高度可配置** - 灵活的配置选项满足各种使用场景  
- 🚀 **性能优化** - 内置缓存、节流、Web Worker 等性能优化
- 📱 **移动端优先** - 专为移动端触摸交互设计
- 🎨 **TypeScript 支持** - 完整的类型定义和智能提示
- 🌟 **Vue 3 原生** - 基于 Composition API，完美集成 Vue 3 生态

## 📦 安装

```bash
npm install vue-enhanced-swiper swiper
# 或
yarn add vue-enhanced-swiper swiper  
# 或
pnpm add vue-enhanced-swiper swiper
```

## 🚀 快速开始

### 基础用法

```vue
<template>
  <VueEnhancedSwiper
    :direction="'vertical'"
    :scroll-conflict="{
      enabled: true,
      tolerance: 5,
      debug: false
    }"
    @slide-change="onSlideChange"
  >
    <SwiperSlide v-for="(item, index) in slides" :key="index">
      <div class="slide-content">
        <h2>{{ item.title }}</h2>
        <div class="scrollable-content">
          <p v-for="paragraph in item.content" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </SwiperSlide>
  </VueEnhancedSwiper>
</template>

<script setup lang="ts">
import { VueEnhancedSwiper, SwiperSlide } from 'vue-enhanced-swiper'
import 'vue-enhanced-swiper/style.css'

const slides = [
  {
    title: '第一页',
    content: ['这是一个可以滚动的内容区域...', '更多内容...']
  },
  // 更多幻灯片...
]

function onSlideChange(swiper) {
  console.log('当前页:', swiper.activeIndex)
}
</script>
```

## 🔧 配置选项

### ScrollConflict 配置

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `enabled` | `boolean` | `true` | 是否启用冲突解决 |
| `tolerance` | `number` | `5` | 边界检测容忍度(px) |
| `debug` | `boolean` | `false` | 启用调试模式 |
| `swipeDistance.withScroll` | `number` | `50` | 有滚动元素时的滑动距离阈值(px) |
| `swipeDistance.withoutScroll` | `number` | `30` | 无滚动元素时的滑动距离阈值(px) |

### 高级配置示例

```vue
<VueEnhancedSwiper
  :direction="'vertical'"
  :scroll-conflict="{
    enabled: true,
    tolerance: 5,
    debug: true,
    swipeDistance: {
      withScroll: 80,    // 有滚动内容时需要80px滑动距离
      withoutScroll: 40  // 无滚动内容时需要40px滑动距离
    }
  }"
  @slide-change="onSlideChange"
  @scroll-conflict="onScrollConflict"
>
  <!-- 内容 -->
</VueEnhancedSwiper>
```

## 🎯 使用场景

- ✅ **新闻应用** - 垂直翻页 + 文章内容滚动
- ✅ **产品展示** - 水平轮播 + 详情页面滚动  
- ✅ **社交应用** - 动态翻页 + 评论区滚动
- ✅ **电商应用** - 商品轮播 + 规格描述滚动

## 🤝 贡献

欢迎贡献代码！请阅读 [贡献指南](CONTRIBUTING.md) 了解详细信息。

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/your-username/vue-enhanced-swiper.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm run test

# 构建项目
npm run build
```

## 📄 许可证

[MIT License](LICENSE)

---

如果这个项目对您有帮助，请考虑给它一个 ⭐️ 星标！