/**
 * 🧭 NAVIGATION ITEM INTERFACE: Structure for footer navigation links
 * 🔧 TEMPLATE USAGE: Define footer links in contentSections.ts
 */
interface NavigationItem {
  name: string; // 🔧 CHANGE: Link display text
  href: string; // 🔧 CHANGE: Link URL or route path
  // 🔧 CHANGE: Add additional fields (icon, external, description, etc.)
};

/**
 * 🦶 FOOTER COMPONENT: Site footer with navigation links
 * 🔧 TEMPLATE USAGE: Bottom page navigation and company information
 * 
 * Key features:
 * - Responsive navigation links organization
 * - App and Company link sections
 * - Dark mode support with proper contrast
 * - Accessibility features with ARIA labels
 * - Hover effects for user interaction
 * - Clean border separation from main content
 * - Professional minimal design
 */
export default function Footer({ footerNavigation }: {
  footerNavigation: {
    app: NavigationItem[] // 🔧 CHANGE: App-related navigation items
    company: NavigationItem[] // 🔧 CHANGE: Company information links
    // 🔧 CHANGE: Add additional sections (social, legal, support, etc.)
  }
}) {
  return (
    <div className='mx-auto mt-6 max-w-7xl px-6 lg:px-8 dark:bg-boxdark-2'>
      {/* 🔧 CHANGE: Customize footer container:
       * - mx-auto: center horizontally
       * - mt-6: top margin
       * - max-w-7xl: maximum container width
       * - px-6 lg:px-8: responsive horizontal padding
       * - dark:bg-boxdark-2: dark mode background color
       */}
      
      {/* 📑 FOOTER ELEMENT: Main footer section with accessibility */}
      <footer
        aria-labelledby='footer-heading' // Accessibility label reference
        className='relative border-t border-gray-900/10 dark:border-gray-200/10 py-24 sm:mt-32'
      >
        {/* 🔧 CHANGE: Customize footer styling:
         * - relative: positioning context
         * - border-t: top border separator
         * - border-gray-900/10 dark:border-gray-200/10: border colors for light/dark mode
         * - py-24: vertical padding
         * - sm:mt-32: responsive top margin
         */}
        
        {/* ♿ ACCESSIBILITY: Screen reader footer heading */}
        <h2 id='footer-heading' className='sr-only'>
          Footer
          {/* 🔧 CHANGE: Update for localization or branding */}
        </h2>
        
        {/* 🗂️ NAVIGATION SECTIONS: App and Company link groups */}
        <div className='flex items-start justify-end mt-10 gap-20'>
          {/* 🔧 CHANGE: Customize navigation layout:
           * - flex: flexible layout
           * - items-start: align items to top
           * - justify-end: align to right side
           * - mt-10: top margin
           * - gap-20: space between sections
           * - Consider changing justify-end to justify-between for left alignment
           * - Add responsive breakpoints for mobile layout
           */}
          
          {/* 📱 APP NAVIGATION SECTION: App-related links */}
          <div>
            {/* 🏷️ APP SECTION TITLE */}
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'>
              App
              {/* 🔧 CHANGE: Replace with your app section title */}
            </h3>
            
            {/* 📋 APP LINKS LIST */}
            <ul role='list' className='mt-6 space-y-4'>
              {/* 🔧 CHANGE: Customize list styling:
               * - role='list': accessibility role
               * - mt-6: top margin from title
               * - space-y-4: vertical spacing between items
               */}
              
              {/* 🔄 APP NAVIGATION ITEMS: Map through app links */}
              {footerNavigation.app.map((item) => (
                <li key={item.name}>
                  {/* 🔗 APP NAVIGATION LINK */}
                  <a 
                    href={item.href} 
                    className='text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white'
                  >
                    {/* 🔧 CHANGE: Customize link styling and behavior:
                     * - text-sm: font size
                     * - leading-6: line height
                     * - text-gray-600: default text color
                     * - hover:text-gray-900: hover text color
                     * - dark:text-white: dark mode text color
                     * - Add target="_blank" rel="noopener" for external links
                     * - Replace with React Router Link for internal navigation
                     * - Add analytics tracking or custom hover effects
                     */}
                    {item.name}
                    {/* 🔧 CHANGE: Add icons or badges next to link names */}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 🏢 COMPANY NAVIGATION SECTION: Company information links */}
          <div>
            {/* 🏷️ COMPANY SECTION TITLE */}
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'>
              Company
              {/* 🔧 CHANGE: Replace with your company section title */}
            </h3>
            
            {/* 📋 COMPANY LINKS LIST */}
            <ul role='list' className='mt-6 space-y-4'>
              {/* 🔧 CHANGE: Same customization options as app links list */}
              
              {/* 🔄 COMPANY NAVIGATION ITEMS: Map through company links */}
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  {/* 🔗 COMPANY NAVIGATION LINK */}
                  <a 
                    href={item.href} 
                    className='text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white'
                  >
                    {/* 🔧 CHANGE: Same customization options as app links */}
                    {item.name}
                    {/* 🔧 CHANGE: Add icons or external link indicators */}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 🔧 CHANGE: Add additional footer sections:
           * - Social media links section
           * - Legal links (Privacy Policy, Terms of Service)
           * - Contact information
           * - Newsletter signup
           * - Copyright notice
           * - Language/region selector
           */}
        </div>
      </footer>
    </div>
  )
}
