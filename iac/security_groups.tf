resource "aws_security_group" "alb_sg" {

  name   = "alb-sg"
  vpc_id = aws_vpc.main.id

  ingress {

    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] #SOLUCION: Solo permite tráfico proveniente de la red privada definida en el VPC

  }

  egress {

    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]

  }
}