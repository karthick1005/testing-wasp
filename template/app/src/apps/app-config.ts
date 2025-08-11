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
}

// Static app configuration - auto-generated from apps.json
export const APPS: AppConfig[] = [
  {
    "id": "lazy-demo",
    "name": "Lazy Loaded React App",
    "description": "Module Federation demonstration with zero bundle impact",
    "icon": "🚀",
    "path": "/lazy-demo",
    "component": "LazyLoadedReactApp",
    "authRequired": false,
    "category": "tools",
    "isActive": true
  }
];

// Helper functions
export function getActiveApps(): AppConfig[] {
  return APPS.filter(app => app.isActive !== false);
}

export function getAppByPath(path: string): AppConfig | undefined {
  return APPS.find(app => app.path === path);
}