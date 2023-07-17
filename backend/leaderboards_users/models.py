from django.db import models

# Create your models here.
class LeaderboardUser(models.Model):
    leaderboard = models.ForeignKey('leaderboards.Leaderboard', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    leaderboard_update_date = models.DateTimeField(auto_now_add=True)
    leaderboard_score = models.IntegerField(default=0)