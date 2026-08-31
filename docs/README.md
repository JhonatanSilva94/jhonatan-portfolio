📚 docs/

Documentação técnica e visual do projeto 2000vibe. Aqui ficam os diagramas de arquitetura, em diferentes níveis de detalhe, registrando como o projeto foi pensado e construído.

🗺️ Diagramas planejados

✅ arquitetura_geral_2000vibe.png

Visão macro do projeto: jogador → domínio (Route53) → infraestrutura AWS (EC2 + Docker) → os dois pipelines de CI/CD (aplicação e infraestrutura) atualizando tudo automaticamente.

✅ arquitetura_aws_2000vibe.png

Visão do ambiente AWS criado para rodar o site. Criado manualmente e posteriormente transformado em código Terraform para implantação de CI/CD da infraestrutura. 
