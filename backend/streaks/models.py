from django.db import models
from users.models import User


# Create your models here.
class Streaks(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    streak = models.IntegerField(default=0)
    streak_start_date = models.DateTimeField(auto_now_add=True)
    streak_current_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    streak_end_date = models.DateTimeField(blank=True, null=True)
    