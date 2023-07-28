from django.db import models

# Create your models here.
class Clubs(models.Model):
    club_name = models.CharField(max_length=100)
    