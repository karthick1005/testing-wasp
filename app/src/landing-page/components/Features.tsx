// 🎯 FEATURE INTERFACE: TypeScript interface defining feature data structure
// 🔧 TEMPLATE USAGE: Define the shape of each feature object
interface Feature {
  name: string; // 🔧 CHANGE: Feature title/name
  description: string; // 🔧 CHANGE: Feature description text
  icon: string; // 🔧 CHANGE: Emoji or icon character
  href: string; // 🔧 CHANGE: Link to feature documentation or demo
}

/**
 * ✨ FEATURES SECTION COMPONENT: Displays app features in a grid layout
 * 🔧 TEMPLATE USAGE: Showcase your app's key features and benefits
 * Key customization points:
 * - Section title and subtitle
 * - Feature grid layout
 * - Feature icons and styling
 * - Dark mode support
 */
export default function Features({ features }: { features: Feature[] }) {
  return (
    <>
      {/* 🎯 FEATURES SECTION CONTAINER: Main section wrapper with responsive padding */}
      {/* 🔧 CHANGE: Adjust mt-48 for spacing from previous section */}
      <div id='features' className='mx-auto mt-48 max-w-7xl px-6 lg:px-8'>
        
        {/* 📝 SECTION HEADER: Title and subtitle area */}
        {/* 🔧 CHANGE: Adjust max-w-2xl for header width */}
        <div className='mx-auto max-w-2xl text-center'>
          
          {/* 🎯 MAIN SECTION TITLE: Features section headline */}
          <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
            {/* 🔧 CHANGE: Replace with your features section title */}
            The <span className='text-yellow-500'>Best</span> Features
            {/* 🔧 CHANGE: Customize highlight color (text-yellow-500) */}
          </p>
          
          {/* 📄 SECTION SUBTITLE: Supporting description */}
          <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-white'>
            {/* 🔧 CHANGE: Replace with your features section description */}
            Don't work harder.
            <br /> Work smarter.
          </p>
        </div>
        
        {/* 🎨 FEATURES GRID CONTAINER: Responsive grid layout */}
        {/* 🔧 CHANGE: Adjust spacing and max-width for grid */}
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
          
          {/* 📋 FEATURES GRID: Description list with responsive columns */}
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
            {/* 🔧 CHANGE: Customize grid layout:
                - grid-cols-1: single column on mobile
                - lg:grid-cols-2: two columns on large screens
                - gap-x-8 gap-y-10: spacing between items
                - lg:gap-y-16: larger vertical spacing on large screens */}
            
            {/* 🔄 FEATURES MAPPING: Render each feature from props */}
            {features.map((feature) => (
              <div key={feature.name} className='relative pl-16'>
                {/* 🔧 CHANGE: Adjust pl-16 for icon spacing */}
                
                {/* 🏷️ FEATURE TITLE: Feature name with icon */}
                <dt className='text-base font-semibold leading-7 text-gray-900 dark:text-white'>
                  
                  {/* 🎨 FEATURE ICON CONTAINER: Styled icon background */}
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center border border-yellow-400 bg-yellow-100/50 dark:bg-boxdark rounded-lg'>
                    {/* 🔧 CHANGE: Customize icon styling:
                        - h-10 w-10: icon container size
                        - border-yellow-400: border color
                        - bg-yellow-100/50: background color with opacity
                        - dark:bg-boxdark: dark mode background
                        - rounded-lg: border radius */}
                    
                    {/* 🎭 FEATURE ICON: Emoji or icon character */}
                    <div className='text-2xl'>{feature.icon}</div>
                    {/* 🔧 CHANGE: Adjust text-2xl for icon size */}
                  </div>
                  
                  {/* 📝 FEATURE NAME: Title text */}
                  {feature.name}
                </dt>
                
                {/* 📄 FEATURE DESCRIPTION: Supporting text */}
                <dd className='mt-2 text-base leading-7 text-gray-600 dark:text-white'>
                  {feature.description}
                  {/* 🔧 CHANGE: Adjust mt-2 for spacing between title and description */}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}
