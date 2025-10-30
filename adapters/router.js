// Simple router for SPA functionality
export class Router {
    constructor(routes = {}) {
        this.routes = routes;
        this.currentPath = '';
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();
        
        // Intercept link clicks for SPA navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[data-route]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('data-route'));
            }
        });
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    removeRoute(path) {
        delete this.routes[path];
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        if (path === this.currentPath) return;

        this.currentPath = path;
        const handler = this.routes[path] || this.routes['*']; // '*' for 404 handler

        if (handler) {
            handler();
        } else {
            console.warn(`No handler found for path: ${path}`);
        }
    }

    // Helper to generate links
    static createLink(path, text, className = '') {
        const a = document.createElement('a');
        a.href = path;
        a.setAttribute('data-route', path);
        a.className = className;
        a.textContent = text;
        return a;
    }
}