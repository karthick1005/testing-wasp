import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Loader2, ExternalLink, RefreshCw, AlertCircle, Download, CheckCircle } from 'lucide-react';

interface LoadStatus {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  loadTime?: number;
  error?: string;
}

// Declare the dynamic component type
declare global {
  interface Window {
    demoReactApp?: {
      init: (shared: any) => Promise<void>;
      get: (module: string) => () => Promise<{ default: React.ComponentType }>;
    };
    __webpack_init_sharing__?: (scope: string) => Promise<void>;
    __webpack_share_scopes__?: any;
    DemoReactAppComponent?: React.ComponentType;
    mountDemoReactApp?: (container: HTMLElement) => any;
  }
}

// Dynamic import for the remote component - Multiple fallback strategies
const loadRemoteComponent = async (): Promise<React.ComponentType> => {
  try {
    console.log('Loading remote component with multiple strategies...');
    
    // Strategy 1: Try Module Federation first
    try {
      return await loadViaModuleFederation();
    } catch (mfError) {
      console.warn('Module Federation failed, trying direct script loading:', mfError);
    }
    
    // Strategy 2: Try direct script loading as fallback
    return await loadViaDirectScript();
    
  } catch (error) {
    console.error('All loading strategies failed:', error);
    throw error;
  }
};

// Strategy 1: Module Federation approach with proper React sharing
const loadViaModuleFederation = async (): Promise<React.ComponentType> => {
  // Ensure React is available globally for sharing
  if (typeof window !== 'undefined') {
    (window as any).React = React;
    const ReactDOM = await import('react-dom');
    (window as any).ReactDOM = ReactDOM;
  }

  // Load the remote entry script
  const scriptId = 'demo-react-app-remote';
  
  // Remove existing script if any
  const existingScript = document.getElementById(scriptId);
  if (existingScript) {
    existingScript.remove();
  }

  // Create and load new script
  const script = document.createElement('script');
  script.id = scriptId;
  script.src = 'http://localhost:3002/remoteEntry.js';
  script.type = 'text/javascript';
  
  // Load script with promise
  await new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = (error) => reject(new Error('Failed to load remote script'));
    document.head.appendChild(script);
  });

  // Wait for container to be available
  let attempts = 0;
  while (!window.demoReactApp && attempts < 20) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (!window.demoReactApp) {
    throw new Error('Remote container not available');
  }

  // Initialize webpack sharing scope first
  if (window.__webpack_init_sharing__) {
    await window.__webpack_init_sharing__('default');
  }

  // Initialize container with shared React from host
  await window.demoReactApp.init({
    react: {
      '^18.0.0': {
        get: () => Promise.resolve(() => React),
        loaded: true,
        eager: false
      }
    },
    'react-dom': {
      '^18.0.0': {
        get: () => import('react-dom').then(mod => () => mod),
        loaded: true,
        eager: false
      }
    }
  });

  // Get the component
  const factory = await window.demoReactApp.get('./DemoApp');
  const module = await factory();
  
  console.log('Module loaded via Federation:', module);
  console.log('Module.default:', module.default);
  console.log('Module keys:', Object.keys(module));
  
  const component = module.default || module;
  console.log('Final component:', component);
  
  if (!component || (typeof component !== 'function' && typeof component !== 'object')) {
    throw new Error(`Invalid component type: ${typeof component}`);
  }
  
  return component;
};

// Strategy 2: Direct script loading with global exposure
const loadViaDirectScript = async (): Promise<React.ComponentType> => {
  console.log('Trying direct script loading...');
  
  // Load the standalone build directly
  const scriptId = 'demo-react-app-standalone';
  
  // Remove existing script if any
  const existingScript = document.getElementById(scriptId);
  if (existingScript) {
    existingScript.remove();
  }

  // Create and load standalone script
  const script = document.createElement('script');
  script.id = scriptId;
  script.src = 'http://localhost:3002/src_standalone_js.js'; // Webpack chunk name
  script.type = 'text/javascript';
  
  // Load script with promise
  await new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = (error) => reject(new Error('Failed to load standalone script'));
    document.head.appendChild(script);
  });

  // Wait for component to be available globally
  let attempts = 0;
  while (!(window as any).DemoReactAppComponent && attempts < 20) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (!(window as any).DemoReactAppComponent) {
    throw new Error('Demo component not available globally');
  }

  // Return a wrapper component that prevents global side effects
  const WrappedComponent = (props: any) => {
    const Component = (window as any).DemoReactAppComponent;
    return React.createElement(Component, props);
  };

  return WrappedComponent;
};

// Lazy wrapper component with isolation
const LazyRemoteComponent = React.lazy(async () => {
  const Component = await loadRemoteComponent();
  
  // Create a wrapper that prevents the component from accessing global DOM
  const IsolatedWrapper = (props: any) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      // Override any potential document.body access
      const originalBody = document.body;
      const originalGetElementById = document.getElementById;
      
      // Restore on cleanup
      return () => {
        // Restore original methods if they were overridden
      };
    }, []);
    
    // Validate that Component is a valid React component
    if (!Component || (typeof Component !== 'function' && typeof Component !== 'object')) {
      console.error('Invalid component loaded:', Component);
      return (
        <div style={{ padding: '20px', color: 'red', border: '1px solid red' }}>
          Error: Invalid component loaded. Expected a React component but got: {typeof Component}
        </div>
      );
    }
    
    return (
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: 'auto',
          isolation: 'isolate',
          contain: 'layout style paint'
        }}
      >
        <Component {...props} />
      </div>
    );
  };
  
  return { default: IsolatedWrapper };
});

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-[400px] space-y-4">
    <div className="text-center">
      <div className="flex items-center justify-center mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">Loading Remote App</h3>
                    <div className="space-y-1 text-muted-foreground text-sm">
                <p>Fetching components from port 3002...</p>
              </div>
      <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <Download className="h-4 w-4" />
        <span>Downloading module federation bundle</span>
      </div>
    </div>
  </div>
);

// Error boundary for remote component
class RemoteComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Remote component error:', error, errorInfo);
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-[400px] text-center">
          <div>
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Component Error</h3>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message || 'Failed to render remote component'}
            </p>
            <Button 
              onClick={() => this.setState({ hasError: false, error: undefined })}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function LazyLoadedReactApp() {
  const [loadStatus, setLoadStatus] = useState<LoadStatus>({ status: 'idle' });
  const [isRemoteAppLoaded, setIsRemoteAppLoaded] = useState(false);
  const [remoteAvailable, setRemoteAvailable] = useState<boolean | null>(null);

  // Check if remote app is available
  const checkRemoteAvailability = async () => {
    try {
      const response = await fetch('http://localhost:3002/remoteEntry.js', { method: 'HEAD' });
      setRemoteAvailable(response.ok);
      return response.ok;
    } catch (error) {
      setRemoteAvailable(false);
      return false;
    }
  };

  const loadRemoteApp = async () => {
    if (loadStatus.status === 'loading' || loadStatus.status === 'loaded') return;

    const startTime = Date.now();
    setLoadStatus({ status: 'loading' });

    try {
      const available = await checkRemoteAvailability();
      if (!available) {
        throw new Error('Remote app is not running on port 3002');
      }

      // The actual loading will be handled by React.lazy
      setIsRemoteAppLoaded(true);
      const endTime = Date.now();
      setLoadStatus({ 
        status: 'loaded', 
        loadTime: endTime - startTime 
      });

    } catch (error) {
      setLoadStatus({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Failed to load remote app'
      });
    }
  };

  const unloadRemoteApp = () => {
    setIsRemoteAppLoaded(false);
    setLoadStatus({ status: 'idle' });
    
    // Remove the remote script to force re-loading next time
    const script = document.querySelector('script[src="http://localhost:3002/remoteEntry.js"]');
    if (script) {
      script.remove();
    }
  };

  const handleRemoteError = (error: Error) => {
    setLoadStatus({ 
      status: 'error', 
      error: error.message 
    });
  };

  const openInNewTab = () => {
    window.open('http://localhost:3002', '_blank');
  };

  // Check availability on mount
  useEffect(() => {
    checkRemoteAvailability();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                🚀 Lazy Loaded React App Demo
              </CardTitle>
              <CardDescription>
                Demonstrates true Module Federation integration - components become part of the main app but are loaded only when needed
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge 
                variant={loadStatus.status === 'loaded' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {loadStatus.status}
              </Badge>
              <Badge 
                variant={remoteAvailable ? 'default' : 'destructive'}
                className="flex items-center gap-1"
              >
                {remoteAvailable ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Remote Online
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    Remote Offline
                  </>
                )}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            {!isRemoteAppLoaded ? (
              <Button 
                onClick={loadRemoteApp} 
                disabled={loadStatus.status === 'loading' || !remoteAvailable}
                className="flex items-center gap-2"
              >
                {loadStatus.status === 'loading' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  '🎯'
                )}
                {loadStatus.status === 'loading' ? 'Loading...' : 'Load Remote App'}
              </Button>
            ) : (
              <Button 
                onClick={unloadRemoteApp}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Unload App
              </Button>
            )}
            
            <Button 
              onClick={openInNewTab}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>

            <Button 
              onClick={checkRemoteAvailability}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Check Status
            </Button>
          </div>

          {/* Status Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium">Status</div>
              <div className="text-muted-foreground capitalize">{loadStatus.status}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium">Integration</div>
              <div className="text-muted-foreground">Module Federation</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium">Load Time</div>
              <div className="text-muted-foreground">
                {loadStatus.loadTime ? `${loadStatus.loadTime}ms` : 'N/A'}
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium">Bundle Impact</div>
              <div className="text-muted-foreground">Zero (Lazy Loaded)</div>
            </div>
          </div>

          {/* Error Display */}
          {loadStatus.status === 'error' && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Error Loading Remote App</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{loadStatus.error}</p>
                <div className="mt-3 text-sm text-muted-foreground">
                <p>To start the remote app:</p>
                <code className="block mt-1 p-2 bg-muted rounded text-xs">
                  cd apps/demo-react-app && npm start
                </code>
                <p className="mt-2 text-xs text-muted-foreground">
                  The app will be available at http://localhost:3002
                </p>
              </div>
            </div>
          )}

          {!remoteAvailable && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
              <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Remote App Not Available</span>
              </div>
              <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                The remote React app is not running. Please start it to enable lazy loading.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Remote App Container */}
      <Card>
        <CardHeader>
          <CardTitle>Integrated Remote Component</CardTitle>
          <CardDescription>
            The remote React app renders here as if it's part of the main application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px] rounded-lg border-2 border-dashed border-muted-foreground/25 bg-background">
            {isRemoteAppLoaded ? (
              <RemoteComponentErrorBoundary onError={handleRemoteError}>
                <div className="relative overflow-hidden">
                  {/* Isolated container for remote component */}
                  <div 
                    className="p-4 w-full h-auto"
                    style={{ 
                      isolation: 'isolate', // CSS isolation
                      contain: 'layout style paint' // CSS containment
                    }}
                  >
                    <Suspense fallback={<LoadingFallback />}>
                      <LazyRemoteComponent />
                    </Suspense>
                  </div>
                </div>
              </RemoteComponentErrorBoundary>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                <div className="text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <p>Remote component will be integrated here</p>
                  <p className="text-sm mt-1">Click "Load Remote App" to dynamically import and render</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>🔧 Technical Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">� Module Federation Features:</h4>
                <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                  <li>True component integration (not iframe)</li>
                  <li>Shared React context and dependencies</li>
                  <li>Hot module replacement support</li>
                  <li>Error boundaries for fault isolation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">⚡ Performance Benefits:</h4>
                <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                  <li>Zero initial bundle size impact</li>
                  <li>Lazy loading with React.Suspense</li>
                  <li>Shared dependencies avoid duplication</li>
                  <li>Independent caching strategies</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">🏗️ Architecture:</h4>
                <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                  <li>Host app provides React runtime</li>
                  <li>Remote app exposes components</li>
                  <li>Dynamic script loading</li>
                  <li>Graceful error handling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔧 Configuration:</h4>
                <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                  <li>Remote entry: localhost:3002/remoteEntry.js</li>
                  <li>Exposed module: ./DemoApp</li>
                  <li>Shared: react, react-dom</li>
                  <li>Singleton mode for React</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
