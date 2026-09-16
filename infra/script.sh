#!/bin/bash

# Retry no apt update (evita erro de rede não pronta no boot)
for i in {1..5}; do
  apt-get update && break
  echo "Tentativa $i falhou, aguardando..."
  sleep 10
done

# Instala Docker e Git
apt-get install -y docker.io git

# Configura Docker
systemctl start docker
systemctl enable docker
usermod -aG docker ubuntu

# Clona o repositório e sobe a aplicação
git clone -b new-portfolio https://github.com/JhonatanSilva94/jhonatan-portfolio.git /home/ubuntu/jhonatan-portfolio
cd /home/ubuntu/jhonatan-portfolio
docker build -t jhonatanmoura-portfolio .
docker run -d -p 80:80 --name portfolio jhonatanmoura-portfolio:latest