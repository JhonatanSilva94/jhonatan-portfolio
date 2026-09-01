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
- 2.3 — Teste do ambiente na máquina local
- 2.4 — Push do projeto pro GitHub e finalização da primeira parte do frontend

### 3️⃣ Estudo Docker ✅
- 3.1 — Instalação do Docker Desktop e criação do Dockerfile
- 3.2 — Criação da imagem e teste da aplicação no container criado na máquina local
- 3.3 — Push do Dockerfile pro GitHub

### 4️⃣ Criação da Infra manualmente na AWS ✅ *(Segundo passo é transformar em código via Terraform)*
- 4.1 — Criação do ambiente manualmente na AWS (Criado na região us-east-1 para fins de custos)
- 4.2 — Componentes criados na ordem: VPC → Subnet pública → Route Table → Internet Gateway → Instância EC2 (Ubuntu Linux)
- 4.3 — Instalação do Git e do Docker na instância
- 4.4 — Clone do repositório, criação da imagem e execução do container
- 4.5 — Teste do site no navegador

### 5️⃣ Estudo Terraform
- 5.1 — Instalação e preparação do ambiente local com Terraform
- 5.2 — Criação do código do Terraform (Auxilio da Documentação e Claude)
- 5.3 — Criação do Remote State (S3 Bucket separado da infra geral) para armazenamento dos arquivos .state
- 5.4 — Destruição manual da infra e criação via Terraform
- 5.5 — Teste com "apply" e "destroy" realizados juntamente com testes do site

### 6️⃣ CI/CD (GitHub Actions)
- 6.1 — Criação do caminho de diretórios necessários pra criação dos 2 workflows e criação dos arquivos (deploy-app.yml e deploy-infra.yml)
- 6.2 — Configuração e teste do deploy-app.yml atualizando a versão do site e verificando a disponibilidade
- 6.3 — Configuração e teste do deploy-infra.yml atualizando a liberação de uma porta e verificando o funcionamento

### 7️⃣ Route53 (jhonatanmoura.com)
- 7.1 — Configuração do Route53 via Terraform pra apontar pro ip elástico da instância EC2
- 7.2 — Teste na aplicação com todas as funcionalidades

### 8️⃣ Configuração HTTPS
- 8.1 — Configuração HTTPs via Certbot
- 8.2 — Alteração do main.tf e do Dockerfile pra liberar a porta 443 da instância
- 8.3 — Teste final da aplicação!!!

### Finalizado ✅
- Projeto completo: site portfólio + jogo (2000vibe) no ar, containerizado, provisionado via Terraform, com deploy automático via CI/CD e domínio próprio.


## 🙏 Considerações finais

Obrigado se acessou meu portfólio e leu até aqui. Apenas deixando claro: não sou expert em nenhuma das ferramentas usadas, apenas aproveitei pra ir estudando e tentando colocar em prática sobre mim. Usei documentações e IA pra me ajudar em alguns momentos.

Nesse projeto, fui pausando a prática e estudando as ferramentas via aulas no portal da Udemy.com, seguindo este ciclo:

**Estudo Git → Parte prática → Estudo Docker → Parte prática → Estudo Terraform → Parte prática → Estudo CI/CD → Parte prática** 