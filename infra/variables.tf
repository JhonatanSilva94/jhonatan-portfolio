variable "aws_region" {
  description = "Região da AWS onde tudo será criado"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "Faixa de endereços da VPC (a 'rede' inteira)"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "Faixa de endereços da subnet pública (um pedaço da VPC)"
  type        = string
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "Zona de disponibilidade da subnet. Ajuste aqui se der erro de capacidade (ex: us-east-1a, us-east-1b, us-east-1c...)"
  type        = string
  default     = "us-east-1a"
}

variable "instance_type" {
  description = "Tamanho da instância EC2"
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "ID da imagem (AMI) Ubuntu usada pela EC2 — precisa ser da mesma região definida em aws_region"
  type        = string
  default     = "ami-0b6d9d3d33ba97d99"
}

variable "key_pair_name" {
  description = "Nome do Key Pair já existente na AWS, usado pra SSH. CONFIRME se é esse o nome real do seu key pair (associado ao arquivo portfolio.pem)"
  type        = string
  default     = "portfolio"
}

variable "existing_elastic_ip" {
  description = "O Elastic IP que VOCÊ JÁ TEM alocado na conta (não cria um novo, só reaproveita este)"
  type        = string
  default     = "54.157.234.98"
}

variable "github_repo_url" {
  description = "URL do repositório que será clonado automaticamente dentro da EC2 no primeiro boot"
  type        = string
  default     = "https://github.com/JhonatanSilva94/jhonatan-portfolio.git"
}

variable "state_bucket_name" {
  description = "Nome do bucket S3 que vai guardar o state do Terraform. PRECISA ser único no mundo todo — 'bucket_states' não é válido (tem underscore e é genérico demais). Ajuste se este nome já estiver em uso."
  type        = string
  default     = "jhonatanmoura-terraform-state"
}

variable "domain_name" {
  description = "Domínio principal do portfólio"
  type        = string
  default     = "jhonatanmoura.com"
}