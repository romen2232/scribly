from django.db import models
from users.models import User

# Create your models here.
class Directs(models.Model):
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="directs_sent")
    receiver = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="directs_received")
    message = models.TextField(max_length=1000)
    sent_date = models.DateTimeField(auto_now_add=True)