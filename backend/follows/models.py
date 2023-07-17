from django.db import models

# Create your models here.
class Follow(models.Model):
    follower = models.ForeignKey('users.User', on_delete=models.CASCADE)
    followed = models.ForeignKey('users.User', on_delete=models.CASCADE)
    follow_date = models.DateTimeField(auto_now_add=True)