from django.db import models
from users.models import User
from challenges.models import Challenges
from tasks.models import Tasks


class Ratings(models.Model):
    # if a user has rated a challenge, the task and the note field will be null
    # if a user has rated a task, the challenge and the note field will be null
    # if a user has rated a note, the challenge and the task field will be null
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    challenge = models.ForeignKey(
        'challenges.Challenges', on_delete=models.CASCADE, null=True, blank=True, default=None)
    task = models.ForeignKey(
        'tasks.Tasks', on_delete=models.CASCADE, null=True, blank=True, default=None)
    note = models.ForeignKey(
        'notes.Notes', on_delete=models.CASCADE, null=True, blank=True, default=None)
    rating_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'challenge', 'task')
