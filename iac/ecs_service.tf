resource "aws_ecs_service" "backend" {

  name = "backend-service"

  cluster = aws_ecs_cluster.main.id

  task_definition = aws_ecs_task_definition.backend.arn

  desired_count = 1

  launch_type = "FARGATE"

}