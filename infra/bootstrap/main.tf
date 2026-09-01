# ==========================================================
# infra/bootstrap/main.tf
#
# Essa configuração é SEPARADA da principal (infra/main.tf) de
# propósito. Ela só existe pra criar e gerenciar o bucket S3 que
# guarda o state — assim, quando você rodar "terraform destroy"
# na pasta infra/ (a principal), esse bucket NUNCA é destruído
# junto, porque ele nem faz parte daquela configuração.
#
# Essa pasta usa STATE LOCAL (não S3) — de propósito também,
# porque seria estranho o bucket depender de si mesmo pra guardar
# seu próprio state. Isso raramente muda, então tudo bem ficar
# só na sua máquina (o .gitignore de infra/ já cobre esse
# state local, então ele não vai pro Git).
# ==========================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}


# ==========================================================
# BUCKET S3 — guarda o terraform.tfstate da infra principal
# (o "mapa" de tudo que existe: VPC, EC2, etc.)
# ==========================================================
resource "aws_s3_bucket" "terraform_state" {
  bucket = "jhonatanmoura-terraform-state"

  tags = {
    Name    = "jhonatan-portfolio-terraform-state"
    Project = "jhonatan-portfolio"
  }
}

# Mantém versões antigas do state — se algo corromper ou você
# precisar voltar num estado anterior, dá pra recuperar
resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}
