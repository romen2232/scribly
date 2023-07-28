from django.db import models
from users.models import User
from challenges.models import Challenges
from tasks.models import Tasks

# Create your models here.
class Ratings(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    challenge = models.ForeignKey('challenges.Challenges', on_delete=models.CASCADE, null=True, blank=True)
    task = models.ForeignKey('tasks.Tasks', on_delete=models.CASCADE, null=True, blank=True)