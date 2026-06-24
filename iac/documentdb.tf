resource "aws_docdb_subnet_group" "main" {
  name = "${var.project_name}-docdb-subnet-group"

  subnet_ids = [
    aws_subnet.private_a.id,
    aws_subnet.private_b.id
  ]
}

resource "aws_docdb_cluster_parameter_group" "main" {
  family = "docdb5.0"
  name   = "${var.project_name}-docdb-params"

  parameter {
    name  = "tls"
    value = "disabled"
  }
}

resource "aws_docdb_cluster" "main" {
  cluster_identifier              = "${var.project_name}-docdb"
  engine                          = "docdb"
  master_username                 = var.db_username
  master_password                 = var.db_password
  db_subnet_group_name            = aws_docdb_subnet_group.main.name
  vpc_security_group_ids          = [aws_security_group.documentdb_sg.id]
  db_cluster_parameter_group_name = aws_docdb_cluster_parameter_group.main.name

  skip_final_snapshot = true
  storage_encrypted   = true
}

resource "aws_docdb_cluster_instance" "main" {
  identifier         = "${var.project_name}-docdb-instance"
  cluster_identifier = aws_docdb_cluster.main.id
  instance_class     = "db.t3.medium"
  engine             = "docdb"
}