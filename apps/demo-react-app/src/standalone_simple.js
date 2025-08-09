import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('Standalone.js loaded!');

// Simple test component to verify React works
const SimpleTestComponent = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ padding: '20px', background: 'lightgreen' }}>
      <h1>Simple Test Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <hr />
      <p>✅ React is working! Now testing App.js import...</p>
    </div>
  );
};

// Test App.js import
const testAppImport = async () => {
  try {
    console.log('Testing App.js import...');
    const appModule = await import('./App.js');
    console.log('✅ App.js imported successfully:', appModule);
    console.log('App.js keys:', Object.keys(appModule));
    console.log('App.js default export:', appModule.default);
    console.log('App.js default type:', typeof appModule.default);
    
    if (typeof appModule.default === 'function') {
      console.log('✅ App.js exports a valid React component');
      return appModule.default;
    } else {
      console.error('❌ App.js default export is not a function:', appModule.default);
      return null;
    }
  } catch (error) {
    console.error('❌ Failed to import App.js:', error);
    return null;
  }
};

// Function to mount the app
const mountApp = async () => {
  console.log('Attempting to mount simple test component...');
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    console.log('Root element found, mounting simple component...');
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(SimpleTestComponent));
    console.log('Simple component mounted successfully');
    
    // Test App.js import after successful mount
    console.log('Now testing App.js import...');
    const AppComponent = await testAppImport();
    
    if (AppComponent) {
      console.log('🎉 App.js component is valid! Switching to App component...');
      // Switch to the actual App component
      root.render(React.createElement(AppComponent));
      console.log('✅ App component mounted successfully');
      
      // Expose the real App component globally
      if (typeof window !== 'undefined') {
        window.DemoReactAppComponent = AppComponent;
        
        window.mountDemoReactApp = (container) => {
          if (container) {
            const root = ReactDOM.createRoot(container);
            root.render(React.createElement(AppComponent));
            return root;
          }
        };
      }
    } else {
      console.log('❌ App.js component is invalid, staying with simple component');
      // Expose the simple component globally as fallback
      if (typeof window !== 'undefined') {
        window.DemoReactAppComponent = SimpleTestComponent;
        
        window.mountDemoReactApp = (container) => {
          if (container) {
            const root = ReactDOM.createRoot(container);
            root.render(React.createElement(SimpleTestComponent));
            return root;
          }
        };
      }
    }
  } else {
    console.error('Root element not found!');
  }
};

// Check if running as a standalone app
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    console.log('DOM is loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', mountApp);
  } else {
    console.log('DOM is ready, mounting immediately...');
    mountApp();
  }
}

// Export for ES module consumption
export default SimpleTestComponent;
