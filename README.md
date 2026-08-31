jhonatanmoura.com 🌐

Oi, meu nome é Jhonatan!

Esse é meu site portfólio, projeto onde busquei colocar em prática conceitos e ferramentas como **Git, GitHub, Docker, Terraform, CI/CD e AWS.**

No canto superior direito, vai ter um "Jogo anos 2000" — é um projeto inicial que decidi colocar dentro desse site. É um jogo simples onde você escolhe um personagem e anda em uma rua reta, sendo apresentado a vídeos, textos ou imagens nostálgicas que só quem viveu os anos 2000 vai entender.

Vou colocar aqui o passo a passo da criação do projeto e como a infraestrutura está se comportando.


🚀 Passo a passo de implantação/revisão

### 1️⃣ Revisão Git/GitHub ✅
- 1.1 — Implantação Git/GitHub pro projeto, linkando tudo junto com o VS Code

### 2️⃣ Frontend ✅
- 2.1 — Entendimento e avaliação de como a aplicação seria feita e complexidade de criação
- 2.2 — Uso do Claude Code para codificação
- 2.3 — Push do projeto pro GitHub e finalização da primeira parte do frontend
- 2.4 — Seleção de personagem, mapa/estrada, 8 checkpoints com imagem própria
- 2.5 — Conteúdo (checkpoints.json) com texto, imagem e vídeo de cada área
- 2.6 — Correção de bugs (persistência, erro 153 do YouTube)

### 3️⃣ Estudo Docker ✅
- 3.1 — Instalação do Docker Desktop e criação do Dockerfile
- 3.2 — Criação da imagem do site estático e teste na máquina local

### 4️⃣ Criação da Infra manualmente na AWS ✅ *(Segundo passo é transformar em código via Terraform)*
- 4.1 — Criação do ambiente manualmente na AWS
- 4.2 — Componentes criados na ordem: VPC → Subnet pública → Route Table → Internet Gateway → Instância EC2 (Amazon Linux)
- 4.3 — Instalação do Git e do Docker na instância
- 4.4 — Clone do repositório, criação da imagem e execução do container
- 4.5 — Teste do site no navegador

### 5️⃣ Estudo Terraform
- 5.1 — ⏳ *loading...*