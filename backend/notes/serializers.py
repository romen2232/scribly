
from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['note_name', 'note_content', 'note_image', 'note_last_modified', 'public', 'note_average_rating', 'tags', 'task', 'challenge', 'folder']
