from django.db import models
from users.models import User
from tasks.models import Tasks
from lessons_users.models import Lessons_users
# Create your models here.


class Tasks_users(models.Model):
    task = models.ForeignKey('tasks.Tasks', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)

    task_date = models.DateTimeField(auto_now_add=True)

    earned_points = models.IntegerField(default=0)

    # answer write is a note
    answer_note = models.ForeignKey(
        'notes.Notes', on_delete=models.CASCADE, null=True, blank=True)

    # answer from the user
    answer_text = models.CharField(
        max_length=10000, default="Text for complete task", null=True, blank=True)
    # answer Boolean for CHOOSE type
    answer_boolean = models.BooleanField(default=False)

    # answer Boolean denotes if the task is completed or not
    is_completed = models.BooleanField(default=False)

    # Reponse from the AI
    response_text = models.CharField(
        max_length=10000, default="Text for complete task")

    lesson_user = models.ForeignKey(
        'lessons_users.Lessons_users', on_delete=models.CASCADE, null=True, blank=True)
    # class Meta:
    #    unique_together = (("task", "user"),)
