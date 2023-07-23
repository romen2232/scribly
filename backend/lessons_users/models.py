from django.db import models

# Create your models here.
class Lessons_Users(models.Model):
    lesson = models.ForeignKey('lessons.Lesson', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    lesson_start_date = models.DateTimeField(auto_now_add=True)
    percentage_completed = models.IntegerField(default=0)
    