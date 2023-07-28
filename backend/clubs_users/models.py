from django.db import models

# Create your models here.
class Clubs_users(models.Model):
    clubs_users_name = models.CharField(max_length=100)
   