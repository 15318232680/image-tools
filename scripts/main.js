import { Router } from './router.js';
import { ImageCompress } from '../tools/image/compress/compress.js';

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', async () => {
    // 初始化路由
    const router = new Router();

    // 注册工具模块
    router.register('/image/compress', ImageCompress);

    // 确保首次加载时显示默认工具
    if (!window.location.hash) {
        // 直接加载图片压缩工具
        const container = document.querySelector('.tool-container');
        try {
            // 显示加载状态
            container.innerHTML = '<div class="loading">加载中...</div>';
            
            // 加载默认模块
            const response = await fetch('/tools/image/compress/index.html');
            if (!response.ok) throw new Error('Failed to load module');
            
            const html = await response.text();
            container.innerHTML = html;
            
            // 初始化模块
            await ImageCompress.init();
            
            // 设置 hash（不会触发路由，因为值相同）
            window.location.hash = '#/image/compress';
        } catch (error) {
            console.error('Initial load error:', error);
            container.innerHTML = `
                <div class="error-message">
                    加载失败，请刷新页面重试
                </div>
            `;
        }
    }

    // 主题切换
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }
}); 