from rest_framework import serializers
from .models import Notes

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['id', 'note_name', 'note_content', 'note_image', 'note_last_modified', 'public', 'note_average_rating', 'tags', 'task', 'challenge', 'folder']

    def create(self, validated_data):
        note = Notes.objects.create(**validated_data)
        note.save()
        return note
