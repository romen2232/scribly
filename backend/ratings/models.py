from django.db import models

# Create your models here.
class Rating(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    challenge = models.ForeignKey('challenges.Challenge', on_delete=models.CASCADE, null=True, blank=True)
    task = models.ForeignKey('tasks.Task', on_delete=models.CASCADE, null=True, blank=True)