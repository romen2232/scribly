from django.db import models

class Lessons(models.Model):
    lesson_name = models.CharField(max_length=100)
    lesson_description = models.TextField(max_length=1000)
    # TODO: Determine what is the content of a lesson
    lesson_content = models.TextField(max_length=10000)
    lesson_style = models.CharField(max_length=100)
    difficulty = models.IntegerField(default=0)
    
