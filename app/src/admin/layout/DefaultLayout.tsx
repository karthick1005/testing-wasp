// 🔐 AUTHENTICATION: Import AuthUser type for user data
import { type AuthUser } from 'wasp/auth';
// ⚛️ REACT: Import React hooks and types
import { useState, ReactNode, FC } from 'react';
// 🧩 LAYOUT COMPONENTS: Import admin layout components
import Header from './Header'; // Admin header with user menu and controls
import Sidebar from './Sidebar'; // Admin navigation sidebar

/**
 * 🏗️ LAYOUT PROPS: Interface for admin layout component
 * 🔧 TEMPLATE USAGE: Define required props for admin dashboard
 */
interface Props {
  user: AuthUser; // 🔧 CHANGE: User authentication data
  children?: ReactNode; // 🔧 CHANGE: Page content to render
  // 🔧 CHANGE: Add additional props if needed (theme, permissions, etc.)
}

/**
 * 🏗️ DEFAULT ADMIN LAYOUT: Main layout wrapper for admin dashboard pages
 * 🔧 TEMPLATE USAGE: Consistent layout with sidebar navigation and header
 * 
 * Key features:
 * - Responsive sidebar with mobile toggle
 * - Fixed header with user controls
 * - Scrollable main content area
 * - Dark mode support with theme classes
 * - Flexible content area for any admin page
 */
const DefaultLayout: FC<Props> = ({ children, user }) => {
  // 📱 SIDEBAR STATE: Control mobile sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 🔧 CHANGE: Set default sidebar state or add persistence

  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      {/* 🔧 CHANGE: Customize admin theme colors:
       * - dark:bg-boxdark-2: dark mode background
       * - dark:text-bodydark: dark mode text color
       */}
      
      {/* 📦 PAGE WRAPPER: Main layout container */}
      <div className='flex h-screen overflow-hidden'>
        {/* 🔧 CHANGE: Adjust layout structure:
         * - flex: horizontal layout (sidebar + content)
         * - h-screen: full viewport height
         * - overflow-hidden: prevent page scrolling
         */}
        
        {/* 🧭 SIDEBAR SECTION: Admin navigation menu */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* 🔧 CHANGE: Pass additional props to Sidebar (user role, permissions, etc.) */}
        
        {/* 📄 CONTENT AREA: Main page content wrapper */}
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          {/* 🔧 CHANGE: Customize content area styling:
           * - relative: positioning context
           * - flex flex-1 flex-col: flexible vertical layout
           * - overflow-y-auto: vertical scrolling
           * - overflow-x-hidden: prevent horizontal scroll
           */}
          
          {/* 🎯 HEADER SECTION: Top navigation and user controls */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
          {/* 🔧 CHANGE: Pass additional props to Header (notifications, settings, etc.) */}
          
          {/* 📝 MAIN CONTENT: Page-specific content area */}
          <main>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
              {/* 🔧 CHANGE: Customize content container:
               * - mx-auto: center content horizontally
               * - max-w-screen-2xl: maximum content width
               * - p-4 md:p-6 2xl:p-10: responsive padding
               */}
              {children}
              {/* 🔧 CHANGE: Add default content or wrapper components */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
