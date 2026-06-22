resource "aws_lb" "main" {

  name               = "prontosalud-alb"
  load_balancer_type = "application"

  internal = false

  security_groups = [
    aws_security_group.alb_sg.id
  ]

  subnets = [
    aws_subnet.public_a.id
  ]
}