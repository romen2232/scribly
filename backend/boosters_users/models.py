from django.db import models

# Create your models here.
class BoosterUser(models.Model):
    booster = models.ForeignKey('boosters.Booster', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    booster_start_date = models.DateTimeField(auto_now_add=True)
    booster_end_date = models.DateTimeField(blank=True, null=True)