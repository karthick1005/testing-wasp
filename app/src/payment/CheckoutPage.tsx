// ⚛️ REACT HOOKS: Import React state and lifecycle management
import { useEffect, useState } from 'react';
// 🧭 ROUTING: Import React Router navigation hooks
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * 💳 CHECKOUT PAGE: Payment processing result and redirect page
 * 🔧 TEMPLATE USAGE: Handle payment success/failure from Stripe/LemonSqueezy
 * 
 * Key features:
 * - URL parameter parsing for payment status
 * - Automatic redirect to account page
 * - User-friendly payment status messages
 * - Error handling for payment failures
 * - Loading state management
 * - Responsive design with consistent styling
 */
export default function CheckoutPage() {
  // 💳 PAYMENT STATUS: Track current payment processing state
  const [paymentStatus, setPaymentStatus] = useState('loading');
  // 🔧 CHANGE: Add additional payment states if needed (processing, refunding, etc.)

  // 🧭 NAVIGATION: Router hooks for programmatic navigation
  const navigate = useNavigate(); // Navigate to different routes
  const location = useLocation(); // Access current URL and search params
  // 🔧 CHANGE: Add navigation state or custom redirect logic

  // 🔄 PAYMENT PROCESSING: Handle payment result and redirect logic
  useEffect(() => {
    /**
     * ⏰ DELAYED REDIRECT: Auto-redirect user after showing status
     * 🔧 TEMPLATE USAGE: Give user time to read payment result
     */
    function delayedRedirect() {
      return setTimeout(() => {
        navigate('/account'); // Redirect to account page
        // 🔧 CHANGE: Redirect to different page (dashboard, pricing, etc.)
      }, 4000); // 4 second delay
      // 🔧 CHANGE: Adjust redirect timing or make it user-controlled
    }

    // 🔍 URL PARSING: Extract payment status from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const isSuccess = queryParams.get('success'); // Stripe success parameter
    const isCanceled = queryParams.get('canceled'); // Stripe canceled parameter
    // 🔧 CHANGE: Add additional payment processor parameters (LemonSqueezy, etc.)

    // 💳 STATUS DETERMINATION: Set payment status based on URL parameters
    if (isCanceled) {
      setPaymentStatus('canceled'); // User canceled payment
      // 🔧 CHANGE: Add custom canceled payment logic (analytics, etc.)
    } else if (isSuccess) {
      setPaymentStatus('paid'); // Payment successful
      // 🔧 CHANGE: Add custom success logic (analytics, notifications, etc.)
    } else {
      // No valid payment parameters, redirect immediately
      navigate('/account');
      // 🔧 CHANGE: Redirect to different fallback page
    }
    
    // Start redirect timer
    delayedRedirect();
    
    // Cleanup: Clear timeout on component unmount
    return () => {
      clearTimeout(delayedRedirect());
    };
  }, [location]); // Re-run when location changes

  return (
    <div className='flex min-h-full flex-col justify-center mt-10 sm:px-6 lg:px-8'>
      {/* 🔧 CHANGE: Customize page layout styling:
       * - flex min-h-full flex-col justify-center: full height centered layout
       * - mt-10: top margin
       * - sm:px-6 lg:px-8: responsive horizontal padding
       */}
      
      {/* 📦 CONTENT CONTAINER: Centered content card */}
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        {/* 🔧 CHANGE: Adjust container width (sm:max-w-md) */}
        
        {/* 💳 STATUS CARD: Payment result display card */}
        <div className='py-8 px-4 shadow-xl ring-1 ring-gray-900/10 dark:ring-gray-100/10 sm:rounded-lg sm:px-10'>
          {/* 🔧 CHANGE: Customize card styling:
           * - py-8 px-4: internal padding
           * - shadow-xl: drop shadow
           * - ring-1 ring-gray-900/10: subtle border ring
           * - dark:ring-gray-100/10: dark mode border
           * - sm:rounded-lg: rounded corners on small screens and up
           * - sm:px-10: larger horizontal padding on small screens
           */}
          
          {/* 📝 STATUS TITLE: Payment result heading with emojis */}
          <h1>
            {paymentStatus === 'paid'
              ? '🥳 Payment Successful!'
              // 🔧 CHANGE: Customize success message and emoji
              : paymentStatus === 'canceled'
                ? '😢 Payment Canceled'
                // 🔧 CHANGE: Customize canceled message and emoji
                : paymentStatus === 'error' && '🙄 Payment Error'}
                {/* 🔧 CHANGE: Add additional payment status messages */}
          </h1>
          
          {/* 📄 REDIRECT MESSAGE: User notification about automatic redirect */}
          {paymentStatus !== 'loading' && (
            <span className='text-center'>
              You are being redirected to your account page... <br />
              {/* 🔧 CHANGE: Customize redirect message or add manual navigation option */}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
