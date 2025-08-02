# 🚀 OpenSaaS Template Documentation

This guide explains how to customize every part of your OpenSaaS application for your specific needs.

## 📁 Project Structure Overview

```
app/
├── main.wasp                 # 🔧 Main app configuration
├── schema.prisma            # 🗄️ Database schema
├── package.json             # 📦 Dependencies
├── src/
│   ├── client/              # 🎨 Frontend React components
│   ├── server/              # ⚙️ Backend server logic
│   ├── shared/              # 🔄 Shared utilities
│   ├── auth/                # 🔐 Authentication components
│   ├── payment/             # 💰 Payment processing
│   ├── landing-page/        # 🏠 Landing page components
│   ├── admin/               # 👑 Admin dashboard
│   ├── demo-ai-app/         # 🤖 AI demo features
│   ├── file-upload/         # 📁 File management
│   ├── analytics/           # 📊 Analytics tracking
│   ├── messages/            # 💬 Contact form system
│   └── user/                # 👤 User management
└── public/                  # 🌐 Static assets
```

## 🔧 Quick Start Customization Checklist

### 1. 🏷️ Basic App Identity
- [ ] Change app name in `main.wasp` (line 2)
- [ ] Update `package.json` name field
- [ ] Replace logo files in `public/` folder
- [ ] Update `public/manifest.json` with your app details

### 2. 📧 Email Configuration
- [ ] Update sender email in `main.wasp` (lines 38, 84)
- [ ] Configure email provider (SendGrid/Mailgun) in `main.wasp`
- [ ] Set up email templates in `src/auth/email-and-pass/emails`

### 3. 🌐 SEO & Social Media
- [ ] Update meta descriptions in `main.wasp` (lines 10-22)
- [ ] Replace social media banner image (`public/public-banner.webp`)
- [ ] Configure your domain URLs in meta tags

### 4. 💰 Payment Setup
- [ ] Configure Stripe or LemonSqueezy API keys
- [ ] Update subscription plans in pricing components
- [ ] Set up webhook endpoints for payment processors

### 5. 📊 Analytics Setup
- [ ] Add Google Analytics tracking ID in `main.wasp`
- [ ] Configure Plausible analytics (optional)
- [ ] Set up conversion tracking

## 🔧 Detailed Customization Guide

### 🔐 Authentication System

**Files to modify:**
- `main.wasp` - Auth configuration (lines 33-62)
- `src/auth/` - Auth components and pages
- `schema.prisma` - User model (lines 10-32)

**Customization options:**
- Enable/disable social login providers (Google, GitHub, Discord)
- Customize user registration fields
- Modify password requirements
- Add custom user properties

### 💰 Payment Integration

**Files to modify:**
- `src/payment/` - Payment components
- `main.wasp` - Payment routes and actions (lines 181-201)
- Environment variables for API keys

**Supported providers:**
- Stripe (primary)
- LemonSqueezy (alternative)
- Custom payment processors (requires additional development)

### 🤖 AI Features

**Files to modify:**
- `src/demo-ai-app/` - AI demo components
- `main.wasp` - AI routes and actions (lines 108-145)
- OpenAI API configuration

**Customization options:**
- Replace GPT with other AI models
- Add custom AI functionality
- Modify credit system for AI usage

### 🎨 UI/UX Customization

**Files to modify:**
- `src/client/Main.css` - Global styles
- `tailwind.config.cjs` - TailwindCSS configuration
- `src/client/components/` - Reusable components

**Theming options:**
- Color schemes and branding
- Dark/light mode toggle
- Component styling
- Layout modifications

### 📊 Analytics & Tracking

**Files to modify:**
- `src/analytics/` - Analytics dashboard
- `main.wasp` - Analytics jobs and queries (lines 223-236)
- `src/client/App.tsx` - Client-side tracking

**Tracking options:**
- Google Analytics 4
- Plausible Analytics
- Custom event tracking
- User behavior analytics

### 🗄️ Database Customization

**Files to modify:**
- `schema.prisma` - Database models
- `src/server/scripts/dbSeeds.js` - Data seeding

**Customization options:**
- Add custom database models
- Modify existing model fields
- Set up database relationships
- Create custom migrations

## 🌐 Deployment Configuration

### Environment Variables to Set:

**Database:**
- `DATABASE_URL` - PostgreSQL connection string

**Authentication:**
- `WASP_WEB_CLIENT_URL` - Your app's frontend URL
- `WASP_SERVER_URL` - Your app's backend URL

**Email Service:**
- `SENDGRID_API_KEY` - SendGrid API key
- Or your preferred email provider credentials

**Payment Processing:**
- `STRIPE_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `LEMONSQUEEZY_API_KEY` - LemonSqueezy API key (if using)

**AI Services:**
- `OPENAI_API_KEY` - OpenAI API key

**File Storage:**
- `AWS_S3_IAM_ACCESS_KEY` - AWS access key
- `AWS_S3_IAM_SECRET_KEY` - AWS secret key
- `AWS_S3_FILES_BUCKET` - S3 bucket name
- `AWS_S3_REGION` - AWS region

**Analytics:**
- `GOOGLE_ANALYTICS_CLIENT_EMAIL` - GA service account email
- `GOOGLE_ANALYTICS_PRIVATE_KEY` - GA service account private key
- `GOOGLE_ANALYTICS_PROPERTY_ID` - GA4 property ID

## 🔄 Common Customization Patterns

### Adding a New Page
1. Add route in `main.wasp`
2. Create page component in appropriate `src/` folder
3. Add navigation link if needed
4. Update authentication requirements if necessary

### Adding a New Database Model
1. Define model in `schema.prisma`
2. Create operations in `src/server/`
3. Add queries/actions to `main.wasp`
4. Create frontend components to interact with data

### Customizing Email Templates
1. Modify functions in `src/auth/email-and-pass/emails.ts`
2. Update email styling and content
3. Test with your email provider

### Adding Custom Analytics Events
1. Add tracking calls in relevant components
2. Update analytics dashboard to display new metrics
3. Configure in Google Analytics or your analytics provider

## 🚨 Important Security Considerations

- Always validate user input on both client and server
- Keep API keys secure and never commit them to version control
- Implement proper admin-only route protection
- Use HTTPS in production
- Regularly update dependencies for security patches
- Implement rate limiting for API endpoints
- Sanitize file uploads and user-generated content

## 🧪 Testing Your Customizations

1. **Development Testing:**
   - Test all authentication flows
   - Verify payment processing in test mode
   - Check email delivery (use dev email provider)
   - Test file upload functionality

2. **Production Deployment:**
   - Set up staging environment first
   - Test with real payment processor in test mode
   - Verify analytics tracking
   - Test PWA installation
   - Check GDPR compliance features

## 📚 Additional Resources

- [Wasp Documentation](https://wasp-lang.dev/docs)
- [OpenSaaS Documentation](https://docs.opensaas.sh/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev/)

Remember to update this documentation as you make changes to better serve as a template for future projects!
