# 2000vibe 🕹️

Jogo web de nostalgia anos 2000 — escolha um personagem, ande e reviva 8 áreas marcantes da década através de textos e vídeos.

Projeto de portfólio criado para praticar ferramentas de Infraestrutura: **Git, GitHub, Docker (CI/CD), Terraform e AWS (EC2 + Route53)**.

## 🎮 Sobre o jogo

- 🧑 Escolha entre 3 personagens: **Emo**, **Roqueiro** e **Dançarina Psy**
- ⌨️ Percorra uma estrada usando as setas ↑ / ↓ do teclado
- 📍 8 checkpoints de nostalgia espalhados pelo caminho: **Esportes, Internet, Música, Videogame, Televisão, Brincadeiras, Grandes Eventos e Tecnologia**
- 🖼️ Cada checkpoint mostra um texto curto, imagem ou vídeo sobre o tema
- 🏁 Ao completar os 8 checkpoints, uma tela final de conclusão é exibida

## 🛠️ Passo a passo de implantação/revisão e estudos realizados

### 1️⃣ Estudo/Revisão Git & GitHub
- 1.1 — Implantação Git/GitHub pro projeto, linkando tudo junto com o VS Code

### 2️⃣ Frontend
- 2.1 — Entendimento e avaliação de como a aplicação seria feita e complexidade de criação
- 2.2 — Uso do Claude Code para codificação
- 2.3 — Push do projeto pro GitHub e finalização da primeira parte do frontend

### 3️⃣ Estudo Docker
- 3.1 — Instalação do Docker Desktop e criação do Dockerfile
- 3.2 — Criação da imagem do site estático e teste na máquina local

### 4️⃣ Criação da Infra manualmente na AWS *(Segundo passo é transformar em código via Terraform)*
- 4.1 — Criação do ambiente manualmente na AWS (Criado na região us-east-1 por questões de custos)
- 4.2 — Componentes criados na ordem: VPC → Subnet pública → Route Table → Internet Gateway → Instância EC2 (Amazon Linux)
- 4.3 — Instalação do Git e do Docker na instância
- 4.4 — Clone do repositório, criação da imagem e execução do container
- 4.5 — Teste do site no navegador

### 5️⃣ Estudo Terraform
- 5.1 — ⏳ *loading...*




