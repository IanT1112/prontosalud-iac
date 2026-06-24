variable "aws_region" {
  default = "us-east-1"
}

variable "project_name" {
  default = "prontosalud"
}

variable "db_username" {
  default = "prontosaludadmin"
}

variable "db_password" {
  default   = "ProntoSalud12345"
  sensitive = true
}

variable "jwt_secret" {
  default   = "prontosalud2024"
  sensitive = true
}

variable "openai_api_key" {
  default   = "REEMPLAZA_CON_TU_NUEVA_KEY"
  sensitive = true
}