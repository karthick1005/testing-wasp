// 📄 CONTENT: Import landing page content and configuration
import { features, faqs, footerNavigation, testimonials } from './contentSections';
// 🏠 COMPONENTS: Import all landing page section components
import Hero from './components/Hero'; // Main hero section with headline and CTA
import Clients from './components/Clients'; // Client logos and social proof
import Features from './components/Features'; // Feature showcase grid
import Testimonials from './components/Testimonials'; // Customer testimonials
import FAQ from './components/FAQ'; // Frequently asked questions
import Footer from './components/Footer'; // Site footer with links

/**
 * 🏠 LANDING PAGE COMPONENT: Main marketing page for your SaaS application
 * 🔧 TEMPLATE USAGE: Primary conversion page that showcases your product
 * 
 * Key sections included:
 * - Hero: Main headline, value proposition, and CTA
 * - Clients: Social proof with client logos
 * - Features: Product features in grid layout
 * - Testimonials: Customer reviews and feedback
 * - FAQ: Common questions and answers
 * - Footer: Navigation links and company info
 * 
 * Content Configuration:
 * - All content is defined in './contentSections.ts'
 * - Easy to customize without touching component code
 * - Supports dark mode throughout
 */
export default function LandingPage() {
  return (
    <>
      {/* 🎨 MAIN CONTAINER: Landing page wrapper with dark mode support */}
      <div className='bg-white dark:text-white dark:bg-boxdark-2'>
        {/* 🔧 CHANGE: Customize container styling:
            - bg-white: light mode background
            - dark:text-white: dark mode text color
            - dark:bg-boxdark-2: dark mode background color */}
        
        {/* 🎯 MAIN CONTENT: Primary landing page sections */}
        <main className='isolate dark:bg-boxdark-2'>
          {/* 🔧 CHANGE: Main content container styling:
              - isolate: CSS isolation for stacking contexts
              - dark:bg-boxdark-2: dark mode background consistency */}
          
          {/* 🏠 HERO SECTION: Primary value proposition and call-to-action */}
          <Hero />
          {/* 🔧 CHANGE: Customize hero content in Hero.tsx component */}
          
          {/* 🏢 CLIENT LOGOS: Social proof section */}
          <Clients />
          {/* 🔧 CHANGE: Update client logos in Clients.tsx and logo components */}
          
          {/* ✨ FEATURES SHOWCASE: Product features grid */}
          <Features features={features} />
          {/* 🔧 CHANGE: Update features array in contentSections.ts */}
          
          {/* 💬 CUSTOMER TESTIMONIALS: Social proof and reviews */}
          <Testimonials testimonials={testimonials} />
          {/* 🔧 CHANGE: Update testimonials array in contentSections.ts */}
          
          {/* ❓ FAQ SECTION: Common questions and answers */}
          <FAQ faqs={faqs} />
          {/* 🔧 CHANGE: Update faqs array in contentSections.ts */}
        </main>
        
        {/* 🦶 FOOTER: Site navigation and company information */}
        <Footer footerNavigation={footerNavigation} />
        {/* 🔧 CHANGE: Update footer navigation in contentSections.ts */}
      </div>
    </>
  );
}
