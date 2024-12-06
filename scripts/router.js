class Router {
    constructor() {
        this.routes = new Map();
        this.currentModule = null;
        
        // 监听 hash 变化
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // 初始化时也要处理一次路由
        this.handleRoute();
    }

    // 注册路由
    register(path, module) {
        this.routes.set(path, module);
    }

    // 处理路由
    async handleRoute() {
        // 默认路由为图片压缩
        const hash = window.location.hash || '#/image/compress';
        const path = hash.slice(1); // 移除 #
        
        const module = this.routes.get(path);
        if (module) {
            try {
                // 卸载当前模块
                if (this.currentModule && this.currentModule.unload) {
                    await this.currentModule.unload();
                }
                
                // 加载新模块
                const container = document.querySelector('.tool-container');
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
                // 加载失败时显示错误信息
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