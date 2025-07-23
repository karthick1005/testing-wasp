// 🖼️ HERO BANNER IMAGE: Import the main hero banner image
// 🔧 CHANGE: Replace with your app's hero banner image
import openSaasBannerWebp from '../../client/static/open-saas-banner.webp';
// 📚 DOCUMENTATION LINK: Import documentation URL from shared constants
// 🔧 CHANGE: Update documentation URL in shared/common.ts
import { DocsUrl } from '../../shared/common';

/**
 * 🏠 HERO SECTION COMPONENT: Main landing page hero section
 * 🔧 TEMPLATE USAGE: This is the primary conversion area of your landing page
 * Key customization points:
 * - Main headline and tagline
 * - Hero banner image
 * - Call-to-action button
 * - Background gradients and styling
 */
export default function Hero() {
  return (
    <>
      {/* 🎨 HERO CONTAINER: Main container with background gradients */}
      {/* 🔧 CHANGE: Adjust pt-14 for top padding */}
      <div className='relative pt-14 w-full'>
        {/* 🌈 BACKGROUND GRADIENTS: Decorative background elements */}
        {/* 🔧 CHANGE: Customize top gradient colors in TopGradient function */}
        <TopGradient />
        {/* 🔧 CHANGE: Customize bottom gradient colors in BottomGradient function */}
        <BottomGradient />
        
        {/* 📱 RESPONSIVE SPACING: Vertical padding that adapts to screen size */}
        {/* 🔧 CHANGE: Adjust py-24/py-32 for section height */}
        <div className='py-24 sm:py-32'>
          {/* 📐 CONTENT CONTAINER: Max-width container with responsive padding */}
          {/* 🔧 CHANGE: Adjust max-w-8xl for content width */}
          <div className='mx-auto max-w-8xl px-6 lg:px-8'>
            
            {/* 📝 TEXT CONTENT AREA: Centered text content with max-width */}
            {/* 🔧 CHANGE: Adjust max-w-3xl for text width */}
            <div className='lg:mb-18 mx-auto max-w-3xl text-center'>
              
              {/* 🎯 MAIN HEADLINE: Primary hero headline */}
              {/* 🔧 CHANGE: Replace with your app's main headline */}
              <h1 className='text-4xl font-bold text-gray-900 sm:text-6xl dark:text-white'>
                Some <span className='italic'>cool</span> words about steamified
              </h1>
              
              {/* 📄 TAGLINE: Supporting description text */}
              {/* 🔧 CHANGE: Replace with your app's value proposition */}
              <p className='mt-6 mx-auto max-w-2xl text-lg leading-8 text-gray-600 dark:text-white'>
                With some more exciting words about your product!
              </p>
              
              {/* 🎯 CALL-TO-ACTION AREA: Button container with flexbox layout */}
              {/* 🔧 CHANGE: Adjust gap-x-6 for button spacing */}
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                
                {/* 🔗 PRIMARY CTA BUTTON: Main call-to-action link */}
                <a
                  href={DocsUrl} // 🔧 CHANGE: Update href to your primary action (signup, demo, etc.)
                  className='rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-yellow-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white'
                  // 🔧 CHANGE: Customize button styling:
                  // - rounded-md: border radius
                  // - px-3.5 py-2.5: padding
                  // - ring-gray-200: border color
                  // - hover:ring-yellow-300: hover border color
                  // - focus-visible:outline-indigo-600: focus color
                >
                  {/* 🔧 CHANGE: Replace button text with your CTA */}
                  Get Started <span aria-hidden='true'>→</span> {/* 🔧 CHANGE: Customize arrow or remove */}
                </a>
              </div>
            </div>
            
            {/* 🖼️ HERO IMAGE SECTION: Main product screenshot/banner area */}
            {/* 🔧 CHANGE: Adjust mt-14 for spacing above image */}
            <div className='mt-14 flow-root sm:mt-14'>
              {/* 🎨 IMAGE CONTAINER: Rounded container with padding and centering */}
              <div className='-m-2  flex justify-center rounded-xl lg:-m-4 lg:rounded-2xl lg:p-4'>
                {/* 🔧 CHANGE: Adjust container styling:
                    - -m-2/-m-4: negative margins for visual effect
                    - rounded-xl/rounded-2xl: border radius
                    - lg:p-4: padding on large screens */}
                
                {/* 📷 MAIN HERO IMAGE: Product screenshot or demo image */}
                <img
                  src={openSaasBannerWebp} // 🔧 CHANGE: Replace with your app's hero image
                  alt='App screenshot' // 🔧 CHANGE: Update alt text for accessibility
                  width={1000} // 🔧 CHANGE: Adjust dimensions to match your image
                  height={530} // 🔧 CHANGE: Adjust dimensions to match your image
                  loading='lazy' // ⚡ PERFORMANCE: Lazy loading for better page speed
                  className='rounded-md shadow-2xl ring-1 ring-gray-900/10'
                  // 🔧 CHANGE: Customize image styling:
                  // - rounded-md: border radius
                  // - shadow-2xl: drop shadow size
                  // - ring-1 ring-gray-900/10: subtle border
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 🌈 TOP GRADIENT COMPONENT: Decorative gradient background element at top
 * 🔧 TEMPLATE USAGE: Provides visual interest and brand atmosphere
 * Customization points:
 * - Gradient colors (from-amber-400 to-purple-300)
 * - Size and positioning
 * - Opacity and blur effects
 */
function TopGradient() {
  return (
    <>
      {/* 🎨 GRADIENT CONTAINER: Positioned background element */}
      <div
        className='absolute top-0 right-0 -z-10 transform-gpu overflow-hidden w-full blur-3xl sm:top-0'
        aria-hidden='true' // ♿ ACCESSIBILITY: Hidden from screen readers (decorative only)
      >
        {/* 🌈 GRADIENT SHAPE: Custom clipped gradient with brand colors */}
        <div
          className='aspect-[1020/880] w-[55rem] flex-none sm:right-1/4 sm:translate-x-1/2 dark:hidden bg-gradient-to-tr from-amber-400 to-purple-300 opacity-40'
          // 🔧 CHANGE: Customize gradient styling:
          // - aspect-[1020/880]: aspect ratio for gradient shape
          // - w-[55rem]: width of gradient element
          // - bg-gradient-to-tr: gradient direction (top-right)
          // - from-amber-400 to-purple-300: gradient colors
          // - opacity-40: transparency level
          // - dark:hidden: hidden in dark mode
          style={{
            clipPath: 'polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)',
            // 🔧 CHANGE: Customize polygon shape for different visual effect
          }}
        />
      </div>
    </>
  );
}

/**
 * 🌈 BOTTOM GRADIENT COMPONENT: Decorative gradient background element at bottom
 * 🔧 TEMPLATE USAGE: Provides visual balance and depth to hero section
 * Customization points:
 * - Gradient colors and direction
 * - Position and size
 * - Clip path shape
 */
function BottomGradient() {
  return (
    <>
      {/* 🎨 BOTTOM GRADIENT CONTAINER: Positioned at bottom of hero section */}
      <div
        className='absolute inset-x-0 top-[calc(100%-40rem)] sm:top-[calc(100%-65rem)] -z-10 transform-gpu overflow-hidden blur-3xl'
        aria-hidden='true' // ♿ ACCESSIBILITY: Hidden from screen readers (decorative only)
        // 🔧 CHANGE: Adjust positioning:
        // - top-[calc(100%-40rem)]: distance from top on mobile
        // - sm:top-[calc(100%-65rem)]: distance from top on larger screens
      >
        {/* 🌈 BOTTOM GRADIENT SHAPE: Elliptical clipped gradient */}
        <div
          className='relative aspect-[1020/880] sm:-left-3/4 sm:translate-x-1/4 dark:hidden bg-gradient-to-br from-amber-400 to-purple-300  opacity-50 w-[72.1875rem]'
          // 🔧 CHANGE: Customize bottom gradient styling:
          // - aspect-[1020/880]: aspect ratio
          // - w-[72.1875rem]: width of gradient
          // - bg-gradient-to-br: gradient direction (bottom-right)
          // - from-amber-400 to-purple-300: gradient colors
          // - opacity-50: transparency level
          // - sm:-left-3/4 sm:translate-x-1/4: responsive positioning
          style={{
            clipPath: 'ellipse(80% 30% at 80% 50%)',
            // 🔧 CHANGE: Customize ellipse shape and position
          }}
        />
      </div>
    </>
  );
}
