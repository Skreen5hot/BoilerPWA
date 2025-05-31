Minimal PWA Boilerplate
This is a super minimal Progressive Web App (PWA) boilerplate, built with zero frameworks, no Node.js, and no NPM. It's designed for developers who want a pure HTML, CSS, JavaScript, and TypeScript foundation to build fast, reliable, and engaging web applications without any external dependencies or build tooling.

Why this boilerplate?
In a world of ever-growing frameworks and build processes, this boilerplate offers a refreshing return to basics. It's perfect for:

Learning PWA fundamentals: Understand how service workers, web app manifests, and client-side JavaScript interact without abstraction.
Ultra-lightweight projects: When every kilobyte matters, this boilerplate keeps your app tiny and performant.
Quick prototypes: Spin up a PWA proof-of-concept in minutes.
Vanilla JS enthusiasts: Embrace the power of the browser with direct control over your codebase.
Features
PWA Ready: Includes a basic service-worker.js for offline caching and a manifest.json for home screen installation.
Pure HTML, CSS, JS: No frameworks, just the core web technologies.
TypeScript Support: Write maintainable, type-safe JavaScript using TypeScript, compiled directly in the browser (or via a simple tsc command if you prefer).
No Build Tools: No Webpack, Rollup, Parcel, or any other bundler. Just open index.html in your browser.
Minimal Footprint: Focuses on essential PWA features without any unnecessary overhead.
Getting Started
Clone this repository:
Bash

git clone [your-repo-url]
cd minimal-pwa-boilerplate
Open index.html: Simply open the index.html file in your web browser. That's it!
Explore the files:
index.html: Your main application entry point.
css/style.css: For your application's styling.
js/main.ts: Where your main application logic written in TypeScript resides. This file is referenced in index.html and assumed to be transpiled to js/main.js.
js/service-worker.ts: Your service worker script, responsible for caching and offline capabilities. This also needs to be transpiled to js/service-worker.js.
manifest.json: Defines your PWA's metadata (name, icons, start URL, display mode).
assets/: A place for your app icons and other static assets.
TypeScript Workflow
Since there are no build tools, you have a couple of options for using TypeScript:

Option 1: Browser-based Transpilation (for development/simple cases)
This boilerplate is set up to transpile TypeScript directly in the browser using a <script type="module" src="https://unpkg.com/typescript@latest/lib/typescript.min.js"></script> reference (or similar). This is great for quick testing but not recommended for production due to performance overhead.

Option 2: Local tsc Compilation (Recommended)
For a more robust development flow and production builds, you'll want to compile your TypeScript files (.ts) into JavaScript (.js) locally.

Install TypeScript globally (if you haven't already):
Bash

npm install -g typescript
(Yes, this is npm, but it's only for the TypeScript compiler itself, not for your app's dependencies.)
Compile your TypeScript: Navigate to the root of your project in the terminal and run:
Bash

tsc --init # Only run this once to create tsconfig.json
tsc # Compile all .ts files based on tsconfig.json
Make sure your tsconfig.json is configured to output .js files to the correct locations (e.g., outDir: "./js").
PWA Features in Action
Offline Support: Once the service worker is registered (check your browser's DevTools -> Application -> Service Workers), your app will be cached and available even without a network connection.
Add to Home Screen: On supported mobile browsers, you'll see an "Add to Home Screen" prompt, turning your web app into a native-like experience.
Contributing
Feel free to fork this repository, add your own minimalist features, or improve upon the existing structure.
