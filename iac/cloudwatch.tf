resource "aws_cloudwatch_log_group" "ecs" {

  name = "/ecs/prontosalud"

  retention_in_days = 7

}