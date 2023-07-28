from django.db import models
from users.models import User
from challenges.models import Challenges

# Completed challenges
class Challenges_users(models.Model):
    challenge = models.ForeignKey('challenges.Challenges', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    challenge_end_date = models.DateTimeField(auto_now_add=True)