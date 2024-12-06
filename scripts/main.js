import { Router } from './router.js';
import { ImageCompress } from '../tools/image/compress/compress.js';

// 初始化路由
const router = new Router();

// 注册工具模块
router.register('/image/compress', ImageCompress);

// 主题切换
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
}); 