#!/bin/bash

# Demo Apps Development and Deployment Helper Script
# Usage: ./scripts/demo-apps.sh [command] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APPS_DIR="apps"
DEMO_REACT_APP_DIR="$APPS_DIR/demo-react-app"
REGISTRY="ghcr.io"
USERNAME=${GITHUB_REPOSITORY_OWNER:-$(git config user.name | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')}

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check if Docker is installed and running
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "All prerequisites are met"
}

# Function to install dependencies
install_deps() {
    print_info "Installing dependencies for demo React app..."
    
    if [ ! -d "$DEMO_REACT_APP_DIR" ]; then
        print_error "Demo React app directory not found: $DEMO_REACT_APP_DIR"
        exit 1
    fi
    
    cd "$DEMO_REACT_APP_DIR"
    npm install
    cd - > /dev/null
    
    print_success "Dependencies installed successfully"
}

# Function to start development server
start_dev() {
    print_info "Starting development server for demo React app..."
    
    if [ ! -d "$DEMO_REACT_APP_DIR" ]; then
        print_error "Demo React app directory not found: $DEMO_REACT_APP_DIR"
        exit 1
    fi
    
    cd "$DEMO_REACT_APP_DIR"
    
    # Check if dependencies are installed
    if [ ! -d "node_modules" ]; then
        print_warning "Node modules not found. Installing dependencies..."
        npm install
    fi
    
    print_info "Starting dev server on http://localhost:3002"
    npm start
}

# Function to build applications
build_apps() {
    print_info "Building demo applications..."
    
    # Build React app
    if [ -d "$DEMO_REACT_APP_DIR" ]; then
        print_info "Building React demo app..."
        cd "$DEMO_REACT_APP_DIR"
        
        # Install dependencies if needed
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        
        npm run build
        print_success "React demo app built successfully"
        cd - > /dev/null
    else
        print_warning "Demo React app directory not found, skipping..."
    fi
    
    print_success "All applications built successfully"
}

# Function to build Docker images
build_docker() {
    local tag_suffix=${1:-"latest"}
    
    print_info "Building Docker images..."
    
    # Build demo-react-app image
    if [ -d "$DEMO_REACT_APP_DIR" ]; then
        print_info "Building Docker image for demo-react-app..."
        
        # Create Dockerfile if it doesn't exist
        if [ ! -f "$DEMO_REACT_APP_DIR/Dockerfile" ]; then
            create_react_dockerfile
        fi
        
        # Create nginx config if it doesn't exist
        if [ ! -f "$DEMO_REACT_APP_DIR/nginx.conf" ]; then
            create_nginx_config
        fi
        
        docker build -t "$REGISTRY/$USERNAME/demo-react-app:$tag_suffix" "$DEMO_REACT_APP_DIR"
        print_success "demo-react-app Docker image built"
    fi
    
    # Build static demos image
    if [ -f "$APPS_DIR/host-demo.html" ] || [ -f "$APPS_DIR/routing-demo.html" ]; then
        print_info "Building Docker image for static demos..."
        
        # Create Dockerfile if it doesn't exist
        if [ ! -f "$APPS_DIR/Dockerfile" ]; then
            create_static_dockerfile
        fi
        
        docker build -t "$REGISTRY/$USERNAME/demo-static-apps:$tag_suffix" "$APPS_DIR"
        print_success "demo-static-apps Docker image built"
    fi
    
    print_success "All Docker images built successfully"
}

# Function to create React app Dockerfile
create_react_dockerfile() {
    print_info "Creating Dockerfile for React app..."
    
    cat > "$DEMO_REACT_APP_DIR/Dockerfile" << 'EOF'
# Multi-stage build for demo-react-app
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA with Module Federation
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF
    
    print_success "React app Dockerfile created"
}

# Function to create nginx config
create_nginx_config() {
    print_info "Creating nginx config for React app..."
    
    cat > "$DEMO_REACT_APP_DIR/nginx.conf" << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # CORS headers for Module Federation
    add_header Access-Control-Allow-Origin "*" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, PATCH, OPTIONS" always;
    add_header Access-Control-Allow-Headers "X-Requested-With, content-type, Authorization" always;

    # Handle preflight requests
    location / {
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin "*";
            add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, PATCH, OPTIONS";
            add_header Access-Control-Allow-Headers "X-Requested-With, content-type, Authorization";
            add_header Access-Control-Max-Age 1728000;
            add_header Content-Type "text/plain charset=UTF-8";
            add_header Content-Length 0;
            return 204;
        }

        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Special handling for remoteEntry.js (Module Federation)
    location /remoteEntry.js {
        add_header Access-Control-Allow-Origin "*" always;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        expires -1;
    }
}
EOF
    
    print_success "nginx config created"
}

# Function to create static demos Dockerfile
create_static_dockerfile() {
    print_info "Creating Dockerfile for static demos..."
    
    cat > "$APPS_DIR/Dockerfile" << 'EOF'
FROM nginx:alpine

# Copy static HTML files
COPY *.html /usr/share/nginx/html/

# Create index.html that lists available demos
RUN cat > /usr/share/nginx/html/index.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Apps</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: #f8fafc;
        }
        .card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1rem 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        h1 { color: #1e293b; }
        h2 { color: #475569; }
        a { color: #3b82f6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .demo-link {
            display: inline-block;
            background: #3b82f6;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            margin: 0.5rem 0.5rem 0.5rem 0;
        }
        .demo-link:hover {
            background: #2563eb;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>🚀 Demo Applications</h1>
    <div class="card">
        <h2>Available Demos</h2>
        <p>Choose from the following demonstration applications:</p>
        
        <a href="/host-demo.html" class="demo-link">📡 Host Demo</a>
        <a href="/routing-demo.html" class="demo-link">🗺️ Routing Demo</a>
        
        <p style="margin-top: 2rem; color: #64748b; font-size: 0.9rem;">
            These demos showcase Module Federation and micro-frontend capabilities.
        </p>
    </div>
</body>
</html>
HTML

# Copy nginx config
COPY nginx-static.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF

    # Create nginx config for static files
    cat > "$APPS_DIR/nginx-static.conf" << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
    
    print_success "Static demos Dockerfile created"
}

# Function to run Docker containers locally
run_docker() {
    print_info "Running Docker containers locally..."
    
    # Stop existing containers
    docker stop demo-react-app demo-static-apps 2>/dev/null || true
    docker rm demo-react-app demo-static-apps 2>/dev/null || true
    
    # Run demo-react-app
    if docker images | grep -q "$REGISTRY/$USERNAME/demo-react-app"; then
        print_info "Starting demo-react-app on http://localhost:3002"
        docker run -d --name demo-react-app -p 3002:80 "$REGISTRY/$USERNAME/demo-react-app:latest"
        print_success "demo-react-app is running on http://localhost:3002"
    else
        print_warning "demo-react-app image not found. Build it first with: $0 build-docker"
    fi
    
    # Run demo-static-apps
    if docker images | grep -q "$REGISTRY/$USERNAME/demo-static-apps"; then
        print_info "Starting demo-static-apps on http://localhost:3003"
        docker run -d --name demo-static-apps -p 3003:80 "$REGISTRY/$USERNAME/demo-static-apps:latest"
        print_success "demo-static-apps is running on http://localhost:3003"
    else
        print_warning "demo-static-apps image not found. Build it first with: $0 build-docker"
    fi
}

# Function to stop Docker containers
stop_docker() {
    print_info "Stopping Docker containers..."
    docker stop demo-react-app demo-static-apps 2>/dev/null || true
    docker rm demo-react-app demo-static-apps 2>/dev/null || true
    print_success "Docker containers stopped"
}

# Function to push Docker images
push_docker() {
    local tag_suffix=${1:-"latest"}
    
    print_info "Pushing Docker images to registry..."
    
    # Login to registry (requires authentication)
    if ! docker info | grep -q "Username:"; then
        print_warning "Not logged in to Docker registry. Please login first:"
        echo "docker login $REGISTRY"
        exit 1
    fi
    
    # Push images
    if docker images | grep -q "$REGISTRY/$USERNAME/demo-react-app:$tag_suffix"; then
        docker push "$REGISTRY/$USERNAME/demo-react-app:$tag_suffix"
        print_success "demo-react-app:$tag_suffix pushed"
    fi
    
    if docker images | grep -q "$REGISTRY/$USERNAME/demo-static-apps:$tag_suffix"; then
        docker push "$REGISTRY/$USERNAME/demo-static-apps:$tag_suffix"
        print_success "demo-static-apps:$tag_suffix pushed"
    fi
    
    print_success "All images pushed successfully"
}

# Function to clean up
cleanup() {
    print_info "Cleaning up..."
    
    # Stop and remove containers
    stop_docker
    
    # Remove images
    docker rmi "$REGISTRY/$USERNAME/demo-react-app:latest" 2>/dev/null || true
    docker rmi "$REGISTRY/$USERNAME/demo-static-apps:latest" 2>/dev/null || true
    
    # Clean Docker system
    docker system prune -f
    
    print_success "Cleanup completed"
}

# Function to show usage
show_usage() {
    echo "Demo Apps Development and Deployment Helper"
    echo ""
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  check          Check prerequisites"
    echo "  install        Install dependencies"
    echo "  dev            Start development server"
    echo "  build          Build applications"
    echo "  build-docker   Build Docker images"
    echo "  run-docker     Run Docker containers locally"
    echo "  stop-docker    Stop Docker containers"
    echo "  push-docker    Push Docker images to registry"
    echo "  cleanup        Clean up Docker resources"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev                    # Start development server"
    echo "  $0 build-docker          # Build Docker images"
    echo "  $0 run-docker            # Run containers locally"
    echo "  $0 push-docker v1.0.0    # Push with specific tag"
    echo ""
}

# Main script logic
main() {
    case "${1:-help}" in
        "check")
            check_prerequisites
            ;;
        "install")
            check_prerequisites
            install_deps
            ;;
        "dev")
            check_prerequisites
            start_dev
            ;;
        "build")
            check_prerequisites
            build_apps
            ;;
        "build-docker")
            check_prerequisites
            build_apps
            build_docker "${2:-latest}"
            ;;
        "run-docker")
            run_docker
            ;;
        "stop-docker")
            stop_docker
            ;;
        "push-docker")
            push_docker "${2:-latest}"
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|*)
            show_usage
            ;;
    esac
}

# Run main function with all arguments
main "$@"
