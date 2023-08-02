from django.db import models
from users.models import User

# Create your models here.
class Follows(models.Model):
    follower = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="follows_made")
    followed = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="follows_received")
    follow_date = models.DateTimeField(auto_now_add=True)
    
    
