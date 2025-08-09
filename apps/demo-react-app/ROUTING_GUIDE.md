# Module Federation with Multiple Routes - Implementation Guide

## Overview

When integrating a demo app into OpenSaaS using Webpack Module Federation, there are several approaches to handle multiple routes. This guide covers the recommended approaches and their trade-offs.

## Approach 1: Internal Router (Recommended) ✅

**What it is:** The demo app manages its own routing internally and exposes a single component to the host.

**How it works:**
- Demo app uses React Router internally
- Host app loads one federated module
- Demo app handles all internal navigation
- URL updates are scoped to the demo app's basename

**Pros:**
- ✅ Clean separation of concerns
- ✅ Demo app is self-contained
- ✅ Easy to maintain and develop independently
- ✅ No routing conflicts with host app
- ✅ Can be developed and tested standalone

**Cons:**
- ❌ URL structure is nested (e.g., `/app/demo-app/dashboard`)
- ❌ Browser back/forward might not work as expected across apps

**Implementation:**
```javascript
// In demo app - AppWithRouter.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppWithRouter = () => (
  <Router basename="/demo-app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Router>
);

// In host app - load the entire routed app
const DemoAppComponent = React.lazy(() => import('demoApp/DemoAppWithRouter'));
```

**Usage in OpenSaaS:**
```typescript
// In your OpenSaaS component
const LazyDemoApp = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Suspense fallback={<div>Loading demo app...</div>}>
        <DemoAppComponent />
      </Suspense>
    </div>
  );
};
```

## Approach 2: Host-Controlled Routing

**What it is:** The host app (OpenSaaS) controls the routing and loads different components based on routes.

**How it works:**
- Demo app exposes multiple components (one per route)
- Host app's router decides which component to load
- Each route corresponds to a different federated module

**Pros:**
- ✅ Consistent URL structure with host app
- ✅ Better integration with host app's navigation
- ✅ More granular loading (load only needed components)

**Cons:**
- ❌ Tight coupling between host and demo app
- ❌ More complex webpack configuration
- ❌ Harder to develop demo app independently

**Implementation:**
```javascript
// In demo app webpack.config.js
exposes: {
  './DashboardPage': './src/pages/Dashboard.js',
  './SettingsPage': './src/pages/Settings.js',
  './ProfilePage': './src/pages/Profile.js'
}

// In host app router
<Route path="/demo/dashboard" element={<DashboardPage />} />
<Route path="/demo/settings" element={<SettingsPage />} />
<Route path="/demo/profile" element={<ProfilePage />} />
```

## Approach 3: Hybrid Approach

**What it is:** Combine both approaches - use host routing for major sections, internal routing for subsections.

**Example:**
- Host handles: `/demo/analytics` vs `/demo/settings`
- Demo app handles: `/demo/analytics/charts` vs `/demo/analytics/reports`

## Current Implementation

We've implemented **Approach 1 (Internal Router)** with the following structure:

### Exposed Modules:
- `./DemoApp` - Original single-page demo
- `./DemoAppWithRouter` - Full demo app with internal routing
- `./Standalone` - Standalone version (original)
- `./StandaloneWithRouter` - Standalone version with routing

### Routes Available:
- `/` - Home (original demo functionality)
- `/dashboard` - Dashboard page
- `/settings` - Settings page
- `/profile` - Profile page

### Integration with OpenSaaS:

```typescript
// Option 1: Use the router-enabled version
const DemoAppWithRouter = React.lazy(() => import('demoReactApp/DemoAppWithRouter'));

// Option 2: Use individual components (if needed)
const DemoApp = React.lazy(() => import('demoReactApp/DemoApp'));
```

## Best Practices

1. **Use basename in Router**: Always set a basename to avoid conflicts
   ```javascript
   <Router basename="/demo-app">
   ```

2. **Share routing dependencies**: Include react-router-dom in shared dependencies
   ```javascript
   shared: {
     'react-router-dom': { singleton: true }
   }
   ```

3. **Handle navigation gracefully**: Provide clear navigation within the demo app

4. **Consider memory routing**: For truly isolated routing, consider MemoryRouter instead of BrowserRouter

5. **Test standalone**: Ensure your demo app works both standalone and federated

## Migration Path

If you need to switch from Approach 1 to Approach 2:

1. Extract individual page components
2. Expose them separately in webpack config
3. Update host app to use individual components
4. Gradually migrate routes

## Performance Considerations

- **Code splitting**: Each route can be lazy-loaded within the demo app
- **Shared dependencies**: Ensure react-router-dom is shared to avoid duplication
- **Bundle size**: Monitor the impact of routing libraries on bundle size

## Testing

- Test the demo app in isolation (standalone mode)
- Test integration with host app
- Test navigation and URL handling
- Test browser back/forward functionality
