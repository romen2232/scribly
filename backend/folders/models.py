from django.db import models
from users.models import User


class Folders(models.Model):
    folder_name = models.CharField(max_length=100)
    folder_description = models.TextField(max_length=1000)
    folder_image = models.ImageField(upload_to='folder_images', blank=True)
    folder_created = models.DateTimeField(auto_now_add=True)
    favorite = models.BooleanField(default=False)
    folder_parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True)
    # 0 = root, 1 = child, 2 = grandchild, etc.
    depth = models.IntegerField(default=0)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
