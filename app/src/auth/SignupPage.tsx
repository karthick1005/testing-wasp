// 🧭 ROUTING: Import Wasp routing utilities for navigation
import { Link as WaspRouterLink, routes } from 'wasp/client/router';
// 🔐 AUTHENTICATION: Import Wasp's built-in signup form component
import { SignupForm } from 'wasp/client/auth';
// 🎨 LAYOUT: Import shared authentication page layout
import { AuthPageLayout } from './AuthPageLayout';

/**
 * 📝 SIGNUP PAGE COMPONENT: User registration page
 * 🔧 TEMPLATE USAGE: Standard registration page with form and navigation
 * 
 * Key features:
 * - Uses Wasp's built-in SignupForm component
 * - Responsive design with AuthPageLayout
 * - Navigation link back to login page
 * - Automatic form validation and error handling
 * - Dark mode support
 * - Email verification flow (if configured)
 */
export function Signup() {
  return (
    <AuthPageLayout>
      {/* 🎨 AUTH LAYOUT: Shared layout component for all auth pages */}
      {/* 🔧 CHANGE: Customize AuthPageLayout for different styling */}
      
      {/* 📝 SIGNUP FORM: Wasp's built-in user registration form */}
      <SignupForm />
      {/* 🔧 FEATURES: Built-in form includes:
          - Email and password fields
          - Password strength validation
          - Form validation and error display
          - Loading states during submission
          - Social signup options (if configured)
          - Email verification trigger
          - Custom user fields (if defined in userSignupFields.ts) */}
      
      <br />
      {/* 📱 RESPONSIVE SPACING: Line break for visual separation */}
      
      {/* 🔗 LOGIN LINK: Navigation back to login page for existing users */}
      <span className='text-sm font-medium text-gray-900'>
        {/* 🔧 CHANGE: Customize text styling:
            - text-sm: font size
            - font-medium: font weight
            - text-gray-900: text color (note: no dark mode variant here) */}
        I already have an account (
        {/* 🔧 CHANGE: Replace text with your preferred messaging */}
        
        <WaspRouterLink to={routes.LoginRoute.to} className='underline'>
          {/* 🔗 LOGIN ROUTE: Link back to user login page */}
          {/* 🔧 CHANGE: Update route if you change login path */}
          {/* 🔧 CHANGE: Customize underline styling */}
          go to login
          {/* 🔧 CHANGE: Replace link text */}
        </WaspRouterLink>
        ).
      </span>
      
      <br />
      {/* 📱 RESPONSIVE SPACING: Final line break */}
    </AuthPageLayout>
  );
}
