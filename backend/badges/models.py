from django.db import models

class Badge(models.Model):
    badge_name = models.CharField(max_length=100)
    badge_description = models.TextField(max_length=1000)
    badge_image = models.ImageField(upload_to='badge_images', blank=True)