jhonatanmoura.com 🌐

Esse é meu site portfólio, projeto onde busquei colocar em prática conceitos e ferramentas que estou estudando:

- **Git & GitHub** - Repositório e versionamento do código
- **Docker** - Criação da imagem e do container dentro de uma instância EC2 na AWS
- **Terraform** - Criação e configuração de todo o ambiente via código na AWS (IaC)
- **CI/CD** - GitHub Actions pra esteira de deploy
- **AWS** - Todo o projeto está rodando na AWS 


🚀 Passo a passo de implantação/revisão

### 1️⃣ Revisão Git/GitHub
- 1.1 — Implantação do Git/GitHub pro projeto, linkando tudo junto com o VSCode

### 2️⃣ Frontend
- 2.1 — Avaliação do projeto
- 2.2 — Uso do Claude Code para codificação
- 2.3 — Teste do ambiente na máquina local
- 2.4 — Push do projeto pro GitHub e finalização da primeira parte do frontend

### 3️⃣ Estudo Docker
- 3.1 — Criação do Dockerfile
- 3.2 — Criação da imagem e teste da aplicação no container local
- 3.3 — Push do Dockerfile pro GitHub

### 4️⃣ Criação da Infra manualmente na AWS
- 4.1 — Criação do ambiente manualmente na AWS (Criado na região us-east-1 para fins de custos)
- 4.2 — Componentes criados na ordem: VPC → Subnet pública → Route Table → Internet Gateway → Instância EC2 (Ubuntu Linux)
- 4.3 — Instalação do Git e do Docker na instância
- 4.4 — Clone do repositório, criação da imagem e execução do container
- 4.5 — Teste do portifólio no navegador

### 5️⃣ Estudo Terraform
- 5.1 — Instalação e preparação do ambiente local com Terraform
- 5.2 — Criação do código do Terraform (Auxilio da Documentação e Claude)
- 5.3 — Criação do Remote State (S3 Bucket separado da infra geral) para armazenamento dos arquivos .state
- 5.4 — Destruição manual da infra e criação via Terraform
- 5.5 — Teste com "apply" e "destroy" realizados juntamente com testes do site

### 6️⃣ CI/CD (GitHub Actions)
- 6.1 — Criação dos arquivos (deploy-app.yml e deploy-infra.yml)
- 6.2 — Configuração e teste do deploy-app.yml atualizando a versão do site e verificando a disponibilidade
- 6.3 — Configuração e teste do deploy-infra.yml atualizando a liberação de uma porta e verificando o funcionamento

### 7️⃣ Route53 (jhonatanmoura.com)
- 7.1 — Configuração do Route53 via Terraform pra apontar pro ip elástico da instância EC2
- 7.2 — Teste final na aplicação com todas as funcionalidades


## 🙏 Considerações finais
Página criada para centralizar um pouco da minha história até aqui e o motivo de estar voltando pra area de TI agora.
Obrigado se acessou meu portfólio e leu até aqui.