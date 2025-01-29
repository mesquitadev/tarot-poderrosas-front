#!/bin/sh

# Substituir variáveis de ambiente no arquivo de configuração do NGINX
envsubst < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf

# Iniciar o NGINX
nginx -g 'daemon off;'