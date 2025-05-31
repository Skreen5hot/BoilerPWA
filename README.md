# Minimal PWA Boilerplate

This is a super minimal Progressive Web App (PWA) boilerplate, built with **zero frameworks**, **no Node.js**, and **no NPM**. It's designed for developers who want a pure HTML, CSS, JavaScript, and TypeScript foundation to build fast, reliable, and engaging web applications without any external dependencies or complex build tooling.

You can format your project architecture in the `README.md` using a tree-like structure, which is common and easy to read on GitHub. You'll want to use Markdown's code blocks for this.

Here's how you can present your project structure:

---


## Project Structure

This boilerplate follows a clean, decoupled architecture to keep your core logic independent from external concerns like the DOM or local storage. This makes your application easier to understand, test, and maintain.

```
/your-app
├── index.html               # Entry point of your PWA
├── manifest.json            # Web App Manifest for PWA features (icons, name, display mode)
├── service-worker.js        # Service Worker script for offline capabilities and caching
│
├── assets/                  # Static assets like images, app icons, and fonts
│
├── styles/
│   └── style.css            # Your application's main CSS styles
│
├── core/                    # Pure functions and core business logic
│   ├── app.js               # Application initialization and orchestration logic
│   ├── domain.js            # Defines your application's core domain models and business rules (pure functions)
│   └── ports.js             # Defines the interfaces (ports) that adapters must implement (e.g., how to display data, how to store data)
│
└── adapters/                # Implementations of the 'ports' that interact with external systems
    ├── dom.js               # Handles all direct DOM manipulation and UI updates (adapter for `display` or `render` ports)
    ├── storage.js           # Manages data persistence (e.g., using `localStorage`, `IndexedDB` - adapter for `storage` ports)
    └── time.js              # Provides time-related utilities or interacts with date APIs (adapter for `time` ports)
```

---

### Explanation of Architecture

* **`/core`**: This is the heart of your application. It contains **pure functions** that represent your business logic and domain rules. These functions shouldn't know anything about how data is displayed or stored; they just process data.
* **`/adapters`**: These modules are responsible for interacting with external systems. They "adapt" the generic `ports` defined in `/core` to specific technologies (e.g., the browser's DOM, `localStorage`, `IndexedDB`). This separation means you could swap out `dom.js` for a different UI library adapter in the future without touching your core logic.
* **`index.html`**: The single entry point that orchestrates the loading of your styles, manifest, and main application logic.
* **`manifest.json` & `service-worker.js`**: Essential files for your app to function as a Progressive Web App, providing installability and offline access.

---


## Why this boilerplate?

In a world of ever-growing frameworks and build processes, this boilerplate offers a refreshing return to basics. It's perfect for:

* **Learning PWA fundamentals:** Understand how service workers, web app manifests, and client-side JavaScript interact without abstraction.
* **Ultra-lightweight projects:** When every kilobyte matters, this boilerplate keeps your app tiny and performant.
* **Quick prototypes:** Spin up a PWA proof-of-concept in minutes.
* **Vanilla JS enthusiasts:** Embrace the power of the browser with direct control over your codebase.

---

## Features

* **PWA Ready:** Includes a basic `service-worker.js` for offline caching and a `manifest.json` for home screen installation.
* **Pure HTML, CSS, JS:** No frameworks, just the core web technologies.
* **TypeScript Support:** Write maintainable, type-safe JavaScript using TypeScript.
* **No Build Tools:** No Webpack, Rollup, Parcel, or any other bundler. Just open `index.html` in your browser.
* **Minimal Footprint:** Focuses on essential PWA features without any unnecessary overhead.

---

## Getting Started

1.  **Clone this repository:**

    ```bash
    git clone [your-repo-url]
    cd minimal-pwa-boilerplate
    ```

2.  **Open `index.html`:**

    Simply open the `index.html` file in your web browser. That's it!

3.  **Explore the files:**

    * `index.html`: Your main application entry point.
    * `css/style.css`: For your application's styling.
    * `js/main.ts`: Where your main application logic, written in TypeScript, resides. This file is referenced in `index.html` and should be transpiled to `js/main.js`.
    * `js/service-worker.ts`: Your service worker script, responsible for caching and offline capabilities. This also needs to be transpiled to `js/service-worker.js`.
    * `manifest.json`: Defines your PWA's metadata (name, icons, start URL, display mode).
    * `assets/`: A place for your app icons and other static assets.

---

## TypeScript Workflow

Since there are no build tools included in the boilerplate, you have a couple of options for using TypeScript:

### Option 1: Browser-based Transpilation (for development/simple cases)

This boilerplate is set up to transpile TypeScript directly in the browser using a `<script type="module" src="https://unpkg.com/typescript@latest/lib/typescript.min.js"></script>` reference. This is great for quick testing and small experiments, but **not recommended for production** due to potential performance overhead.

### Option 2: Local `tsc` Compilation (Recommended)

For a more robust development workflow and production builds, you'll want to compile your TypeScript files (`.ts`) into JavaScript (`.js`) locally.

1.  **Install TypeScript globally (if you haven't already):**

    ```bash
    npm install -g typescript
    ```

    *(Yes, this uses `npm`, but it's only for the TypeScript compiler itself, not for your app's runtime dependencies.)*

2.  **Compile your TypeScript:**

    Navigate to the root of your project in your terminal and run:

    ```bash
    tsc --init # Only run this once to create tsconfig.json
    tsc         # Compile all .ts files based on tsconfig.json
    ```

    Make sure your `tsconfig.json` is configured to output `.js` files to the correct locations (e.g., `outDir: "./js"`).

---

## PWA Features in Action

* **Offline Support:** Once the service worker is registered (you can check your browser's DevTools -> Application -> Service Workers), your app will be cached and available even without a network connection.
* **Add to Home Screen:** On supported mobile browsers, you'll see an "Add to Home Screen" prompt, turning your web app into a native-like experience.

---

## Contributing

Feel free to fork this repository, add your own minimalist features, or improve upon the existing structure. Pull requests are welcome!
