// ⚛️ REACT: Import React types for component children
import { ReactNode } from 'react';

/**
 * 🎨 AUTH PAGE LAYOUT COMPONENT: Shared layout for all authentication pages
 * 🔧 TEMPLATE USAGE: Consistent styling and structure for login, signup, password reset
 * 
 * Key features:
 * - Centered card layout with shadow
 * - Responsive design (mobile-first)
 * - Dark mode support
 * - Consistent spacing and padding
 * - Glass morphism effect with backdrop blur
 */
export function AuthPageLayout({children} : {children: ReactNode }) {
  return (
    <>
      {/* 🎯 MAIN CONTAINER: Full-height centered layout */}
      <div className='flex min-h-full flex-col justify-center pt-10 sm:px-6 lg:px-8'>
        {/* 🔧 CHANGE: Customize layout structure:
            - min-h-full: minimum full viewport height
            - flex-col: vertical flex layout
            - justify-center: vertical centering
            - pt-10: top padding
            - sm:px-6 lg:px-8: responsive horizontal padding */}
        
        {/* 📱 RESPONSIVE CARD CONTAINER: Centered card with max width */}
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          {/* 🔧 CHANGE: Customize card container:
              - sm:mx-auto: center horizontally on small screens+
              - sm:w-full: full width on small screens
              - sm:max-w-md: maximum width constraint */}
          
          {/* 🎨 AUTH CARD: Main authentication form container */}
          <div className='bg-white py-8 px-4 shadow-xl ring-1 ring-gray-900/10 sm:rounded-lg sm:px-10 dark:bg-white dark:text-gray-900'>
            {/* 🔧 CHANGE: Customize card styling:
                - bg-white: background color
                - py-8 px-4: padding (vertical and horizontal)
                - shadow-xl: drop shadow intensity
                - ring-1 ring-gray-900/10: subtle border ring
                - sm:rounded-lg: rounded corners on larger screens
                - sm:px-10: increased horizontal padding on larger screens
                - dark:bg-white dark:text-gray-900: dark mode override (keeps white for readability) */}
            
            {/* 📐 CONTENT AREA: Slight negative margin for visual adjustment */}
            <div className='-mt-8'>
              {/* 🔧 CHANGE: Adjust -mt-8 to modify top spacing inside card */}
              
              {/* 🧩 CHILDREN CONTENT: Rendered auth form and links */}
              { children }
              {/* This is where LoginForm, SignupForm, etc. are rendered */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
