#!/bin/bash

# Exit on any error
set -e

echo "Starting server setup and deployment..."

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install nginx
echo "Installing nginx..."
sudo apt install -y nginx

# Create application directory
echo "Setting up application directory..."
sudo mkdir -p /var/www/sigmalabs
sudo chown -R $USER:$USER /var/www/sigmalabs

# Copy pre-built application files
echo "Copying application files..."
cp -r ./dist/* /var/www/sigmalabs/

# Configure nginx
echo "Configuring nginx..."
sudo tee /etc/nginx/sites-available/sigmalabs << EOF
server {
    listen 80;
    server_name sigmalabs.com.br;
    root /var/www/sigmalabs;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";
}
EOF

# Enable the site
echo "Enabling nginx site configuration..."
sudo ln -sf /etc/nginx/sites-available/sigmalabs /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
echo "Testing nginx configuration..."
sudo nginx -t

# Restart nginx
echo "Restarting nginx..."
sudo systemctl restart nginx

echo "Setup complete! The site should now be accessible at http://sigmalabs.com.br"
echo "Note: Make sure your domain DNS is properly configured to point to this server's IP address"
echo "You can now set up Cloudflare Argo tunnel for secure access"