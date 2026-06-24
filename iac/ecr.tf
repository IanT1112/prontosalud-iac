resource "aws_ecr_repository" "backend" {

  name = "prontosalud-backend"

  image_tag_mutability = "MUTABLE"

  force_delete = true
}