from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.IntegerField(blank=True)
    user_image = models.ImageField(upload_to='profile_pics', blank=True)
    experience = models.IntegerField(default=0)
    gems = models.IntegerField(default=100)
    daily_challenge_config = models.BooleanField(default=True)