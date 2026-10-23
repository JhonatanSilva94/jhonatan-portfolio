data "aws_route53_zone" "portfolio" {
  name = "jhonatanmoura.com"
}

resource "aws_route53_record" "portfolio" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = "jhonatanmoura.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "portfolio_www" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = "www.jhonatanmoura.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}