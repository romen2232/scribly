from django.db import models
from users.models import User
from challenges.models import Challenges
from notes.models import Notes

# Completed challenges
class Challenges_users(models.Model):
    challenge = models.ForeignKey('challenges.Challenges', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    challenge_end_date = models.DateTimeField(auto_now_add=True)
    earned_points = models.IntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    answer_note = models.ForeignKey('notes.Notes', on_delete=models.CASCADE, null=True, blank=True)
    response_text = models.CharField(max_length=100, default="")
    
    class Meta:
        unique_together = (("challenge", "user"),)