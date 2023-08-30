from rest_framework import serializers
from .models import Challenges_users
from challenges.serializers import ChallengesSerializer

from users.serializers import UserSerializer
from users.models import User
from challenges.models import Challenges


class ChallengeUserSerializer(serializers.ModelSerializer):
    challenge = ChallengesSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    challenge = serializers.PrimaryKeyRelatedField(
        queryset=Challenges.objects.all(), write_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)
    
    class Meta:
        model = Challenges_users
        fields = ['challenge', 'user', 'challenge_end_date', 'earned_points',
                  'is_completed', 'answer_note', 'response_text']

    def to_representation(self, instance):
        
        representation = super().to_representation(instance)
        # Explicitly set the context for nested serializers
        challenge_serializer = ChallengesSerializer(
            instance.challenge, context=self.context)
        user_serializer = UserSerializer(instance.user, context=self.context)
        representation['challenge'] = challenge_serializer.data
        representation['user'] = user_serializer.data
        return representation

    def create(self, validated_data):
        
        
        challenge_user = Challenges_users.objects.create(
            **validated_data)
        
        challenge_user.save()
        return challenge_user
    
    def get(self, validated_data):
        
        challenge = validated_data['challenge']
        user = validated_data['user']
        
        challenge_user = Challenges_users.objects.get(challenge=challenge, user=user)

        return challenge_user

