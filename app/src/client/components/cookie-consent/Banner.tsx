// ⚛️ REACT HOOKS: Import React effect hook for component lifecycle
import { useEffect } from 'react';

// 🍪 COOKIE CONSENT: Import vanilla cookie consent library
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css'; // Default styling

// ⚙️ CONFIGURATION: Import cookie consent configuration
import getConfig from './Config';

/**
 * 🍪 COOKIE CONSENT BANNER: GDPR/CCPA compliant cookie consent management
 * 🔧 TEMPLATE USAGE: Essential component for legal compliance in EU/CA markets
 * 
 * Key features:
 * - GDPR compliant cookie consent
 * - Customizable banner appearance
 * - Category-based cookie management
 * - User preference persistence
 * - Analytics integration ready
 * 
 * Legal compliance:
 * - Required for EU users (GDPR)
 * - Required for California users (CCPA)
 * - Recommended for global applications
 * - Supports granular consent categories
 * 
 * 🔧 REMOVAL INSTRUCTIONS: To remove cookie consent:
 * 1. Run: npm uninstall vanilla-cookieconsent
 * 2. Delete this component file
 * 3. Delete ./Config.ts file
 * 4. Remove import from src/client/App.tsx
 * 
 * 🔧 TEMPLATE CUSTOMIZATION:
 * - Modify Config.ts for banner text, styling, categories
 * - Update cookie policy links to your privacy policy
 * - Configure analytics integration in Config.ts
 * - Customize color scheme to match brand
 */
const CookieConsentBanner = () => {
  // 🚀 INITIALIZATION: Initialize cookie consent on component mount
  useEffect(() => {
    // 🔧 CHANGE: Add error handling for consent initialization
    try {
      // 📝 LOAD CONFIGURATION: Apply cookie consent configuration
      CookieConsent.run(getConfig());
      // 🔧 CHANGE: Add custom initialization callbacks:
      // - Analytics setup after consent
      // - Custom tracking implementation
      // - A/B testing variant selection
    } catch (error) {
      // 🚨 ERROR HANDLING: Log initialization errors
      console.error('Cookie consent initialization failed:', error);
      // 🔧 CHANGE: Add custom error handling:
      // - Fallback analytics setup
      // - Error reporting to monitoring service
      // - Graceful degradation
    }
  }, []); // Run once on component mount

  // 🎯 RENDER TARGET: Provide DOM element for cookie consent banner
  return <div id='cookieconsent'></div>;
  // The vanilla-cookieconsent library will inject the banner here
  // 🔧 CHANGE: Add custom CSS classes for styling:
  // <div id='cookieconsent' className='cookie-banner-container'></div>
};

export default CookieConsentBanner;

// 🔧 TEMPLATE INTEGRATION EXAMPLES:
//
// // Analytics integration after consent
// CookieConsent.on('consent', function (data) {
//   if (data.detail.level.includes('analytics')) {
//     // Initialize Google Analytics
//     gtag('config', 'GA_MEASUREMENT_ID');
//   }
// });
//
// // Marketing cookies handling
// CookieConsent.on('consent', function (data) {
//   if (data.detail.level.includes('marketing')) {
//     // Initialize marketing pixels (Facebook, etc.)
//     loadMarketingScripts();
//   }
// });
//
// // Custom styling example
// const StyledCookieBanner = styled.div`
//   #cookieconsent {
//     --cc-primary-color: #your-brand-color;
//     --cc-secondary-color: #your-accent-color;
//   }
// `;

// 🔧 ENHANCEMENT IDEAS:
// - Add support for multiple languages
// - Implement progressive consent (ask for specific cookies when needed)
// - Add custom animations and transitions
// - Integrate with consent management platforms (OneTrust, etc.)
// - Add consent analytics and reporting
