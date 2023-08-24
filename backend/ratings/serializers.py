from rest_framework import serializers
from .models import Ratings
from users.serializers import UserSerializer
from challenges.serializers import ChallengesSerializer
from tasks.serializers import TasksSerializer
from notes.serializers import NoteSerializer



class RatingsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    challenge = ChallengesSerializer(read_only=True)
    task = TasksSerializer(read_only=True)

    note = NoteSerializer(read_only=True)


    class Meta:
        model = Ratings
        fields = ['id', 'user', 'rating', 'challenge',
                  'task', 'rating_date', 'note']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        user_serializer = UserSerializer(instance.user, context=self.context)
        challenge_serializer = ChallengesSerializer(
            instance.challenge, context=self.context)
        task_serializer = TasksSerializer(
            instance.task, context=self.context)
        note_serializer = NoteSerializer(
            instance.note, context=self.context)

        representation['user'] = user_serializer.data
        representation['challenge'] = challenge_serializer.data
        representation['task'] = task_serializer.data
        representation['note'] = note_serializer.data

        return representation

    def create(self, validated_data):
        return Ratings.objects.create(**validated_data)

    def validate(self, data):
        # Ensuring that either a challenge or a task or a note is rated, never more than one
        if self.instance:  # If it's an update
            if data.get('challenge') is not None and data.get('task') is not None:
                raise serializers.ValidationError(
                    "You can't rate a challenge and a task at the same time")
            if data.get('challenge') is not None and data.get('note') is not None:
                raise serializers.ValidationError(
                    "You can't rate a challenge and a note at the same time")
            if data.get('task') is not None and data.get('note') is not None:
                raise serializers.ValidationError(
                    "You can't rate a task and a note at the same time")
        else:  # If it's a create
            if data.get('challenge') is not None and data.get('task') is not None:
                raise serializers.ValidationError(
                    "You can't rate a challenge and a task at the same time")
            if data.get('challenge') is not None and data.get('note') is not None:
                raise serializers.ValidationError(
                    "You can't rate a challenge and a note at the same time")
            if data.get('task') is not None and data.get('note') is not None:
                raise serializers.ValidationError(
                    "You can't rate a task and a note at the same time")
            if data.get('challenge') is None and data.get('task') is None and data.get('note') is None:
                raise serializers.ValidationError(
                    "You must rate either a challenge or a task or a note")

        # Ensuring that the rating is between 1 and 5
        if data.get('rating') < 1 or data.get('rating') > 5:
            raise serializers.ValidationError(
                "The rating must be between 1 and 5")

        return data
