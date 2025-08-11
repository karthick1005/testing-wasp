import React from 'react';
import ConfigurableLazyApp from '../shared/ConfigurableLazyApp';
import { getAppById } from '../app-config';
import { RemoteAppConfig } from '../shared/ConfigurableLazyApp';

interface GenericRemoteAppProps {
  appId?: string;
  basePath?: string;
  [key: string]: any;
}

const GenericRemoteApp: React.FC<GenericRemoteAppProps> = ({ appId, basePath, ...props }) => {
  // Get app configuration
  const appConfig = appId ? getAppById(appId) : null;
  
  
  if (!appConfig || !appConfig.remoteApp?.enabled) {
    return (
      <div style={{ 
        display: 'flex', 
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
        <div>
          <h3>❌ Configuration Error</h3>
          <p>App configuration for '{appId}' not found or remote app not enabled.</p>
          <p>Please check the apps.json file.</p>
        </div>
      </div>
    );
  }

  // Convert app config to remote app config
  const remoteConfig: RemoteAppConfig = {
    id: appConfig.id,
    name: appConfig.name,
    remoteUrl: appConfig.remoteApp.remoteUrl ?? '',
    remoteName: appConfig.remoteApp.remoteName ?? '',
    exposedModule: appConfig.remoteApp.exposedModule ?? '',
    fallbackComponent: appConfig.remoteApp.fallbackComponent,
    sharedDependencies: appConfig.remoteApp.sharedDependencies
  };

  return (
    <div style={{ width: '100%', height: "85vh", background: "transparent" }}>
      <ConfigurableLazyApp 
        config={remoteConfig}
        basePath={basePath || appConfig.path}
        {...props}
      />
    </div>
  );
};

export default GenericRemoteApp;
