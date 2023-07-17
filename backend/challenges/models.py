from django.db import models

# Create your models here.
class Challenge(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    challenge_name = models.CharField(max_length=100)
    challenge_description = models.TextField(max_length=1000)
    challenge_style = models.CharField(max_length=100)
    difficulty = models.IntegerField(default=0)
    challenge_points = models.IntegerField(default=100)
    challenge_average_rating = models.IntegerField(default=0)