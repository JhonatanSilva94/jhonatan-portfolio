terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

 backend "s3" {
  bucket = "jhonatanmoura-terraform-state"
  key    = "portfolio/terraform.tfstate"
  region = "us-east-1"
  }
 
}


provider "aws" {
  region = var.aws_region
}



resource "aws_vpc" "portfolio" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name    = "Jhonatan-Portfolio"
    Project = "jhonatan-portfolio"
  }
}



resource "aws_subnet" "portfolio" {
  vpc_id                  = aws_vpc.portfolio.id
  cidr_block              = var.subnet_cidr
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = true 

  tags = {
    Name    = "jhonatan-portfolio"
    Project = "jhonatan-portfolio"
  }
}



resource "aws_internet_gateway" "portfolio" {
  vpc_id = aws_vpc.portfolio.id

  tags = {
    Name    = "jhonatan-portfolio-igw"
    Project = "jhonatan-portfolio"
  }
}



resource "aws_route_table" "portfolio" {
  vpc_id = aws_vpc.portfolio.id

  route {
    cidr_block = "0.0.0.0/0" # 
    gateway_id = aws_internet_gateway.portfolio.id
  }

  tags = {
    Name    = "route-table-jhonatan-portfolio"
    Project = "jhonatan-portfolio"
  }
}



resource "aws_route_table_association" "portfolio" {
  subnet_id      = aws_subnet.portfolio.id
  route_table_id = aws_route_table.portfolio.id
}



resource "aws_security_group" "portfolio" {
  name        = "sg_portfolio-jhonatan"
  description = "Libera SSH (22) e HTTP (80) para o portfólio"
  vpc_id      = aws_vpc.portfolio.id

  
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

 
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "sg_portfolio-jhonatan"
    Project = "jhonatan-portfolio"
  }
}



resource "aws_s3_bucket" "terraform_state" {
  bucket = var.state_bucket_name

  tags = {
    Name    = "jhonatan-portfolio-terraform-state"
    Project = "jhonatan-portfolio"
  }
}


resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}



data "aws_eip" "existing" {
  public_ip = var.existing_elastic_ip
}



resource "aws_instance" "portfolio" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.portfolio.id
  vpc_security_group_ids = [aws_security_group.portfolio.id]
  key_name               = var.key_pair_name


  user_data = <<-EOF
    #!/bin/bash
    for i in {1..5}; do
      apt update -y && break
      sleep 10
    done

    apt install -y docker.io git
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu

    git clone ${var.github_repo_url} /home/ubuntu/jhonatan-portfolio
   
    chown -R ubuntu:ubuntu /home/ubuntu/jhonatan-portfolio

    cd /home/ubuntu/jhonatan-portfolio
    docker build -t jhonatanmoura-portfolio:v1.0 .
    docker run -d -p 80:80 --name portfolio --restart unless-stopped jhonatanmoura-portfolio:v1.0
  EOF

  tags = {
    Name    = "jhonatan-portfolio_Ubuntu"
    Project = "jhonatan-portfolio"
  }
}



resource "aws_eip_association" "portfolio" {
  instance_id   = aws_instance.portfolio.id
  allocation_id = data.aws_eip.existing.id
}

# teste do pipeline de infra