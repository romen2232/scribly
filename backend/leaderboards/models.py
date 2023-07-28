from django.db import models
from leagues.models import Leagues


class Leaderboards(models.Model):
    league = models.ForeignKey('leagues.Leagues', on_delete=models.CASCADE)
    weak_date = models.DateTimeField(auto_now_add=True)