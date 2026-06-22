resource "aws_ecs_task_definition" "backend" {

  family = "prontosalud-backend"

  network_mode = "awsvpc"

  requires_compatibilities = ["FARGATE"]

  cpu    = "256"
  memory = "512"

  execution_role_arn = aws_iam_role.ecs_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "backend"
      image = "nginx"

      essential = true

      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}