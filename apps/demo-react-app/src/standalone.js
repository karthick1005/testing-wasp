import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('Standalone.js loaded!');

// Try dynamic import to avoid potential circular dependency
let DemoApp = null;

const loadComponent = async () => {
  try {
    console.log('Loading component dynamically...');
    
    console.log('Trying App (without CSS)...');
    const appModule = await import('./App');
    console.log('App import result:', appModule);
    console.log('App keys:', Object.keys(appModule));
    console.log('App.default:', appModule.default);
    console.log('App.default type:', typeof appModule.default);
    
    // Use App if it works now
    const component = appModule.default || appModule;
    console.log('Final component chosen:', component);
    console.log('Final component type:', typeof component);
    
    DemoApp = component;
    return DemoApp;
  } catch (error) {
    console.error('Failed to load component:', error);
    throw error;
  }
};

// Expose the component globally for external consumption
if (typeof window !== 'undefined') {
  window.DemoReactAppComponent = DemoApp;
  
  // Also provide a mount function for easier integration
  window.mountDemoReactApp = (container) => {
    console.log('mountDemoReactApp called with container:', container);
    if (container) {
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(DemoApp));
      return root;
    }
  };
}

// Function to mount the app
const mountApp = async () => {
  console.log('Attempting to mount app...');
  console.log('Document:', typeof document);
  console.log('Root element:', document.getElementById('root'));
  console.log('Window demoReactApp:', window.demoReactApp);
  console.log('Location port:', window.location.port);
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    console.log('Root element found, loading component...');
    
    try {
      const ComponentToRender = await loadComponent();
      
      console.log('Component loaded:', ComponentToRender);
      console.log('Component type:', typeof ComponentToRender);
      
      if (typeof ComponentToRender === 'function') {
        const root = ReactDOM.createRoot(rootElement);
        root.render(React.createElement(ComponentToRender));
        console.log('Demo app mounted successfully');
        
        // Also expose globally after successful mount
        if (typeof window !== 'undefined') {
          window.DemoReactAppComponent = ComponentToRender;
          
          window.mountDemoReactApp = (container) => {
            console.log('mountDemoReactApp called with container:', container);
            if (container) {
              const root = ReactDOM.createRoot(container);
              root.render(React.createElement(ComponentToRender));
              return root;
            }
          };
        }
      } else {
        console.error('Component is not a function:', ComponentToRender);
      }
    } catch (error) {
      console.error('Failed to load and mount component:', error);
    }
  } else {
    console.error('Root element not found!');
  }
};

// Check if running as a standalone app
// Mount immediately if DOM is ready, otherwise wait for DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    console.log('DOM is loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', mountApp);
  } else {
    console.log('DOM is ready, mounting immediately...');
    mountApp();
  }
}

// Export for ES module consumption - export the loader function
export default loadComponent;
