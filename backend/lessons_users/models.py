from django.db import models
from users.models import User
from lessons.models import Lessons  
# Create your models here.
class Lessons_users(models.Model):
    lesson = models.ForeignKey('lessons.Lessons', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    lesson_start_date = models.DateTimeField(auto_now_add=True)
    percentage_completed = models.IntegerField(default=0)

    