/**
 * ⬆️ UP ARROW ICON: SVG component for upward direction indicators
 * 🔧 TEMPLATE USAGE: Use for sorting, dropdowns, pagination, back-to-top buttons
 * 
 * Features:
 * - Scalable SVG format
 * - TailwindCSS class integration
 * - Consistent arrow styling
 * - Accessible markup ready
 * 
 * Common use cases:
 * - Sort ascending indicator
 * - Collapse/expand controls
 * - Step navigation (previous)
 * - Scroll to top buttons
 */
export function UpArrow() {
  return (
    <svg
      className='fill-meta-3' // 🔧 CHANGE: Customize arrow color with TailwindCSS classes
      width='10' // 🔧 CHANGE: Adjust icon width
      height='11' // 🔧 CHANGE: Adjust icon height
      viewBox='0 0 10 11' // 🔧 CHANGE: Modify viewBox if changing dimensions
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      // 🔧 ADD: Accessibility attributes
      // aria-label="Sort ascending"
      // role="img"
    >
      <path
        d='M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z'
        fill='' // Fill controlled by CSS class
      />
      {/* 🔧 CHANGE: Modify path data for different arrow styles:
          - Thicker arrows: adjust stroke-width
          - Rounded arrows: add border-radius
          - Animated arrows: add CSS transitions */}
    </svg>
  );
}

/**
 * ⬇️ DOWN ARROW ICON: SVG component for downward direction indicators
 * 🔧 TEMPLATE USAGE: Use for dropdowns, sorting, pagination, scroll indicators
 * 
 * Features:
 * - Scalable SVG format
 * - TailwindCSS class integration
 * - Consistent arrow styling
 * - Accessible markup ready
 * 
 * Common use cases:
 * - Sort descending indicator
 * - Dropdown menu triggers
 * - Step navigation (next)
 * - Content expansion indicators
 */
export function DownArrow() {
  return (
    <svg
      className='fill-meta-5' // 🔧 CHANGE: Customize arrow color with TailwindCSS classes
      width='10' // 🔧 CHANGE: Adjust icon width
      height='11' // 🔧 CHANGE: Adjust icon height
      viewBox='0 0 10 11' // 🔧 CHANGE: Modify viewBox if changing dimensions
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      // 🔧 ADD: Accessibility attributes
      // aria-label="Sort descending"
      // role="img"
    >
      <path
        d='M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z'
        fill='' // Fill controlled by CSS class
      />
      {/* 🔧 CHANGE: Modify path data for different arrow styles:
          - Thicker arrows: adjust stroke-width
          - Rounded arrows: add border-radius
          - Animated arrows: add CSS transitions */}
    </svg>
  );
}

// 🔧 TEMPLATE USAGE EXAMPLES:
//
// // Dropdown trigger
// <button className="flex items-center gap-2">
//   Options <DownArrow />
// </button>
//
// // Sort indicator
// <th className="sortable" onClick={handleSort}>
//   Name {sortDirection === 'asc' ? <UpArrow /> : <DownArrow />}
// </th>
//
// // Pagination controls
// <div className="pagination">
//   <button><UpArrow /> Previous</button>
//   <button>Next <DownArrow /></button>
// </div>
//
// // Animated expand/collapse
// <div className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
//   <DownArrow />
// </div>

// 🔧 ENHANCEMENT IDEAS:
// - Add hover and active state styling
// - Create variants with different sizes (sm, md, lg)
// - Add animation props for transitions
// - Create compound components with labels
// - Add theme-aware color variants
