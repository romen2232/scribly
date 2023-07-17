from django.db import models

# Create your models here.
class BadgeUser(models.Model):
    badge = models.ForeignKey('badges.Badge', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    earned_date = models.DateTimeField(auto_now_add=True)