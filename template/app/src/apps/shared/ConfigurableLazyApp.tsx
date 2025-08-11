import React, { Suspense } from 'react';

export interface RemoteAppConfig {
  id: string;
  name: string;
  remoteUrl: string;
  remoteName: string;
  exposedModule: string;
  fallbackComponent?: string;
  sharedDependencies?: Record<string, any>;
  initOptions?: Record<string, any>;
}

interface ConfigurableLazyAppProps {
  config: RemoteAppConfig;
  basePath?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    [key: string]: {
      init: (shared: any) => Promise<void>;
      get: (module: string) => () => Promise<{ default: React.ComponentType }>;
    };
  }
}

const loadRemoteComponent = async (config: RemoteAppConfig): Promise<React.ComponentType> => {
  const { remoteUrl, remoteName, exposedModule, fallbackComponent, sharedDependencies } = config;
  
  // Check if script is already loaded
  const existingScript = document.querySelector(`script[src="${remoteUrl}"]`);
  if (!existingScript) {
    // Load the remote entry script
    const script = document.createElement('script');
    script.src = remoteUrl;
    script.type = 'text/javascript';
    
    await new Promise<void>((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load remote script: ${remoteUrl}`));
      document.head.appendChild(script);
    });
  }

  // Wait for container
  let attempts = 0;
  while (!window[remoteName] && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (!window[remoteName]) {
    throw new Error(`Remote container '${remoteName}' not available after loading ${remoteUrl}`);
  }

  // Default shared dependencies
  const defaultShared = {
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
  };

  // Merge with custom shared dependencies
  const shared = { ...defaultShared, ...sharedDependencies };

  // Initialize container
  await window[remoteName].init(shared);

  // Get the component with fallback strategy
  let factory;
  const modulesToTry = [exposedModule];
  
  if (fallbackComponent) {
    modulesToTry.push(fallbackComponent);
  }
  
  // Add common fallbacks
  modulesToTry.push('./DemoApp', './App', './default');
  
  for (const module of modulesToTry) {
    try {
      factory = await window[remoteName].get(module);
      break;
    } catch (error) {
      console.warn(`Failed to load module '${module}' from '${remoteName}':`, error);
    }
  }
  
  if (!factory) {
    throw new Error(`No loadable modules found in '${remoteName}'. Tried: ${modulesToTry.join(', ')}`);
  }
  
  const moduleExports = await factory();
  return moduleExports.default || moduleExports;
};

const createLazyComponent = (config: RemoteAppConfig) => {
  return React.lazy(async () => {
    try {
      const Component = await loadRemoteComponent(config);
      
      const Wrapper = (props: any) => (
        <div style={{ width: '100%', height: '100%' }}>
          <Component {...props} />
        </div>
      );
      
      return { default: Wrapper };
    } catch (error) {
      console.error(`Failed to load remote app '${config.id}':`, error);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorString = error instanceof Error ? error.toString() : String(error);
      
      // Return error fallback component
      const ErrorFallback = () => (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '400px',
          color: '#e74c3c',
          background: '#ffeaea',
          border: '1px solid #e74c3c',
          borderRadius: '8px',
          margin: '20px',
          padding: '20px'
        }}>
          <h3>❌ Failed to load {config.name}</h3>
          <p>Remote URL: {config.remoteUrl}</p>
          <p>Error: {errorMessage}</p>
          <details style={{ marginTop: '10px' }}>
            <summary>Technical Details</summary>
            <pre style={{ fontSize: '12px', background: '#f8f8f8', padding: '10px', marginTop: '10px' }}>
              {JSON.stringify({
                id: config.id,
                remoteName: config.remoteName,
                exposedModule: config.exposedModule,
                error: errorString
              }, null, 2)}
            </pre>
          </details>
        </div>
      );
      
      return { default: ErrorFallback };
    }
  });
};

const LoadingFallback = ({ appName }: { appName: string }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '400px',
    color: '#666',
    background: '#f8f9fa',
    borderRadius: '8px',
    margin: '20px'
  }}>
    <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
    <div>Loading {appName}...</div>
    <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
      Fetching remote module
    </div>
  </div>
);

// Cache for lazy components to avoid recreating them
const componentCache = new Map<string, React.LazyExoticComponent<React.ComponentType<any>>>();

const ConfigurableLazyApp: React.FC<ConfigurableLazyAppProps> = ({ config, basePath, ...props }) => {
  // Get or create lazy component from cache
  let LazyComponent = componentCache.get(config.id);
  if (!LazyComponent) {
    LazyComponent = createLazyComponent(config);
    componentCache.set(config.id, LazyComponent);
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<LoadingFallback appName={config.name} />}>
        <LazyComponent basePath={basePath} {...props} />
      </Suspense>
    </div>
  );
};

export default ConfigurableLazyApp;
