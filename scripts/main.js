import { Router } from './router.js';
import { ImageCompress } from '../tools/image/compress/compress.js';

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化路由
    const router = new Router();

    // 注册工具模块
    router.register('/image/compress', ImageCompress);

    // 主题切换
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }
}); 