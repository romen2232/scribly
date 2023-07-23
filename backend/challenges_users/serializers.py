
from rest_framework import serializers
from .models import ChallengeUser

class ChallengeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeUser
        fields = ['challenge', 'user', 'challenge_end_date']
