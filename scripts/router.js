class Router {
    constructor() {
        this.routes = new Map();
        this.currentModule = null;
        
        // 先绑定事件监听
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // 使用 DOMContentLoaded 确保 DOM 加载完成
        document.addEventListener('DOMContentLoaded', () => {
            // 如果没有 hash，设置默认值
            if (!window.location.hash) {
                window.location.hash = '#/image/compress';
            } else {
                // 直接处理当前路由
                this.handleRoute();
            }
        });
    }

    register(path, module) {
        this.routes.set(path, module);
    }

    async handleRoute() {
        const hash = window.location.hash;
        if (!hash) return;
        
        const path = hash.slice(1);
        const module = this.routes.get(path);
        
        if (module) {
            try {
                // 先清理旧模块
                if (this.currentModule && this.currentModule.unload) {
                    await this.currentModule.unload();
                }

                const container = document.querySelector('.tool-container');
                
                // 显示加载状态
                container.innerHTML = '<div class="loading">加载中...</div>';
                
                // 加载新模块
                const response = await fetch(`/tools${path}/index.html`);
                if (!response.ok) throw new Error('Failed to load module');
                
                const html = await response.text();
                container.innerHTML = html;

                // 初始化新模块
                this.currentModule = module;
                if (module.init) {
                    await module.init();
                }
            } catch (error) {
                console.error('Route handling error:', error);
                document.querySelector('.tool-container').innerHTML = `
                    <div class="error-message">
                        加载失败，请刷新页面重试
                    </div>
                `;
            }
        }
    }
}

export { Router };