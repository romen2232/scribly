from django.db import models
from django.conf import settings
from badges.models import Badge

class Badges_users(models.Model):
    badge = models.ForeignKey('badges.Badge', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    earned_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = (("badge", "user"),)
