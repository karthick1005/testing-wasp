import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('Standalone with router loaded!');

// Try dynamic import to avoid potential circular dependency
let DemoApp = null;

const loadComponent = async () => {
  try {
    console.log('Loading router-enabled component dynamically...');
    
    // For standalone, use BrowserRouter version which updates URL
    const appModule = await import('./AppWithBrowserRouter');
    console.log('AppWithBrowserRouter import result:', appModule);
    
    // Use AppWithBrowserRouter for standalone
    const component = appModule.default || appModule;
    console.log('Final router component chosen:', component);
    
    DemoApp = component;
    return DemoApp;
  } catch (error) {
    console.error('Failed to load router component:', error);
    
    // Fallback to basic App
    try {
      console.log('Falling back to basic App...');
      const appModule = await import('./App');
      const component = appModule.default || appModule;
      DemoApp = component;
      return DemoApp;
    } catch (fallbackError) {
      console.error('Failed to load fallback component:', fallbackError);
      throw fallbackError;
    }
  }
};

const renderApp = async () => {
  try {
    const AppComponent = await loadComponent();
    
    if (!AppComponent) {
      throw new Error('No component to render');
    }
    
    console.log('Creating React element with router...');
    const element = React.createElement(AppComponent);
    console.log('React element created:', element);
    
    const container = document.getElementById('root');
    if (!container) {
      throw new Error('Root container not found');
    }
    
    console.log('Creating React root...');
    const root = ReactDOM.createRoot(container);
    
    console.log('Rendering router-enabled app...');
    root.render(element);
    console.log('✅ Router-enabled app rendered successfully!');
    
  } catch (error) {
    console.error('❌ Failed to render router app:', error);
    
    // Fallback UI
    const container = document.getElementById('root');
    if (container) {
      container.innerHTML = `
        <div style="padding: 20px; color: red; text-align: center;">
          <h2>Failed to load router-enabled demo app</h2>
          <p>Error: ${error.message}</p>
          <p>Check the console for more details.</p>
        </div>
      `;
    }
  }
};

// Start the app
console.log('Starting router-enabled demo app...');
renderApp();
