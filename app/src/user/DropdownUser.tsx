// 📊 TYPES: Import User entity type for TypeScript support
import { type User } from 'wasp/entities';
// ⚛️ REACT HOOKS: Import React hooks for state and DOM management
import { useEffect, useRef, useState } from 'react';
// 🎭 ICONS: Import React icons for user interface
import { CgProfile } from 'react-icons/cg'; // User profile icon
// 👤 USER COMPONENTS: Import user menu items component
import { UserMenuItems } from './UserMenuItems';
// 🎨 STYLING: Import conditional CSS class utility
import { cn } from '../client/cn';

/**
 * 👤 USER DROPDOWN COMPONENT: User profile dropdown menu
 * 🔧 TEMPLATE USAGE: User account access in navigation bars
 * 
 * Key features:
 * - Click-outside-to-close functionality
 * - Keyboard navigation (ESC to close)
 * - Responsive design with username display
 * - Animated dropdown arrow
 * - Dark mode support
 * - User menu integration
 */
const DropdownUser = ({ user }: { user: Partial<User> }) => {
  // 🔧 CHANGE: Add additional user props if needed (e.g., avatar, role)
  
  // 📱 DROPDOWN STATE: Control dropdown open/close state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // 🔧 CHANGE: Add default open state or persistence if needed

  // 🎯 DOM REFERENCES: Reference DOM elements for click detection
  const trigger = useRef<any>(null); // Dropdown trigger button reference
  const dropdown = useRef<any>(null); // Dropdown panel reference
  // 🔧 CHANGE: Type refs more strictly if needed (HTMLButtonElement, etc.)

  // 🔄 TOGGLE FUNCTION: Toggle dropdown open/close state
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  // 🔧 CHANGE: Add custom toggle logic (e.g., analytics tracking)

  // 🖱️ CLICK OUTSIDE HANDLER: Close dropdown when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return; // Exit if dropdown ref not available
      
      // Keep dropdown open if clicking inside dropdown or trigger
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) {
        return;
      }
      
      // Close dropdown if clicking outside
      setDropdownOpen(false);
      // 🔧 CHANGE: Add custom close logic here if needed
    };
    
    // Add event listener for click detection
    document.addEventListener('click', clickHandler);
    // Cleanup event listener on component unmount
    return () => document.removeEventListener('click', clickHandler);
  });

  // ⌨️ KEYBOARD HANDLER: Close dropdown with ESC key
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      // Only handle ESC key (keyCode 27) when dropdown is open
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
      // 🔧 CHANGE: Add additional keyboard shortcuts if needed
    };
    
    // Add keyboard event listener
    document.addEventListener('keydown', keyHandler);
    // Cleanup event listener on component unmount
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative'>
      {/* 🔧 CHANGE: Add positioning classes for different layouts */}
      
      {/* 👤 DROPDOWN TRIGGER: User profile button */}
      <button
        ref={trigger} // Reference for click-outside detection
        onClick={toggleDropdown} // Toggle dropdown on click
        className='flex items-center gap-4 duration-300 ease-in-out text-gray-900 hover:text-yellow-500'
        // 🔧 CHANGE: Customize trigger button styling:
        // - gap-4: space between username and icon
        // - duration-300 ease-in-out: smooth hover transition
        // - text-gray-900: default text color
        // - hover:text-yellow-500: hover color effect
      >
        {/* 📝 USERNAME DISPLAY: User's display name (hidden on mobile) */}
        <span className='hidden text-right lg:block'>
          {/* 🔧 CHANGE: Adjust lg:block breakpoint for username visibility */}
          <span className='block text-sm font-medium dark:text-white'>
            {user.username}
            {/* 🔧 CHANGE: Replace with user.displayName or other field if available */}
          </span>
        </span>
        
        {/* 👤 PROFILE ICON: User profile icon */}
        <CgProfile size='1.1rem' className='ml-1 mt-[0.1rem] dark:text-white' />
        {/* 🔧 CHANGE: Replace with different profile icon or user avatar */}
        {/* 🔧 CHANGE: Adjust ml-1 mt-[0.1rem] for icon positioning */}
        
        {/* 🔽 DROPDOWN ARROW: Animated arrow indicator */}
        <svg
          className={cn('hidden fill-current dark:fill-white sm:block', {
            'rotate-180': dropdownOpen, // Rotate arrow when dropdown is open
            // 🔧 CHANGE: Customize arrow rotation and visibility
          })}
          width='12' // 🔧 CHANGE: Adjust arrow size
          height='8'
          viewBox='0 0 12 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          })}
          width='12'
          height='8'
          viewBox='0 0 12 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z'
            fill=''
          />
        </svg>
      </button>

      {/* <!-- Dropdown --> */}
      <div
        ref={dropdown}
        className={cn(
          'absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white',
          {
            hidden: !dropdownOpen,
          }
        )}
      >
        <UserMenuItems user={user} setMobileMenuOpen={toggleDropdown} />
      </div>
    </div>
  );
};

export default DropdownUser;
