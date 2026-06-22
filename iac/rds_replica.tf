resource "aws_db_instance" "replica" {

  replicate_source_db = aws_db_instance.postgres.identifier

  identifier = "prontosalud-replica"

  instance_class = "db.t3.micro"

  skip_final_snapshot = true
}