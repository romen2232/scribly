from django.db import models


class Badge(models.Model):
    badge_name = models.CharField(max_length=100)
    badge_description = models.TextField(max_length=1000)
    badge_image = models.ImageField(upload_to='badge_images', blank=True)
    badge_goal = models.IntegerField(default=100)
    badge_level = models.IntegerField(default=1)
    badge_color = models.CharField(
        max_length=100, default='tiviElectricPurple')
