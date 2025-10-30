// API utilities with automatic error handling and offline support
export class Api {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.toast = new (require('./toast').Toast)();
    }

    async fetch(url, options = {}) {
        const fullUrl = this.baseUrl + url;
        
        try {
            if (!navigator.onLine) {
                this.toast.error('No internet connection');
                throw new Error('No internet connection');
            }

            const response = await fetch(fullUrl, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { data, error: null };

        } catch (error) {
            this.toast.error(error.message);
            return { data: null, error };
        }
    }

    // Convenience methods
    async get(url, options = {}) {
        return this.fetch(url, { ...options, method: 'GET' });
    }

    async post(url, body, options = {}) {
        return this.fetch(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    async put(url, body, options = {}) {
        return this.fetch(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    async delete(url, options = {}) {
        return this.fetch(url, { ...options, method: 'DELETE' });
    }
}