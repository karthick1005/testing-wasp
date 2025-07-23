// ⚛️ REACT: Import React core library
import React from 'react';

// 🔐 AUTHENTICATION: Import Wasp authentication hook
import { useAuth } from 'wasp/client/auth';

// 🚏 ROUTING: Import Wasp router components and routes
import { Link as WaspRouterLink, routes } from 'wasp/client/router';

/**
 * 🚫 404 NOT FOUND PAGE: Error page component for missing routes
 * 🔧 TEMPLATE USAGE: Essential error page for handling invalid URLs
 * 
 * Key features:
 * - Responsive 404 error display
 * - User-aware navigation (authenticated vs guest)
 * - Clean, accessible design
 * - Proper error status communication
 * - Branded error page styling
 * 
 * Routing behavior:
 * - Authenticated users: redirected to main app
 * - Guest users: redirected to landing page
 * - Clear visual hierarchy and messaging
 */
export function NotFoundPage() {
  // 👤 USER AUTHENTICATION: Get current user authentication state
  const { data: user } = useAuth();

  return (
    // 📐 LAYOUT: Full screen centered error page layout
    <div className='flex items-center justify-center min-h-screen'>
      {/* 📝 ERROR CONTENT: Centered error message and navigation */}
      <div className='text-center'>
        {/* 🔢 ERROR CODE: Large, prominent 404 display */}
        <h1 className='text-6xl font-bold mb-4'>404</h1>
        {/* 🔧 CHANGE: Customize error code styling, font size, colors */}
        
        {/* 💬 ERROR MESSAGE: User-friendly explanation */}
        <p className='text-lg text-bodydark mb-8'>Oops! The page you're looking for doesn't exist.</p>
        {/* 🔧 CHANGE: Customize error message text, styling, additional help text */}
        
        {/* 🏠 NAVIGATION: Smart redirect based on user authentication */}
        <WaspRouterLink
          // 🎯 DYNAMIC ROUTING: Route based on authentication status
          to={user ? routes.DemoAppRoute.to : routes.LandingPageRoute.to}
          // 🔧 CHANGE: Modify destination routes for different user types:
          // - Authenticated users: routes.DashboardRoute.to
          // - Guest users: routes.HomeRoute.to
          // - Admin users: routes.AdminRoute.to
          
          // 🎨 BUTTON STYLING: Branded call-to-action button
          className='inline-block px-8 py-3 text-white font-semibold bg-yellow-500 rounded-lg hover:bg-yellow-400 transition duration-300'
          // 🔧 CHANGE: Customize button styling:
          // - Colors: bg-blue-500 hover:bg-blue-400
          // - Size: px-6 py-2 (smaller) or px-10 py-4 (larger)
          // - Shape: rounded-full (pill) or rounded-none (square)
          // - Effects: add shadow-lg, scale-105 on hover
        >
          Go Back Home
          {/* 🔧 CHANGE: Customize button text based on user state:
              - "Return to Dashboard" for authenticated users
              - "Go to Homepage" for guests
              - "Back to App" generic option */}
        </WaspRouterLink>
      </div>
    </div>
  );
}

// 🔧 TEMPLATE ENHANCEMENT IDEAS:
// - Add search functionality to help users find content
// - Include popular/recent pages as suggestions
// - Add contact support option for persistent issues
// - Implement analytics tracking for 404 errors
// - Add breadcrumb navigation for context
// - Include site map or navigation menu
// - Add animated illustrations or graphics
// - Support for different error types (403, 500, etc.)
