# 📦 发布指南

Vue Enhanced Swiper 项目的发布流程和检查清单。

## 🚀 快速发布

### 使用自动化脚本

```bash
# 发布补丁版本 (推荐)
npm run release

# 发布次要版本  
npm run release:minor

# 发布主要版本
npm run release:major

# 发布 Beta 版本
npm run release:beta

# 模拟发布（不会真正发布）
npm run release:dry
```

### 使用 Shell 脚本

```bash
# 发布补丁版本
npm run publish:patch

# 发布次要版本
npm run publish:minor  

# 发布主要版本
npm run publish:major

# 模拟发布
npm run publish:dry
```

## 📋 发布前检查清单

### ✅ 代码质量检查

- [ ] **所有测试通过**: `npm run test`
- [ ] **代码检查通过**: `npm run lint`
- [ ] **类型检查通过**: `npm run type-check`
- [ ] **构建成功**: `npm run build`
- [ ] **示例应用正常**: `npm run dev`

### ✅ 文档和配置检查

- [ ] **README.md 更新**: API 文档、示例代码、版本信息
- [ ] **CHANGELOG.md 更新**: 新功能、修复、破坏性更改
- [ ] **package.json 检查**: 版本号、依赖、脚本
- [ ] **类型定义完整**: `dist/types/index.d.ts` 生成正确
- [ ] **.npmignore 配置**: 排除不必要文件

### ✅ Git 仓库检查  

- [ ] **Git 状态干净**: 无未提交更改
- [ ] **在主分支**: main 或 master 分支
- [ ] **最新代码**: 已拉取远程最新更改
- [ ] **标签策略**: 遵循语义化版本标签

### ✅ NPM 发布检查

- [ ] **NPM 登录**: 已登录正确的 NPM 账户
- [ ] **包名唯一**: 包名在 NPM 上可用
- [ ] **访问权限**: 有发布权限
- [ ] **依赖版本**: peer dependencies 版本合理

## 🔧 版本策略

我们遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

### 主版本号 (MAJOR)

**适用场景**: 不兼容的 API 修改

```bash
# 1.0.0 -> 2.0.0
npm run release:major
```

**示例**:
- 移除或重命名公共 API
- 更改函数签名
- 删除 props 或事件
- 更改默认行为

### 次版本号 (MINOR) 

**适用场景**: 向下兼容的功能性新增

```bash
# 1.0.0 -> 1.1.0  
npm run release:minor
```

**示例**:
- 添加新的 props 或事件
- 新增配置选项
- 性能改进
- 新功能特性

### 修订版本号 (PATCH)

**适用场景**: 向下兼容的问题修正

```bash
# 1.0.0 -> 1.0.1
npm run release        # 默认 patch
npm run publish:patch
```

**示例**:
- Bug 修复
- 文档更新
- 内部重构
- 依赖更新

## 🏷️ 标签策略

### latest (默认)

稳定版本，生产环境推荐使用：

```bash
npm install vue-enhanced-swiper
npm install vue-enhanced-swiper@latest
```

### beta

测试版本，新功能预览：

```bash
npm install vue-enhanced-swiper@beta
npm run release:beta
```

### alpha  

开发版本，实验性功能：

```bash
npm install vue-enhanced-swiper@alpha
npm run release:alpha  # 需要手动配置
```

## 📊 发布后验证

### NPM 包验证

```bash
# 检查包信息
npm info vue-enhanced-swiper

# 下载并测试
npm pack
tar -xzf vue-enhanced-swiper-*.tgz
ls package/
```

### 安装测试

```bash
# 创建测试项目
mkdir test-install
cd test-install
npm init -y
npm install vue-enhanced-swiper

# 测试导入
node -e "console.log(require('vue-enhanced-swiper'))"
```

### GitHub Release

1. 访问 [GitHub Releases](https://github.com/zhangnuli/vue-enhanced-swiper/releases)
2. 基于版本标签创建 Release
3. 添加发布说明和更新日志
4. 上传构建产物（可选）

## 🚨 回滚策略

### NPM 包回滚

```bash
# 废弃有问题的版本
npm deprecate vue-enhanced-swiper@1.0.1 "版本有严重bug，请升级到 1.0.2"

# 取消发布（24小时内）
npm unpublish vue-enhanced-swiper@1.0.1
```

### Git 回滚

```bash
# 删除错误的标签
git tag -d v1.0.1
git push origin :refs/tags/v1.0.1

# 回滚提交
git revert HEAD
git push origin main
```

## 🔍 故障排除

### 常见问题

**1. NPM 发布权限错误**
```bash
npm login
npm whoami
# 检查是否为组织成员
```

**2. Git 推送失败**  
```bash
git pull --rebase origin main
git push
```

**3. 构建失败**
```bash
rm -rf node_modules dist
npm ci
npm run build
```

**4. 测试失败**
```bash
# 更新快照
npm run test -- --updateSnapshot

# 详细模式
npm run test -- --verbose
```

### 获取帮助

- 🐛 **Bug 报告**: [GitHub Issues](https://github.com/zhangnuli/vue-enhanced-swiper/issues)
- 💬 **讨论**: [GitHub Discussions](https://github.com/zhangnuli/vue-enhanced-swiper/discussions)  
- 📧 **联系**: zhangnuli@example.com

---

✨ 祝发布顺利！记得在发布后更新文档网站和社交媒体。