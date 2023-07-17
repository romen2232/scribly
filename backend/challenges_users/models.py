from django.db import models

# Completed challenges
class ChallengeUser(models.Model):
    challenge = models.ForeignKey('challenges.Challenge', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    challenge_end_date = models.DateTimeField(auto_now_add=True)