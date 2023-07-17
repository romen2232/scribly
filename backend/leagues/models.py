from django.db import models

# Create your models here.
class League(models.Model):
    league_name = models.CharField(max_length=100)
    league_description = models.TextField(max_length=1000)
    league_image = models.ImageField(upload_to='league_images', blank=True)