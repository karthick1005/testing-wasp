/**
 * ❓ FAQ INTERFACE: Structure for frequently asked questions
 * 🔧 TEMPLATE USAGE: Define FAQ data structure in contentSections.ts
 */
interface FAQ {
  id: number; // 🔧 CHANGE: Unique identifier for each FAQ
  question: string; // 🔧 CHANGE: The question text
  answer: string; // 🔧 CHANGE: The answer text
  href?: string; // 🔧 CHANGE: Optional link for "Learn more" functionality
  // 🔧 CHANGE: Add additional fields (category, tags, etc.)
}

/**
 * ❓ FAQ COMPONENT: Frequently Asked Questions section
 * 🔧 TEMPLATE USAGE: Display customer questions and answers in organized layout
 * 
 * Key features:
 * - Responsive grid layout for questions and answers
 * - Dark mode support with proper contrast
 * - Optional "Learn more" links for detailed information
 * - Clean typography with proper spacing
 * - Divider lines for visual separation
 * - Screen reader friendly semantic markup
 */
export default function FAQ({ faqs }: { faqs: FAQ[] }) {
  // 🔧 CHANGE: Add additional props (title, description, expandable, etc.)

  return (
    <div className='mt-32 mx-auto max-w-2xl divide-y divide-gray-900/10 dark:divide-gray-200/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:py-32'>
      {/* 🔧 CHANGE: Customize FAQ section styling:
       * - mt-32: top margin spacing
       * - mx-auto: center horizontally
       * - max-w-2xl lg:max-w-7xl: responsive max width
       * - divide-y divide-gray-900/10: divider lines between items
       * - dark:divide-gray-200/10: dark mode dividers
       * - px-6 lg:px-8: responsive horizontal padding
       * - pb-8 sm:pb-24 lg:py-32: responsive bottom padding
       * - sm:pt-12: top padding on small screens and up
       */}
      
      {/* 📝 FAQ TITLE: Section heading */}
      <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white'>
        Frequently asked questions
        {/* 🔧 CHANGE: Replace with your FAQ section title */}
      </h2>
      
      {/* 📋 FAQ LIST: Definition list for semantic markup */}
      <dl className='mt-10 space-y-8 divide-y divide-gray-900/10'>
        {/* 🔧 CHANGE: Adjust FAQ list spacing:
         * - mt-10: top margin
         * - space-y-8: vertical spacing between items
         * - divide-y divide-gray-900/10: divider lines
         */}
        
        {/* 🔄 FAQ ITEMS: Map through FAQ data array */}
        {faqs.map((faq) => (
          <div key={faq.id} className='pt-8 lg:grid lg:grid-cols-12 lg:gap-8'>
            {/* 🔧 CHANGE: Customize FAQ item layout:
             * - pt-8: top padding for each item
             * - lg:grid lg:grid-cols-12: desktop grid layout with 12 columns
             * - lg:gap-8: gap between grid columns
             */}
            
            {/* ❓ QUESTION: FAQ question text */}
            <dt className='text-base font-semibold leading-7 text-gray-900 lg:col-span-5 dark:text-white'>
              {/* 🔧 CHANGE: Customize question styling:
               * - text-base: font size
               * - font-semibold: font weight
               * - leading-7: line height
               * - text-gray-900 dark:text-white: text colors
               * - lg:col-span-5: takes 5 columns on desktop
               */}
              {faq.question}
              {/* 🔧 CHANGE: Add question formatting or icons */}
            </dt>
            
            {/* 💬 ANSWER: FAQ answer content */}
            <dd className='flex items-center justify-start gap-2 mt-4 lg:col-span-7 lg:mt-0'>
              {/* 🔧 CHANGE: Customize answer container:
               * - flex items-center justify-start: horizontal layout
               * - gap-2: space between answer and link
               * - mt-4 lg:mt-0: top margin (removed on desktop)
               * - lg:col-span-7: takes 7 columns on desktop
               */}
              
              {/* 📝 ANSWER TEXT: Main answer content */}
              <p className='text-base leading-7 text-gray-600 dark:text-white'>
                {faq.answer}
                {/* 🔧 CHANGE: Add answer formatting or rich text support */}
              </p>
              
              {/* 🔗 LEARN MORE LINK: Optional additional information link */}
              {faq.href && (
                <a href={faq.href} className='text-base leading-7 text-yellow-500 hover:text-yellow-600'>
                  {/* 🔧 CHANGE: Customize "Learn more" link:
                   * - text-base leading-7: text size and line height
                   * - text-yellow-500 hover:text-yellow-600: brand colors
                   * - Update href to use React Router Link if needed
                   */}
                  Learn more →
                  {/* 🔧 CHANGE: Replace with your "Learn more" text and arrow */}
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
