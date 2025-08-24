#!/bin/bash

# Vue Enhanced Swiper 发布脚本
# 使用方法:
# ./scripts/publish.sh patch        # 发布补丁版本 (1.0.0 -> 1.0.1)
# ./scripts/publish.sh minor        # 发布次要版本 (1.0.0 -> 1.1.0)
# ./scripts/publish.sh major        # 发布主要版本 (1.0.0 -> 2.0.0)
# ./scripts/publish.sh 1.2.3        # 发布指定版本
# ./scripts/publish.sh patch beta    # 发布到 beta 标签

set -e  # 遇到错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 日志函数
log() {
    echo -e "${CYAN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    error "请在项目根目录运行此脚本"
fi

# 获取参数
VERSION_TYPE=${1:-patch}
TAG=${2:-latest}
DRY_RUN=${3}

log "开始 Vue Enhanced Swiper 发布流程"
echo "================================="

if [ "$DRY_RUN" = "--dry-run" ]; then
    warning "这是一次模拟发布，不会真正发布到 NPM"
fi

# 1. 检查 Node.js 和 npm 版本
log "检查环境..."
node_version=$(node -v)
npm_version=$(npm -v)
info "Node.js 版本: $node_version"
info "npm 版本: $npm_version"

# 2. 检查是否登录到 npm
log "检查 npm 登录状态..."
if ! npm whoami > /dev/null 2>&1; then
    error "请先登录 npm: npm login"
fi
npm_user=$(npm whoami)
success "已登录 npm，用户: $npm_user"

# 3. 检查 Git 状态
log "检查 Git 状态..."
if [ -n "$(git status --porcelain)" ]; then
    error "存在未提交的更改，请先提交所有更改"
fi
success "Git 状态干净"

# 4. 获取当前分支
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
    warning "当前不在主分支 ($current_branch)，确认要继续吗？(y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        error "发布已取消"
    fi
fi

# 5. 拉取最新代码
log "拉取最新代码..."
git pull origin "$current_branch"
success "已拉取最新代码"

# 6. 安装依赖
log "安装/更新依赖..."
npm ci
success "依赖安装完成"

# 7. 运行测试
log "运行测试..."
npm run test
success "所有测试通过"

# 8. 代码检查
log "运行代码检查..."
npm run lint
success "代码检查通过"

# 9. 类型检查
log "运行类型检查..."
npm run type-check
success "类型检查通过"

# 10. 构建项目
log "构建项目..."
npm run build
success "项目构建完成"

# 11. 获取版本信息
current_version=$(node -p "require('./package.json').version")
info "当前版本: $current_version"

# 12. 计算新版本号
if [[ "$VERSION_TYPE" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    new_version="$VERSION_TYPE"
else
    case $VERSION_TYPE in
        patch)
            new_version=$(npm version patch --no-git-tag-version)
            ;;
        minor)
            new_version=$(npm version minor --no-git-tag-version)
            ;;
        major)
            new_version=$(npm version major --no-git-tag-version)
            ;;
        *)
            error "无效的版本类型: $VERSION_TYPE"
            ;;
    esac
    new_version=${new_version#v}  # 移除 'v' 前缀
fi

info "新版本: $new_version"

# 13. 更新 CHANGELOG
log "更新 CHANGELOG.md..."
if [ -f "CHANGELOG.md" ]; then
    today=$(date '+%Y-%m-%d')
    sed -i.bak "s/## \\[.*\\] - 2025-01-XX/## [$new_version] - $today/" CHANGELOG.md
    rm -f CHANGELOG.md.bak
    success "CHANGELOG.md 已更新"
fi

if [ "$DRY_RUN" != "--dry-run" ]; then
    # 14. 提交版本更新
    log "提交版本更新..."
    git add .
    git commit -m "chore: release v$new_version"
    git tag -a "v$new_version" -m "v$new_version"
    success "版本更新已提交并打标签"

    # 15. 发布到 NPM
    log "发布到 NPM ($TAG)..."
    if [ "$TAG" = "latest" ]; then
        npm publish
    else
        npm publish --tag "$TAG"
    fi
    success "包已发布到 NPM"

    # 16. 推送到 Git
    log "推送到 Git..."
    git push
    git push --tags
    success "已推送到 Git 仓库"

    echo ""
    echo "🎉 发布完成！"
    echo "📦 Vue Enhanced Swiper v$new_version 已成功发布"
    echo "🔗 NPM: https://www.npmjs.com/package/vue-enhanced-swiper"
    echo "🔗 GitHub: https://github.com/zhangnuli/vue-enhanced-swiper"
else
    success "模拟发布完成，所有检查都通过了！"
    info "如果要真正发布，请移除 --dry-run 参数"
fi