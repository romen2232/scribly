from django.db import models
from users.models import User
from tasks.models import Tasks
# Create your models here.
class Tasks_users(models.Model):
    task = models.ForeignKey('tasks.Tasks', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    #TODO: Determine what is the content of a task
    content = models.TextField(max_length=10000)
    task_end_date = models.DateTimeField(auto_now_add=True)
    earned_points = models.IntegerField(default=0)
    