/**
 * 💬 TESTIMONIAL INTERFACE: Structure for customer testimonials
 * 🔧 TEMPLATE USAGE: Define testimonial data structure in contentSections.ts
 */
interface Testimonial {
  name: string; // 🔧 CHANGE: Customer's full name
  role: string; // 🔧 CHANGE: Job title and company
  avatarSrc: string; // 🔧 CHANGE: Profile image URL
  socialUrl: string; // 🔧 CHANGE: Social media or website link
  quote: string; // 🔧 CHANGE: Customer testimonial text
  // 🔧 CHANGE: Add additional fields (rating, company logo, etc.)
}

/**
 * 💬 TESTIMONIALS COMPONENT: Customer testimonials showcase section
 * 🔧 TEMPLATE USAGE: Social proof section with customer reviews and quotes
 * 
 * Key features:
 * - Eye-catching dual-layer design with offset containers
 * - Responsive grid layout for multiple testimonials
 * - Avatar images with clickable social links
 * - Brand color accent with yellow highlights
 * - Dark mode support with proper contrast
 * - Lazy loading for performance optimization
 * - Professional card-based layout
 */
export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  // 🔧 CHANGE: Add additional props (title, description, layout options, etc.)

  return (
    <div className='mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8'>
      {/* 🔧 CHANGE: Customize testimonials section spacing and width:
       * - mx-auto: center horizontally
       * - mt-32 sm:mt-56: responsive top margin
       * - max-w-7xl: maximum container width
       * - sm:px-6 lg:px-8: responsive horizontal padding
       */}
      
      {/* 🎨 OUTER ACCENT LAYER: Yellow background accent with ring */}
      <div className='relative sm:left-5 -m-2 rounded-xl bg-yellow-400/20 lg:ring-1 lg:ring-yellow-500/50 lg:-m-4'>
        {/* 🔧 CHANGE: Customize accent layer styling:
         * - relative sm:left-5: responsive positioning offset
         * - -m-2 lg:-m-4: negative margins for overlapping effect
         * - rounded-xl: corner radius
         * - bg-yellow-400/20: semi-transparent yellow background
         * - lg:ring-1 lg:ring-yellow-500/50: border ring on large screens
         */}
        
        {/* 📦 MAIN CONTENT CONTAINER: Dark testimonials container */}
        <div className='relative sm:top-5 sm:right-5 bg-gray-900 dark:bg-boxdark px-8 py-20 shadow-xl sm:rounded-xl sm:px-10 sm:py-16 md:px-12 lg:px-20'>
          {/* 🔧 CHANGE: Customize main container styling:
           * - relative sm:top-5 sm:right-5: offset positioning for layered effect
           * - bg-gray-900 dark:bg-boxdark: background colors for light/dark mode
           * - px-8 py-20: base padding
           * - shadow-xl: large drop shadow
           * - sm:rounded-xl: rounded corners on small screens and up
           * - responsive padding: sm:px-10 sm:py-16 md:px-12 lg:px-20
           */}
          
          {/* 📝 SECTION TITLE: Testimonials heading */}
          <h2 className='text-left text-xl font-semibold tracking-wide leading-7 text-gray-500 dark:text-white'>
            What Our Users Say
            {/* 🔧 CHANGE: Replace with your testimonials section title */}
          </h2>
          
          {/* 📋 TESTIMONIALS GRID: Responsive layout for testimonial cards */}
          <div className='relative flex flex-wrap gap-6 w-full mt-6 z-10 justify-between lg:mx-0'>
            {/* 🔧 CHANGE: Customize testimonials grid:
             * - relative: positioning context
             * - flex flex-wrap: flexible wrapping layout
             * - gap-6: space between testimonial cards
             * - w-full: full width
             * - mt-6: top margin
             * - z-10: layering order
             * - justify-between: space distribution
             * - lg:mx-0: remove horizontal margin on large screens
             */}
            
            {/* 🔄 TESTIMONIAL CARDS: Map through testimonials data */}
            {testimonials.map((testimonial, idx) => (
              <figure key={idx} className='w-full lg:w-1/4 box-content flex flex-col justify-between p-8 rounded-xl bg-gray-500/5'>
                {/* 🔧 CHANGE: Customize testimonial card layout:
                 * - w-full lg:w-1/4: responsive width (full on mobile, 1/4 on desktop)
                 * - box-content: include padding in width calculation
                 * - flex flex-col justify-between: vertical layout with space distribution
                 * - p-8: internal padding
                 * - rounded-xl: corner radius
                 * - bg-gray-500/5: subtle background color
                 */}
                
                {/* 💬 TESTIMONIAL QUOTE: Customer quote text */}
                <blockquote className='text-lg text-white sm:text-md sm:leading-8'>
                  {/* 🔧 CHANGE: Customize quote text styling:
                   * - text-lg sm:text-md: responsive font sizes
                   * - text-white: text color
                   * - sm:leading-8: line height on small screens and up
                   */}
                  <p>{testimonial.quote}</p>
                  {/* 🔧 CHANGE: Add quote formatting (quotation marks, styling, etc.) */}
                </blockquote>
                
                {/* 👤 CUSTOMER INFO: Avatar, name, and role */}
                <figcaption className='mt-6 text-base text-white'>
                  {/* 🔧 CHANGE: Adjust customer info spacing (mt-6) and styling */}
                  
                  {/* 🔗 SOCIAL LINK: Clickable customer profile link */}
                  <a href={testimonial.socialUrl} className='flex items-center gap-x-2'>
                    {/* 🔧 CHANGE: Update link behavior:
                     * - Add target="_blank" rel="noopener" for external links
                     * - Replace href with React Router Link for internal links
                     * - Add hover effects or analytics tracking
                     */}
                    
                    {/* 🖼️ CUSTOMER AVATAR: Profile image */}
                    <img 
                      src={testimonial.avatarSrc} 
                      loading='lazy' // Performance optimization
                      className='h-12 w-12 rounded-full' 
                      alt={`${testimonial.name} avatar`}
                      // 🔧 CHANGE: Customize avatar styling:
                      // - h-12 w-12: avatar size
                      // - rounded-full: circular shape
                      // - Add error handling or fallback image
                    />
                    
                    {/* 📝 CUSTOMER DETAILS: Name and role information */}
                    <div>
                      {/* 👤 CUSTOMER NAME: Clickable name with hover effect */}
                      <div className='font-semibold hover:underline'>
                        {testimonial.name}
                        {/* 🔧 CHANGE: Add name formatting or verification badges */}
                      </div>
                      
                      {/* 💼 CUSTOMER ROLE: Job title and company */}
                      <div className='mt-1'>
                        {testimonial.role}
                        {/* 🔧 CHANGE: Add role formatting or company links */}
                      </div>
                    </div>
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
