from django.db import models

# Create your models here.
class Booster(models.Model):
    booster_name = models.CharField(max_length=100)
    booster_description = models.TextField(max_length=1000)
    booster_image = models.ImageField(upload_to='booster_images', blank=True)
    duration = models.IntegerField(default=0)
    multiplier = models.IntegerField(default=1)