from rest_framework import serializers
from .models import Ratings
from users.serializers import UserSerializer
from challenges.serializers import ChallengeSerializer
from tasks.serializers import TaskSerializer


class RatingsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    challenge = ChallengeSerializer(read_only=True)
    task = TaskSerializer(read_only=True)

    class Meta:
        model = Ratings
        fields = ['id', 'user', 'rating', 'challenge', 'task', 'rating_date']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        user_serializer = UserSerializer(instance.user, context=self.context)
        challenge_serializer = ChallengeSerializer(
            instance.challenge, context=self.context)
        task_serializer = TaskSerializer(
            instance.task, context=self.context)

        representation['user'] = user_serializer.data
        representation['challenge'] = challenge_serializer.data
        representation['task'] = task_serializer.data

        return representation

    def create(self, validated_data):
        return Ratings.objects.create(**validated_data)

    def validate(self, data):
        # Ensuring that either a challenge or a task is rated, not both
        if self.instance:  # If it's an update
            if 'challenge' in data and 'task' in data:
                raise serializers.ValidationError(
                    "A rating cannot be both for a challenge and a task.")
            if 'challenge' not in data and 'task' not in data:  # Neither in updated data
                if not self.instance.challenge and not self.instance.task:  # Neither in current instance
                    raise serializers.ValidationError(
                        "A rating must be for either a challenge or a task.")
        else:  # If it's a creation
            if data.get('challenge') and data.get('task'):
                raise serializers.ValidationError(
                    "A rating cannot be both for a challenge and a task.")
            if not data.get('challenge') and not data.get('task'):
                raise serializers.ValidationError(
                    "A rating must be for either a challenge or a task.")
        return data
