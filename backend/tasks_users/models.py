from django.db import models
from users.models import User
from tasks.models import Tasks
from lessons_users.models import Lessons_users
# Create your models here.
class Tasks_users(models.Model):
    task = models.ForeignKey('tasks.Tasks', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    
    task_end_date = models.DateTimeField(auto_now_add=True)
    earned_points = models.IntegerField(default=0)
    
    #answer write is a note
    answerNote =  models.ForeignKey('notes.Notes', on_delete=models.CASCADE, null=True, blank=True)
    #answer complete is an array of strings
    answerText = models.CharField(max_length=10000,default="Text for complete task")
    #answer Boolean is a boolean
    answerBoolean = models.BooleanField(default=False)
    
    lesson_user = models.ForeignKey('lessons_users.Lessons_users', on_delete=models.CASCADE, null=True, blank=True)
    #class Meta:
    #    unique_together = (("task", "user"),)
    
    