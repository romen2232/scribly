from django.db import models
from boosters.models import Boosters
from users.models import User

# Create your models here.
class Boosters_users(models.Model):
    booster = models.ForeignKey('boosters.Boosters', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    booster_start_date = models.DateTimeField(auto_now_add=True)
    booster_end_date = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        unique_together = (("booster", "user"),)