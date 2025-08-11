// App configuration interface
export interface AppConfig {
  id: string;
  name: string;
  description: string;
  icon?: string;
  path: string;
  component: string;
  authRequired?: boolean;
  category?: 'productivity' | 'ai' | 'business' | 'analytics' | 'tools' | 'other';
  isActive?: boolean;
   remoteApp?: {
    enabled: boolean;
    configKey?: string;
    remoteUrl?: string;
    remoteName?: string;
    exposedModule?: string;
    fallbackComponent?: string;
    sharedDependencies?: Record<string, any>;
  };
}

// Static app configuration - auto-generated from apps.json
export const APPS: AppConfig[] = [
  {
    "id": "Webpack",
    "name": "Webpack",
    "description": "sADSFGS",
    "icon": "🎶",
    "path": "/webpack",
    "component": "Webpack",
    "authRequired": false,
    "category": "tools",
    "isActive": true,
    "remoteApp": {
      "enabled": true,
      "configKey": "Webpack",
      "remoteName": "demoReactApp",
      "remoteUrl": "http://i4ww0c4koccw0s8w4gkw8ock.34.136.254.179.sslip.io/remoteEntry.js",
      "exposedModule": "./DemoAppForHostUrlSync",
      "fallbackComponent": "./DefaultComponent"
    }
  }
];

// Helper functions
export function getActiveApps(): AppConfig[] {
  return APPS.filter(app => app.isActive !== false);
}
export function getAppById(id: string): AppConfig | undefined {
  return APPS.find(app => app.id === id);
}
export function getAppByPath(path: string): AppConfig | undefined {
  return APPS.find(app => app.path === path);
}