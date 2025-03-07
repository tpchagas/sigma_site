#!/bin/bash

# Exit on any error
set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações (ajuste conforme necessário)
APP_USER="sigmalabs"
APP_DIR="/var/www/sigmalabs"
REPO_URL="https://github.com/tpchagas/sigma_site"
USE_NGINX=${USE_NGINX:-true}

# Verifica se está sendo executado como root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}Erro: Este script deve ser executado como root ou com sudo${NC}"
        exit 1
    fi
}

# Atualiza o repositório
update_repo() {
    echo -e "${YELLOW}Atualizando código do repositório...${NC}"
    cd "$APP_DIR" || {
        echo -e "${RED}Erro: Falha ao acessar o diretório $APP_DIR${NC}"
        exit 1
    }
    
    # Verifica se o repositório já existe
    if [ ! -d "$APP_DIR/.git" ]; then
        echo -e "${YELLOW}Clonando repositório pela primeira vez...${NC}"
        # Backup de qualquer conteúdo existente
        if [ "$(ls -A $APP_DIR)" ]; then
            mkdir -p "$APP_DIR.bak"
            mv "$APP_DIR"/* "$APP_DIR.bak/"
        fi
        sudo -u "$APP_USER" git clone "$REPO_URL" .
    else
        # Reseta para o último commit e limpa arquivos não rastreados
        sudo -u "$APP_USER" git fetch origin
        sudo -u "$APP_USER" git reset --hard origin/main
        sudo -u "$APP_USER" git clean -df
    fi
    echo -e "${GREEN}Código atualizado com sucesso!${NC}"
}

# Instala dependências
install_deps() {
    echo -e "${YELLOW}Instalando dependências...${NC}"
    cd "$APP_DIR" || exit 1
    sudo -u "$APP_USER" npm install
    echo -e "${GREEN}Dependências instaladas com sucesso!${NC}"
}

# Constrói a aplicação
build_app() {
    echo -e "${YELLOW}Construindo aplicação...${NC}"
    cd "$APP_DIR" || exit 1
    
    if grep -q '"build"' package.json; then
        sudo -u "$APP_USER" npm run build
        echo -e "${GREEN}Build realizado com sucesso!${NC}"
    else
        echo -e "${YELLOW}Aviso: Nenhum script de build encontrado no package.json${NC}"
    fi
}

# Reinicia os serviços
restart_services() {
    if [ "$USE_NGINX" = true ]; then
        echo -e "${YELLOW}Reiniciando Nginx...${NC}"
        systemctl restart nginx
        echo -e "${GREEN}Nginx reiniciado com sucesso!${NC}"
    else
        echo -e "${YELLOW}Reiniciando aplicação via PM2...${NC}"
        sudo -u "$APP_USER" pm2 restart sigmalabs
        echo -e "${GREEN}Aplicação reiniciada com sucesso!${NC}"
    fi
}

main() {
    check_root
    update_repo
    install_deps
    build_app
    restart_services
    
    echo -e "\n${GREEN}Atualização concluída com sucesso!${NC}"
    if [ "$USE_NGINX" = true ]; then
        echo -e "Acesse: http://sigmalabs.com.br:8080"
    else
        echo -e "Acesse: http://$(curl -s ifconfig.me):${NODE_PORT:-4173}"
    fi
}

# Executa o script principal
main