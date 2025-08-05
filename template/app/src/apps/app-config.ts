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
    "id": "my-first-app",
    "name": "My First App",
    "description": "A simple example app to get started",
    "icon": "🚀",
    "path": "/my-first-app",
    "component": "MyFirstApp",
    "authRequired": false,
    "category": "tools",
    "isActive": true
  },
  {
    "id": "calculator",
    "name": "Simple Calculator",
    "description": "A basic calculator for everyday calculations",
    "icon": "🧮",
    "path": "/calculator",
    "component": "Calculator",
    "authRequired": true,
    "category": "tools",
    "isActive": true
  },
  {
    "id": "test-weather",
    "name": "Weather App",
    "description": "A simple weather app",
    "icon": "🌤️",
    "path": "/weather",
    "component": "WeatherApp",
    "authRequired": true,
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