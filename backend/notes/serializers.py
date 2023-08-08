from rest_framework import serializers
from .models import Notes
from tasks.serializers import TaskSerializer
from challenges.serializers import ChallengeSerializer
from folders.serializers import FolderSerializer


class NoteSerializer(serializers.ModelSerializer):
    task = TaskSerializer(read_only=True)
    challenge = ChallengeSerializer(read_only=True)
    folder = FolderSerializer(read_only=True)

    class Meta:
        model = Notes
        fields = ['id', 'note_name', 'note_content', 'note_image', 'note_last_modified',
                  'public', 'note_average_rating', 'tags', 'task', 'challenge', 'folder']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        task_serializer = TaskSerializer(instance.task, context=self.context)
        challenge_serializer = ChallengeSerializer(
            instance.challenge, context=self.context)
        folder_serializer = FolderSerializer(
            instance.folder, context=self.context)

        representation['task'] = task_serializer.data
        representation['challenge'] = challenge_serializer.data
        representation['folder'] = folder_serializer.data

        return representation

    def create(self, validated_data):
        note = Notes.objects.create(**validated_data)
        note.save()
        return note
