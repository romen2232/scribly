from rest_framework import serializers
from .models import Notes
from tasks.serializers import TasksSerializer
from challenges.serializers import ChallengesSerializer
from folders.serializers import FoldersSerializer
from users.serializers import UserSerializer
from tasks.models import Tasks
from challenges.models import Challenges
from folders.models import Folders
from users.models import User


class NoteSerializer(serializers.ModelSerializer):
    # For read operations
    task_detail = TasksSerializer(source='task', read_only=True)
    challenge_detail = ChallengesSerializer(source='challenge', read_only=True)
    folder_detail = FoldersSerializer(source='folder', read_only=True)
    user_detail = UserSerializer(source='user', read_only=True)

    # For write operations
    task = serializers.PrimaryKeyRelatedField(
        queryset=Tasks.objects.all(), required=False, allow_null=True)
    challenge = serializers.PrimaryKeyRelatedField(
        queryset=Challenges.objects.all(), required=False, allow_null=True)
    folder = serializers.PrimaryKeyRelatedField(
        queryset=Folders.objects.all(), required=False, allow_null=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)


    class Meta:
        model = Notes
        fields = ['id', 'note_name', 'note_content', 'note_image', 'note_last_modified',
                  'public', 'note_average_rating', 'tags', 'task', 'challenge', 'note_analysis', 'folder', 'user',
                  'task_detail', 'challenge_detail', 'folder_detail', 'user_detail', 'favorite']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['task'] = representation.pop('task_detail')
        representation['challenge'] = representation.pop('challenge_detail')
        representation['folder'] = representation.pop('folder_detail')
        representation['user'] = representation.pop('user_detail')
        return representation

    def create(self, validated_data):
        
        
        folder = validated_data['folder'] if 'folder' in validated_data else None
        user = self.context['request'].user
        
        #check if folder was provided in the request
        if folder is  None:
            folder = Folders.objects.filter(user=user, depth=0).first()
            print('o')
            validated_data['folder'] = folder
            
        
        note = Notes.objects.create(**validated_data)
        note.save()
        return note
