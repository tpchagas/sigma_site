#!/bin/bash

# Exit on any error
set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações
APP_USER="sigmalabs"
APP_DIR="/var/www/sigmalabs"
REPOSITORIO_GIT="github.com/tpchagas/sigma_site"
LINK_GIT="https://$REPOSITORIO_GIT"
USE_NGINX=${USE_NGINX:-true}

# Verifica root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}Erro: Execute como root ou com sudo${NC}"
        exit 1
    fi
}

# Atualiza o código
update_repo() {
    echo -e "${YELLOW}Baixando versão mais recente...${NC}"
    local temp_dir=$(mktemp -d)
    
    # Clone do repositório
    if ! git clone "$LINK_GIT" "$temp_dir"; then
        echo -e "${RED}Falha ao clonar repositório${NC}"
        rm -rf "$temp_dir"
        exit 1
    fi

    # Verifica arquivos essenciais
    if [ ! -f "$temp_dir/package.json" ] || { [ ! -f "$temp_dir/vite.config.js" ] && [ ! -f "$temp_dir/vite.config.ts" ]; }; then
        echo -e "${RED}Arquivos do projeto inválidos no repositório${NC}"
        rm -rf "$temp_dir"
        exit 1
    fi

    # Copia arquivos
    rsync -av --delete --exclude='node_modules' "$temp_dir/" "$APP_DIR/"
    chown -R "$APP_USER:$APP_USER" "$APP_DIR"
    
    rm -rf "$temp_dir"
    echo -e "${GREEN}Código atualizado com sucesso!${NC}"
}

# Instala dependências
install_deps() {
    echo -e "${YELLOW}Instalando dependências...${NC}"
    cd "$APP_DIR"
    sudo -u "$APP_USER" npm install
    echo -e "${GREEN}Dependências instaladas!${NC}"
}

# Constrói a aplicação
build_app() {
    echo -e "${YELLOW}Construindo aplicação...${NC}"
    cd "$APP_DIR"
    
    if [ "$USE_NGINX" = true ]; then
        sudo -u "$APP_USER" npm run build
        echo -e "${GREEN}Build para produção concluído!${NC}"
    else
        echo -e "${YELLOW}Modo preview: Build não necessário${NC}"
    fi
}

# Reinicia serviços
restart_services() {
    if [ "$USE_NGINX" = true ]; then
        echo -e "${YELLOW}Reiniciando Nginx...${NC}"
        systemctl restart nginx
    else
        echo -e "${YELLOW}Reiniciando PM2...${NC}"
        sudo -u "$APP_USER" pm2 restart sigmalabs
    fi
    echo -e "${GREEN}Serviços reiniciados!${NC}"
}

main() {
    check_root
    update_repo
    install_deps
    build_app
    restart_services
    
    echo -e "\n${GREEN}Atualização concluída com sucesso!${NC}"
    [ "$USE_NGINX" = true ] && echo "Acesse: http://sigmalabs.com.br:8080" || echo "Acesse: http://$(curl -s ifconfig.me):${NODE_PORT:-4173}"
}

main