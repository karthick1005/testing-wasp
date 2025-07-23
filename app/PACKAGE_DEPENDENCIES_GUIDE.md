# 📦 Package Dependencies Guide

This file explains all dependencies in `package.json` and how to customize them for your SaaS application.

## 🏷️ Project Identification
- **name**: "opensaas" 
  - 🔧 **CHANGE**: Your app name (lowercase, no spaces)
- **type**: "module" 
  - 📦 ES modules support for modern JavaScript

## 📦 Production Dependencies

### ☁️ AWS S3 Integration (File Storage)
- **@aws-sdk/client-s3**: AWS S3 client for file operations
  - 🔧 **MODIFY**: Required if using AWS S3 for file storage
- **@aws-sdk/s3-presigned-post**: Generate presigned upload URLs
  - 🔧 **MODIFY**: Enables secure direct uploads to S3
- **@aws-sdk/s3-request-presigner**: Sign S3 requests for secure access
  - 🔧 **MODIFY**: Generate signed URLs for file downloads

### 🧪 Testing & Development
- **@faker-js/faker**: Generate fake data for testing/seeding
  - 🔧 **MODIFY**: Useful for populating development database

### 📊 Analytics Integration
- **@google-analytics/data**: Google Analytics reporting API
  - 🔧 **MODIFY**: Integrate Google Analytics for user tracking

### 🎨 UI Components
- **@headlessui/react**: Accessible UI components for React
  - 🔧 **MODIFY**: Provides unstyled, accessible components
- **headlessui**: Additional headless UI components
  - 🔧 **MODIFY**: Extra component utilities

### 💰 Payment Processing
- **@lemonsqueezy/lemonsqueezy.js**: LemonSqueezy payment integration
  - 🔧 **MODIFY**: Alternative to Stripe (can remove if using only Stripe)
- **stripe**: Stripe payment processing SDK
  - 🔧 **MODIFY**: Primary payment processor integration

### 🎨 Styling Framework
- **@tailwindcss/forms**: TailwindCSS form component styles
  - 🔧 **MODIFY**: Enhanced form styling with TailwindCSS
- **@tailwindcss/typography**: TailwindCSS typography plugin
  - 🔧 **MODIFY**: Beautiful typography styles
- **tailwindcss**: TailwindCSS framework
  - 🔧 **UPDATE**: Keep updated for latest features
- **tailwind-merge**: Merge TailwindCSS classes intelligently
  - 🔧 **MODIFY**: Prevents conflicting CSS classes

### 📈 Charts & Visualization
- **apexcharts**: Interactive charts library
  - 🔧 **MODIFY**: Create beautiful charts and graphs
- **react-apexcharts**: React wrapper for ApexCharts
  - 🔧 **MODIFY**: React integration for charts

### 🛠️ Utilities
- **clsx**: Conditional CSS class utility
  - 🔧 **MODIFY**: Simplifies conditional class names
- **node-fetch**: HTTP client for server-side requests
  - 🔧 **MODIFY**: Make API calls from server

### 🤖 AI Integration
- **openai**: OpenAI API client for GPT integration
  - 🔧 **MODIFY**: Integrate ChatGPT and other OpenAI models

### 🎨 Code Quality
- **prettier**: Code formatter
  - 🔧 **MODIFY**: Maintains consistent code formatting
- **prettier-plugin-tailwindcss**: TailwindCSS class sorting for Prettier
  - 🔧 **MODIFY**: Sorts TailwindCSS classes automatically

### ⚛️ React Framework
- **react**: React library
  - 🔧 **UPDATE**: Keep updated to latest stable version
- **react-dom**: React DOM bindings
  - 🔧 **UPDATE**: Keep in sync with React version
- **react-router-dom**: React routing library
  - 🔧 **UPDATE**: Handle navigation and routing

### 🎨 React UI Enhancements
- **react-hot-toast**: Toast notifications for React
  - 🔧 **MODIFY**: User feedback through notifications
- **react-icons**: Icon library for React
  - 🔧 **MODIFY**: Large collection of SVG icons

### 🍪 Privacy Compliance
- **vanilla-cookieconsent**: GDPR cookie consent banner
  - 🔧 **MODIFY**: Required for GDPR compliance

### 🔧 Framework Core
- **wasp**: Wasp framework SDK
  - 🔧 **FRAMEWORK**: Auto-managed by Wasp (don't modify)

### ✅ Data Validation
- **zod**: TypeScript schema validation
  - 🔧 **MODIFY**: Type-safe data validation

## 🔧 Development Dependencies

### 📝 Type Definitions
- **@types/express**: Express.js type definitions
  - 🔧 **MODIFY**: TypeScript support for Express
- **@types/react**: React type definitions
  - 🔧 **UPDATE**: Keep in sync with React version

### 🗄️ Database Tools
- **prisma**: Prisma ORM for database operations
  - 🔧 **UPDATE**: Database toolkit and ORM

### 📝 Language Support
- **typescript**: TypeScript compiler
  - 🔧 **UPDATE**: Type-safe JavaScript development

### ⚡ Build Tools
- **vite**: Vite build tool and dev server
  - 🔧 **UPDATE**: Fast development server and bundler
- **vite-plugin-pwa**: Progressive Web App support for Vite
  - 🔧 **MODIFY**: Adds PWA capabilities to your app

## 🚀 Customization Tips

### For Different Payment Processors:
- **Using only Stripe**: Remove `@lemonsqueezy/lemonsqueezy.js`
- **Using only LemonSqueezy**: Remove `stripe`
- **Adding PayPal**: Add PayPal SDK dependencies

### For Different File Storage:
- **Using Cloudinary**: Add `cloudinary` package
- **Using local storage**: Remove AWS S3 packages
- **Using Google Cloud**: Add Google Cloud Storage packages

### For Different Databases:
- **Using MySQL**: Update Prisma configuration
- **Using MongoDB**: Switch to MongoDB Prisma adapter
- **Using SQLite**: Good for development/small apps

### For Different Analytics:
- **Using Plausible**: Add Plausible tracking script
- **Using Mixpanel**: Add `mixpanel-browser` package
- **Removing analytics**: Remove Google Analytics packages

Remember to update environment variables when changing services!
