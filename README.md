# 在线工具箱

一个集成多种实用工具的在线服务平台。采用模块化设计，提供图片处理、文本处理、编码转换等多种在线工具。

## 功能特点

### 图片工具
- **图片压缩**：支持 PNG、JPG 格式，可自定义压缩质量
- **格式转换**：支持多种图片格式之间的转换
- **图片滤镜**：提供多种图片滤镜效果

### 文本工具
- **文本对比**：支持多文本对比，突出显示差异
- **JSON格式化**：JSON 的格式化、压缩、验证

### 编码转换
- **Base64转换**：支持文本和文件的 Base64 编解码
- **URL编码**：URL 的编码与解码

## 技术实现

- 前端技术：HTML5、CSS3、JavaScript (ES6+)
- 模块化开发：采用 ES6 模块系统
- 响应式设计：适配各种设备屏幕
- 路由系统：基于 Hash 路由的 SPA 应用

## 项目结构
├── index.html # 主页面
├── styles/ # 样式文件目录
│ ├── main.css # 全局样式
│ └── themes/ # 主题相关样式
│ ├── light.css # 明亮主题
│ └── dark.css # 暗黑主题
├── scripts/ # 脚本文件目���
│ ├── main.js # 主程序
│ ├── router.js # 路由管理
│ └── utils/ # 通用工具函数
│ └── common.js # 公共函数
├── tools/ # 工具模块目录
│ ├── image/ # 图片处理工具
│ │ ├── compress/ # 图片压缩
│ │ │ ├── index.html
│ │ │ ├── compress.css
│ │ │ └── compress.js
│ │ ├── convert/ # 图片格式转换
│ │ │ ├── index.html
│ │ │ ├── convert.css
│ │ │ └── convert.js
│ │ └── filter/ # 图片滤镜
│ │ ├── index.html
│ │ ├── filter.css
│ │ └── filter.js
│ ├── text/ # 文本处理工具
│ │ ├── diff/ # 文本对比
│ │ └── json/ # JSON格式化
│ └── encode/ # 编码转换工具
│ ├── base64/ # Base64转换
│ └── url/ # URL编码转换
└── README.md

## 开发规范

### 1. 模块化开发
- 每个工具都是独立的模块，包含自己的 HTML、CSS 和 JavaScript 文件
- 模块之间通过统一的接口进行通信
- 共用的功能放在 utils 目录下

### 2. 路由管理
- 使用 hash 路由进行页面切换
- 每个工具对应一个路由
- 路由格式：`#/category/tool`，如 `#/image/compress`

### 3. 样式管理
- 全局样式在 main.css 中定义
- 每个工具模块有自己的样式文件
- 使用 CSS 变量实现主题切换
- 采用 BEM 命名规范

### 4. JavaScript 规范
- 使用 ES6+ 语法
- 模块化组织代码
- 异步操作使用 Promise 或 async/await
- 使用 ESLint 进行代码规范检查

### 5. 工具模块开发流程
1. 在对应分类下创建新的工具目录
2. 创建必要的文件（HTML、CSS、JS）
3. 在路由配置中注册新工具
4. 在侧边栏菜单中添加入口
5. 编写单元测试
6. 提交代码前进行代码审查

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 本地开发

1. 克隆项目

```bash
git clone [repository-url]
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交改动
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

- 项目维护者：[Your Name]
- 邮箱：[Your Email]
- 项目主页：[Project URL]
