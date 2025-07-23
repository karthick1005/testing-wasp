// ⚛️ REACT HOOKS: Import React effect hook
import { useEffect } from 'react';
// 🗃️ LOCAL STORAGE: Import local storage management hook
import useLocalStorage from './useLocalStorage';

/**
 * 🌙 COLOR MODE HOOK: Manage light/dark theme state with persistence
 * 🔧 TEMPLATE USAGE: Core theme management hook for dark mode functionality
 * 
 * Key features:
 * - Persistent theme storage in localStorage
 * - Automatic DOM class management for theme switching
 * - Default light mode with easy customization
 * - Reactive theme changes across the application
 * - Body class manipulation for CSS theme targeting
 * 
 * Usage:
 * const [colorMode, setColorMode] = useColorMode()
 * setColorMode('dark') // Switch to dark mode
 * setColorMode('light') // Switch to light mode
 */
export default function useColorMode() {
  // 🗃️ PERSISTENT THEME STATE: Store theme preference in localStorage
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');
  // 🔧 CHANGE: Modify localStorage key 'color-theme' if needed
  // 🔧 CHANGE: Change default theme from 'light' to 'dark' if desired

  // 🎨 THEME APPLICATION: Apply theme changes to DOM body class
  useEffect(() => {
    const className = 'dark'; // CSS class name for dark mode
    // 🔧 CHANGE: Modify 'dark' class name to match your CSS framework
    
    const bodyClass = window.document.body.classList;

    // 🔄 CONDITIONAL CLASS APPLICATION: Add/remove dark mode class
    colorMode === 'dark'
      ? bodyClass.add(className) // Add dark mode class
      : bodyClass.remove(className); // Remove dark mode class for light mode
    
    // 🔧 CHANGE: Add additional theme logic here:
    // - Update meta theme-color for mobile browsers
    // - Trigger custom theme change events
    // - Update CSS custom properties for theme colors
    // - Save user preference to user profile/database
  }, [colorMode]); // Re-run when colorMode changes

  // 📤 RETURN HOOK INTERFACE: Provide theme state and setter
  return [colorMode, setColorMode];
  // Returns array: [currentTheme, setThemeFunction]
  // 🔧 CHANGE: Add additional theme-related functions to return value
};

// 🔧 TEMPLATE CUSTOMIZATION NOTES:
// - Integrate with system theme preference detection
// - Add theme transition animations
// - Support multiple theme variants (not just light/dark)
// - Add theme-specific CSS custom property updates

