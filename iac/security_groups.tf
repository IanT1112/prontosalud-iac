##################################################
# ALB
##################################################

resource "aws_security_group" "alb_sg" {

  name = "alb-sg"
  description = "Security group for Application Load Balancer"
  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow HTTPS traffic from internet"

    from_port = 443

    to_port = 443

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow outbound traffic to internet"

    from_port = 8080

    to_port = 8080

    protocol = "tcp"

    security_groups = [aws_security_group.ecs_sg.id]
  }
}

##################################################
# ECS
##################################################

resource "aws_security_group" "ecs_sg" {
  name        = "ecs-sg"
  description = "Security group for ECS tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "Allow traffic from ALB to ECS application"

    from_port = 3000
    to_port   = 3000
    protocol  = "tcp"

    security_groups = [
      aws_security_group.alb_sg.id
    ]
  }

  egress {
    description = "Allow outbound traffic from ECS tasks"

    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }
}

##################################################
# DOCUMENTDB
##################################################

resource "aws_security_group" "documentdb_sg" {

  name = "documentdb-sg"

  description = "Security group for Amazon DocumentDB"

  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow MongoDB traffic from ECS tasks"

    from_port = 27017

    to_port = 27017

    protocol = "tcp"

    security_groups = [
      aws_security_group.ecs_sg.id
    ]
  }

  egress {
    description = "Allow MongoDB response traffic to ECS tasks"

    from_port = 27017

    to_port = 27017

    protocol = "tcp"

    security_groups = [aws_security_group.ecs_sg.id]
  }
}