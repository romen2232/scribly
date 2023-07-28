from django.db import models
from django.conf import settings


# Create your models here.
class Challenges(models.Model):
    challenge_name = models.CharField(max_length=100)
    challenge_description = models.TextField(max_length=1000)
    challenge_style = models.CharField(max_length=100)
    difficulty = models.IntegerField(default=0)
    challenge_points = models.IntegerField(default=100)
    challenge_average_rating = models.IntegerField(default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    