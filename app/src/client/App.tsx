import './Main.css';
import NavBar from './components/NavBar/NavBar';
import CookieConsentBanner from './components/cookie-consent/Banner';
import { appNavigationItems } from './components/NavBar/contentSections';
import { landingPageNavigationItems } from '../landing-page/contentSections';
import { useMemo, useEffect } from 'react';
import { routes } from 'wasp/client/router';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import { useIsLandingPage } from './hooks/useIsLandingPage';
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
/**
 * use this component to wrap all child components
 * this is useful for templates, themes, and context
 */
export default function App() {
  const location = useLocation();
  const { data: user } = useAuth();
  const isLandingPage = useIsLandingPage();
  const navigationItems = isLandingPage ? landingPageNavigationItems : appNavigationItems;

  const shouldDisplayAppNavBar = useMemo(() => {
    return location.pathname !== routes.LoginRoute.build() && location.pathname !== routes.SignupRoute.build();
  }, [location]);

  const isAdminDashboard = useMemo(() => {
    return location.pathname.startsWith('/admin');
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [location]);
 useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-QJ5ZFJ024D";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-QJ5ZFJ024D");
  };
}, []);

useEffect(() => {
  const handleAppInstalled = () => {
    console.log("PWA installed");

    if (typeof window.gtag === "function") {
      console.log("Sending GA4 event for PWA installation");
      try {
        window.gtag("event", "pwa_installed", {
          event_category: "PWA",
          event_label: navigator.platform,
           debug_mode: true, // 👈 This enables GA4 DebugView manually
        });
      } catch (error) {
        console.error("Error sending GA4 event for PWA installation:", error);
        
      }
    } else {
      console.warn("gtag not initialized");
    }
  };

  window.addEventListener("appinstalled", handleAppInstalled);
  return () => window.removeEventListener("appinstalled", handleAppInstalled);
}, []);

  return (
    <>
      <div className='min-h-screen dark:text-white dark:bg-boxdark-2'>
        {isAdminDashboard ? (
          <Outlet />
        ) : (
          <>
            {shouldDisplayAppNavBar && <NavBar navigationItems={navigationItems} />}
            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <Outlet />
            </div>
          </>
        )}
      </div>
      <CookieConsentBanner />
    </>
  );
}
