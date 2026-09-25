# jhonatanmoura.com 🌐

Site portfólio pessoal, onde coloco em prática conceitos e ferramentas que estou estudando para meu retorno à área de TI.

🔗 https://jhonatanmoura.com

## Passo a passo

1. Git e GitHub — implantação e versionamento do código
2. Frontend — codificação com apoio do Claude Code
3. Docker (estudo inicial) — criação do Dockerfile, build e teste do container em ambiente local
4. Infraestrutura manual na AWS — ambiente criado na região us-east-1 (por questões de custo);
5. Terraform — instalação e preparação do ambiente local; criação do código (com apoio de documentação e do Claude); destruição da infra manual e recriação via Terraform
6. CI/CD (GitHub Actions) — criação do deploy-app.yml; teste do deploy automático, atualizando a versão do site e verificando a disponibilidade
7. Route53 — configuração do domínio via Terraform, apontando para o IP elástico da instância EC2; teste final do portfólio
8. Migração para S3 + CloudFront — infraestrutura antiga (Docker, EC2, VPC, Elastic IP) removida e destruída via Terraform; site passou a ser servido por S3 + CloudFront; pipeline de CI/CD atualizado para sincronizar direto com o S3.

## Tecnologias Atuais do projeto

* AWS: S3, CloudFront e Route 53
* Versionamento: Git e GitHub
* Infraestrutura como código: Terraform
* CI/CD: GitHub Actions

## Considerações finais

Página criada para centralizar um pouco da minha história até aqui e o motivo de estar voltando para a área de TI agora. Obrigado se acessou meu portfólio e leu até aqui.