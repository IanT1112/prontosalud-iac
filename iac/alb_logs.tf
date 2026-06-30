resource "aws_s3_bucket" "alb_logs" {
  bucket        = "${var.project_name}-alb-logs-${random_id.bucket_suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "alb_logs" {
  bucket = aws_s3_bucket.alb_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_sns_topic" "alb_logs_notifications" {
  name              = "${var.project_name}-alb-logs-notifications"
  kms_master_key_id = "alias/aws/sns"
}

resource "aws_s3_bucket_notification" "alb_logs" {
  bucket = aws_s3_bucket.alb_logs.id

  topic {
    topic_arn     = aws_sns_topic.alb_logs_notifications.arn
    events        = ["s3:ObjectCreated:*"]
    filter_prefix = "AWSLogs/"
  }
}

resource "aws_s3_bucket_versioning" "alb_logs" {
  bucket = aws_s3_bucket.alb_logs.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket" "alb_logs_replica" {
  provider      = aws.replica
  bucket        = "${var.project_name}-alb-logs-replica-${random_id.bucket_suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "alb_logs_replica" {
  provider = aws.replica
  bucket   = aws_s3_bucket.alb_logs_replica.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_replication_configuration" "alb_logs" {
  depends_on = [
    aws_s3_bucket_versioning.alb_logs,
    aws_s3_bucket_versioning.alb_logs_replica
  ]

  role   = aws_iam_role.s3_replication_role.arn
  bucket = aws_s3_bucket.alb_logs.id

  rule {
    id     = "replicate-alb-logs"
    status = "Enabled"

    destination {
      bucket        = aws_s3_bucket.alb_logs_replica.arn
      storage_class = "STANDARD"
    }
  }
}