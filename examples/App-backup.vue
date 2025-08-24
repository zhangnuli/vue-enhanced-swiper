<template>
  <SimpleVueSwiper
    v-model:active-index="currentSlide"
    :direction="'vertical'"
    :scroll-conflict="{
      enabled: true,
      tolerance: 10,
      debug: true
    }"
    class="demo-swiper"
    @slide-change="onSlideChange"
    @scroll-conflict="onScrollConflict"
  >
    <!-- 第一页：新闻页面 -->
    <SwiperSlide>
      <div class="slide-content news-page">
        <!-- 状态栏 -->
        <div class="status-bar">
          <span class="time">{{ currentTime }}</span>
          <div class="status-icons">
            <span class="signal">📶</span>
            <span class="wifi">📶</span>
            <span class="battery">🔋</span>
          </div>
        </div>
        
        <!-- 头部 -->
        <header class="page-header">
          <h1>📰 今日新闻</h1>
          <div class="page-indicator">{{ currentSlide + 1 }}/{{ slides.length }}</div>
        </header>
        
        <!-- 可滚动内容区域 -->
        <main class="scrollable-content">
          <article class="news-article">
            <div class="article-header">
              <img src="https://via.placeholder.com/100x100/4CAF50/white?text=NEWS" alt="新闻图片" class="article-image">
              <div class="article-meta">
                <h2>Vue Enhanced Swiper 发布</h2>
                <p class="article-time">2小时前 · 科技新闻</p>
              </div>
            </div>
            
            <div class="article-content">
              <p>Vue Enhanced Swiper 是一个革命性的移动端轮播组件，专门解决嵌套滚动冲突问题。</p>
              
              <p>传统的轮播组件在处理内部可滚动内容时经常出现手势冲突，用户体验不佳。这个新组件通过智能手势识别算法，能够准确判断用户的滑动意图。</p>
              
              <h3>🎯 核心特性</h3>
              <ul>
                <li>智能手势识别 - 分析滑动方向、速度和距离</li>
                <li>边界检测 - 实时检测滚动容器状态</li>
                <li>优先级决策 - 多因素算法智能决策</li>
                <li>性能优化 - 缓存和节流确保流畅体验</li>
              </ul>
              
              <h3>📱 使用体验</h3>
              <p>用户可以自然地在内容中滚动，不会意外触发页面切换。当需要翻页时，滑动到边界后继续滑动即可。</p>
              
              <p>高速滑动手势会被识别为翻页意图，直接切换页面。这种设计更符合用户的直觉操作习惯。</p>
              
              <h3>🔧 技术实现</h3>
              <p>组件基于 Vue 3 Composition API 开发，完整支持 TypeScript。使用了先进的手势分析算法和边界检测机制。</p>
              
              <p>内置性能优化策略，包括智能缓存、事件节流等，确保在各种设备上都能提供流畅的用户体验。</p>
              
              <div class="article-actions">
                <button class="action-btn like-btn">👍 点赞 {{ likes }}</button>
                <button class="action-btn share-btn" @click="shareArticle">📤 分享</button>
                <button class="action-btn comment-btn">💬 评论 {{ comments }}</button>
              </div>
            </div>
          </article>
          
          <div class="news-footer">
            <p>📍 试试滚动到底部，然后继续向上滑动切换到下一页</p>
          </div>
        </main>
      </div>
    </SwiperSlide>

    <!-- 第二页：产品展示 -->
    <SwiperSlide>
      <div class="slide-content product-page">
        <div class="status-bar">
          <span class="time">{{ currentTime }}</span>
          <div class="status-icons">
            <span class="signal">📶</span>
            <span class="wifi">📶</span>
            <span class="battery">🔋</span>
          </div>
        </div>
        
        <header class="page-header">
          <h1>🛍️ 产品详情</h1>
          <div class="page-indicator">{{ currentSlide + 1 }}/{{ slides.length }}</div>
        </header>
        
        <main class="scrollable-content">
          <div class="product-showcase">
            <div class="product-image">
              <img src="https://via.placeholder.com/300x200/2196F3/white?text=VUE+SWIPER" alt="产品图片">
            </div>
            
            <div class="product-info">
              <h2>Vue Enhanced Swiper</h2>
              <div class="product-rating">
                <span class="stars">⭐⭐⭐⭐⭐</span>
                <span class="rating-text">4.9分 (1.2k评价)</span>
              </div>
              <div class="product-price">
                <span class="price">免费开源</span>
                <span class="old-price">原价 ¥999</span>
              </div>
            </div>
            
            <div class="product-description">
              <h3>📋 产品介绍</h3>
              <p>Vue Enhanced Swiper 是专为移动端设计的增强版轮播组件，完美解决嵌套滚动冲突问题。</p>
              
              <h3>✨ 核心优势</h3>
              <div class="feature-list">
                <div class="feature-item">
                  <span class="feature-icon">🎯</span>
                  <div class="feature-text">
                    <strong>智能冲突解决</strong>
                    <p>自动识别内部滚动与轮播切换的手势冲突</p>
                  </div>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">🔧</span>
                  <div class="feature-text">
                    <strong>高度可配置</strong>
                    <p>灵活的配置选项满足各种使用场景</p>
                  </div>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">⚡</span>
                  <div class="feature-text">
                    <strong>性能优化</strong>
                    <p>内置缓存、节流等性能优化策略</p>
                  </div>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">📱</span>
                  <div class="feature-text">
                    <strong>移动端优先</strong>
                    <p>专为移动端触摸交互设计优化</p>
                  </div>
                </div>
              </div>
              
              <h3>🎮 使用场景</h3>
              <ul class="usage-scenarios">
                <li>📰 新闻应用 - 文章翻页与内容滚动</li>
                <li>🛒 电商应用 - 商品详情页面浏览</li>
                <li>📱 社交应用 - 动态流自然交互</li>
                <li>📖 阅读应用 - 章节切换与内容滚动</li>
              </ul>
              
              <div class="product-actions">
                <button class="primary-btn" @click="downloadProduct">⬇️ 立即下载</button>
                <button class="secondary-btn" @click="viewDocs">📚 查看文档</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SwiperSlide>

    <!-- 第三页：设置页面 -->
    <SwiperSlide>
      <div class="slide-content settings-page">
        <div class="status-bar">
          <span class="time">{{ currentTime }}</span>
          <div class="status-icons">
            <span class="signal">📶</span>
            <span class="wifi">📶</span>
            <span class="battery">🔋</span>
          </div>
        </div>
        
        <header class="page-header">
          <h1>⚙️ 设置中心</h1>
          <div class="page-indicator">{{ currentSlide + 1 }}/{{ slides.length }}</div>
        </header>
        
        <main class="scrollable-content">
          <div class="settings-content">
            <div class="setting-section">
              <h3>🎯 手势设置</h3>
              <div class="setting-item">
                <label>角度阈值</label>
                <div class="setting-control">
                  <input type="range" min="10" max="60" v-model="gestureSettings.angleThreshold">
                  <span>{{ gestureSettings.angleThreshold }}°</span>
                </div>
              </div>
              
              <div class="setting-item">
                <label>速度阈值</label>
                <div class="setting-control">
                  <input type="range" min="0.1" max="2" step="0.1" v-model="gestureSettings.velocityThreshold">
                  <span>{{ gestureSettings.velocityThreshold }}</span>
                </div>
              </div>
              
              <div class="setting-item">
                <label>启用调试模式</label>
                <div class="setting-control">
                  <label class="switch">
                    <input type="checkbox" v-model="debugSettings.enabled">
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="setting-section">
              <h3>📊 性能监控</h3>
              <div class="performance-stats">
                <div class="stat-item">
                  <span class="stat-label">平均处理时间</span>
                  <span class="stat-value">{{ avgProcessTime }}ms</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">缓存命中率</span>
                  <span class="stat-value">{{ cacheHitRate }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">当前页面</span>
                  <span class="stat-value">{{ currentSlide + 1 }}/{{ slides.length }}</span>
                </div>
              </div>
            </div>
            
            <div class="setting-section">
              <h3>📱 使用说明</h3>
              <div class="instructions">
                <div class="instruction-item">
                  <span class="instruction-icon">👆</span>
                  <p><strong>内容滚动:</strong> 在文字区域上下滑动可以滚动内容</p>
                </div>
                
                <div class="instruction-item">
                  <span class="instruction-icon">📄</span>
                  <p><strong>页面切换:</strong> 内容滚动到顶部或底部后继续滑动可切换页面</p>
                </div>
                
                <div class="instruction-item">
                  <span class="instruction-icon">⚡</span>
                  <p><strong>快速切换:</strong> 快速滑动会被识别为切换页面的意图</p>
                </div>
                
                <div class="instruction-item">
                  <span class="instruction-icon">🔍</span>
                  <p><strong>调试信息:</strong> 右上角显示实时的手势分析数据</p>
                </div>
              </div>
            </div>
            
            <div class="setting-section">
              <h3>ℹ️ 关于</h3>
              <div class="about-info">
                <p><strong>版本:</strong> v1.0.0</p>
                <p><strong>作者:</strong> Vue Enhanced Swiper Team</p>
                <p><strong>开源许可:</strong> MIT License</p>
                <p><strong>GitHub:</strong> <a href="#" @click.prevent="openGitHub">vue-enhanced-swiper</a></p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SwiperSlide>
  </SimpleVueSwiper>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SimpleVueSwiper from '../src/components/SimpleVueSwiper.vue'
import SwiperSlide from '../src/components/SwiperSlide.vue'

const currentSlide = ref(0)
const currentTime = ref('')
const likes = ref(128)
const comments = ref(42)

// 设置数据
const gestureSettings = ref({
  angleThreshold: 30,
  velocityThreshold: 0.8
})

const debugSettings = ref({
  enabled: true
})

// 性能数据
const avgProcessTime = ref(1.2)
const cacheHitRate = ref(85)

const slides = [
  { title: '新闻页面' },
  { title: '产品页面' },
  { title: '设置页面' }
]

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toTimeString().substring(0, 5)
}

let timeInterval: number

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// 事件处理
function onSlideChange(swiper: any) {
  currentSlide.value = swiper.activeIndex
  console.log('页面切换到:', swiper.activeIndex)
}

function onScrollConflict(event: any) {
  console.log('滑动冲突处理:', {
    决策: event.decision.action,
    置信度: event.decision.confidence,
    手势方向: event.gesture.direction,
    手势速度: event.gesture.velocity
  })
}

function shareArticle() {
  alert('分享文章功能')
}

function downloadProduct() {
  alert('开始下载 Vue Enhanced Swiper')
}

function viewDocs() {
  alert('打开文档页面')
}

function openGitHub() {
  alert('打开 GitHub 仓库')
}
</script>

<style scoped>
/* 全局样式 */
.demo-swiper {
  height: 100vh;
  width: 100vw;
}

.slide-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* 状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px 4px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 14px;
  font-weight: 600;
  z-index: 100;
}

.status-icons {
  display: flex;
  gap: 8px;
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.page-header h1 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.page-indicator {
  background: #007AFF;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

/* 可滚动内容区域 */
.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.scrollable-content::-webkit-scrollbar {
  display: none;
}

/* 新闻页面样式 */
.news-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.news-page .scrollable-content {
  background: transparent;
}

.news-article {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.article-header {
  display: flex;
  padding: 20px;
  gap: 15px;
  align-items: flex-start;
}

.article-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.article-meta {
  flex: 1;
}

.article-meta h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.article-time {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.article-content {
  padding: 0 20px 20px;
}

.article-content p {
  line-height: 1.6;
  margin: 0 0 15px 0;
  color: #444;
}

.article-content h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 20px 0 10px 0;
  color: #333;
}

.article-content ul {
  margin: 0 0 15px 0;
  padding-left: 20px;
}

.article-content li {
  line-height: 1.6;
  margin-bottom: 8px;
  color: #444;
}

.article-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.action-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.like-btn {
  background: #FF6B6B;
  color: white;
}

.share-btn {
  background: #4ECDC4;
  color: white;
}

.comment-btn {
  background: #45B7D1;
  color: white;
}

.action-btn:active {
  transform: scale(0.95);
}

.news-footer {
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 20px;
}

/* 产品页面样式 */
.product-page {
  background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%);
}

.product-page .scrollable-content {
  background: transparent;
}

.product-showcase {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.product-image {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
}

.product-image img {
  width: 100%;
  max-width: 280px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.product-info h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.stars {
  font-size: 16px;
}

.rating-text {
  color: #666;
  font-size: 14px;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  font-size: 18px;
  font-weight: 600;
  color: #4CAF50;
}

.old-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.product-description {
  padding: 20px;
}

.product-description h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 15px 0;
}

.product-description p {
  line-height: 1.6;
  margin: 0 0 15px 0;
  color: #444;
}

.feature-list {
  margin: 15px 0;
}

.feature-item {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  align-items: flex-start;
}

.feature-icon {
  font-size: 20px;
  min-width: 20px;
}

.feature-text strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.feature-text p {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.usage-scenarios {
  margin: 15px 0;
  padding-left: 20px;
}

.usage-scenarios li {
  line-height: 1.6;
  margin-bottom: 8px;
  color: #444;
}

.product-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.primary-btn, .secondary-btn {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn {
  background: #4CAF50;
  color: white;
}

.secondary-btn {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.primary-btn:active, .secondary-btn:active {
  transform: scale(0.95);
}

/* 设置页面样式 */
.settings-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.settings-page .scrollable-content {
  background: transparent;
}

.settings-content {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.setting-section {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.setting-section:last-child {
  border-bottom: none;
}

.setting-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 15px 0;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-item label {
  font-size: 14px;
  color: #333;
}

.setting-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.setting-control input[type="range"] {
  width: 100px;
}

.setting-control span {
  font-size: 12px;
  color: #666;
  min-width: 30px;
  text-align: right;
}

/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* 性能统计 */
.performance-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

/* 使用说明 */
.instructions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.instruction-item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.instruction-icon {
  font-size: 20px;
  min-width: 20px;
}

.instruction-item p {
  margin: 0;
  line-height: 1.5;
  font-size: 14px;
  color: #444;
}

/* 关于信息 */
.about-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about-info p {
  margin: 0;
  font-size: 14px;
  color: #444;
}

.about-info a {
  color: #007AFF;
  text-decoration: none;
}

.about-info a:active {
  opacity: 0.7;
}
</style>