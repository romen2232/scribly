from rest_framework import serializers
from .models import Challenges

class ChallengesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenges
        fields = ['id', 'challenge_name', 'challenge_description', 'challenge_style', 
                  'difficulty', 'challenge_points', 'challenge_average_rating', 'user']

    def create(self, validated_data):
        challenge = Challenges.objects.create(**validated_data)
        challenge.save()
        return challenge
