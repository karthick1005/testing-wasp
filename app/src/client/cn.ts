// 🎨 STYLING UTILITIES: Import TailwindCSS utility libraries
import clsx, { ClassValue } from 'clsx'; // Conditional class names utility
import { twMerge } from 'tailwind-merge'; // TailwindCSS class merging utility

/**
 * 🎨 CLASS NAME UTILITY: Combine and merge CSS classes intelligently
 * 🔧 TEMPLATE USAGE: Essential utility for conditional styling throughout the app
 * 
 * Features:
 * - Combines multiple class name inputs
 * - Resolves conflicting TailwindCSS classes
 * - Supports conditional classes via clsx
 * - Optimizes final class string
 * 
 * Usage examples:
 * cn('base-class', condition && 'conditional-class')
 * cn('text-red-500', 'text-blue-500') // blue wins due to merge
 * cn(['array', 'of', 'classes'], { 'conditional': true })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
  // 1. clsx() handles conditional logic and flattens inputs
  // 2. twMerge() resolves TailwindCSS class conflicts intelligently
}
