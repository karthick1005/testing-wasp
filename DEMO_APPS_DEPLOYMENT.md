# Demo Apps CI/CD Pipeline

This repository includes a comprehensive CI/CD pipeline for deploying demo applications to a Coolify server. The pipeline automatically detects changes in the `apps/` directory and deploys the affected applications.

## 🚀 Applications

### 1. Demo React App (`apps/demo-react-app/`)
- **Technology**: React 18 with Module Federation
- **Port**: 3002 (development)
- **Features**: 
  - Webpack Module Federation
  - Multiple exposed components
  - CORS enabled for cross-origin loading
  
  - Production-ready build configuration

### 2. Static Demo Apps (`apps/*.html`)
- **Files**: `host-demo.html`, `routing-demo.html`
- **Technology**: Static HTML with JavaScript
- **Features**: Demonstration of Module Federation concepts

## 🔧 Pipeline Configuration

### Workflow Triggers
- **Push to main**: Deploys when changes are detected in `apps/` directory
- **Pull Request**: Builds and validates changes
- **Manual Dispatch**: Force deploy with environment selection

### Smart Change Detection
The pipeline includes intelligent change detection:
- Only builds and deploys apps that have actual changes
- Supports force deployment via manual trigger
- Tracks changes per application independently

### Multi-App Support
- **demo-react-app**: Full webpack build with Module Federation
- **static-demos**: Combined deployment of HTML demos

## 🐳 Docker Configuration

### Demo React App
```dockerfile
# Multi-stage build
FROM node:18-alpine as builder
# ... build process
FROM nginx:alpine
# ... production serving with nginx
```

**Features**:
- Multi-stage build for optimization
- Nginx with SPA support
- CORS headers for Module Federation
- Health checks included
- Gzip compression enabled

### Static Demos
```dockerfile
FROM nginx:alpine
# Serves HTML files with index page
```

**Features**:
- Lightweight nginx serving
- Auto-generated index page
- CORS support
- Security headers

## ⚙️ Coolify Setup

### 1. Create Applications in Coolify

#### Demo React App
```bash
# Create new application
Name: demo-react-app
Source: Docker Image
Image: ghcr.io/[your-username]/demo-react-app:latest
Port: 80
Domain: demo-react-app.yourdomain.com
```

#### Static Demos
```bash
# Create new application
Name: demo-static-apps
Source: Docker Image
Image: ghcr.io/[your-username]/demo-static-apps:latest
Port: 80
Domain: demos.yourdomain.com
```

### 2. Configure Webhooks

In each Coolify application:
1. Go to **Webhooks** section
2. Create new webhook
3. Copy the webhook URL
4. Note the authentication method

### 3. GitHub Secrets Configuration

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `DEMO_REACT_APP_COOLIFY_WEBHOOK` | Webhook URL for demo-react-app | `https://coolify.yourdomain.com/api/v1/webhooks/...` |
| `DEMO_STATIC_APPS_COOLIFY_WEBHOOK` | Webhook URL for static demos | `https://coolify.yourdomain.com/api/v1/webhooks/...` |
| `COOLIFY_TOKEN` | Coolify API authentication token | `your-coolify-api-token` |

## 🔄 Deployment Process

### Automatic Deployment (Push to main)
1. **Change Detection**: Pipeline detects which apps have changes
2. **Build**: Only changed apps are built and pushed to registry
3. **Deploy**: Coolify webhooks are triggered for updated apps
4. **Notify**: Deployment summary is posted to GitHub

### Manual Deployment
```bash
# Via GitHub Actions UI
1. Go to Actions tab
2. Select "Deploy Demo Apps to Coolify"
3. Click "Run workflow"
4. Choose environment and options
5. Click "Run workflow"
```

### Development Workflow
```bash
# Local development
cd apps/demo-react-app
npm install
npm start  # Runs on localhost:3002

# Make changes, commit, and push
git add .
git commit -m "Update demo app"
git push origin main  # Triggers deployment
```

## 📊 Monitoring and Debugging

### Pipeline Monitoring
- Check **Actions** tab for build status
- View detailed logs for each step
- Monitor deployment summary

### Application Monitoring
```bash
# Check application status in Coolify
curl -I https://demo-react-app.yourdomain.com
curl -I https://demos.yourdomain.com

# Check Docker registry
docker pull ghcr.io/[username]/demo-react-app:latest
```

### Common Issues

#### 1. Webhook Failures
```bash
# Check webhook configuration
- Verify webhook URL in Coolify
- Confirm COOLIFY_TOKEN is valid
- Check network connectivity
```

#### 2. Build Failures
```bash
# Check dependencies
cd apps/demo-react-app
npm audit
npm install

# Test local build
npm run build
```

#### 3. Module Federation Issues
```bash
# Verify webpack config
- Check exposed modules in webpack.config.js
- Confirm CORS headers in nginx config
- Test remoteEntry.js accessibility
```

## 🔧 Advanced Configuration

### Custom Environment Variables
Add to workflow file:
```yaml
env:
  REACT_APP_API_URL: ${{ secrets.API_URL }}
  REACT_APP_FEATURE_FLAGS: ${{ vars.FEATURE_FLAGS }}
```

### Multiple Environments
```yaml
# Add staging environment
- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  env:
    COOLIFY_WEBHOOK: ${{ secrets.STAGING_WEBHOOK }}
```

### Custom Build Commands
Modify the build step:
```yaml
- name: Build with custom commands
  working-directory: ./apps/demo-react-app
  run: |
    npm ci
    npm run lint
    npm run test
    npm run build
```

## 📝 Maintenance

### Regular Tasks
1. **Update Dependencies**: Monthly security updates
2. **Monitor Logs**: Check Coolify and GitHub Actions logs
3. **Backup Configuration**: Export Coolify settings
4. **Performance Review**: Monitor build times and deployment speed

### Scaling Considerations
- **Resource Limits**: Configure appropriate CPU/memory limits in Coolify
- **Load Balancing**: Use Coolify's load balancer for high traffic
- **Caching**: Implement CDN for static assets
- **Monitoring**: Set up health checks and alerting

## 🆘 Support

### Resources
- [Coolify Documentation](https://coolify.io/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)

### Troubleshooting Steps
1. Check GitHub Actions logs
2. Verify Coolify application status
3. Test Docker image locally
4. Validate webhook configuration
5. Review network connectivity

For additional support, check the repository issues or create a new issue with:
- Pipeline logs
- Error messages
- Environment configuration
- Steps to reproduce
