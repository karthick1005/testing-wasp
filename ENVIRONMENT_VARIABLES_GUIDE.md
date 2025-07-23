# 🔐 Environment Variables Configuration Guide

This guide explains all environment variables needed to configure your OpenSaaS application for different environments.

## 📁 Environment Files Structure

```
app/
├── .env.server          # 🔧 Server-side environment variables
├── .env.client          # 🔧 Client-side environment variables (public)
└── .env.server.example  # 🔧 Template for server environment variables
```

## 🗄️ Database Configuration

### PostgreSQL Database
```bash
# 🔧 REQUIRED: Database connection string
DATABASE_URL="postgresql://username:password@host:port/database_name"

# 🔧 EXAMPLES:
# Local development:
DATABASE_URL="postgresql://postgres:password@localhost:5432/myapp_dev"

# Heroku Postgres:
DATABASE_URL="postgresql://user:pass@host.compute-1.amazonaws.com:5432/dbname"

# Railway/Supabase:
DATABASE_URL="postgresql://postgres:[password]@db.host.com:5432/postgres"
```

## 🌐 Application URLs

### Wasp Framework URLs
```bash
# 🔧 REQUIRED: Your app's frontend URL
WASP_WEB_CLIENT_URL="http://localhost:3000"  # Development
WASP_WEB_CLIENT_URL="https://yourdomain.com"  # Production

# 🔧 REQUIRED: Your app's backend URL  
WASP_SERVER_URL="http://localhost:3001"  # Development
WASP_SERVER_URL="https://api.yourdomain.com"  # Production
```

## 📧 Email Service Configuration

### SendGrid (Recommended)
```bash
# 🔧 REQUIRED: SendGrid API key
SENDGRID_API_KEY="SG.your_sendgrid_api_key_here"

# 🔧 SETUP STEPS:
# 1. Sign up at https://sendgrid.com/
# 2. Create API key with "Mail Send" permissions
# 3. Verify your sender email/domain
```

### Alternative Email Providers
```bash
# Mailgun
MAILGUN_API_KEY="your_mailgun_api_key"
MAILGUN_DOMAIN="mg.yourdomain.com"

# AWS SES
AWS_SES_ACCESS_KEY="your_aws_access_key"
AWS_SES_SECRET_KEY="your_aws_secret_key"
AWS_SES_REGION="us-east-1"
```

## 💳 Payment Processing

### Stripe (Primary Payment Processor)
```bash
# 🔧 REQUIRED: Stripe secret key
STRIPE_KEY="sk_test_..." # Test mode
STRIPE_KEY="sk_live_..." # Production mode

# 🔧 REQUIRED: Stripe webhook secret
STRIPE_WEBHOOK_SECRET="whsec_..." # From Stripe webhook settings

# 🔧 SETUP STEPS:
# 1. Create account at https://stripe.com/
# 2. Get API keys from Dashboard → Developers → API keys
# 3. Create webhook endpoint for /payments-webhook
# 4. Copy webhook signing secret
```

### LemonSqueezy (Alternative Payment Processor)
```bash
# 🔧 OPTIONAL: LemonSqueezy API key
LEMONSQUEEZY_API_KEY="your_lemonsqueezy_api_key"
LEMONSQUEEZY_STORE_ID="your_store_id"
LEMONSQUEEZY_WEBHOOK_SECRET="your_webhook_secret"

# 🔧 SETUP STEPS:
# 1. Create account at https://lemonsqueezy.com/
# 2. Get API key from Settings → API
# 3. Configure webhook for payments
```

## 🤖 AI Services

### OpenAI Integration
```bash
# 🔧 REQUIRED: OpenAI API key for GPT features
OPENAI_API_KEY="sk-..." # Your OpenAI API key

# 🔧 SETUP STEPS:
# 1. Create account at https://openai.com/
# 2. Generate API key in API settings
# 3. Set up billing and usage limits
```

### Alternative AI Providers
```bash
# Anthropic Claude
ANTHROPIC_API_KEY="your_anthropic_key"

# Google AI
GOOGLE_AI_API_KEY="your_google_ai_key"

# Azure OpenAI
AZURE_OPENAI_API_KEY="your_azure_key"
AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
```

## 📁 File Storage

### AWS S3 (Recommended)
```bash
# 🔧 REQUIRED: AWS credentials for file uploads
AWS_S3_IAM_ACCESS_KEY="your_access_key"
AWS_S3_IAM_SECRET_KEY="your_secret_key"
AWS_S3_FILES_BUCKET="your-bucket-name"
AWS_S3_REGION="us-east-1"

# 🔧 SETUP STEPS:
# 1. Create AWS account
# 2. Create S3 bucket
# 3. Create IAM user with S3 permissions
# 4. Generate access keys for IAM user
```

### Alternative Storage Providers
```bash
# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key" 
CLOUDINARY_API_SECRET="your_api_secret"

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID="your_project_id"
GOOGLE_CLOUD_KEY_FILE="path/to/service-account.json"
GOOGLE_CLOUD_BUCKET="your_bucket_name"
```

## 📊 Analytics Services

### Google Analytics
```bash
# 🔧 OPTIONAL: Google Analytics service account
GOOGLE_ANALYTICS_CLIENT_EMAIL="service-account@project.iam.gserviceaccount.com"
GOOGLE_ANALYTICS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_ANALYTICS_PROPERTY_ID="123456789"

# 🔧 SETUP STEPS:
# 1. Create GA4 property
# 2. Create service account in Google Cloud Console
# 3. Download service account JSON
# 4. Extract client_email and private_key
# 5. Grant analytics permissions to service account
```

### Plausible Analytics (Privacy-Focused Alternative)
```bash
# 🔧 OPTIONAL: Plausible configuration
PLAUSIBLE_DOMAIN="yourdomain.com"
PLAUSIBLE_API_KEY="your_plausible_api_key" # For server-side tracking
```

## 🔐 Authentication & Security

### JWT Secrets
```bash
# 🔧 REQUIRED: JWT signing secret (generate random string)
JWT_SECRET="your_very_long_random_string_here"

# 🔧 GENERATION COMMAND:
# openssl rand -base64 32
```

### Social Authentication (Optional)
```bash
# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# GitHub OAuth  
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Discord OAuth
DISCORD_CLIENT_ID="your_discord_client_id"
DISCORD_CLIENT_SECRET="your_discord_client_secret"
```

## 🌍 Environment-Specific Configuration

### Development Environment (.env.server)
```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/myapp_dev"

# Application URLs
WASP_WEB_CLIENT_URL="http://localhost:3000"
WASP_SERVER_URL="http://localhost:3001"

# Email (use test mode)
SENDGRID_API_KEY="SG.test_key_here"

# Payments (use test keys)
STRIPE_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."

# AI (use with caution in dev)
OPENAI_API_KEY="sk_test_key"

# File Storage (use test bucket)
AWS_S3_FILES_BUCKET="myapp-dev-uploads"
```

### Production Environment
```bash
# Database (production)
DATABASE_URL="postgresql://user:pass@prod-host:5432/myapp_prod"

# Application URLs (your domain)
WASP_WEB_CLIENT_URL="https://yourdomain.com"
WASP_SERVER_URL="https://api.yourdomain.com"

# Email (production keys)
SENDGRID_API_KEY="SG.production_key_here"

# Payments (live keys)
STRIPE_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_live_..."

# AI (production key with limits)
OPENAI_API_KEY="sk_live_key"

# File Storage (production bucket)
AWS_S3_FILES_BUCKET="myapp-prod-uploads"

# Security
JWT_SECRET="super_secure_random_string_for_production"
```

## 🚀 Deployment Platform Configuration

### Vercel
```bash
# Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

### Heroku
```bash
# Set via CLI
heroku config:set DATABASE_URL="postgresql://..." --app your-app-name
heroku config:set STRIPE_KEY="sk_live_..." --app your-app-name
```

### Railway
```bash
# Set in Railway dashboard
# Project → Variables tab
```

### Docker
```bash
# Use .env file or docker-compose.yml
services:
  app:
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - STRIPE_KEY=${STRIPE_KEY}
```

## ⚠️ Security Best Practices

### 🔒 Environment Variable Security
1. **Never commit .env files to version control**
2. **Use different keys for development/production**
3. **Rotate keys regularly**
4. **Use least-privilege access for API keys**
5. **Monitor API key usage for anomalies**

### 🛡️ Key Management
```bash
# Add to .gitignore
.env.server
.env.client
.env.local
.env

# Use environment variable validation
# Check for required variables on startup
```

### 🔍 Debugging Environment Issues
```bash
# Check loaded environment variables (be careful not to log secrets)
console.log('DB connected:', !!process.env.DATABASE_URL);
console.log('Stripe configured:', !!process.env.STRIPE_KEY);

# Use environment validation middleware
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}
```

## 📋 Environment Setup Checklist

### Before Development
- [ ] Copy `.env.server.example` to `.env.server`
- [ ] Set up local PostgreSQL database
- [ ] Configure test Stripe account
- [ ] Get OpenAI API key (if using AI features)
- [ ] Set up local S3 bucket or alternative

### Before Production Deployment
- [ ] Set up production database
- [ ] Configure production domain URLs
- [ ] Set up production email service
- [ ] Configure live payment processor
- [ ] Set up production file storage
- [ ] Configure analytics services
- [ ] Generate secure JWT secrets
- [ ] Test all integrations in staging environment

Remember: Each environment should have its own set of keys and configurations!
