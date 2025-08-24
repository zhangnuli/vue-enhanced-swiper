# 贡献指南

感谢您对 Vue Enhanced Swiper 的关注和贡献！🎉

## 📋 贡献类型

我们欢迎以下类型的贡献：

- 🐛 **Bug 修复** - 报告和修复代码缺陷
- ✨ **新功能** - 提出和实现新的功能特性
- 📝 **文档改进** - 完善文档、示例和注释
- 🎨 **代码优化** - 性能优化、代码重构、类型完善
- 🧪 **测试增强** - 添加测试用例、提高覆盖率
- 🌐 **国际化** - 多语言支持和本地化

## 🚀 快速开始

### 开发环境设置

1. **克隆仓库**
   ```bash
   git clone https://github.com/zhangnuli/vue-enhanced-swiper.git
   cd vue-enhanced-swiper
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **运行测试**
   ```bash
   npm run test
   ```

### 项目结构

```
vue-enhanced-swiper/
├── src/
│   ├── components/          # Vue 组件
│   ├── types/              # TypeScript 类型定义
│   ├── styles/             # 样式文件
│   └── utils/              # 工具函数
├── examples/               # 示例应用
├── tests/                  # 测试文件
├── docs/                   # 文档
└── dist/                   # 构建输出
```

## 📝 提交规范

### Commit 消息格式

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<类型>[可选范围]: <描述>

[可选正文]

[可选脚注]
```

**类型说明：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码逻辑）
- `refactor`: 代码重构
- `test`: 测试相关
- `perf`: 性能优化
- `chore`: 构建过程或辅助工具的变动

**示例：**
```bash
feat(swiper): 添加自定义滑动距离配置

- 支持分别设置有滚动和无滚动时的距离阈值
- 添加 swipeDistance 配置选项
- 更新类型定义和文档

Closes #123
```

### Pull Request 指南

1. **Fork 并创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **进行开发**
   - 确保代码符合项目规范
   - 添加必要的测试用例
   - 更新相关文档

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   git push origin feature/your-feature-name
   ```

4. **创建 Pull Request**
   - 清晰描述变更内容
   - 关联相关 Issue
   - 确保所有检查通过

## 🧪 测试要求

- **单元测试覆盖率**: ≥ 80%
- **集成测试覆盖率**: ≥ 70%
- **E2E 测试**: 核心功能必须有端到端测试

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 运行测试 UI
npm run test:ui
```

## 📋 代码规范

### TypeScript 规范

- 使用严格的 TypeScript 配置
- 所有公共 API 必须有完整的类型定义
- 避免使用 `any` 类型
- 使用有意义的接口和类型名称

### Vue 组件规范

- 使用 Composition API
- Props 必须有类型定义和默认值
- 事件必须在 `emits` 中声明
- 使用 `<script setup>` 语法

### 样式规范

- 使用 SCSS 预处理器
- 遵循 BEM 命名规范
- 支持暗色主题
- 确保移动端适配

## 🐛 Bug 报告

报告 Bug 时请包含以下信息：

1. **环境信息**
   - Vue 版本
   - 浏览器类型和版本
   - 设备类型（移动端/桌面端）
   - 操作系统

2. **问题描述**
   - 详细描述问题现象
   - 期望行为 vs 实际行为
   - 复现步骤

3. **代码示例**
   - 提供最小可复现代码
   - 相关配置信息

4. **错误信息**
   - 控制台错误信息
   - 网络请求失败信息

## 💡 功能建议

提出新功能时请考虑：

1. **需求合理性**: 功能是否对大多数用户有价值
2. **技术可行性**: 是否可以在现有架构下实现
3. **性能影响**: 对组件性能的影响
4. **维护成本**: 长期维护的复杂度

## 🎯 发布流程

### 版本策略

我们遵循 [语义化版本](https://semver.org/) 规范：

- **主版本号**: 不兼容的 API 修改
- **次版本号**: 向下兼容的功能性新增
- **修订版本号**: 向下兼容的问题修正

### 发布检查清单

发布前需要确保：

- [ ] 所有测试通过
- [ ] 文档更新完整
- [ ] CHANGELOG.md 更新
- [ ] 版本号符合规范
- [ ] 构建产物正常
- [ ] 示例应用可正常运行

## 🤝 社区行为准则

我们致力于创建一个友好、包容的社区环境：

- 尊重不同观点和经验
- 接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

## 📞 联系方式

如有任何问题，欢迎通过以下方式联系：

- 🐛 **Bug 报告**: [GitHub Issues](https://github.com/zhangnuli/vue-enhanced-swiper/issues)
- 💬 **功能讨论**: [GitHub Discussions](https://github.com/zhangnuli/vue-enhanced-swiper/discussions)
- 📧 **私人联系**: zhangnuli@example.com

---

再次感谢您的贡献！让我们一起让 Vue Enhanced Swiper 变得更好！ 🚀