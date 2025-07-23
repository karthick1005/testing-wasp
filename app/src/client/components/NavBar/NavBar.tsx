// 🧭 ROUTING: Import React Router and Wasp routing utilities
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as WaspRouterLink, routes } from 'wasp/client/router';
// 🔐 AUTHENTICATION: Import Wasp authentication hook
import { useAuth } from 'wasp/client/auth';
// ⚛️ REACT HOOKS: Import React state management
import { useState, Dispatch, SetStateAction } from 'react';
// 🎭 UI COMPONENTS: Import Headless UI modal component
import { Dialog } from '@headlessui/react';
// 🎨 ICONS: Import React Icons for UI elements
import { BiLogIn } from 'react-icons/bi'; // Login icon
import { AiFillCloseCircle } from 'react-icons/ai'; // Close icon
import { HiBars3 } from 'react-icons/hi2'; // Hamburger menu icon
// 🖼️ BRANDING: Import app logo
import logo from '../../static/logo.webp'; // 🔧 CHANGE: Replace with your logo path
// 👤 USER COMPONENTS: Import user-related components
import DropdownUser from '../../../user/DropdownUser'; // User profile dropdown
import { UserMenuItems } from '../../../user/UserMenuItems'; // User menu configuration
// 🌙 THEME: Import dark mode switcher component
import DarkModeSwitcher from '../DarkModeSwitcher';
// 🏠 PAGE DETECTION: Import landing page detection hook
import { useIsLandingPage } from '../../hooks/useIsLandingPage';
// 🎨 STYLING: Import conditional CSS class utility
import { cn } from '../../cn';

/**
 * 🧭 NAVIGATION ITEM INTERFACE: Structure for navigation menu items
 * 🔧 TEMPLATE USAGE: Define menu items in contentSections.ts files
 */
export interface NavigationItem {
  name: string; // 🔧 CHANGE: Display text for navigation item
  to: string; // 🔧 CHANGE: URL or route path
  // 🔧 CHANGE: Add additional fields (icon, external, description, etc.)
}

/**
 * 🏷️ LOGO COMPONENT: App logo for navigation bar
 * 🔧 TEMPLATE USAGE: Simple logo display with consistent sizing
 */
const NavLogo = () => <img className='h-8 w-8' src={logo} alt='Your SaaS App' />; 
// 🔧 CHANGE: Update alt text with your app name
// 🔧 CHANGE: Adjust h-8 w-8 for different logo sizes

/**
 * 🧭 MAIN NAVIGATION COMPONENT: Primary app navigation bar
 * 🔧 TEMPLATE USAGE: Responsive navigation with authentication support
 * Key features:
 * - Responsive design (mobile hamburger menu)
 * - User authentication state handling
 * - Landing page vs app page styling
 * - Dark mode support
 * - Mobile menu overlay
 * - User profile dropdown integration
 */
export default function AppNavBar({ navigationItems }: { navigationItems: NavigationItem[] }) {
  // 📱 MOBILE MENU STATE: Control mobile menu open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 🏠 PAGE TYPE DETECTION: Determine styling based on current page
  const isLandingPage = useIsLandingPage();
  
  // 👤 USER AUTHENTICATION: Get current user data and loading state
  const { data: user, isLoading: isUserLoading } = useAuth();
  
  return (
    <header
      className={cn('absolute inset-x-0 top-0 z-50 dark:bg-boxdark-2', {
        // 🎨 CONDITIONAL STYLING: Different styles for landing vs app pages
        'shadow sticky bg-white bg-opacity-50 backdrop-blur-lg backdrop-filter dark:border dark:border-gray-100/10':
          !isLandingPage,
        // 🔧 CHANGE: Customize navigation bar styling:
        // - absolute inset-x-0 top-0: positioning
        // - z-50: z-index layering
        // - bg-opacity-50 backdrop-blur-lg: glassmorphism effect
        // - shadow: drop shadow for app pages
      })}
    >
      {/* 📢 ANNOUNCEMENT BAR: Optional promotional banner on landing page */}
      {isLandingPage && <Announcement />}
      {/* 🔧 CHANGE: Customize or remove announcement component */}
      
      {/* 🧭 MAIN NAVIGATION: Primary navigation container */}
      <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        {/* ♿ ACCESSIBILITY: Proper aria-label for navigation */}
        
        {/* 🏠 LOGO AND BRAND AREA: Left side of navigation */}
        <div className='flex items-center lg:flex-1'>
          {/* 🔧 CHANGE: Adjust lg:flex-1 for logo area flex behavior */}
          
          {/* 🔗 LOGO LINK: Clickable logo that goes to landing page */}
          <WaspRouterLink
            to={routes.LandingPageRoute.to} // 🔧 CHANGE: Update route if landing page route changes
            className='flex items-center -m-1.5 p-1.5 text-gray-900 duration-300 ease-in-out hover:text-yellow-500'
            // 🔧 CHANGE: Customize logo styling:
            // - -m-1.5 p-1.5: negative margin with padding for larger click area
            // - duration-300 ease-in-out: smooth transition
            // - hover:text-yellow-500: hover color effect
          >
            {/* 🖼️ LOGO IMAGE: App logo component */}
            <NavLogo />
            
            {/* 📝 BRAND TEXT: App name (only shown on landing page) */}
            {isLandingPage && (
              <span className='ml-2 text-sm font-semibold leading-6 dark:text-white'>Your Saas</span>
              /* 🔧 CHANGE: Replace "Your Saas" with your app name */
              /* 🔧 CHANGE: Adjust ml-2 for spacing, text-sm for size */
            )}
          </WaspRouterLink>
        </div>
        
        {/* 📱 MOBILE MENU BUTTON: Hamburger menu for mobile devices */}
        <div className='flex lg:hidden'>
          {/* 🔧 CHANGE: lg:hidden means button is hidden on large screens */}
          
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white'
            // 🔧 CHANGE: Customize mobile menu button styling
            onClick={() => setMobileMenuOpen(true)}
          >
            {/* ♿ ACCESSIBILITY: Screen reader text for menu button */}
            <span className='sr-only'>Open main menu</span>
            {/* 🍔 HAMBURGER ICON: Three horizontal lines menu icon */}
            <HiBars3 className='h-6 w-6' aria-hidden='true' />
            {/* 🔧 CHANGE: Adjust h-6 w-6 for icon size */}
          </button>
        </div>
        
        {/* 🗂️ DESKTOP NAVIGATION LINKS: Horizontal menu links for large screens */}
        <div className='hidden lg:flex lg:gap-x-12'>
          {/* 🔧 CHANGE: Customize desktop navigation styling:
           * - hidden lg:flex: hidden on mobile, flex on large screens
           * - lg:gap-x-12: spacing between navigation items
           */}
          {renderNavigationItems(navigationItems)}
          {/* 🔧 CHANGE: navigationItems prop contains the menu items to display */}
        </div>
        
        {/* 👤 USER CONTROLS AREA: Right side authentication and user menu */}
        <div className='hidden lg:flex lg:flex-1 gap-3 justify-end items-center'>
          {/* 🔧 CHANGE: Customize user controls area:
           * - hidden lg:flex: hidden on mobile, flex on large screens
           * - lg:flex-1: flex grow to take available space
           * - gap-3: spacing between elements
           * - justify-end: align items to the right
           * - items-center: vertical center alignment
           */}
          
          {/* 🌙 THEME CONTROLS: Dark mode switcher */}
          <ul className='flex justify-center items-center gap-2 sm:gap-4'>
            {/* 🔧 CHANGE: Adjust gap-2 sm:gap-4 for theme control spacing */}
            <DarkModeSwitcher />
            {/* 🔧 CHANGE: Add additional theme controls or settings here */}
          </ul>
          
          {/* 🔐 AUTHENTICATION STATE: Conditional rendering based on user status */}
          {isUserLoading ? null : !user ? (
            /* 🔑 LOGIN LINK: Show login button when user is not authenticated */
            <WaspRouterLink to={routes.LoginRoute.to} className='text-sm font-semibold leading-6 ml-3'>
              {/* 🔧 CHANGE: Update route if login route changes */}
              {/* 🔧 CHANGE: Adjust ml-3 for spacing from theme controls */}
              <div className='flex items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white'>
                {/* 🔧 CHANGE: Customize login link styling:
                 * - flex items-center: horizontal layout with vertical centering
                 * - duration-300 ease-in-out: smooth hover transition
                 * - text-gray-900 hover:text-yellow-500: default and hover colors
                 * - dark:text-white: dark mode text color
                 */}
                Log in <BiLogIn size='1.1rem' className='ml-1 mt-[0.1rem]' />
                {/* 🔧 CHANGE: Replace "Log in" text and icon as needed */}
                {/* 🔧 CHANGE: Adjust ml-1 mt-[0.1rem] for icon positioning */}
              </div>
            </WaspRouterLink>
          ) : (
            /* 👤 USER DROPDOWN: Show user menu when authenticated */
            <div className='ml-3'>
              {/* 🔧 CHANGE: Adjust ml-3 for user dropdown spacing */}
              <DropdownUser user={user} />
              {/* 🔧 CHANGE: Customize DropdownUser component for user menu options */}
            </div>
          )}
        </div>
      </nav>
      
      {/* 📱 MOBILE MENU OVERLAY: Full-screen mobile menu dialog */}
      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        {/* 🔧 CHANGE: lg:hidden means dialog is only shown on mobile */}
        
        {/* 🎨 BACKDROP: Dark overlay behind mobile menu */}
        <div className='fixed inset-0 z-50' />
        {/* 🔧 CHANGE: Adjust z-50 z-index if conflicting with other overlays */}
        
        {/* 📱 MOBILE MENU PANEL: Sliding menu panel from right */}
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:text-white dark:bg-boxdark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          {/* 🔧 CHANGE: Customize mobile menu panel styling:
           * - bg-white/dark:bg-boxdark: background colors for light/dark mode
           * - px-6 py-6: internal padding
           * - sm:max-w-sm: maximum width on small screens
           * - sm:ring-1: border ring on small screens
           */}
          
          {/* 📱 MOBILE MENU HEADER: Logo and close button */}
          <div className='flex items-center justify-between'>
            {/* 🏷️ MOBILE LOGO: App logo in mobile menu */}
            <WaspRouterLink to={routes.LandingPageRoute.to} className='-m-1.5 p-1.5'>
              {/* 🔧 CHANGE: Update route if landing page route changes */}
              <span className='sr-only'>Your SaaS</span>
              {/* 🔧 CHANGE: Update screen reader text */}
              <NavLogo />
            </WaspRouterLink>
            
            {/* ❌ CLOSE BUTTON: Close mobile menu */}
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-50'
              onClick={() => setMobileMenuOpen(false)}
              // 🔧 CHANGE: Add custom close handler if needed
            >
              <span className='sr-only'>Close menu</span>
              {/* 🔧 CHANGE: Update screen reader text */}
              <AiFillCloseCircle className='h-6 w-6' aria-hidden='true' />
              {/* 🔧 CHANGE: Replace with different close icon */}
            </button>
          </div>
          
          {/* 📱 MOBILE MENU CONTENT: Navigation links and user controls */}
          <div className='mt-6 flow-root'>
            {/* 🔧 CHANGE: Adjust mt-6 for spacing from header */}
            <div className='-my-6 divide-y divide-gray-500/10'>
              {/* 🔧 CHANGE: Customize divider styling with divide-gray-500/10 */}
              
              {/* 🧭 MOBILE NAVIGATION LINKS: Menu items for mobile */}
              <div className='space-y-2 py-6'>
                {/* 🔧 CHANGE: Adjust space-y-2 py-6 for link spacing */}
                {renderNavigationItems(navigationItems, setMobileMenuOpen)}
              </div>
              
              {/* 👤 MOBILE USER CONTROLS: Authentication and user menu */}
              <div className='py-6'>
                {/* 🔧 CHANGE: Adjust py-6 for user controls spacing */}
                {isUserLoading ? null : !user ? (
                  /* 🔑 MOBILE LOGIN LINK: Login button for mobile */
                  <WaspRouterLink to={routes.LoginRoute.to}>
                    {/* 🔧 CHANGE: Update route if login route changes */}
                    <div className='flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white'>
                      {/* 🔧 CHANGE: Customize mobile login styling */}
                      Log in <BiLogIn size='1.1rem' className='ml-1' />
                      {/* 🔧 CHANGE: Replace login text and icon */}
                    </div>
                  </WaspRouterLink>
                ) : (
                  /* 👤 MOBILE USER MENU: User menu items for mobile */
                  <UserMenuItems user={user} setMobileMenuOpen={setMobileMenuOpen} />
                  /* 🔧 CHANGE: Customize UserMenuItems component */
                )}
              </div>
              {/* 🌙 MOBILE DARK MODE: Theme switcher for mobile */}
              <div className='py-6'>
                {/* 🔧 CHANGE: Adjust py-6 for dark mode switcher spacing */}
                <DarkModeSwitcher />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

/**
 * 🧭 NAVIGATION ITEMS RENDERER: Helper function to render navigation links
 * 🔧 TEMPLATE USAGE: Renders menu items differently for desktop vs mobile
 * 
 * @param navigationItems - Array of navigation menu items
 * @param setMobileMenuOpen - Optional mobile menu state setter (indicates mobile rendering)
 */
function renderNavigationItems(
  navigationItems: NavigationItem[],
  setMobileMenuOpen?: Dispatch<SetStateAction<boolean>>
) {
  // 🎨 CONDITIONAL STYLING: Different styles for mobile vs desktop
  const menuStyles = cn({
    // 📱 MOBILE MENU STYLES: Block layout with background hover
    '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-boxdark-2':
      !!setMobileMenuOpen,
    // 🖥️ DESKTOP MENU STYLES: Inline layout with color hover
    'text-sm font-semibold leading-6 text-gray-900 duration-300 ease-in-out hover:text-yellow-500 dark:text-white':
      !setMobileMenuOpen,
    // 🔧 CHANGE: Customize menu styling for different layouts
  });

  // 🔄 RENDER NAVIGATION ITEMS: Map through navigation items array
  return navigationItems.map((item) => {
    return (
      <ReactRouterLink
        to={item.to} // 🔧 CHANGE: Navigation destination
        key={item.name} // 🔧 CHANGE: Unique key for React rendering
        className={menuStyles} // 🎨 Apply conditional styling
        onClick={setMobileMenuOpen && (() => setMobileMenuOpen(false))}
        // 🔧 CHANGE: Add custom click handlers or analytics tracking
      >
        {item.name}
        {/* 🔧 CHANGE: Add icons or badges next to navigation item names */}
      </ReactRouterLink>
    );
  });
}

// 🔗 EXTERNAL LINK: Contest or promotion URL
// 🔧 CHANGE: Replace with your own promotional link
const ContestURL = 'https://github.com/wasp-lang/wasp';

/**
 * 📢 ANNOUNCEMENT COMPONENT: Promotional banner for landing page
 * 🔧 TEMPLATE USAGE: Top banner for promotions, announcements, or call-to-actions
 * 
 * Key features:
 * - Gradient background with brand colors
 * - Clickable promotion with external link
 * - Responsive design with different mobile/desktop content
 * - Hover effects for better interaction
 * - Call-to-action buttons with tracking
 */
function Announcement() {
  return (
    <div className='flex justify-center items-center gap-3 p-3 w-full bg-gradient-to-r from-[#d946ef] to-[#fc0] font-semibold text-white text-center z-49'>
      <p
        onClick={() => window.open(ContestURL, '_blank')}
        className='hidden lg:block cursor-pointer hover:opacity-90 hover:drop-shadow'
      >
        Support Open-Source Software!
      </p>
      <div className='hidden lg:block self-stretch w-0.5 bg-white'></div>
      <div
        onClick={() => window.open(ContestURL, '_blank')}
        className='hidden lg:block cursor-pointer rounded-full bg-neutral-700 px-2.5 py-1 text-xs hover:bg-neutral-600 tracking-wider'
      >
        Star Our Repo on Github ⭐️ →
      </div>
      <div
        onClick={() => window.open(ContestURL, '_blank')}
        className='lg:hidden cursor-pointer rounded-full bg-neutral-700 px-2.5 py-1 text-xs hover:bg-neutral-600 tracking-wider'
      >
        ⭐️ Star the Our Repo on Github and Support Open-Source! ⭐️
      </div>
    </div>
  );
}
