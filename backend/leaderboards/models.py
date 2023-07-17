from django.db import models

class Leaderboard(models.Model):
    league = models.ForeignKey('leagues.League', on_delete=models.CASCADE)
    weak_date = models.DateTimeField(auto_now_add=True)