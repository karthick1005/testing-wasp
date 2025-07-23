// 🧭 NAVIGATION: Import navigation types and routing
import type { NavigationItem } from '../client/components/NavBar/NavBar';
import { routes } from 'wasp/client/router';
// 🔗 URLS: Import shared URL constants
import { DocsUrl, BlogUrl } from '../shared/common';
// 🖼️ AVATARS: Import avatar images for testimonials
import daBoiAvatar from '../client/static/da-boi.webp';
import avatarPlaceholder from '../client/static/avatar-placeholder.webp';

/**
 * 🧭 LANDING PAGE NAVIGATION: Menu items for landing page navbar
 * 🔧 TEMPLATE USAGE: Customize navigation menu for your landing page
 */
export const landingPageNavigationItems: NavigationItem[] = [
  { name: 'Features', to: '#features' }, // 🔧 CHANGE: Link to features section on same page
  { name: 'Pricing', to: routes.PricingPageRoute.to }, // 🔧 CHANGE: Link to pricing page
  { name: 'Documentation', to: DocsUrl }, // 🔧 CHANGE: External documentation link
  { name: 'Blog', to: BlogUrl }, // 🔧 CHANGE: External blog link
  // 🔧 ADD MORE: Add additional navigation items as needed
];

/**
 * ✨ FEATURES CONFIGURATION: Product features for features section
 * 🔧 TEMPLATE USAGE: Define your app's key features and benefits
 */
export const features = [
  {
    name: 'Cool Feature #1', // 🔧 CHANGE: Replace with your feature name
    description: 'Describe your cool feature here.', // 🔧 CHANGE: Feature description
    icon: '🤝', // 🔧 CHANGE: Emoji or icon for feature
    href: DocsUrl, // 🔧 CHANGE: Link to feature documentation
  },
  {
    name: 'Cool Feature #2', // 🔧 CHANGE: Replace with your feature name
    description: 'Describe your cool feature here.', // 🔧 CHANGE: Feature description
    icon: '🔐', // 🔧 CHANGE: Emoji or icon for feature
    href: DocsUrl, // 🔧 CHANGE: Link to feature documentation
  },
  {
    name: 'Cool Feature #3', // 🔧 CHANGE: Replace with your feature name
    description: 'Describe your cool feature here.', // 🔧 CHANGE: Feature description
    icon: '🥞', // 🔧 CHANGE: Emoji or icon for feature
    href: DocsUrl, // 🔧 CHANGE: Link to feature documentation
  },
  {
    name: 'Cool Feature #4', // 🔧 CHANGE: Replace with your feature name
    description: 'Describe your cool feature here.', // 🔧 CHANGE: Feature description
    icon: '💸', // 🔧 CHANGE: Emoji or icon for feature
    href: DocsUrl, // 🔧 CHANGE: Link to feature documentation
  },
  // 🔧 ADD MORE: Add additional features as needed
];

/**
 * 💬 TESTIMONIALS CONFIGURATION: Customer reviews and social proof
 * 🔧 TEMPLATE USAGE: Add real customer testimonials to build trust
 */
export const testimonials = [
  {
    name: 'Da Boi', // 🔧 CHANGE: Replace with real customer name
    role: 'Wasp Mascot', // 🔧 CHANGE: Replace with customer role/title
    avatarSrc: daBoiAvatar, // 🔧 CHANGE: Replace with customer photo
    socialUrl: 'https://twitter.com/wasplang', // 🔧 CHANGE: Customer social media or website
    quote: "I don't even know how to code. I'm just a plushie.", // 🔧 CHANGE: Replace with real testimonial
  },
  {
    name: 'Mr. Foobar', // 🔧 CHANGE: Replace with real customer name
    role: 'Founder @ Cool Startup', // 🔧 CHANGE: Replace with customer role/title
    avatarSrc: avatarPlaceholder, // 🔧 CHANGE: Replace with customer photo
    socialUrl: '', // 🔧 CHANGE: Customer social media or website
    quote: 'This product makes me cooler than I already am.', // 🔧 CHANGE: Replace with real testimonial
  },
  {
    name: 'Jamie', // 🔧 CHANGE: Replace with real customer name
    role: 'Happy Customer', // 🔧 CHANGE: Replace with customer role/title
    avatarSrc: avatarPlaceholder, // 🔧 CHANGE: Replace with customer photo
    socialUrl: '#', // 🔧 CHANGE: Customer social media or website
    quote: 'My cats love it!', // 🔧 CHANGE: Replace with real testimonial
  },
  // 🔧 ADD MORE: Add additional testimonials for social proof
];

/**
 * ❓ FAQ CONFIGURATION: Frequently asked questions
 * 🔧 TEMPLATE USAGE: Address common customer questions and concerns
 */
export const faqs = [
  {
    id: 1, // 🔧 UNIQUE: Unique identifier for each FAQ
    question: 'Whats the meaning of life?', // 🔧 CHANGE: Replace with real customer question
    answer: '42.', // 🔧 CHANGE: Replace with helpful answer
    href: 'https://en.wikipedia.org/wiki/42_(number)', // 🔧 CHANGE: Optional link for more info
  },
  // 🔧 ADD MORE: Add more FAQs to address customer concerns
  // Common FAQ topics:
  // - Pricing and billing
  // - Features and capabilities
  // - Security and privacy
  // - Support and onboarding
  // - Integration and setup
];

/**
 * 🦶 FOOTER NAVIGATION: Footer links organized by category
 * 🔧 TEMPLATE USAGE: Organize important links for easy access
 */
export const footerNavigation = {
  // 📱 APP SECTION: Links related to your application
  app: [
    { name: 'Documentation', href: DocsUrl }, // 🔧 CHANGE: Update documentation link
    { name: 'Blog', href: BlogUrl }, // 🔧 CHANGE: Update blog link
    // 🔧 ADD MORE: Add links like API docs, tutorials, changelog
  ],
  // 🏢 COMPANY SECTION: Links related to your company
  company: [
    { name: 'About', href: 'https://wasp.sh' }, // 🔧 CHANGE: Replace with your about page
    { name: 'Privacy', href: '#' }, // 🔧 CHANGE: Add your privacy policy link
    { name: 'Terms of Service', href: '#' }, // 🔧 CHANGE: Add your terms of service link
    // 🔧 ADD MORE: Add links like careers, contact, press kit
  ],
};
