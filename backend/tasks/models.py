from django.db import models

# Create your models here.
class Tasks(models.Model):
    task_name = models.CharField(max_length=100)
    task_description = models.TextField(max_length=1000)
    #TODO: Determine what is the content of a task
    task_content = models.TextField(max_length=10000)
    task_points = models.IntegerField(default=100)