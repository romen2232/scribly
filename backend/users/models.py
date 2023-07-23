from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    # Sobreescribir los campos de grupos y permisos con un related_name único
    groups = models.ManyToManyField(Group, related_name="custom_user_groups")
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions")
    
    phone = models.IntegerField(blank=True)
    user_image = models.ImageField(upload_to='profile_pics', blank=True)
    experience = models.IntegerField(default=0)
    gems = models.IntegerField(default=100)
    daily_challenge_config = models.BooleanField(default=True)
