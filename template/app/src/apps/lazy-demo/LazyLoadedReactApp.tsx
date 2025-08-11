import React, { Suspense } from 'react';

declare global {
  interface Window {
    demoReactApp?: {
      init: (shared: any) => Promise<void>;
      get: (module: string) => () => Promise<{ default: React.ComponentType }>;
    };
  }
}

const loadRemoteComponent = async (): Promise<React.ComponentType> => {
  // Load the remote entry script
  const script = document.createElement('script');
  script.src = 'http://localhost:3002/remoteEntry.js';
  script.type = 'text/javascript';
  
  await new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load remote script'));
    document.head.appendChild(script);
  });

  // Wait for container
  let attempts = 0;
  while (!window.demoReactApp && attempts < 30) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (!window.demoReactApp) {
    throw new Error('Remote container not available');
  }

  // Initialize container
  await window.demoReactApp.init({
    react: {
      '^18.0.0': {
        get: () => Promise.resolve(() => React),
        loaded: true,
        eager: false
      }
    },
    'react-router-dom': {
      '^6.0.0': {
        get: () => import('react-router-dom').then(mod => () => mod),
        loaded: true,
        eager: false
      }
    }
  });

  // Get the component - try router-free version first
  let factory;
  try {
    // Try the router-free version first
    factory = await window.demoReactApp.get('./DemoAppForHostNoRouter');
  } catch (error) {
    try {
      // Fallback to the basic version
      factory = await window.demoReactApp.get('./DemoApp');
    } catch (fallbackError) {
      // Last resort - the URL sync version (might need router context)
      factory = await window.demoReactApp.get('./DemoAppForHostUrlSync');
    }
  }
  const module = await factory();
  
  return module.default || module;
};

const LazyRemoteComponent = React.lazy(async () => {
  const Component = await loadRemoteComponent();
  
  const Wrapper = (props: any) => (
    <div style={{ width: '100%', height: '100%' }}>
      <Component basePath="/lazy-demo" {...props} />
    </div>
  );
  
  return { default: Wrapper };
});

const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '400px',
    color: '#666'
  }}>
    Loading remote component...
  </div>
);

const LazyLoadedReactApp = () => {
  return (
    <div style={{ width: '100%',height:"85vh",background:"red" }}>
      <Suspense fallback={<LoadingFallback />}>
        <LazyRemoteComponent />
      </Suspense>
    </div>
  );
};

export default LazyLoadedReactApp;
