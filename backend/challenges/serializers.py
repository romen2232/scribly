from rest_framework import serializers
from .models import Challenges
from users.serializers import UserSerializer


class ChallengesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Challenges
        fields = ['id', 'challenge_name', 'challenge_description', 'challenge_style',
                  'difficulty', 'challenge_points', 'challenge_average_rating', 'user']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        user_serializer = UserSerializer(instance.user, context=self.context)

        representation['user'] = user_serializer.data

        return representation

    def create(self, validated_data):
        challenge = Challenges.objects.create(**validated_data)
        challenge.save()
        return challenge
