// ⚡ VITE BUILD TOOL: Import Vite configuration utilities
import { defineConfig } from 'vite';
// 📱 PWA PLUGIN: Import Progressive Web App plugin for Vite
import { VitePWA } from 'vite-plugin-pwa';

/**
 * ⚙️ VITE CONFIGURATION: Frontend build and development server configuration
 * 🔧 TEMPLATE USAGE: Configure build process, PWA settings, and dev server
 * 
 * Key features configured:
 * - Development server auto-open
 * - Progressive Web App (PWA) setup
 * - Service worker for offline functionality
 * - App manifest for installability
 */
// 🔗 VITE DOCS: https://vitejs.dev/config/
export default defineConfig({
  // 🖥️ DEVELOPMENT SERVER: Configuration for local development
  server: {
    open: true, // 🔧 CHANGE: Set to false to disable auto-open browser
    // 🔧 CHANGE: Add port: 3000 to customize development port
    // 🔧 CHANGE: Add host: true to expose server on network
  },
  
  // 🔌 PLUGINS: Vite plugins for extended functionality
  plugins: [
    // 📱 PWA CONFIGURATION: Progressive Web App setup
    VitePWA({
      registerType: 'autoUpdate', // 🔧 Automatically update service worker
      // 🔧 CHANGE: Use 'prompt' to ask user before updating
      
      includeAssets: ['favicon.ico'], // 🔧 CHANGE: Add assets to cache (images, fonts, etc.)
      
      // 📱 WEB APP MANIFEST: PWA metadata and behavior
      manifest: {
        name: 'Anxious Love', // 🔧 CHANGE: Your app's full name
        short_name: 'Eli', // 🔧 CHANGE: Short name for home screen
        description: 'Eli is a virtual friend for your anxiety.', // 🔧 CHANGE: App description
        start_url: '/', // 🔧 CHANGE: Starting URL when app opens
        display: 'standalone', // 🔧 PWA display mode (fullscreen, standalone, minimal-ui, browser)
        scope: '/', // 🔧 CHANGE: URL scope for PWA
        orientation: 'portrait', // 🔧 CHANGE: Preferred orientation (portrait, landscape, any)
        background_color: '#ffffff', // 🔧 CHANGE: Background color during app launch
        theme_color: '#ffffff', // 🔧 CHANGE: Theme color for UI elements
        
        // 🎨 APP ICONS: Icons for different devices and contexts
        icons: [
          {
            src: 'icon.png', // 🔧 CHANGE: Path to your app icon
            sizes: '512x512', // 🔧 Icon size in pixels
            type: 'image/png', // 🔧 Icon file format
            purpose: 'any maskable' // 🔧 Icon purpose (any, maskable, monochrome)
            // 🔧 CHANGE: Add multiple icon sizes for better compatibility
            // Common sizes: 192x192, 512x512, 144x144, 96x96, 48x48
          }
        ]
      }
      // 🔧 ADVANCED PWA OPTIONS you can add:
      // workbox: { ... } // Service worker caching strategies
      // devOptions: { enabled: true } // Enable PWA in development
      // includeManifestIcons: false // Disable automatic icon processing
    })
  ]
  // 🔧 ADDITIONAL VITE OPTIONS you can add:
  // build: { ... } // Production build configuration
  // css: { ... } // CSS processing options
  // resolve: { alias: { ... } } // Import path aliases
});
