// App State Management
let state = {
  items: [],
  isOnline: navigator.onLine,
  theme: localStorage.getItem('theme') || 'light'
};

// State management functions
function updateState(newState) {
  state = { ...state, ...newState };
  notifySubscribers();
}

// Subscribers for state changes
const subscribers = new Set();

export function subscribe(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function notifySubscribers() {
  subscribers.forEach(callback => callback(state));
}

// State getters
export function getState() {
  return { ...state };
}

// Action creators
export function addItem(item) {
  updateState({
    items: [...state.items, item]
  });
}

export function removeItem(id) {
  updateState({
    items: state.items.filter(item => item.id !== id)
  });
}

export function setTheme(theme) {
  localStorage.setItem('theme', theme);
  updateState({ theme });
  document.documentElement.setAttribute('data-theme', theme);
}

// Initialize app
export function initializeApp() {
  // Set up online/offline detection
  window.addEventListener('online', () => updateState({ isOnline: true }));
  window.addEventListener('offline', () => updateState({ isOnline: false }));

  // Apply saved theme
  document.documentElement.setAttribute('data-theme', state.theme);

  // Example of subscribing to state changes
  subscribe(newState => {
    console.log('State updated:', newState);
  });
}

// Import our new utilities
import { Toast } from '../adapters/toast.js';
import { Api } from '../adapters/api.js';
import { Router } from '../adapters/router.js';

// Initialize utilities
export const toast = new Toast();
export const api = new Api('https://api.example.com'); // Replace with your API URL
export const router = new Router({
    '/': () => {
        document.querySelector('main').innerHTML = `
            <section>
                <h2>Welcome!</h2>
                <p>This is the home page.</p>
            </section>
        `;
    },
    '/about': () => {
        document.querySelector('main').innerHTML = `
            <section>
                <h2>About</h2>
                <p>This is the about page.</p>
            </section>
        `;
    },
    '*': () => {
        document.querySelector('main').innerHTML = `
            <section>
                <h2>404 - Page Not Found</h2>
                <p>Sorry, the page you're looking for doesn't exist.</p>
            </section>
        `;
    }
});

// Example of using our utilities
function showExampleUsage() {
    // Show toast examples
    toast.success('Welcome to the app!');
    
    // Example API call
    async function fetchData() {
        const { data, error } = await api.get('/example');
        if (data) {
            toast.success('Data fetched successfully!');
        }
    }

    // Add click handlers
    document.getElementById('testButton')?.addEventListener('click', () => {
        toast.info('Button clicked!');
    });
}

// Initialize when this module is loaded
initializeApp();
showExampleUsage();
