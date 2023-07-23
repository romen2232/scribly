
from rest_framework import serializers
from .models import Challenge

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['user', 'challenge_name', 'challenge_description', 'challenge_style', 'difficulty', 'challenge_points', 'challenge_average_rating']
