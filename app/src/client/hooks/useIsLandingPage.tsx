// ⚛️ REACT HOOKS: Import React optimization and routing hooks
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 🎯 LANDING PAGE DETECTOR: Hook to determine if user is on landing page
 * 🔧 TEMPLATE USAGE: Essential for conditional UI rendering based on page context
 * 
 * Key features:
 * - Performance optimized with useMemo
 * - Route-based landing page detection
 * - Supports conditional component rendering
 * - Automatically updates on navigation
 * 
 * Common use cases:
 * - Show/hide navigation elements
 * - Conditional footer rendering
 * - Landing-specific styling
 * - Analytics page tracking
 * - Different layouts per page type
 * 
 * Returns: boolean - true if currently on landing page ("/")
 */
export const useIsLandingPage = () => {
  // 📍 ROUTE LOCATION: Get current route information from React Router
  const location = useLocation();
  
  // 🚀 PERFORMANCE OPTIMIZATION: Memoize calculation to prevent unnecessary re-renders
  return useMemo(() => {
    // 🔧 CHANGE: Modify landing page path detection logic
    return location.pathname === '/';
    
    // 🔧 TEMPLATE EXTENSIONS: Additional landing page patterns
    // return location.pathname === '/' || location.pathname === '/home';
    // return ['/'].includes(location.pathname);
    // return location.pathname.startsWith('/landing');
    
  }, [location]); // Recalculate only when location changes
};

// 🔧 TEMPLATE USAGE EXAMPLES:
//
// // Conditional navigation rendering
// const isLandingPage = useIsLandingPage();
// return isLandingPage ? <LandingNav /> : <AppNav />;
//
// // Conditional styling
// const containerClass = isLandingPage ? 'landing-container' : 'app-container';
//
// // Analytics tracking
// useEffect(() => {
//   if (isLandingPage) {
//     analytics.track('Landing Page View');
//   }
// }, [isLandingPage]);
//
// // Layout switching
// return isLandingPage ? <LandingLayout /> : <DashboardLayout />;

// 🔧 ENHANCEMENT IDEAS:
// - Add support for multiple landing page routes
// - Include query parameter detection
// - Add subdomain-based landing detection
// - Support for A/B testing different landing pages
