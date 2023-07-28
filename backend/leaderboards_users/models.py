from django.db import models
from users.models import User
from leaderboards.models import Leaderboards
# Create your models here.
class Leaderboards_users(models.Model):
    leaderboard = models.ForeignKey('leaderboards.Leaderboards', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    leaderboard_update_date = models.DateTimeField(auto_now_add=True)
    leaderboard_score = models.IntegerField(default=0)