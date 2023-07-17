from django.db import models

# Create your models here.
class Direct(models.Model):
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE)
    receiver = models.ForeignKey('users.User', on_delete=models.CASCADE)
    message = models.TextField(max_length=1000)
    sent_date = models.DateTimeField(auto_now_add=True)