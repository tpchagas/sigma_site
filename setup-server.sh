#!/bin/bash

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Configuration
APP_USER="sigmalabs"
APP_DIR="/var/www/sigmalabs"
REPOSITORIO_GIT="github.com/tpchagas/sigma_site"
LINK_GIT="https://$REPOSITORIO_GIT"
USE_NGINX=${USE_NGINX:-true}  # Set to false to skip nginx and run Vite preview
NODE_PORT=${NODE_PORT:-4173}  # Vite preview default port

# Check if running as root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}Error: This script must be run as root or with sudo${NC}"
        exit 1
    fi
}

# Check required commands
check_dependencies() {
    echo "Checking dependencies..."
    local deps=("curl" "apt" "systemctl" "tee" "ln" "git")
    if [ "$USE_NGINX" = false ]; then
        deps+=("npm")  # Needed for pm2
    fi
    for cmd in "${deps[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            echo -e "${RED}Error: $cmd is required but not installed${NC}"
            exit 1
        fi
    done
    echo "All basic dependencies found!"
}

# Create dedicated user
create_app_user() {
    echo "Creating application user..."
    if id "$APP_USER" &>/dev/null; then
        echo "User $APP_USER already exists"
    else
        if ! useradd -m -s /bin/bash "$APP_USER"; then
            echo -e "${RED}Error: Failed to create user $APP_USER${NC}"
            exit 1
        fi
        echo "User $APP_USER created successfully"
    fi
}

# Update system packages
update_system() {
    echo "Updating system packages..."
    if ! apt update || ! apt upgrade -y; then
        echo -e "${RED}Error: Failed to update system packages${NC}"
        exit 1
    fi
    echo "System updated successfully!"
}

# Install Node.js and npm
install_nodejs() {
    echo "Installing Node.js and npm..."
    if ! curl -fsSL https://deb.nodesource.com/setup_20.x | bash - || ! apt install -y nodejs; then
        echo -e "${RED}Error: Failed to install Node.js${NC}"
        exit 1
    fi
    if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
        echo -e "${RED}Error: Node.js or npm not properly installed${NC}"
        exit 1
    fi
    echo "Node.js $(node -v) and npm $(npm -v) installed successfully!"
}

# Install nginx (optional)
install_nginx() {
    if [ "$USE_NGINX" = true ]; then
        echo "Installing nginx..."
        if ! apt install -y nginx; then
            echo -e "${RED}Error: Failed to install nginx${NC}"
            exit 1
        fi
        if ! command -v nginx &> /dev/null; then
            echo -e "${RED}Error: nginx not properly installed${NC}"
            exit 1
        fi
        echo "nginx installed successfully!"
    else
        echo "Skipping nginx installation (using Vite preview)"
    fi
}

# Setup application directory
setup_directory() {
    echo "Setting up application directory..."
    if [ -d "$APP_DIR" ]; then
        echo "Directory $APP_DIR already exists, cleaning up..."
        rm -rf "$APP_DIR"/*
    fi
    if ! mkdir -p "$APP_DIR" || ! chown -R "$APP_USER:$APP_USER" "$APP_DIR"; then
        echo -e "${RED}Error: Failed to set up application directory${NC}"
        exit 1
    fi
    echo "Application directory set up at $APP_DIR"
}

# Deploy files from GitHub
deploy_files() {
    echo "Cloning application files from GitHub..."
    local temp_dir="/tmp/sigmalabs_clone"
    if [ -d "$temp_dir" ]; then
        rm -rf "$temp_dir"
    fi
    if ! git clone "$LINK_GIT" "$temp_dir"; then
        echo -e "${RED}Error: Failed to clone repository${NC}"
        exit 1
    fi
    # Verifica se package.json e (vite.config.js OU vite.config.ts) existem
    if [ ! -f "$temp_dir/package.json" ] || { [ ! -f "$temp_dir/vite.config.js" ] && [ ! -f "$temp_dir/vite.config.ts" ]; }; then
        echo -e "${RED}Error: Missing package.json or vite.config.js/vite.config.ts${NC}"
        rm -rf "$temp_dir"
        exit 1
    fi
    if ! cp -r "$temp_dir/"* "$APP_DIR/" || ! chown -R "$APP_USER:$APP_USER" "$APP_DIR"; then
        echo -e "${RED}Error: Failed to deploy files${NC}"
        rm -rf "$temp_dir"
        exit 1
    fi
    rm -rf "$temp_dir"
    echo "Files deployed successfully!"
}
# Install dependencies and build/check Vite application
build_application() {
    echo "Installing dependencies and preparing Vite React application..."
    cd "$APP_DIR" || {
        echo -e "${RED}Error: Failed to access $APP_DIR${NC}"
        exit 1
    }
    if ! sudo -u "$APP_USER" npm install; then
        echo -e "${RED}Error: Failed to install npm dependencies${NC}"
        exit 1
    fi

    # Verify Vite and React dependencies
    if ! grep -q '"vite"' package.json || ! grep -q '"@vitejs/plugin-react"' package.json; then
        echo -e "${RED}Error: Missing 'vite' or '@vitejs/plugin-react' in package.json${NC}"
        exit 1
    fi
    if ! grep -q '"lucide-react"' package.json; then
        echo -e "${RED}Warning: 'lucide-react' not found in package.json${NC}"
        echo "Your vite.config.js references it; proceeding anyway..."
    fi

    if [ "$USE_NGINX" = true ]; then
        if ! grep -q '"build"' package.json; then
            echo -e "${RED}Error: No 'build' script in package.json${NC}"
            exit 1
        fi
        if ! sudo -u "$APP_USER" npm run build; then
            echo -e "${RED}Error: Vite build failed${NC}"
            exit 1
        fi
        if [ ! -d "$APP_DIR/dist" ]; then
            echo -e "${RED}Error: Build did not produce 'dist' directory${NC}"
            exit 1
        fi
    else
        if ! grep -q '"preview"' package.json; then
            echo -e "${RED}Error: No 'preview' script in package.json${NC}"
            exit 1
        fi
        if ! command -v pm2 &> /dev/null; then
            echo "Installing pm2 for process management..."
            if ! npm install -g pm2; then
                echo -e "${RED}Error: Failed to install pm2${NC}"
                exit 1
            fi
        fi
    fi
    echo "Vite React application prepared successfully!"
}

# Configure nginx (optional)
configure_nginx() {
    if [ "$USE_NGINX" = true ]; then
        echo "Configuring nginx for Vite React SPA..."
        local config_file="/etc/nginx/sites-available/sigmalabs"
        if ! tee "$config_file" > /dev/null << EOF
server {
    listen 8080;
    server_name sigmalabs.com.br;
    return 301 https://www.sigmalabs.com.br\$request_uri;
}

server {
    listen 8080;
    server_name www.sigmalabs.com.br;
    root $APP_DIR/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
    gzip_disable "MSIE [1-6]\.";
}
EOF
        then
            echo -e "${RED}Error: Failed to create nginx config${NC}"
            exit 1
        fi
        if ! ln -sf "$config_file" /etc/nginx/sites-enabled/ || ! rm -f /etc/nginx/sites-enabled/default; then
            echo -e "${RED}Error: Failed to enable nginx config${NC}"
            exit 1
        fi
        echo "nginx configured successfully!"
    fi
}

# Start application (nginx or Vite preview)
start_application() {
    if [ "$USE_NGINX" = true ]; then
        echo "Testing and restarting nginx..."
        if ! nginx -t || ! systemctl restart nginx || ! systemctl is-active --quiet nginx; then
            echo -e "${RED}Error: Failed to start nginx${NC}"
            exit 1
        fi
        echo "nginx started successfully!"
    else
        echo "Starting Vite preview with pm2..."
        cd "$APP_DIR" || {
            echo -e "${RED}Error: Failed to access $APP_DIR${NC}"
            exit 1
        }
        if ! sudo -u "$APP_USER" pm2 start npm --name "sigmalabs" -- run preview -- --port "$NODE_PORT"; then
            echo -e "${RED}Error: Failed to start Vite preview with pm2${NC}"
            exit 1
        fi
        if ! sudo -u "$APP_USER" pm2 save; then
            echo -e "${RED}Error: Failed to save pm2 process list${NC}"
            exit 1
        fi
        echo "Vite preview started on port $NODE_PORT!"
    fi
}

# Main execution
main() {
    echo "Starting Vite React project deployment on Ubuntu 22.04..."
    check_root
    check_dependencies
    create_app_user
    update_system
    install_nodejs
    install_nginx
    setup_directory
    deploy_files
    build_application
    configure_nginx
    start_application
    
    echo -e "${GREEN}Setup complete!${NC}"
    if [ "$USE_NGINX" = true ]; then
        echo "Access at: http://sigmalabs.com.br:8080"
        echo "Ensure DNS points to this server's IP and update your access to use port 8080"
    else
        echo "Access at: http://<server-ip>:$NODE_PORT"
        echo "Application is running with pm2 under user $APP_USER (preview mode)"
        echo "Note: Preview mode is for testing; use nginx for production"
    fi
    echo "Consider setting up SSL (e.g., with Let's Encrypt) for production"
}
# Trap errors
trap 'echo -e "${RED}Error: Script failed at line $LINENO${NC}"; exit 1' ERR

# Execute main
main