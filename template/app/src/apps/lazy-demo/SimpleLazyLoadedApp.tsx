import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Loader2, ExternalLink, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

interface LoadStatus {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  loadTime?: number;
  error?: string;
}

export default function SimpleLazyLoadedApp() {
  return (
    <ErrorBoundary>
      <LazyLoadedAppContent />
    </ErrorBoundary>
  );
}

function LazyLoadedAppContent() {
  const [loadStatus, setLoadStatus] = useState<LoadStatus>({ status: 'idle' });
  const [isRemoteAppLoaded, setIsRemoteAppLoaded] = useState(false);
  const [remoteAvailable, setRemoteAvailable] = useState<boolean | null>(null);
  const [key, setKey] = useState(0); // Force re-render key
  const [showIframe, setShowIframe] = useState(false);
  const [iframeKey, setIframeKey] = useState(0); // Force iframe re-render
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if remote app is available
  const checkRemoteAvailability = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3002', { method: 'HEAD', mode: 'no-cors' });
      setRemoteAvailable(true);
      return true;
    } catch (error) {
      // Try a different approach - attempt to load the resource
      try {
        const img = new Image();
        img.onload = () => setRemoteAvailable(true);
        img.onerror = () => setRemoteAvailable(false);
        img.src = 'http://localhost:3002/favicon.ico?' + Date.now();
        return true;
      } catch {
        setRemoteAvailable(false);
        return false;
      }
    }
  }, []);

  const cleanupTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const loadRemoteApp = useCallback(async () => {
    if (loadStatus.status === 'loading' || loadStatus.status === 'loaded') return;

    const startTime = Date.now();
    setLoadStatus({ status: 'loading' });
    cleanupTimeout();

    try {
      // Set timeout for loading
      timeoutRef.current = setTimeout(() => {
        if (loadStatus.status === 'loading') {
          setLoadStatus({ 
            status: 'error', 
            error: 'Loading timeout - remote app may be unavailable'
          });
          setShowIframe(false);
        }
      }, 10000);

      // Show iframe using React state
      setIframeKey(prev => prev + 1);
      setShowIframe(true);

    } catch (error) {
      setLoadStatus({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Failed to load remote app'
      });
      setShowIframe(false);
    }
  }, [loadStatus.status, cleanupTimeout]);

  const handleIframeLoad = useCallback(() => {
    const endTime = Date.now();
    cleanupTimeout();
    setLoadStatus({ 
      status: 'loaded', 
      loadTime: endTime - Date.now() + 10000 // Approximate load time
    });
    setIsRemoteAppLoaded(true);
  }, [cleanupTimeout]);

  const handleIframeError = useCallback(() => {
    cleanupTimeout();
    setLoadStatus({ 
      status: 'error', 
      error: 'Failed to load iframe content'
    });
    setShowIframe(false);
  }, [cleanupTimeout]);

  const unloadRemoteApp = useCallback(() => {
    cleanupTimeout();
    setShowIframe(false);
    setIsRemoteAppLoaded(false);
    setLoadStatus({ status: 'idle' });
    setKey(prev => prev + 1); // Force re-render
  }, [cleanupTimeout]);

  const refreshComponent = useCallback(() => {
    cleanupTimeout();
    setShowIframe(false);
    setIsRemoteAppLoaded(false);
    setLoadStatus({ status: 'idle' });
    setRemoteAvailable(null);
    setKey(prev => prev + 1);
    setIframeKey(prev => prev + 1);
    // Recheck availability after refresh
    setTimeout(() => {
      checkRemoteAvailability();
    }, 500);
  }, [cleanupTimeout, checkRemoteAvailability]);

  const openInNewTab = () => {
    window.open('http://localhost:3002', '_blank');
  };

  // Check availability on mount and cleanup on unmount
  useEffect(() => {
    checkRemoteAvailability();
    
    // Cleanup on unmount
    return () => {
      cleanupTimeout();
    };
  }, [checkRemoteAvailability, cleanupTimeout]);

  return (
    <div key={key} className="space-y-6">{/* Force re-render with key */}
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                🚀 Lazy Loaded React App Demo (Simple)
              </CardTitle>
              <CardDescription>
                Simple demonstration of lazy loading - reliable iframe approach that loads the remote app on demand
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
              onClick={refreshComponent}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
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
              <div className="font-medium">Method</div>
              <div className="text-muted-foreground">Iframe (Reliable)</div>
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
          <CardTitle>Remote App Container</CardTitle>
          <CardDescription>
            The remote React app will be loaded here when requested
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px] rounded-lg border-2 border-dashed border-muted-foreground/25 bg-background">
            {showIframe ? (
              <iframe
                key={iframeKey}
                src="http://localhost:3002"
                style={{
                  width: '100%',
                  height: '600px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff'
                }}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Remote React App"
              />
            ) : !isRemoteAppLoaded ? (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                <div className="text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <p>Remote app will be loaded here</p>
                  <p className="text-sm mt-1">Click "Load Remote App" to dynamically load</p>
                  <p className="text-xs mt-2 text-muted-foreground/70">
                    Bundle size impact: Zero - Only loaded when needed
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>🔧 Simple Lazy Loading Approach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">📦 Current Implementation:</h4>
                <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                  <li>Uses iframe for complete isolation</li>
                  <li>No React version conflicts</li>
                  <li>Loads entire remote app on demand</li>
                  <li>Separate execution context</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">✅ Benefits:</h4>
                <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                  <li>100% reliable loading</li>
                  <li>Zero main bundle impact</li>
                  <li>No dependency conflicts</li>
                  <li>Simple to implement and debug</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">🎯 Use Cases:</h4>
                <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                  <li>Admin tools and dashboards</li>
                  <li>Optional feature modules</li>
                  <li>Third-party integrations</li>
                  <li>Development previews</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">� Configuration:</h4>
                <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                  <li>Remote entry: localhost:3002</li>
                  <li>Exposed module: ./DemoApp</li>
                  <li>Method: Iframe isolation</li>
                  <li>Bundle impact: Zero</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
