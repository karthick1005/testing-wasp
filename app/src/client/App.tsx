// 🎨 STYLES: Import main CSS styles for the application
import './Main.css'; // 🔧 MODIFY: Main stylesheet location

// 🧭 NAVIGATION: Import navigation components and configurations
import NavBar from './components/NavBar/NavBar'; // 🔧 MODIFY: Main navigation component location
import CookieConsentBanner from './components/cookie-consent/Banner'; // 🔧 MODIFY: GDPR cookie consent component
import { appNavigationItems } from './components/NavBar/contentSections'; // 🔧 MODIFY: App navigation menu items
import { landingPageNavigationItems } from '../landing-page/contentSections'; // 🔧 MODIFY: Landing page navigation items

// ⚛️ REACT HOOKS: Import React hooks for state and side effects
import { useMemo, useEffect } from 'react';

// 🚏 ROUTING: Import Wasp routing and React Router utilities
import { routes } from 'wasp/client/router'; // 🔧 FRAMEWORK: Wasp auto-generated routes
import { Outlet, useLocation } from 'react-router-dom'; // 🔧 FRAMEWORK: React Router components

// 🔐 AUTHENTICATION: Import Wasp authentication hook
import { useAuth } from 'wasp/client/auth'; // 🔧 FRAMEWORK: Wasp authentication state

// 🪝 CUSTOM HOOKS: Import application-specific hooks
import { useIsLandingPage } from './hooks/useIsLandingPage'; // 🔧 MODIFY: Custom hook to detect landing page

// 📊 ANALYTICS: Global type definitions for Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void; // 🔧 MODIFY: Google Analytics global function type
  }
}

/**
 * 🏠 MAIN APP COMPONENT: Root component that wraps all child components
 * 🔧 MODIFY: Use this component to wrap all child components
 * This is useful for templates, themes, and global context providers
 */
export default function App() {
  // 🗺️ LOCATION TRACKING: Get current route location
  const location = useLocation();
  
  // 👤 USER AUTHENTICATION: Get current user authentication state
  const { data: user } = useAuth(); // 🔧 MODIFY: Access current user data
  
  // 🏠 PAGE TYPE DETECTION: Determine if current page is landing page
  const isLandingPage = useIsLandingPage();
  
  // 🧭 DYNAMIC NAVIGATION: Choose navigation items based on page type
  const navigationItems = isLandingPage ? landingPageNavigationItems : appNavigationItems; // 🔧 MODIFY: Customize navigation for different page types

  // 🚫 NAVIGATION VISIBILITY: Hide navigation on auth pages
  const shouldDisplayAppNavBar = useMemo(() => {
    // 🔧 MODIFY: Add or remove routes where navigation should be hidden
    return location.pathname !== routes.LoginRoute.build() && location.pathname !== routes.SignupRoute.build();
  }, [location]);

  // 👑 ADMIN INTERFACE: Detect admin dashboard pages
  const isAdminDashboard = useMemo(() => {
    // 🔧 MODIFY: Update admin route pattern if you change admin URL structure
    return location.pathname.startsWith('/admin');
  }, [location]);

  // 🔗 HASH LINK SCROLLING: Handle smooth scrolling to page sections
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView(); // 🔧 MODIFY: Add smooth scrolling behavior if desired
      }
    }
  }, [location]);

  // 📊 GOOGLE ANALYTICS SETUP: Initialize GA4 tracking (currently commented out)
  // 🔧 ENABLE: Uncomment and configure with your GA4 tracking ID
  //  useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://www.googletagmanager.com/gtag/js?id=G-QJ5ZFJ024D"; // 🔧 CHANGE: Replace with your GA4 tracking ID
  //   script.async = true;
  //   document.head.appendChild(script);

  //   script.onload = () => {
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(...args: any[]) {
  //       window.dataLayer.push(args);
  //     }
  //     window.gtag = gtag;
  //     gtag("js", new Date());
  //     gtag("config", "G-QJ5ZFJ024D"); // 🔧 CHANGE: Replace with your GA4 tracking ID
  //   };
  // }, []);

  // 📱 PWA INSTALLATION TRACKING: Track Progressive Web App installations
  useEffect(() => {
    const handleAppInstalled = () => {
      console.log("PWA installed"); // 🔧 MODIFY: Customize PWA installation logging
      
      // 📊 ANALYTICS EVENT: Send PWA installation event to Google Analytics
      if (typeof window.gtag === "function") {
        try {
          window.gtag("event", "pwa_installed", {
            event_category: "PWA", // 🔧 MODIFY: Customize event category
            // 🔧 MODIFY: Add device platform detection if needed
            debug_mode: true, // 🔧 MODIFY: Set to false in production
          });
        } catch (error) {
          console.error("Error sending GA4 event for PWA installation:", error);
        }
      } else {
        console.warn("gtag not initialized");
      }
    };

    // 📱 PWA EVENT LISTENERS: Listen for app installation events
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => window.removeEventListener("appinstalled", handleAppInstalled);
  }, []);

  // 🎨 MAIN LAYOUT RENDERING: Conditional layout based on page type
  return (
    <>
      {/* 🌗 DARK MODE CONTAINER: Main app container with dark mode support */}
      <div className='min-h-screen dark:text-white dark:bg-boxdark-2'>
        {isAdminDashboard ? (
          // 👑 ADMIN LAYOUT: Full-width admin dashboard layout
          <Outlet />
        ) : (
          // 🏠 STANDARD LAYOUT: Regular app layout with navigation and max-width container
          <>
            {/* 🧭 CONDITIONAL NAVIGATION: Show navigation except on auth pages */}
            {shouldDisplayAppNavBar && <NavBar navigationItems={navigationItems} />}
            
            {/* 📱 RESPONSIVE CONTAINER: Main content area with responsive padding */}
            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <Outlet />
            </div>
          </>
        )}
      </div>
      
      {/* 🍪 GDPR COMPLIANCE: Cookie consent banner for privacy regulations */}
      <CookieConsentBanner />
    </>
  );
}
