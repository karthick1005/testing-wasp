# 🚀 Multi-App System for OpenSaaS

Create multiple mini-applications## 🔧 Available Commands

- `npm run add-app` - Interactive app creator
- `npm run remove-app` - Interactive app remover
- `npm run update-routes` - Update main.wasp with latest apps
- `npm run watch-apps` - Auto-update when apps.json changes

## 🗑️ How to Remove an App

### Interactive Removal (Recommended) ⭐
```bash
npm run remove-app
```
This will show you all apps and let you choose which one to remove.

### Manual Removal

1. **Edit `apps.json`** - Remove the app object from the array
2. **Delete component folder**: `rm -rf src/apps/app-name`
3. **Update routes**: `npm run update-routes`in your OpenSaaS project easily!

## 📁 Clean Folder Structure

```
src/apps/
├── apps.json              # App configuration (edit this!)
├── app-config.ts          # Auto-generated TypeScript config
├── AppsPage.tsx           # Dashboard showing all apps
├── add-app.cjs           # Interactive app creator
├── auto-update-routes.cjs # Automatic route generator
├── watch-and-update.cjs  # File watcher for auto-updates
├── my-first-app/         # Example public app
│   └── MyFirstApp.tsx
└── calculator/           # Example protected app
    └── Calculator.tsx
```

## 🎯 How to Create a New App

### Method 1: Interactive Creator (Recommended) ⭐
```bash
npm run add-app
```
This guides you through creating a new app step by step!

### Method 2: Manual Creation

1. **Edit `apps.json`** - Add your app configuration:
   ```json
   {
     "id": "my-todo-app",
     "name": "Todo App",
     "description": "Manage your tasks",
     "icon": "✅",
     "path": "/todo",
     "component": "TodoApp",
     "authRequired": true,
     "category": "productivity",
     "isActive": true
   }
   ```

2. **Create your component folder**:
   ```bash
   mkdir src/apps/my-todo-app
   ```

3. **Create your React component** (`src/apps/my-todo-app/TodoApp.tsx`):
   ```tsx
   import React from 'react';

   export default function TodoApp() {
     return (
       <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-6">Todo App</h1>
         <p>Your todo app content here...</p>
       </div>
     );
   }
   ```

4. **Update routes automatically**:
   ```bash
   npm run update-routes
   ```

## � Available Commands

- `npm run add-app` - Interactive app creator
- `npm run update-routes` - Update main.wasp with latest apps
- `npm run watch-apps` - Auto-update when apps.json changes

## � App Configuration Options

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | ✅ | Unique identifier | `"todo-app"` |
| `name` | string | ✅ | Display name | `"Todo App"` |
| `description` | string | ✅ | App description | `"Manage tasks"` |
| `path` | string | ✅ | URL path | `"/todo"` |
| `component` | string | ✅ | React component name | `"TodoApp"` |
| `icon` | string | ❌ | Emoji icon | `"✅"` |
| `authRequired` | boolean | ❌ | Requires login | `true/false` |
| `category` | string | ❌ | App category | `"productivity"` |
| `isActive` | boolean | ❌ | Show in dashboard | `true/false` |

## 🏷️ Categories

- `productivity` - Productivity apps
- `ai` - AI-powered features  
- `business` - Business tools
- `analytics` - Data analysis
- `tools` - Utility applications
- `other` - Miscellaneous

## 🔐 Authentication Options

- **Public Apps** (`authRequired: false`) - Anyone can access
- **Protected Apps** (`authRequired: true`) - Login required

## ✨ Examples

### Public Weather App
```json
{
  "id": "weather",
  "name": "Weather App", 
  "description": "Check the weather",
  "icon": "🌤️",
  "path": "/weather",
  "component": "WeatherApp",
  "authRequired": false,
  "category": "tools"
}
```

### Protected Dashboard
```json
{
  "id": "analytics",
  "name": "Analytics Dashboard",
  "description": "View your data",
  "icon": "📊", 
  "path": "/analytics",
  "component": "AnalyticsDashboard",
  "authRequired": true,
  "category": "analytics"
}
```

## 🚀 Quick Start

1. Run `npm run add-app` 
2. Follow the prompts
3. Create your React component
4. Visit `/apps` to see your new app!

---

**That's it!** Your app will automatically appear in the dashboard and routes will be generated. No manual `main.wasp` editing needed! 🎉
```typescript
{
  id: 'my-new-app',
  name: 'My New App',
  description: 'What your app does',
  icon: '⭐',
  path: '/my-new-app',
  component: 'MyNewApp',
  authRequired: true,
  category: 'tools',
  isActive: true
}
```

### Step 3: Auto-generate routes
```bash
# Run the route generator
cd src/apps
node generate-routes.js

# Copy the output and paste it into main.wasp
# Replace the existing //#region Apps Dashboard section
```

### Step 4: Access your apps
- Navigate to `/apps` to see all your apps
- Each app is accessible via its defined path

## Accessing Apps

### 🌐 **Public Access (Default)**
1. Start your app: `wasp start`
2. Go directly to `http://localhost:3000/apps`
3. Click "Open App" on any app card
4. **No login required!**

### 🔐 **Making Apps Require Login (Optional)**
To make an app require authentication, set `authRequired: true`:

```typescript
// In app-config.ts
{
  id: 'my-secure-app',
  name: 'My Secure App',
  authRequired: true,  // Requires login
  // ... other config
}
```

And in `main.wasp`, add the `authRequired: true`:
```wasp
route MySecureAppRoute { path: "/my-secure-app", to: MySecureAppPage }
page MySecureAppPage {
  authRequired: true,  // Requires login
  component: import MySecureApp from "@src/apps/my-secure-app/MySecureApp"
}
```

## Quick Start Guide

### 🚀 **Test the Current Setup**
1. **Start the app**: `wasp start`
2. **Go to apps**: `http://localhost:3000/apps` (no login needed!)
3. **Try the example**: Click "Open App" on "My First App"
4. **Direct access**: `http://localhost:3000/my-first-app`

### 📱 **Create Your First Custom App**
1. **Create folder**: `mkdir src/apps/my-awesome-app`
2. **Create component**: Add `MyAwesomeApp.tsx` in that folder
3. **Register it**: Add to `app-config.ts`
4. **Add route**: Add to `main.wasp`
5. **Access it**: Login and go to `/apps`

## Benefits

- ✅ Simple and clean structure
- ✅ Easy to add new apps
- ✅ Minimal changes to existing code
- ✅ Centralized app management
- ✅ Reusable across projects

## File Structure
```
src/
├── apps/
│   ├── app-config.ts          # App registry
│   ├── AppsPage.tsx           # Dashboard showing all apps
│   ├── my-first-app/
│   │   └── MyFirstApp.tsx     # Example app
│   └── my-new-app/
│       ├── MyNewApp.tsx       # Your new app
│       ├── components/        # App-specific components
│       └── operations.ts      # App-specific logic
├── components/                # Shared components
├── auth/                      # Auth system
└── ...                        # Other OpenSaaS features
```
