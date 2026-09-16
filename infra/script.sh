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