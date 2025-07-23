// 📊 TYPES: Import User entity type for TypeScript support
import type { User } from 'wasp/entities';
// 💳 PAYMENT: Import payment plan utilities and subscription types
import { SubscriptionStatus, prettyPaymentPlanName, parsePaymentPlanId } from '../payment/plans';
// 🔗 OPERATIONS: Import Wasp client operations for API calls
import { getCustomerPortalUrl, useQuery } from 'wasp/client/operations';
// 🧭 ROUTING: Import Wasp routing utilities
import { Link as WaspRouterLink, routes } from 'wasp/client/router';
// 🔐 AUTHENTICATION: Import logout function
import { logout } from 'wasp/client/auth';

/**
 * 👤 ACCOUNT PAGE COMPONENT: User account management and information display
 * 🔧 TEMPLATE USAGE: User profile and subscription management page
 * 
 * Key features:
 * - User information display (email, username)
 * - Subscription plan status and management
 * - Customer portal access for billing
 * - Account actions (logout)
 * - Responsive design with dark mode support
 * - Grid layout for organized information display
 */
export default function AccountPage({ user }: { user: User }) {
  // 🔧 CHANGE: Add additional user props if needed (avatar, preferences, etc.)

  return (
    <div className='mt-10 px-6'>
      {/* 🔧 CHANGE: Adjust mt-10 px-6 for different page spacing */}
      
      {/* 📋 ACCOUNT INFO CARD: Main account information container */}
      <div className='overflow-hidden border border-gray-900/10 shadow-lg sm:rounded-lg mb-4 lg:m-8 dark:border-gray-100/10'>
        {/* 🔧 CHANGE: Customize card styling:
         * - overflow-hidden: prevent content overflow
         * - border border-gray-900/10: subtle border with opacity
         * - shadow-lg: drop shadow effect
         * - sm:rounded-lg: rounded corners on small screens and up
         * - mb-4 lg:m-8: margin for spacing
         * - dark:border-gray-100/10: dark mode border
         */}
        
        {/* 📊 HEADER SECTION: Account information title */}
        <div className='px-4 py-5 sm:px-6 lg:px-8'>
          {/* 🔧 CHANGE: Adjust header padding (px-4 py-5 sm:px-6 lg:px-8) */}
          <h3 className='text-base font-semibold leading-6 text-gray-900 dark:text-white'>
            Account Information
            {/* 🔧 CHANGE: Replace with your account page title */}
          </h3>
        </div>
        
        {/* 📝 CONTENT SECTION: User details and information */}
        <div className='border-t border-gray-900/10 dark:border-gray-100/10 px-4 py-5 sm:p-0'>
          {/* 🔧 CHANGE: Customize content section styling */}
          
          {/* 📋 DEFINITION LIST: Structured user information display */}
          <dl className='sm:divide-y sm:divide-gray-900/10 sm:dark:divide-gray-100/10'>
            {/* 🔧 CHANGE: Customize list dividers and spacing */}
            
            {/* 📧 EMAIL FIELD: User email address (conditional display) */}
            {!!user.email && (
              // 🔧 CHANGE: Modify email field visibility logic
              <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                {/* 🔧 CHANGE: Adjust grid layout (sm:grid-cols-3 sm:gap-4) */}
                <dt className='text-sm font-medium text-gray-500 dark:text-white'>
                  Email address
                  {/* 🔧 CHANGE: Replace with your email field label */}
                </dt>
                <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-2 sm:mt-0'>
                  {user.email}
                  {/* 🔧 CHANGE: Add email verification status or formatting */}
                </dd>
              </div>
            )}
            
            {/* 👤 USERNAME FIELD: User username (conditional display) */}
            {!!user.username && (
              // 🔧 CHANGE: Modify username field visibility logic
              <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500 dark:text-white'>
                  Username
                  {/* 🔧 CHANGE: Replace with your username field label */}
                </dt>
                <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-2 sm:mt-0'>
                  {user.username}
                  {/* 🔧 CHANGE: Add username editing capability or formatting */}
                </dd>
              </div>
            )}
            
            {/* 💳 SUBSCRIPTION PLAN: User's current payment plan and status */}
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500 dark:text-white'>
                Your Plan
                {/* 🔧 CHANGE: Replace with your subscription field label */}
              </dt>
              {/* 💳 PAYMENT PLAN COMPONENT: Detailed subscription information */}
              <UserCurrentPaymentPlan
                subscriptionStatus={user.subscriptionStatus as SubscriptionStatus}
                subscriptionPlan={user.subscriptionPlan}
                datePaid={user.datePaid}
                credits={user.credits}
                // 🔧 CHANGE: Add additional subscription props if needed
              />
            </div>
            
            {/* 📝 ABOUT SECTION: User description or bio */}
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500 dark:text-white'>
                About
                {/* 🔧 CHANGE: Replace with your about field label */}
              </dt>
              <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-2 sm:mt-0'>
                I'm a cool customer.
                {/* 🔧 CHANGE: Replace with user bio field or make it editable */}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* 🚪 LOGOUT SECTION: User logout button container */}
      <div className='inline-flex w-full justify-end'>
        {/* 🔧 CHANGE: Adjust button container alignment (justify-end, justify-center, etc.) */}
        
        {/* 🚪 LOGOUT BUTTON: Sign out from account */}
        <button
          onClick={logout} // 🔐 WASP LOGOUT: Built-in logout function
          // 🔧 CHANGE: Add custom logout logic (analytics, cleanup, etc.)
          className='inline-flex justify-center mx-8 py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          // 🔧 CHANGE: Customize logout button styling:
          // - mx-8 py-2 px-4: margin and padding
          // - border border-transparent: button border
          // - shadow-md: drop shadow
          // - text-sm font-medium: text styling
          // - rounded-md: border radius
          // - text-white: text color
          // - bg-yellow-500 hover:bg-yellow-600: background colors
          // - focus:outline-none focus:ring-2: focus states
        >
          logout
          {/* 🔧 CHANGE: Replace with your logout button text */}
        </button>
      </div>
    </div>
  );
}

/**
 * 💳 USER PAYMENT PLAN COMPONENT: Display user's current subscription information
 * 🔧 TEMPLATE USAGE: Shows subscription status, plan details, and billing info
 */
type UserCurrentPaymentPlanProps = {
  subscriptionPlan: string | null; // 🔧 CHANGE: Payment plan identifier
  subscriptionStatus: SubscriptionStatus | null; // 🔧 CHANGE: Subscription state
  datePaid: Date | null; // 🔧 CHANGE: Last payment date
  credits: number; // 🔧 CHANGE: Available credits or usage allowance
  // 🔧 CHANGE: Add additional subscription props if needed (trial days, etc.)
};

/**
 * 💳 PAYMENT PLAN DISPLAY: Shows user's subscription details and management options
 * 🔧 TEMPLATE USAGE: Subscription status with customer portal access
 */
function UserCurrentPaymentPlan({
  subscriptionPlan,
  subscriptionStatus,
  datePaid,
  credits,
}: UserCurrentPaymentPlanProps) {
  // 💳 ACTIVE SUBSCRIPTION: Display for users with active paid plans
  if (subscriptionStatus && subscriptionPlan && datePaid) {
    // 🔧 CHANGE: Modify subscription validation logic if needed
    return (
      <>
        {/* 📊 SUBSCRIPTION INFO: Current plan and status description */}
        <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-1 sm:mt-0'>
          {getUserSubscriptionStatusDescription({ subscriptionPlan, subscriptionStatus, datePaid })}
          {/* 🔧 CHANGE: Customize subscription description formatting */}
        </dd>
        
        {/* 🎛️ MANAGEMENT ACTIONS: Subscription management buttons */}
        {subscriptionStatus !== SubscriptionStatus.Deleted ? <CustomerPortalButton /> : <BuyMoreButton />}
        {/* 🔧 CHANGE: Customize subscription management button logic */}
        {/* CustomerPortalButton: Manage active subscriptions */}
        {/* BuyMoreButton: Purchase new subscription for deleted accounts */}
      </>
    );
  }

  // 💰 CREDITS SYSTEM: Display for users without active subscriptions
  return (
    <>
      {/* 🪙 CREDITS DISPLAY: Show remaining credits for pay-per-use users */}
      <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-1 sm:mt-0'>
        Credits remaining: {credits}
        {/* 🔧 CHANGE: Customize credits display format or add usage history */}
      </dd>
      
      {/* 💳 PURCHASE BUTTON: Allow users to buy more credits or upgrade */}
      <BuyMoreButton />
      {/* 🔧 CHANGE: Replace with your credit purchase or upgrade component */}
    </>
  );
}

/**
 * 📝 SUBSCRIPTION DESCRIPTION: Generate human-readable subscription status
 * 🔧 TEMPLATE USAGE: Format subscription information for display
 */
function getUserSubscriptionStatusDescription({
  subscriptionPlan,
  subscriptionStatus,
  datePaid,
}: {
  subscriptionPlan: string;
  subscriptionStatus: SubscriptionStatus; // 🔧 CHANGE: Subscription state type
  datePaid: Date; // 🔧 CHANGE: Payment date for billing calculations
}) {
  // 🏷️ PLAN NAME: Convert plan ID to human-readable name
  const planName = prettyPaymentPlanName(parsePaymentPlanId(subscriptionPlan));
  // 🔧 CHANGE: Customize plan name formatting logic
  
  // 📅 BILLING PERIOD: Calculate end of current billing cycle
  const endOfBillingPeriod = prettyPrintEndOfBillingPeriod(datePaid);
  // 🔧 CHANGE: Adjust billing period calculation (monthly, yearly, etc.)
  
  // 📝 STATUS MESSAGE: Generate formatted status description
  return prettyPrintStatus(planName, subscriptionStatus, endOfBillingPeriod);
  // 🔧 CHANGE: Customize status message formatting
}

/**
 * 📝 STATUS MESSAGE FORMATTER: Generate user-friendly subscription status messages
 * 🔧 TEMPLATE USAGE: Convert subscription states to readable descriptions
 */
function prettyPrintStatus(
  planName: string, // 🔧 CHANGE: Subscription plan display name
  subscriptionStatus: SubscriptionStatus, // 🔧 CHANGE: Current subscription state
  endOfBillingPeriod: string // 🔧 CHANGE: Billing period end date string
): string {
  // 📋 STATUS MESSAGES: Map subscription states to user messages
  const statusToMessage: Record<SubscriptionStatus, string> = {
    // ✅ ACTIVE: Currently subscribed and paid
    active: `${planName}`,
    // 🔧 CHANGE: Customize active subscription message
    
    // ⚠️ PAST DUE: Payment failed, subscription at risk
    past_due: `Payment for your ${planName} plan is past due! Please update your subscription payment information.`,
    // 🔧 CHANGE: Customize past due warning message
    
    // 📅 CANCEL AT PERIOD END: Canceled but still active until billing end
    cancel_at_period_end: `Your ${planName} plan subscription has been canceled, but remains active until the end of the current billing period${endOfBillingPeriod}`,
    // 🔧 CHANGE: Customize cancellation message
    
    // ❌ DELETED: Subscription fully canceled and inactive
    deleted: `Your previous subscription has been canceled and is no longer active.`,
    // 🔧 CHANGE: Customize deleted subscription message
  };
  
  // 🔍 STATUS VALIDATION: Check if status exists in message map
  if (Object.keys(statusToMessage).includes(subscriptionStatus)) {
    return statusToMessage[subscriptionStatus];
  } else {
    // 🚨 ERROR HANDLING: Invalid subscription status
    throw new Error(`Invalid subscriptionStatus: ${subscriptionStatus}`);
    // 🔧 CHANGE: Customize error handling for unknown statuses
  }
}

/**
 * 📅 BILLING PERIOD FORMATTER: Calculate and format end of billing period
 * 🔧 TEMPLATE USAGE: Show when subscription will end or renew
 */
function prettyPrintEndOfBillingPeriod(date: Date) {
  // 📅 CALCULATE NEXT BILLING: Add one month to payment date
  const oneMonthFromNow = new Date(date);
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  // 🔧 CHANGE: Adjust billing period calculation (yearly: +12 months, etc.)
  
  // 📝 FORMAT DATE: Convert to locale-specific date string
  return ': ' + oneMonthFromNow.toLocaleDateString();
  // 🔧 CHANGE: Customize date formatting or add timezone handling
}

/**
 * 💳 BUY MORE BUTTON: Link to pricing/upgrade page
 * 🔧 TEMPLATE USAGE: Encourage users to purchase credits or upgrade plans
 */
function BuyMoreButton() {
  return (
    <div className='ml-4 flex-shrink-0 sm:col-span-1 sm:mt-0'>
      {/* 🔧 CHANGE: Adjust button container styling */}
      
      {/* 🔗 PRICING LINK: Navigate to pricing/purchase page */}
      <WaspRouterLink
        to={routes.PricingPageRoute.to} // 🔧 CHANGE: Update route if pricing page changes
        className='font-medium text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500'
        // 🔧 CHANGE: Customize link styling:
        // - font-medium text-sm: text weight and size
        // - text-indigo-600 dark:text-indigo-400: link colors
        // - hover:text-indigo-500: hover color effect
      >
        Buy More/Upgrade
        {/* 🔧 CHANGE: Replace with your upgrade button text */}
      </WaspRouterLink>
    </div>
  );
}

/**
 * 🎛️ CUSTOMER PORTAL BUTTON: Access to billing management portal
 * 🔧 TEMPLATE USAGE: Allow users to manage subscriptions, payment methods, etc.
 */
function CustomerPortalButton() {
  // 🔗 CUSTOMER PORTAL: Fetch portal URL from server
  const {
    data: customerPortalUrl, // Portal URL for current user
    isLoading: isCustomerPortalUrlLoading, // Loading state
    error: customerPortalUrlError, // Error state
  } = useQuery(getCustomerPortalUrl);
  // 🔧 CHANGE: Add error handling UI or loading states

  // 🖱️ CLICK HANDLER: Open customer portal in new tab
  const handleClick = () => {
    // 🚨 ERROR HANDLING: Log portal URL fetch errors
    if (customerPortalUrlError) {
      console.error('Error fetching customer portal url');
      // 🔧 CHANGE: Add user-facing error notification
    }

    // 🔗 OPEN PORTAL: Navigate to billing management
    if (customerPortalUrl) {
      window.open(customerPortalUrl, '_blank'); // Open in new tab
      // 🔧 CHANGE: Add analytics tracking for portal access
    } else {
      console.error('Customer portal URL is not available');
      // 🔧 CHANGE: Add user-facing unavailable message
    }
    }
  };

  return (
    <div className='ml-4 flex-shrink-0 sm:col-span-1 sm:mt-0'>
      <button
        onClick={handleClick}
        disabled={isCustomerPortalUrlLoading}
        className='font-medium text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
      >
        Manage Subscription
      </button>
    </div>
  );
}
