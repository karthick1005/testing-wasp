# 🚀 Multi-App System for OpenSaaS

Create multiple mini-applications within your OpenSaaS project easily! This system provides a complete solution for building, managing, and organizing multiple apps in one platform.

## 📁 Clean Folder Structure

```
src/apps/
├── apps.json              # App configuration (edit this!)
├── app-config.ts          # Auto-generated TypeScript config
├── AppsPage.tsx           # Dashboard showing all apps
├── add-app.cjs           # Interactive app creator
├── remove-app.cjs        # Interactive app remover
├── auto-update-routes.cjs # Automatic route generator
├── watch-and-update.cjs  # File watcher for auto-updates
├── my-first-app/         # Example public app
│   └── MyFirstApp.tsx
└── calculator/           # Example protected app
    └── Calculator.tsx
```

## 🔧 Available Commands

- `npm run add-app` - Interactive app creator
- `npm run remove-app` - Interactive app remover
- `npm run update-routes` - Update main.wasp with latest apps
- `npm run watch-apps` - Auto-update when apps.json changes

## 🎯 How to Create a New App

### Method 1: Interactive Creator (Recommended) ⭐
```bash
npm run add-app
```
This guides you through creating a new app step by step!

**Features:**
- 📝 Guided prompts for all app details
- 🔄 Automatic route generation
- 📁 Creates folder structure
- ✅ Updates all configuration files

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

## 🗑️ How to Remove an App

### Interactive Removal (Recommended) ⭐
```bash
npm run remove-app
```

**Features:**
- 📋 Shows all available apps
- 🎯 Select by number or app ID
- ⚠️ Confirmation prompt before removal
- 🔄 Automatically updates routes and config
- 📁 Provides cleanup instructions

### Manual Removal

1. **Edit `apps.json`** - Remove the app object from the array
2. **Delete component folder**: `rm -rf src/apps/app-name`
3. **Update routes**: `npm run update-routes`

## 📋 App Configuration Options

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

## 🎯 How It Works

1. **Configuration**: Apps are defined in `apps.json`
2. **Dashboard**: `AppsPage.tsx` shows all active apps
3. **Routing**: Scripts automatically update `main.wasp` with routes
4. **Components**: Each app is a React component in its own folder
5. **TypeScript**: `app-config.ts` provides type safety (auto-generated)

## 🔄 Automatic Updates

The system can automatically update files when you change `apps.json`:

```bash
npm run watch-apps
```

This will watch for file changes and update routes automatically.

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
  "category": "tools",
  "isActive": true
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
  "category": "analytics",
  "isActive": true
}
```

## 🚀 Quick Start Guide

### 1. View Current Apps
```bash
# Start your Wasp app
wasp start

# Visit the apps dashboard
# Go to: http://localhost:3000/apps
```

### 2. Create Your First App
```bash
# Interactive creation
npm run add-app

# Follow the prompts to create your app
```

### 3. Test Your App
- Visit `/apps` to see your new app in the dashboard
- Click "Open App" to launch it
- Direct access via your defined path (e.g., `/my-app`)

### 4. Manage Apps
```bash
# Add more apps
npm run add-app

# Remove apps you don't need
npm run remove-app

# Update routes if you edit apps.json manually
npm run update-routes

# Auto-watch for changes
npm run watch-apps
```

## 🎨 Customizing Apps

### App Component Structure
```tsx
// src/apps/my-app/MyApp.tsx
import React from 'react';

export default function MyApp() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My App</h1>
        
        {/* Your app content */}
        <div className="bg-white rounded-lg shadow p-6">
          <p>Your app functionality here...</p>
        </div>
      </div>
    </div>
  );
}
```

### Adding App-Specific Logic
```
src/apps/my-app/
├── MyApp.tsx              # Main component
├── components/            # App-specific components
│   ├── MyAppHeader.tsx
│   └── MyAppContent.tsx
├── hooks/                 # App-specific hooks
│   └── useMyAppData.ts
├── types.ts              # App-specific types
└── utils.ts              # App-specific utilities
```

## 🔧 Advanced Features

### File Watching
```bash
# Start file watcher (runs in background)
npm run watch-apps

# Now any changes to apps.json will automatically:
# - Update app-config.ts
# - Update main.wasp routes
# - Show success messages
```

### Batch Operations
```bash
# Update all routes from current apps.json
npm run update-routes

# This is useful when:
# - You manually edit apps.json
# - You pull changes from git
# - You need to sync after conflicts
```

## 🚨 Troubleshooting

### Common Issues

1. **404 Error on App Route**
   ```bash
   # Check if routes are synced
   npm run update-routes
   
   # Restart Wasp
   wasp start
   ```

2. **TypeScript Errors**
   ```bash
   # Regenerate TypeScript config
   npm run update-routes
   ```

3. **App Not Showing in Dashboard**
   - Check `isActive: true` in apps.json
   - Verify the app exists in apps.json
   - Run `npm run update-routes`

4. **Component Not Found**
   - Ensure component file exists: `src/apps/app-id/ComponentName.tsx`
   - Check component name matches in apps.json
   - Verify default export in component

## 🎯 Best Practices

### App Organization
- **One feature per app** - Keep apps focused and simple
- **Consistent naming** - Use kebab-case for IDs, PascalCase for components
- **Clear descriptions** - Help users understand what each app does
- **Meaningful categories** - Group related apps together

### Development Workflow
1. **Plan your app** - Define its purpose and features
2. **Use interactive creator** - `npm run add-app` for consistency
3. **Build incrementally** - Start simple, add features gradually
4. **Test thoroughly** - Verify both public and authenticated access
5. **Clean up unused apps** - Use `npm run remove-app` when needed

### File Management
- **Keep components organized** - Use subfolders for complex apps
- **Shared utilities** - Put common code in `src/components` or `src/lib`
- **App-specific assets** - Store in `public/apps/app-name/` if needed

## 📚 Reference

### Complete App Lifecycle

```bash
# 1. Create
npm run add-app

# 2. Develop
# Edit your component files

# 3. Test
# Visit /apps dashboard

# 4. Update (if needed)
# Edit apps.json manually
npm run update-routes

# 5. Remove (when done)
npm run remove-app
```

### Integration with OpenSaaS Features

Your apps can use all OpenSaaS features:
- ✅ **Authentication** - `useAuth()` hook
- ✅ **Database** - Wasp queries and actions
- ✅ **Styling** - TailwindCSS classes
- ✅ **Components** - Shared UI components
- ✅ **Payments** - Stripe integration
- ✅ **Email** - Email sending
- ✅ **File uploads** - S3 integration

## 🎉 Summary

Your multi-app system provides:

- ✅ **Complete CRUD operations** for apps
- ✅ **Automatic route generation** - no manual main.wasp editing
- ✅ **Mixed authentication** - public and protected apps
- ✅ **Interactive management** - guided creation and removal
- ✅ **File watching** - automatic updates on changes
- ✅ **TypeScript support** - full type safety
- ✅ **Clean organization** - modular and scalable structure

**That's it!** Your app will automatically appear in the dashboard and routes will be generated. No manual `main.wasp` editing needed! 🎉

---

**Need help?** Check the example apps in the `src/apps/` folder for reference implementations.
