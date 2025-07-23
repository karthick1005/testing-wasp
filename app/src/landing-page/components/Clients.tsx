/**
 * 🎨 LOGO IMPORTS: Technology stack and partner brand logos
 * 🔧 TEMPLATE USAGE: Replace with your app's technology stack or client logos
 */
import AstroLogo from "../logos/AstroLogo"; // 🔧 CHANGE: Replace with your tech stack logos
import OpenAILogo from "../logos/OpenAILogo"; // 🔧 CHANGE: AI/ML technology logos
import PrismaLogo from "../logos/PrismaLogo"; // 🔧 CHANGE: Database/ORM technology logos
import SalesforceLogo from "../logos/SalesforceLogo"; // 🔧 CHANGE: Partner/client company logos

/**
 * 🏢 CLIENTS COMPONENT: Technology stack and partners showcase
 * 🔧 TEMPLATE USAGE: Display trusted brands, tech stack, or client logos
 * 
 * Key features:
 * - Clean grid layout for logo display
 * - Responsive design from mobile to desktop
 * - Dark mode opacity adjustments for logos
 * - Centered alignment with consistent spacing
 * - Professional brand credibility section
 * - Easy logo replacement system
 * - Semantic heading for accessibility
 */
export default function Clients() {
  return (
    <div className='mt-12 mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-between gap-y-6'>
      {/* 🔧 CHANGE: Customize clients section container:
       * - mt-12: top margin from previous section
       * - mx-auto: center horizontally
       * - max-w-7xl: maximum container width
       * - px-6 lg:px-8: responsive horizontal padding
       * - flex flex-col: vertical layout
       * - items-between: distribute items with space
       * - gap-y-6: vertical spacing between elements
       */}
      
      {/* 🏷️ SECTION HEADING: Technology stack or client showcase title */}
      <h2 className='mb-6 text-center font-semibold tracking-wide text-gray-500 dark:text-white'>
        Built with / Used by:
        {/* 🔧 CHANGE: Replace with your section title:
         * - "Trusted by industry leaders"
         * - "Powered by leading technologies"
         * - "Our technology partners"
         * - "Used by companies worldwide"
         * - Custom messaging for your brand
         */}
      </h2>

      {/* 🎯 LOGOS GRID: Responsive grid layout for brand logos */}
      <div className='mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl md:grid-cols-4 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none'>
        {/* 🔧 CHANGE: Customize logos grid layout:
         * - mx-auto: center grid horizontally
         * - grid: CSS grid layout
         * - max-w-lg: maximum width on mobile
         * - grid-cols-2: 2 columns on mobile
         * - items-center: center items vertically
         * - gap-x-8 gap-y-12: horizontal and vertical spacing
         * - sm:max-w-xl: larger max width on small screens
         * - md:grid-cols-4: 4 columns on medium screens and up
         * - sm:gap-x-10 sm:gap-y-14: larger gaps on small screens
         * - lg:mx-0 lg:max-w-none: remove constraints on large screens
         */}
        
        {/* 🔄 LOGO COMPONENTS: Map through logo array */}
        {
          [<SalesforceLogo />, <PrismaLogo />, <AstroLogo />, <OpenAILogo />].map((logo, index) => (
            /* 🔧 CHANGE: Replace logo array with your brands:
             * - Technology stack logos (React, Node.js, PostgreSQL, etc.)
             * - Client company logos
             * - Partner brand logos
             * - Integration service logos
             * - Award or certification badges
             * 
             * Example replacements:
             * [<ReactLogo />, <NodeLogo />, <PostgreSQLLogo />, <StripeLogic />]
             * [<ClientALogo />, <ClientBLogo />, <ClientCLogo />, <ClientDLogo />]
             */
            
            /* 📦 LOGO CONTAINER: Individual logo wrapper with styling */
            <div key={index} className='flex justify-center col-span-1 max-h-12 w-full object-contain dark:opacity-80'>
              {/* 🔧 CHANGE: Customize logo container styling:
               * - flex justify-center: center logo horizontally
               * - col-span-1: take up one grid column
               * - max-h-12: maximum logo height (48px)
               * - w-full: full container width
               * - object-contain: maintain logo aspect ratio
               * - dark:opacity-80: reduce opacity in dark mode for better contrast
               * 
               * Additional customization options:
               * - Add hover effects: hover:scale-110 hover:opacity-100
               * - Add click handlers for logo interactions
               * - Add transitions: transition-all duration-200
               * - Customize sizes for different logo types
               */}
              {logo}
              {/* 🔧 CHANGE: Add logo-specific customizations:
               * - Wrap in anchor tags for clickable links
               * - Add tooltips with company/technology names
               * - Include alt text for accessibility
               * - Add loading states or fallback images
               */}
            </div>
          ))
        }
      </div>
      
      {/* 🔧 CHANGE: Add additional client/tech showcase elements:
       * - Client testimonial quotes below logos
       * - Statistics or metrics (e.g., "Trusted by 10,000+ users")
       * - Call-to-action button ("Become a partner")
       * - Rotating logo carousel for more brands
       * - Integration badges or certifications
       * - Case study links for featured clients
       */}
    </div>
  )
}
