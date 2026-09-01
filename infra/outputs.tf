
output "instance_public_ip" {
  description = "IP público da EC2 (deve ser o Elastic IP reaproveitado)"
  value       = data.aws_eip.existing.public_ip
}

output "instance_id" {
  description = "ID da instância EC2 criada"
  value       = aws_instance.portfolio.id
}

output "vpc_id" {
  description = "ID da VPC criada"
  value       = aws_vpc.portfolio.id
}

output "s3_state_bucket_name" {
  description = "Nome do bucket S3 usado para o state do Terraform (gerenciado separadamente em infra/bootstrap/)"
  value       = var.state_bucket_name
}
