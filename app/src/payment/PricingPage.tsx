// 🔐 AUTHENTICATION: Import user authentication hook
import { useAuth } from 'wasp/client/auth';
// 💳 PAYMENT OPERATIONS: Import payment-related API operations
import { generateCheckoutSession, getCustomerPortalUrl, useQuery } from 'wasp/client/operations';
// 📊 PAYMENT PLANS: Import payment plan configurations and utilities
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName, SubscriptionStatus } from './plans';
// 🎨 ICONS: Import React icons for UI elements
import { AiFillCheckCircle } from 'react-icons/ai';
// ⚛️ REACT HOOKS: Import React state and navigation hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 🎨 STYLING: Import utility for conditional CSS classes
import { cn } from '../client/cn';

// 🏆 BEST DEAL CONFIGURATION: Define which plan to highlight as best value
// 🔧 CHANGE: Update to highlight your preferred plan
const bestDealPaymentPlanId: PaymentPlanId = PaymentPlanId.Pro;

// 💳 PAYMENT PLAN CARD INTERFACE: TypeScript interface for plan display data
// 🔧 TEMPLATE USAGE: Structure for each pricing plan card
interface PaymentPlanCard {
  name: string; // 🔧 CHANGE: Plan display name
  price: string; // 🔧 CHANGE: Plan price (display format)
  description: string; // 🔧 CHANGE: Plan description/tagline
  features: string[]; // 🔧 CHANGE: List of plan features
}

// 🎨 PRICING CARDS CONFIGURATION: Define display data for each payment plan
// 🔧 TEMPLATE USAGE: Customize pricing plans, features, and descriptions
export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
  // 🏠 HOBBY PLAN: Entry-level plan configuration
  [PaymentPlanId.Hobby]: {
    name: prettyPaymentPlanName(PaymentPlanId.Hobby), // 🔧 CHANGE: Plan name
    price: '$9.99', // 🔧 CHANGE: Plan price display
    description: 'All you need to get started', // 🔧 CHANGE: Plan description
    features: ['Limited monthly usage', 'Basic support'], // 🔧 CHANGE: Plan features list
  },
  // 🚀 PRO PLAN: Professional plan configuration
  [PaymentPlanId.Pro]: {
    name: prettyPaymentPlanName(PaymentPlanId.Pro), // 🔧 CHANGE: Plan name
    price: '$19.99', // 🔧 CHANGE: Plan price display
    description: 'Our most popular plan', // 🔧 CHANGE: Plan description
    features: ['Unlimited monthly usage', 'Priority customer support'], // 🔧 CHANGE: Plan features list
  },
  // 💰 CREDITS PLAN: One-time purchase plan configuration
  [PaymentPlanId.Credits10]: {
    name: prettyPaymentPlanName(PaymentPlanId.Credits10), // 🔧 CHANGE: Plan name
    price: '$9.99', // 🔧 CHANGE: Plan price display
    description: 'One-time purchase of 10 credits for your account', // 🔧 CHANGE: Plan description
    features: ['Use credits for e.g. OpenAI API calls', 'No expiration date'], // 🔧 CHANGE: Plan features list
  },
};

/**
 * 💳 PRICING PAGE COMPONENT: Main pricing and subscription management page
 * 🔧 TEMPLATE USAGE: Core monetization page for SaaS applications
 * Key features:
 * - Displays pricing plans in responsive grid
 * - Handles subscription purchases via Stripe/LemonSqueezy
 * - Manages existing subscription portal access
 * - Supports both subscription and credit-based models
 * - Responsive design with dark mode support
 */
const PricingPage = () => {
  // 💫 LOADING STATE: Track payment processing status
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  // ❌ ERROR HANDLING: Store and display error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 👤 USER AUTHENTICATION: Get current user data and auth status
  const { data: user } = useAuth();
  // 🔐 SUBSCRIPTION CHECK: Determine if user has active subscription
  const isUserSubscribed =
    !!user && !!user.subscriptionStatus && user.subscriptionStatus !== SubscriptionStatus.Deleted;

  // 🔗 CUSTOMER PORTAL: Fetch customer portal URL for subscription management
  const {
    data: customerPortalUrl, // URL to payment provider's customer portal
    isLoading: isCustomerPortalUrlLoading, // Loading state for portal URL
    error: customerPortalUrlError, // Error state for portal URL fetch
  } = useQuery(getCustomerPortalUrl, { enabled: isUserSubscribed });
  // 🔧 CHANGE: Customer portal is only fetched for subscribed users

  // 🧭 NAVIGATION: React Router navigation hook
  const navigate = useNavigate();

  /**
   * 💳 PURCHASE HANDLER: Handle "Buy Now" button clicks
   * 🔧 TEMPLATE USAGE: Core payment flow initiation
   * Process:
   * 1. Check user authentication
   * 2. Generate checkout session via payment processor
   * 3. Redirect to payment provider's checkout page
   * 4. Handle errors gracefully
   */
  async function handleBuyNowClick(paymentPlanId: PaymentPlanId) {
    // 🔐 AUTHENTICATION CHECK: Redirect to login if user not authenticated
    if (!user) {
      navigate('/login'); // 🔧 CHANGE: Update login route if different
      return;
    }
    
    try {
      // 🔄 LOADING STATE: Show loading indicator during payment processing
      setIsPaymentLoading(true);

      // 💳 CHECKOUT SESSION: Generate payment provider checkout URL
      const checkoutResults = await generateCheckoutSession(paymentPlanId);
      // 🔧 BACKEND: This calls your payment processor (Stripe/LemonSqueezy)

      // 🌐 REDIRECT TO CHECKOUT: Open payment provider's checkout page
      if (checkoutResults?.sessionUrl) {
        window.open(checkoutResults.sessionUrl, '_self'); // Same window redirect
        // 🔧 CHANGE: Use '_blank' for new window if preferred
      } else {
        throw new Error('Error generating checkout session URL');
      }
    } catch (error: unknown) {
      // ❌ ERROR HANDLING: Log and display user-friendly error messages
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message); // Display specific error message
      } else {
        setErrorMessage('Error processing payment. Please try again later.');
        // 🔧 CHANGE: Customize generic error message
      }
      setIsPaymentLoading(false); // Reset loading state on error
      // Note: Loading state is not reset in try block because we redirect
    }
  }

  /**
   * 🔗 CUSTOMER PORTAL HANDLER: Handle subscription management portal access
   * 🔧 TEMPLATE USAGE: Allow users to manage existing subscriptions
   * Features:
   * - Cancel subscriptions
   * - Update payment methods
   * - View billing history
   * - Change subscription plans
   */
  const handleCustomerPortalClick = () => {
    // 🔐 AUTHENTICATION CHECK: Redirect to login if user not authenticated
    if (!user) {
      navigate('/login'); // 🔧 CHANGE: Update login route if different
      return;
    }

    // ❌ ERROR HANDLING: Check for portal URL fetch errors
    if (customerPortalUrlError) {
      setErrorMessage('Error fetching Customer Portal URL');
      // 🔧 CHANGE: Customize error message
      return;
    }

    // 🔗 PORTAL ACCESS: Ensure portal URL exists before opening
    if (!customerPortalUrl) {
      setErrorMessage(`Customer Portal does not exist for user ${user.id}`);
      // 🔧 CHANGE: Customize error message
      return;
    }

    // 🌐 OPEN PORTAL: Open customer portal in new tab
    window.open(customerPortalUrl, '_blank');
    // 🔧 CHANGE: Use '_self' for same window if preferred
  };

  return (
    <div>
      {/* 💳 PRICING PAGE CONTAINER: Main pricing section wrapper */}
      <div className='py-10 lg:mt-10'>
        {/* 🔧 CHANGE: Adjust py-10 and lg:mt-10 for spacing */}
        
        {/* 📐 CONTENT CONTAINER: Max-width container with responsive padding */}
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          {/* 🔧 CHANGE: Adjust max-w-7xl for content width */}
          
          {/* 📝 SECTION HEADER: Pricing page title */}
          <div id='pricing' className='mx-auto max-w-4xl text-center'>
            {/* 🔧 CHANGE: Adjust max-w-4xl for header width */}
            
            {/* 🎯 MAIN TITLE: Pricing section headline */}
            <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
              {/* 🔧 CHANGE: Replace with your pricing headline */}
              Pick your <span className='text-yellow-500'>pricing</span>
              {/* 🔧 CHANGE: Customize highlight color (text-yellow-500) */}
            </h2>
          </div>
          
          {/* 📄 PRICING DESCRIPTION: Subtitle and instructions */}
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white'>
            {/* 🔧 CHANGE: Replace with your pricing page description */}
            Choose between Stripe and LemonSqueezy as your payment provider. Just add your Product IDs! Try it
            out below with test credit card number <br />
            {/* 💳 TEST CARD: Display test credit card for demo purposes */}
            <span className='px-2 py-1 bg-gray-100 rounded-md text-gray-500'>4242 4242 4242 4242 4242</span>
            {/* 🔧 CHANGE: Remove test card info in production */}
          </p>
          
          {/* ❌ ERROR MESSAGE DISPLAY: Show payment errors to users */}
          {errorMessage && (
            <div className='mt-8 p-4 bg-red-100 text-red-600 rounded-md dark:bg-red-200 dark:text-red-800'>
              {/* 🔧 CHANGE: Customize error styling */}
              {errorMessage}
            </div>
          )}
          
          {/* 🎨 PRICING CARDS GRID: Responsive grid layout for pricing plans */}
          <div className='isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 lg:gap-x-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {/* 🔧 CHANGE: Customize grid layout:
                - grid-cols-1: single column on mobile
                - lg:grid-cols-3: three columns on large screens
                - gap-y-8 lg:gap-x-8: spacing between cards
                - mt-16 sm:mt-20: top margin */}
            
            {/* 🔄 PLAN MAPPING: Render each pricing plan card */}
            {Object.values(PaymentPlanId).map((planId) => (
            <div
              key={planId}
              className={cn(
                'relative flex flex-col grow justify-between rounded-3xl ring-gray-900/10 dark:ring-gray-100/10 overflow-hidden p-8 xl:p-10',
                {
                  'ring-2': planId === bestDealPaymentPlanId,
                  'ring-1 lg:mt-8': planId !== bestDealPaymentPlanId,
                }
              )}
            >
              {planId === bestDealPaymentPlanId && (
                <div
                  className='absolute top-0 right-0 -z-10 w-full h-full transform-gpu blur-3xl'
                  aria-hidden='true'
                >
                  <div
                    className='absolute w-full h-full bg-gradient-to-br from-amber-400 to-purple-300 opacity-30 dark:opacity-50'
                    style={{
                      clipPath: 'circle(670% at 50% 50%)',
                    }}
                  />
                </div>
              )}
              <div className='mb-8'>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3 id={planId} className='text-gray-900 text-lg font-semibold leading-8 dark:text-white'>
                    {paymentPlanCards[planId].name}
                  </h3>
                </div>
                <p className='mt-4 text-sm leading-6 text-gray-600 dark:text-white'>
                  {paymentPlanCards[planId].description}
                </p>
                <p className='mt-6 flex items-baseline gap-x-1 dark:text-white'>
                  <span className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {paymentPlanCards[planId].price}
                  </span>
                  <span className='text-sm font-semibold leading-6 text-gray-600 dark:text-white'>
                    {paymentPlans[planId].effect.kind === 'subscription' && '/month'}
                  </span>
                </p>
                <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-white'>
                  {paymentPlanCards[planId].features.map((feature) => (
                    <li key={feature} className='flex gap-x-3'>
                      <AiFillCheckCircle className='h-6 w-5 flex-none text-yellow-500' aria-hidden='true' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {isUserSubscribed ? (
                <button
                  onClick={handleCustomerPortalClick}
                  disabled={isCustomerPortalUrlLoading}
                  aria-describedby='manage-subscription'
                  className={cn(
                    'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400',
                    {
                      'bg-yellow-500 text-white hover:text-white shadow-sm hover:bg-yellow-400':
                        planId === bestDealPaymentPlanId,
                      'text-gray-600 ring-1 ring-inset ring-purple-200 hover:ring-purple-400':
                        planId !== bestDealPaymentPlanId,
                    }
                  )}
                >
                  Manage Subscription
                </button>
              ) : (
                <button
                  onClick={() => handleBuyNowClick(planId)}
                  aria-describedby={planId}
                  className={cn(
                    {
                      'bg-yellow-500 text-white hover:text-white shadow-sm hover:bg-yellow-400':
                        planId === bestDealPaymentPlanId,
                      'text-gray-600  ring-1 ring-inset ring-purple-200 hover:ring-purple-400':
                        planId !== bestDealPaymentPlanId,
                    },
                    {
                      'opacity-50 cursor-wait': isPaymentLoading,
                    },
                    'mt-8 block rounded-md py-2 px-3 text-center text-sm dark:text-white font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400'
                  )}
                  disabled={isPaymentLoading}
                >
                  {!!user ? 'Buy plan' : 'Log in to buy plan'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
