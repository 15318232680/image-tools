# 在线工具箱

一个集成多种实用工具的在线服务平台。采用模块化设计，提供图片处理、文本处理、编码转换等多种在线工具。

## 在线访问
访问地址：[在线工具箱](https://image-tools-15318232680.vercel.app)

## 主要功能

### 图片工具
- **图片压缩**
  - 支持 PNG、JPG 格式
  - 自定义压缩质量（0-100%）
  - 实时预览压缩效果
  - 显示压缩前后文件大小对比
  - 支持拖拽上传
- **格式转换**（开发中）
- **图片滤镜**（开发中）

### 文本工具（计划中）
- 文本对比
- JSON格式化

### 编码转换（计划中）
- Base64转换
- URL编码

## 技术实现

- 前端技术：HTML5、CSS3、JavaScript (ES6+)
- 模块化开发：采用 ES6 模块系统
- 响应式设计：适配各种设备屏幕
- 路由系统：基于 Hash 路由的 SPA 应用

## 本地开发

1. 克隆项目
```bash
git clone https://github.com/15318232680/image-tools.git
```

2. 打开项目
```bash
cd image-tools
```

3. 使用浏览器打开
直接打开 index.html 文件即可

## 项目结构
```
/
├── index.html              # 主页面
├── styles/                 # 样式文件
│   └── main.css           # 主样式文件
├── scripts/               # 脚本文件
│   ├── main.js           # 主程序
│   ├── router.js         # 路由管理
│   └── utils/            # 工具函数
└── tools/                # 工具模块
    └── image/            # 图片处理工具
        └── compress/     # 图片压缩功能
```

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 更新日志

### v1.0.0 (2024-01-xx)
- 实现图片压缩功能
- 支持拖拽上传
- 添加实时预览
- 部署到 Vercel

## 贡献指南

欢迎提交 Issue 和 Pull Request

## 许可证

MIT License

## 联系方式

- 邮箱：597090784@qq.com
- 项目主页：https://github.com/15318232680/image-tools
