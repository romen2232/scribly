from django.db import models

# Create your models here.
class Tasks(models.Model):
    task_name = models.CharField(max_length=100)
    task_description = models.TextField(max_length=1000)
    
    task_points = models.IntegerField(default=100,)
    type = models.CharField(max_length=100,default="WRITE") # WRITE, COMPLETE, REORDER, CHOOSE  
    
    text = models.TextField(max_length=10000,default="Text with task", blank=True, null=True)
    #WRITE-> text null
    #COMPLETE-> text with [], where [] is the place for the answer, splitted by \n\n, where each line is a sentence
    #REORDER-> text splitted by \n\n, where each line is a sentence
    #CHOOSE-> text inside an array, the first element is the correct and the second isn't
    
    lesson = models.ForeignKey("lessons.Lessons", on_delete=models.CASCADE, null=True, blank=True)
    