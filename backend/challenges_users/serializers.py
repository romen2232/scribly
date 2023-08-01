from rest_framework import serializers
from .models import Challenges_users

class ChallengeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenges_users
        fields = ['challenge', 'user', 'challenge_end_date']

    def create(self, validated_data):
        challenge = validated_data['challenge']
        user = validated_data['user']
        challenge_user = Challenges_users.objects.create(challenge=challenge, user=user)
        challenge_user.save()
        return challenge_user
