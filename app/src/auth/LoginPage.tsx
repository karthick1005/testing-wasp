// 🧭 ROUTING: Import Wasp routing utilities for navigation
import { Link as WaspRouterLink, routes } from 'wasp/client/router';
// 🔐 AUTHENTICATION: Import Wasp's built-in login form component
import { LoginForm } from 'wasp/client/auth';
// 🎨 LAYOUT: Import shared authentication page layout
import { AuthPageLayout } from './AuthPageLayout';

/**
 * 🔐 LOGIN PAGE COMPONENT: User authentication login page
 * 🔧 TEMPLATE USAGE: Standard login page with form and navigation links
 * 
 * Key features:
 * - Uses Wasp's built-in LoginForm component
 * - Responsive design with AuthPageLayout
 * - Navigation links to signup and password reset
 * - Dark mode support
 * - Proper form validation and error handling
 */
export default function Login() {
  return (
    <AuthPageLayout>
      {/* 🎨 AUTH LAYOUT: Shared layout component for all auth pages */}
      {/* 🔧 CHANGE: Customize AuthPageLayout for different styling */}
      
      {/* 🔐 LOGIN FORM: Wasp's built-in authentication form */}
      <LoginForm />
      {/* 🔧 FEATURES: Built-in form includes:
          - Email/password fields
          - Form validation
          - Error message display
          - Loading states
          - Social login options (if configured)
          - Remember me checkbox */}
      
      <br />
      {/* 📱 RESPONSIVE SPACING: Line break for visual separation */}
      
      {/* 📝 SIGNUP LINK: Navigation to user registration */}
      <span className='text-sm font-medium text-gray-900 dark:text-gray-900'>
        {/* 🔧 CHANGE: Customize text styling:
            - text-sm: font size
            - font-medium: font weight
            - text-gray-900: text color
            - dark:text-gray-900: dark mode text color */}
        Don't have an account yet?{' '}
        {/* 🔧 CHANGE: Replace text with your preferred messaging */}
        
        <WaspRouterLink to={routes.SignupRoute.to} className='underline'>
          {/* 🔗 SIGNUP ROUTE: Link to user registration page */}
          {/* 🔧 CHANGE: Update route if you change signup path */}
          {/* 🔧 CHANGE: Customize underline styling */}
          go to signup
          {/* 🔧 CHANGE: Replace link text */}
        </WaspRouterLink>
        .
      </span>
      
      <br />
      {/* 📱 RESPONSIVE SPACING: Another line break for separation */}
      
      {/* 🔄 PASSWORD RESET LINK: Navigation to password recovery */}
      <span className='text-sm font-medium text-gray-900'>
        {/* 🔧 CHANGE: Same styling options as signup link above */}
        Forgot your password?{' '}
        {/* 🔧 CHANGE: Replace text with your preferred messaging */}
        
        <WaspRouterLink to={routes.RequestPasswordResetRoute.to} className='underline'>
          {/* 🔗 PASSWORD RESET ROUTE: Link to password reset request page */}
          {/* 🔧 CHANGE: Update route if you change password reset path */}
          {/* 🔧 CHANGE: Customize underline styling */}
          reset it
          {/* 🔧 CHANGE: Replace link text */}
        </WaspRouterLink>
        .
      </span>
    </AuthPageLayout>
  );
}
