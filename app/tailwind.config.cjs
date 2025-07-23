// 🎨 TAILWINDCSS CONFIGURATION: Customize styling and design system
const defaultTheme = require('tailwindcss/defaultTheme');
const { resolveProjectPath } = require('wasp/dev');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 📁 CONTENT PATHS: Where TailwindCSS looks for class usage
  content: [resolveProjectPath('./src/**/*.{js,jsx,ts,tsx}')], // 🔧 MODIFY: Add additional paths if needed
  
  // 🌗 DARK MODE: Configure dark mode behavior
  darkMode: 'class', // 🔧 MODIFY: Use 'class' for manual toggle or 'media' for system preference
  
  theme: {
    extend: {
      // 🔤 TYPOGRAPHY: Custom font families
      fontFamily: {
        satoshi: ['Satoshi', 'system-ui', 'sans-serif'], // 🔧 MODIFY: Replace with your brand fonts
      },
      
      // 🎨 COLOR PALETTE: Brand colors and design system
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        // 🔧 MODIFY: Customize brand colors below
        'black-2': '#010101', // Deep black for high contrast
        body: '#64748B', // Body text color
        bodydark: '#AEB7C0', // Dark mode body text
        bodydark1: '#DEE4EE', // Light variant for dark mode
        bodydark2: '#8A99AF', // Medium variant for dark mode
        primary: '#3C50E0', // 🔧 CHANGE: Your brand primary color
        secondary: '#80CAEE', // 🔧 CHANGE: Your brand secondary color
        stroke: '#E2E8F0', // Border color for light mode
        whiten: '#F1F5F9', // Light background variant
        whiter: '#F5F7FD', // Lighter background variant
        
        // 🌗 DARK MODE COLORS: Customize dark theme appearance
        boxdark: '#24303F', // Dark container background
        'boxdark-2': '#1A222C', // Darker container background
        strokedark: '#2E3A47', // Border color for dark mode
        'form-strokedark': '#3d4d60', // Form border in dark mode
        'form-input': '#1d2a39', // Form input background in dark mode
        
        // 🎯 SEMANTIC COLORS: Status and feedback colors
        'meta-1': '#DC3545', // Error/danger red
        'meta-2': '#EFF2F7', // Light gray
        'meta-3': '#10B981', // Success green
        'meta-4': '#313D4A', // Dark gray
        'meta-5': '#259AE6', // Info blue
        'meta-6': '#FFBA00', // Warning yellow
        'meta-7': '#FF6766', // Secondary red
        'meta-8': '#F0950C', // Orange
        'meta-9': '#E5E7EB', // Light border gray
        success: '#219653', // 🔧 CHANGE: Success state color
        danger: '#D34053', // 🔧 CHANGE: Error state color
        warning: '#FFA70B', // 🔧 CHANGE: Warning state color
      },
      
      // 📱 RESPONSIVE BREAKPOINTS: Custom screen sizes
      screens: {
        '2xsm': '375px', // 🔧 MODIFY: Extra small mobile
        xsm: '425px', // 🔧 MODIFY: Small mobile
        '3xl': '2000px', // 🔧 MODIFY: Extra large desktop
        ...defaultTheme.screens, // Include default Tailwind breakpoints
      },
        '2xsm': '375px',
        xsm: '425px',
        '3xl': '2000px',
        ...defaultTheme.screens,
      },

      // 📏 TYPOGRAPHY SCALES: Custom font sizes for consistent hierarchy
      fontSize: {
        'title-xxl': ['44px', '55px'], // 🔧 MODIFY: Largest heading size
        'title-xl': ['36px', '45px'], // 🔧 MODIFY: Large heading size
        'title-xl2': ['33px', '45px'], // 🔧 MODIFY: Large heading variant
        'title-lg': ['28px', '35px'], // 🔧 MODIFY: Medium heading size
        'title-md': ['24px', '30px'], // 🔧 MODIFY: Small heading size
        'title-md2': ['26px', '30px'], // 🔧 MODIFY: Small heading variant
        'title-sm': ['20px', '26px'], // 🔧 MODIFY: Extra small heading
        'title-xsm': ['18px', '24px'], // 🔧 MODIFY: Tiny heading size
      },
      
      // 📐 SPACING SYSTEM: Custom spacing values for precise layouts
      spacing: {
        // 🔧 MODIFY: Add or remove spacing values based on your design needs
        4.5: '1.125rem', 5.5: '1.375rem', 6.5: '1.625rem', 7.5: '1.875rem',
        8.5: '2.125rem', 9.5: '2.375rem', 10.5: '2.625rem', 11: '2.75rem',
        11.5: '2.875rem', 12.5: '3.125rem', 13: '3.25rem', 13.5: '3.375rem',
        14: '3.5rem', 14.5: '3.625rem', 15: '3.75rem', 15.5: '3.875rem',
        16: '4rem', 16.5: '4.125rem', 17: '4.25rem', 17.5: '4.375rem',
        18: '4.5rem', 18.5: '4.625rem', 19: '4.75rem', 19.5: '4.875rem',
        21: '5.25rem', 21.5: '5.375rem', 22: '5.5rem', 22.5: '5.625rem',
        24.5: '6.125rem', 25: '6.25rem', 25.5: '6.375rem', 26: '6.5rem',
        27: '6.75rem', 27.5: '6.875rem', 29: '7.25rem', 29.5: '7.375rem',
        30: '7.5rem', 31: '7.75rem', 32.5: '8.125rem', 34: '8.5rem',
        34.5: '8.625rem', 35: '8.75rem', 36.5: '9.125rem', 37.5: '9.375rem',
        39: '9.75rem', 39.5: '9.875rem', 40: '10rem', 42.5: '10.625rem',
        44: '11rem', 45: '11.25rem', 46: '11.5rem', 47.5: '11.875rem',
        49: '12.25rem', 50: '12.5rem', 52: '13rem', 52.5: '13.125rem',
        54: '13.5rem', 54.5: '13.625rem', 55: '13.75rem', 55.5: '13.875rem',
        59: '14.75rem', 60: '15rem', 62.5: '15.625rem', 65: '16.25rem',
        67: '16.75rem', 67.5: '16.875rem', 70: '17.5rem', 72.5: '18.125rem',
        73: '18.25rem', 75: '18.75rem', 90: '22.5rem', 94: '23.5rem',
        95: '23.75rem', 100: '25rem', 115: '28.75rem', 125: '31.25rem',
        132.5: '33.125rem', 150: '37.5rem', 171.5: '42.875rem', 180: '45rem',
        187.5: '46.875rem', 203: '50.75rem', 230: '57.5rem', 242.5: '60.625rem',
      },
      
      // 📏 MAX WIDTH CONSTRAINTS: Component and layout maximum widths
      maxWidth: {
        // 🔧 MODIFY: Adjust maximum widths for your layout needs
        2.5: '0.625rem', 3: '0.75rem', 4: '1rem', 11: '2.75rem', 13: '3.25rem',
        14: '3.5rem', 15: '3.75rem', 22.5: '5.625rem', 25: '6.25rem',
        30: '7.5rem', 34: '8.5rem', 35: '8.75rem', 40: '10rem',
        42.5: '10.625rem', 44: '11rem', 45: '11.25rem', 70: '17.5rem',
        90: '22.5rem', 94: '23.5rem', 125: '31.25rem', 132.5: '33.125rem',
        142.5: '35.625rem', 150: '37.5rem', 180: '45rem', 203: '50.75rem',
        230: '57.5rem', 242.5: '60.625rem', 270: '67.5rem', 280: '70rem',
        292.5: '73.125rem',
      },
      
      // 📐 HEIGHT CONSTRAINTS: Maximum and minimum height values
      maxHeight: {
        35: '8.75rem', 70: '17.5rem', 90: '22.5rem', // 🔧 MODIFY: Component max heights
        550: '34.375rem', 300: '18.75rem', // 🔧 MODIFY: Large component heights
      },
      minWidth: {
        22.5: '5.625rem', 42.5: '10.625rem', // 🔧 MODIFY: Minimum component widths
        47.5: '11.875rem', 75: '18.75rem',
      },
      
      // 📚 Z-INDEX LAYERS: Stacking order for overlapping elements
      zIndex: {
        // 🔧 MODIFY: Adjust stacking layers for modals, dropdowns, tooltips
        999999: '999999', 99999: '99999', 9999: '9999',
        999: '999', 99: '99', 9: '9', 1: '1',
      },
      
      // 👻 TRANSPARENCY: Custom opacity values
      opacity: {
        65: '.65', // 🔧 MODIFY: Add custom opacity levels
      },
      
      // 🎨 CONTENT UTILITIES: Pseudo-element content
      content: {
        'icon-copy': 'url("../images/icon/icon-copy-alt.svg")', // 🔧 MODIFY: Update icon paths
      },
      
      // 🔄 TRANSITIONS: Animation transition properties
      transitionProperty: { 
        width: 'width', // 🔧 MODIFY: Add custom transition properties
        stroke: 'stroke' 
      },
      
      // 🖼️ BORDERS: Custom border widths
      borderWidth: {
        6: '6px', // 🔧 MODIFY: Add custom border widths
      },
      
      // 🌟 SHADOWS: Custom shadow effects for depth and emphasis
      boxShadow: {
        // 🔧 MODIFY: Customize shadow effects for your design
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)', // Default shadow
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)', // Card shadow
        'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)', // Subtle card shadow
        switcher: '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)', // Toggle switch
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)', // Switch shadow
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)', // Level 1 shadow
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)', // Level 2 shadow
        3: '0px 1px 5px rgba(0, 0, 0, 0.14)', // Level 3 shadow
        4: '0px 4px 10px rgba(0, 0, 0, 0.12)', // Level 4 shadow
        5: '0px 1px 1px rgba(0, 0, 0, 0.15)', // Level 5 shadow
        6: '0px 3px 15px rgba(0, 0, 0, 0.1)', // Level 6 shadow
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A', // Border effect
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)', // Complex border
      },
      
      // 💧 DROP SHADOWS: Text and element drop shadows
      dropShadow: {
        1: '0px 1px 0px #E2E8F0', // 🔧 MODIFY: Subtle drop shadow
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)', // 🔧 MODIFY: Medium drop shadow
      },
      
      // 🎬 ANIMATIONS: Custom keyframes and animations
      keyframes: {
        rotating: {
          '0%, 100%': { transform: 'rotate(360deg)' }, // 🔧 MODIFY: Custom rotation animation
          '50%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        // 🔧 MODIFY: Add custom animations for interactions
        'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)', // One-time ping effect
        rotating: 'rotating 30s linear infinite', // Continuous rotation
        'spin-1.5': 'spin 1.5s linear infinite', // Fast spin
        'spin-2': 'spin 2s linear infinite', // Medium spin
        'spin-3': 'spin 3s linear infinite', // Slow spin
      },
    },
  },
  
  // 🔌 PLUGINS: TailwindCSS extensions for additional functionality
  plugins: [
    require('@tailwindcss/forms'), // 🔧 MODIFY: Enhanced form styling
    require('@tailwindcss/typography') // 🔧 MODIFY: Beautiful typography for content
  ],
};
