🔗 https://jhonatanmoura.com

Site de portfólio pessoal, incialmente usado para praticar e estudar algumas tecnologias. 


## Passo a passo
1. Git e GitHub: implantação e versionamento do código
2. Frontend: codificação com apoio do Claude Code
3. Docker (estudo inicial): Criação do Dockerfile, build e teste do container em ambiente local
4. Infraestrutura manual na AWS: Ambiente criado na região us-east-1 (por questões de custo);
5. Terraform: Instalação e preparação do ambiente local; criação do código (com apoio de documentação e do Claude); destruição da infra manual e recriação via Terraform
6. CI/CD (GitHub Actions): Criação do deploy-app.yml; teste do deploy automático, atualizando a versão do site e verificando a disponibilidade
7. Route53: Configuração do domínio via Terraform, apontando para o IP elástico da instância EC2; teste final do portfólio
8. Migração para S3 + CloudFront: Infraestrutura antiga (Docker, EC2, VPC, Elastic IP) removida e destruída via Terraform; site passou a ser servido por S3 + CloudFront; pipeline de CI/CD atualizado para sincronizar direto com o S3.

## Tecnologias Atuais do projeto
* AWS: S3, CloudFront e Route 53
* Versionamento: Git e GitHub
* IaC: Terraform
* CI/CD: GitHub Actions

## Considerações finais
Página criada para centralizar um pouco da minha história até aqui. Obrigado se acessou meu portfólio e leu até aqui.