// 🎨 STYLING: Import conditional CSS class utility
import { cn } from '../cn';
// 🌙 THEME HOOK: Import color mode management hook
import useColorMode from '../hooks/useColorMode';

/**
 * 🌙 DARK MODE SWITCHER: Toggle between light and dark themes
 * 🔧 TEMPLATE USAGE: Theme switcher component for user interface customization
 * 
 * Key features:
 * - Smooth toggle animation with visual feedback
 * - Accessible checkbox input with proper labels
 * - Dynamic icons (sun/moon) based on current theme
 * - Responsive design that works across all screen sizes
 * - Integrated with global color mode state management
 * - Stylish toggle switch with brand colors
 */
const DarkModeSwitcher = () => {
  // 🎨 COLOR MODE STATE: Get current theme and setter function
  const [colorMode, setColorMode] = useColorMode();
  // 🔧 CHANGE: Add localStorage key configuration if needed
  
  // 🌞 THEME CHECK: Determine if currently in light mode
  const isInLightMode = colorMode === 'light';

  return (
    <div>
      {/* 🔘 TOGGLE CONTAINER: Visual toggle switch wrapper */}
      <label 
        className={cn(
          'relative m-0 block h-7.5 w-14 rounded-full', 
          isInLightMode ? 'bg-stroke' : 'bg-primary'
        )}
        // 🔧 CHANGE: Customize toggle switch styling:
        // - h-7.5 w-14: toggle switch dimensions
        // - rounded-full: circular ends
        // - bg-stroke/bg-primary: background colors for light/dark modes
      >
        {/* ♿ ACCESSIBLE INPUT: Hidden checkbox for screen readers and keyboard navigation */}
        <input
          type='checkbox'
          onChange={() => {
            // 🔄 THEME TOGGLE: Switch between light and dark modes
            if (typeof setColorMode === 'function') {
              setColorMode(isInLightMode ? 'dark' : 'light');
              // 🔧 CHANGE: Add custom theme change callbacks here
              // - Analytics tracking for theme preference
              // - Local storage persistence
              // - System theme detection
            }
          }}
          className='absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0'
          // 🔧 CHANGE: Customize checkbox input:
          // - absolute positioning to cover entire toggle area
          // - z-50: high z-index for clickability
          // - opacity-0: invisible but functional
          // - cursor-pointer: pointer cursor on hover
        />
        
        {/* 🎯 TOGGLE INDICATOR: Moving circle with icon */}
        <span
          className={cn(
            'absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-200 ease-linear',
            {
              '!right-[3px] !translate-x-full': !isInLightMode,
              // 🔧 CHANGE: Customize dark mode position and animation
            }
          )}
          // 🔧 CHANGE: Customize toggle indicator styling:
          // - h-6 w-6: indicator circle size
          // - bg-white: indicator background color
          // - shadow-switcher: custom shadow for depth
          // - duration-200 ease-linear: smooth animation timing
          // - translate transforms: positioning animation
        >
          {/* 🎭 THEME ICON: Dynamic icon based on current theme */}
          <ModeIcon isInLightMode={isInLightMode} />
          {/* 🔧 CHANGE: Replace with custom icons or remove if desired */}
        </span>
      </label>
    </div>
  );
}; 

/**
 * 🎭 MODE ICON COMPONENT: Dynamic icon display for theme switcher
 * 🔧 TEMPLATE USAGE: Shows sun or moon icon based on current theme
 */
function ModeIcon({ isInLightMode }: { isInLightMode: boolean }) {
  // 🎨 ICON STYLING: Base styles for smooth icon transitions
  const iconStyle = 'absolute inset-0 flex items-center justify-center transition-opacity ease-in-out duration-400';
  // 🔧 CHANGE: Adjust duration-400 for faster/slower icon transitions
  
  return (
    <>
      {/* 🌞 SUN ICON: Visible in light mode */}
      <span className={cn(iconStyle, isInLightMode ? 'opacity-100' : 'opacity-0')}>
        {/* 🔧 CHANGE: Customize sun icon visibility animation */}
        <SunIcon />
      </span>
      
      {/* 🌙 MOON ICON: Visible in dark mode */}
      <span className={cn(iconStyle, !isInLightMode ? 'opacity-100' : 'opacity-0')}>
        {/* 🔧 CHANGE: Customize moon icon visibility animation */}
        <MoonIcon />
      </span>
    </>
  );
}

/**
 * ☀️ SUN ICON: SVG icon for light mode
 * 🔧 TEMPLATE USAGE: Light theme visual indicator
 */
function SunIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {/* 🔧 CHANGE: Customize sun icon:
       * - Update width/height for different sizes
       * - Change fill color from #969AA1
       * - Replace with custom sun icon path
       * - Add additional styling or animation
       */}
      <path
        d='M7.99992 12.6666C10.5772 12.6666 12.6666 10.5772 12.6666 7.99992C12.6666 5.42259 10.5772 3.33325 7.99992 3.33325C5.42259 3.33325 3.33325 5.42259 3.33325 7.99992C3.33325 10.5772 5.42259 12.6666 7.99992 12.6666Z'
        fill='#969AA1'
      />
      <path
        d='M8.00008 15.3067C7.63341 15.3067 7.33342 15.0334 7.33342 14.6667V14.6134C7.33342 14.2467 7.63341 13.9467 8.00008 13.9467C8.36675 13.9467 8.66675 14.2467 8.66675 14.6134C8.66675 14.9801 8.36675 15.3067 8.00008 15.3067ZM12.7601 13.4267C12.5867 13.4267 12.4201 13.3601 12.2867 13.2334L12.2001 13.1467C11.9401 12.8867 11.9401 12.4667 12.2001 12.2067C12.4601 11.9467 12.8801 11.9467 13.1401 12.2067L13.2267 12.2934C13.4867 12.5534 13.4867 12.9734 13.2267 13.2334C13.1001 13.3601 12.9334 13.4267 12.7601 13.4267ZM3.24008 13.4267C3.06675 13.4267 2.90008 13.3601 2.76675 13.2334C2.50675 12.9734 2.50675 12.5534 2.76675 12.2934L2.85342 12.2067C3.11342 11.9467 3.53341 11.9467 3.79341 12.2067C4.05341 12.4667 4.05341 12.8867 3.79341 13.1467L3.70675 13.2334C3.58008 13.3601 3.40675 13.4267 3.24008 13.4267ZM14.6667 8.66675H14.6134C14.2467 8.66675 13.9467 8.36675 13.9467 8.00008C13.9467 7.63341 14.2467 7.33342 14.6134 7.33342C14.9801 7.33342 15.3067 7.63341 15.3067 8.00008C15.3067 8.36675 15.0334 8.66675 14.6667 8.66675ZM1.38675 8.66675H1.33341C0.966748 8.66675 0.666748 8.36675 0.666748 8.00008C0.666748 7.63341 0.966748 7.33342 1.33341 7.33342C1.70008 7.33342 2.02675 7.63341 2.02675 8.00008C2.02675 8.36675 1.75341 8.66675 1.38675 8.66675ZM12.6734 3.99341C12.5001 3.99341 12.3334 3.92675 12.2001 3.80008C11.9401 3.54008 11.9401 3.12008 12.2001 2.86008L12.2867 2.77341C12.5467 2.51341 12.9667 2.51341 13.2267 2.77341C13.4867 3.03341 13.4867 3.45341 13.2267 3.71341L13.1401 3.80008C13.0134 3.92675 12.8467 3.99341 12.6734 3.99341ZM3.32675 3.99341C3.15341 3.99341 2.98675 3.92675 2.85342 3.80008L2.76675 3.70675C2.50675 3.44675 2.50675 3.02675 2.76675 2.76675C3.02675 2.50675 3.44675 2.50675 3.70675 2.76675L3.79341 2.85342C4.05341 3.11342 4.05341 3.53341 3.79341 3.79341C3.66675 3.92675 3.49341 3.99341 3.32675 3.99341ZM8.00008 2.02675C7.63341 2.02675 7.33342 1.75341 7.33342 1.38675V1.33341C7.33342 0.966748 7.63341 0.666748 8.00008 0.666748C8.36675 0.666748 8.66675 0.966748 8.66675 1.33341C8.66675 1.70008 8.36675 2.02675 8.00008 2.02675Z'
        fill='#969AA1'
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z'
        fill='#969AA1'
      />
    </svg>
  );
}

export default DarkModeSwitcher;
