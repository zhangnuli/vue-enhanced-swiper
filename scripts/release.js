#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset)
}

function exec(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf8', 
      stdio: 'inherit',
      ...options 
    })
  } catch (error) {
    log(`❌ 命令执行失败: ${command}`, 'red')
    process.exit(1)
  }
}

function checkGitStatus() {
  log('🔍 检查 Git 状态...', 'blue')
  
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8', stdio: 'pipe' })
    if (status.trim()) {
      log('❌ 存在未提交的更改，请先提交所有更改', 'red')
      log(status, 'yellow')
      process.exit(1)
    }
    log('✅ Git 状态干净', 'green')
  } catch (error) {
    log('❌ Git 状态检查失败', 'red')
    process.exit(1)
  }
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  return packageJson.version
}

function updateVersion(newVersion) {
  log(`🔄 更新版本到 ${newVersion}...`, 'blue')
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  packageJson.version = newVersion
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n')
  
  log('✅ package.json 版本已更新', 'green')
}

function updateChangelog(version) {
  log('📝 更新 CHANGELOG.md...', 'blue')
  
  const changelogPath = 'CHANGELOG.md'
  if (fs.existsSync(changelogPath)) {
    const changelog = fs.readFileSync(changelogPath, 'utf8')
    const today = new Date().toISOString().split('T')[0]
    const updatedChangelog = changelog.replace(
      /## \[.*?\] - 2025-01-XX/,
      `## [${version}] - ${today}`
    )
    fs.writeFileSync(changelogPath, updatedChangelog)
    log('✅ CHANGELOG.md 已更新', 'green')
  }
}

function runTests() {
  log('🧪 运行测试...', 'blue')
  exec('npm run test')
  log('✅ 所有测试通过', 'green')
}

function runLinting() {
  log('🔍 运行代码检查...', 'blue')
  exec('npm run lint')
  log('✅ 代码检查通过', 'green')
}

function runTypeCheck() {
  log('🔍 运行类型检查...', 'blue')
  exec('npm run type-check')
  log('✅ 类型检查通过', 'green')
}

function buildProject() {
  log('🏗️ 构建项目...', 'blue')
  exec('npm run build')
  log('✅ 项目构建完成', 'green')
}

function commitVersionUpdate(version) {
  log('📤 提交版本更新...', 'blue')
  exec('git add .')
  exec(`git commit -m "chore: release v${version}"`)
  exec(`git tag -a v${version} -m "v${version}"`)
  log('✅ 版本更新已提交并打标签', 'green')
}

function publishToNpm(tag = 'latest') {
  log(`📦 发布到 NPM (${tag})...`, 'blue')
  const publishCommand = tag === 'latest' 
    ? 'npm publish' 
    : `npm publish --tag ${tag}`
  exec(publishCommand)
  log('✅ 包已发布到 NPM', 'green')
}

function pushToGit() {
  log('🚀 推送到 Git...', 'blue')
  exec('git push')
  exec('git push --tags')
  log('✅ 已推送到 Git 仓库', 'green')
}

// 主发布流程
function main() {
  const args = process.argv.slice(2)
  const versionType = args[0] || 'patch'
  const tag = args[1] || 'latest'
  const isDryRun = args.includes('--dry-run')
  
  log('🚀 Vue Enhanced Swiper 发布脚本', 'cyan')
  log('================================', 'cyan')
  
  if (isDryRun) {
    log('🔍 这是一次模拟发布，不会真正发布到 NPM', 'yellow')
  }
  
  // 1. 检查 Git 状态
  checkGitStatus()
  
  // 2. 运行质量检查
  runLinting()
  runTypeCheck()
  runTests()
  
  // 3. 构建项目
  buildProject()
  
  // 4. 更新版本号
  const currentVersion = getCurrentVersion()
  const [major, minor, patch] = currentVersion.split('.').map(Number)
  
  let newVersion
  switch (versionType) {
    case 'major':
      newVersion = `${major + 1}.0.0`
      break
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`
      break
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`
      break
    default:
      newVersion = versionType // 直接指定版本号
  }
  
  log(`📊 当前版本: ${currentVersion}`, 'yellow')
  log(`📊 新版本: ${newVersion}`, 'green')
  
  if (!isDryRun) {
    updateVersion(newVersion)
    updateChangelog(newVersion)
    
    // 5. 提交版本更新
    commitVersionUpdate(newVersion)
    
    // 6. 发布到 NPM
    publishToNpm(tag)
    
    // 7. 推送到 Git
    pushToGit()
    
    log('🎉 发布完成！', 'green')
    log(`📦 Vue Enhanced Swiper v${newVersion} 已成功发布`, 'cyan')
  } else {
    log('🔍 模拟发布完成，所有检查都通过了！', 'green')
  }
}

if (require.main === module) {
  main()
}