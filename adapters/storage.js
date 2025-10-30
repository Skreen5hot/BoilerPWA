// Storage Adapter with fallback strategy
class StorageAdapter {
  constructor() {
    this.storage = this.getStorageMethod();
  }

  getStorageMethod() {
    if (this.isIndexedDBAvailable()) {
      return 'indexeddb';
    } else if (this.isLocalStorageAvailable()) {
      return 'localstorage';
    }
    return 'memory';
  }

  isIndexedDBAvailable() {
    try {
      return 'indexedDB' in window;
    } catch {
      return false;
    }
  }

  isLocalStorageAvailable() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  }

  async get(key) {
    switch (this.storage) {
      case 'indexeddb':
        return await this.getFromIndexedDB(key);
      case 'localstorage':
        return this.getFromLocalStorage(key);
      default:
        return this.getFromMemory(key);
    }
  }

  async set(key, value) {
    switch (this.storage) {
      case 'indexeddb':
        return await this.setInIndexedDB(key, value);
      case 'localstorage':
        return this.setInLocalStorage(key, value);
      default:
        return this.setInMemory(key, value);
    }
  }

  async remove(key) {
    switch (this.storage) {
      case 'indexeddb':
        return await this.removeFromIndexedDB(key);
      case 'localstorage':
        return this.removeFromLocalStorage(key);
      default:
        return this.removeFromMemory(key);
    }
  }

  // IndexedDB implementations
  async getFromIndexedDB(key) {
    // Implement IndexedDB get
  }

  async setInIndexedDB(key, value) {
    // Implement IndexedDB set
  }

  async removeFromIndexedDB(key) {
    // Implement IndexedDB remove
  }

  // LocalStorage implementations
  getFromLocalStorage(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  setInLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  removeFromLocalStorage(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  // Memory storage fallback
  memoryStorage = new Map();

  getFromMemory(key) {
    return this.memoryStorage.get(key) || null;
  }

  setInMemory(key, value) {
    this.memoryStorage.set(key, value);
    return true;
  }

  removeFromMemory(key) {
    return this.memoryStorage.delete(key);
  }
}

export const storage = new StorageAdapter();
