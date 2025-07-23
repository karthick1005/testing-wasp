// 🍪 COOKIE CONSENT: Import TypeScript types for configuration
import type { CookieConsentConfig } from 'vanilla-cookieconsent';

// 📊 ANALYTICS: Global type definitions for analytics data layer
declare global {
  interface Window {
    dataLayer: any; // Google Analytics data layer array
  }
}

/**
 * 🍪 COOKIE CONSENT CONFIGURATION: Complete GDPR/CCPA compliance setup
 * 🔧 TEMPLATE USAGE: Customize this configuration for your app's legal requirements
 * 
 * Key areas to customize:
 * - Analytics ID (Google Analytics integration)
 * - Privacy policy and terms links
 * - Cookie categories and services
 * - Banner text and positioning
 * - Color scheme and styling
 * 
 * Legal compliance features:
 * - Opt-in mode for GDPR compliance
 * - Cookie auto-clearing on rejection
 * - Granular consent categories
 * - Service-specific consent management
 * 
 * Reference: https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
const getConfig = () => {
  // 📝 COOKIE CONSENT CONFIGURATION: Main configuration object
  const config: CookieConsentConfig = {
    // 🎯 MODAL BEHAVIOR: Configure banner display and interaction
    root: 'body', // 🔧 CHANGE: DOM element to attach banner to
    autoShow: true, // 🔧 CHANGE: Automatically show banner on load
    disablePageInteraction: false, // 🔧 CHANGE: Block page interaction until consent
    hideFromBots: import.meta.env.PROD ? true : false, // Hide from bots in production
    // 🔧 CHANGE: Set to false for dev/testing to make banner visible
    mode: 'opt-in', // 🔧 CHANGE: 'opt-in' (GDPR) vs 'opt-out' (less strict)
    revision: 0, // 🔧 CHANGE: Increment to re-show banner for policy updates

    // 🍪 COOKIE SETTINGS: Configure consent cookie behavior
    cookie: {
      name: 'cc_cookie', // 🔧 CHANGE: Cookie name for storing consent
      domain: location.hostname, // 🔧 CHANGE: Cookie domain scope
      path: '/', // 🔧 CHANGE: Cookie path scope
      sameSite: 'Lax', // 🔧 CHANGE: CSRF protection setting
      expiresAfterDays: 365, // 🔧 CHANGE: Consent expiration (days)
    },

    // 🎨 UI CONFIGURATION: Banner appearance and positioning
    guiOptions: {
      consentModal: {
        layout: 'box', // 🔧 CHANGE: 'box', 'cloud', 'bar' layouts
        position: 'bottom right', // 🔧 CHANGE: Banner positioning
        equalWeightButtons: true, // 🔧 CHANGE: Button sizing
        flipButtons: false, // 🔧 CHANGE: Button order
      },
    },

    // 📝 CONSENT CATEGORIES: Define cookie types and services
    categories: {
      // ✅ NECESSARY COOKIES: Always enabled, cannot be disabled
      necessary: {
        enabled: true, // Always enabled for essential functionality
        readOnly: true, // User cannot disable these cookies
        // 🔧 CHANGE: Add services like authentication, security, shopping cart
      },
      
      // 📊 ANALYTICS COOKIES: Google Analytics and tracking
      analytics: {
        // 🧹 AUTO-CLEANUP: Remove analytics cookies when rejected
        autoClear: {
          cookies: [
            {
              name: /^_ga/, // 🔧 CHANGE: Regex for Google Analytics cookies
            },
            {
              name: '_gid', // 🔧 CHANGE: Specific cookie name
            },
            // 🔧 ADD: Other analytics cookies:
            // { name: '_fbp' }, // Facebook Pixel
            // { name: '_hjid' }, // Hotjar
            // { name: /^_utm/ }, // UTM tracking
          ],
        },

        // 🎯 ANALYTICS SERVICES: Configure tracking service integration
        services: {
          ga: {
            label: 'Google Analytics', // 🔧 CHANGE: Service display name
            // ✅ CONSENT GRANTED: Initialize analytics when accepted
            onAccept: () => {
              try {
                // 🔧 CHANGE: Replace with your Google Analytics ID
                const GA_ANALYTICS_ID = import.meta.env.REACT_APP_GOOGLE_ANALYTICS_ID;
                if (!GA_ANALYTICS_ID.length) {
                  throw new Error('Google Analytics ID is missing');
                  // 🔧 CHANGE: Add environment-specific analytics IDs
                  // - Development: GA_DEV_ID
                  // - Staging: GA_STAGING_ID  
                  // - Production: GA_PROD_ID
                }
                
                // 📊 ANALYTICS INITIALIZATION: Set up Google Analytics
                window.dataLayer = window.dataLayer || [];
                function gtag(..._args: unknown[]) {
                  (window.dataLayer as Array<any>).push(arguments);
                }
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', GA_ANALYTICS_ID);
                // 🔧 CHANGE: Add custom tracking configuration:
                // gtag('config', GA_ANALYTICS_ID, {
                //   anonymize_ip: true,
                //   cookie_expires: 63072000, // 2 years
                //   custom_map: { custom_parameter: 'dimension1' }
                // });

                // 📜 SCRIPT INJECTION: Load Google Analytics script dynamically
                const script = document.createElement('script');
                script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ANALYTICS_ID}`;
                script.async = true;
                document.body.appendChild(script);
                
                // 🔧 CHANGE: Add other analytics services:
                // loadFacebookPixel();
                // loadHotjar();
                // loadMixpanel();
                
              } catch (error) {
                console.error('Analytics initialization failed:', error);
                // 🔧 CHANGE: Add error reporting to monitoring service
              }
            },
            // ❌ CONSENT REJECTED: Cleanup when analytics rejected
            onReject: () => {
              // 🔧 CHANGE: Add cleanup logic:
              // clearAnalyticsCookies();
              // stopTrackingScripts();
              // sendOptOutSignal();
            },
          },
          // 🔧 ADD: Additional analytics services:
          // facebook: {
          //   label: 'Facebook Pixel',
          //   onAccept: () => loadFacebookPixel(),
          //   onReject: () => clearFacebookCookies(),
          // },
        },
      },
      
      // 🔧 ADD: Marketing/advertising cookie category:
      // marketing: {
      //   autoClear: {
      //     cookies: [
      //       { name: /^_fbp/ }, // Facebook
      //       { name: /^_gcl/ }, // Google Ads
      //     ],
      //   },
      //   services: {
      //     googleAds: { label: 'Google Ads', onAccept: () => {}, onReject: () => {} },
      //     facebook: { label: 'Facebook Ads', onAccept: () => {}, onReject: () => {} },
      //   },
      // },
    },

    // 🌐 LANGUAGE & TEXT: Banner content and translations
    language: {
      default: 'en', // 🔧 CHANGE: Default language code
      translations: {
        en: {
          // 💬 CONSENT MODAL: Main banner content
          consentModal: {
            title: 'We use cookies', // 🔧 CHANGE: Banner headline
            description:
              'We use cookies primarily for analytics to enhance your experience. By accepting, you agree to our use of these cookies. You can manage your preferences or learn more about our cookie policy.',
            // 🔧 CHANGE: Customize description text for your use case
            
            acceptAllBtn: 'Accept all', // 🔧 CHANGE: Accept button text
            acceptNecessaryBtn: 'Reject all', // 🔧 CHANGE: Reject button text
            // showPreferencesBtn: 'Manage Individual preferences', // 🔧 UNCOMMENT: Enable granular control
            
            // 🔗 LEGAL LINKS: Privacy policy and terms links
            footer: `
            <a href="<your-url-here>" target="_blank">Privacy Policy</a>
            <a href="<your-url-here>" target="_blank">Terms and Conditions</a>
                    `,
            // 🔧 CHANGE: Replace with your actual legal page URLs:
            // <a href="/privacy-policy">Privacy Policy</a>
            // <a href="/terms-of-service">Terms of Service</a>
            // <a href="/cookie-policy">Cookie Policy</a>
          },
          
          // ⚙️ PREFERENCES MODAL: Granular consent management
          preferencesModal: {
            sections: [], // 🔧 CHANGE: Add detailed preference sections
            // Example configuration:
            // sections: [
            //   {
            //     title: 'Cookie Categories',
            //     description: 'Choose which cookies you want to accept.',
            //   },
            //   {
            //     title: 'Necessary',
            //     description: 'Essential for website functionality.',
            //     linkedCategory: 'necessary',
            //   },
            //   {
            //     title: 'Analytics',
            //     description: 'Help us understand website usage.',
            //     linkedCategory: 'analytics',
            //   },
            // ],
          },
        },
        // 🔧 ADD: Additional language translations:
        // es: { consentModal: { title: 'Usamos cookies', ... } },
        // fr: { consentModal: { title: 'Nous utilisons des cookies', ... } },
        // de: { consentModal: { title: 'Wir verwenden Cookies', ... } },
      },
    },
  };

  return config;
};

export default getConfig;

// 🔧 TEMPLATE CUSTOMIZATION CHECKLIST:
// ✅ Update REACT_APP_GOOGLE_ANALYTICS_ID in environment variables
// ✅ Replace privacy policy and terms links
// ✅ Customize banner text and positioning
// ✅ Add additional cookie categories if needed
// ✅ Configure auto-clear cookies for each service
// ✅ Test in different browsers and devices
// ✅ Verify GDPR compliance for EU users
// ✅ Test analytics integration after consent
