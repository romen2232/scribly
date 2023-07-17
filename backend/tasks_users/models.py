from django.db import models

# Create your models here.
class TaskUser(models.Model):
    task = models.ForeignKey('tasks.Task', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    #TODO: Determine what is the content of a task
    content = models.TextField(max_length=10000)
    task_end_date = models.DateTimeField(auto_now_add=True)
    earned_points = models.IntegerField(default=0)
    