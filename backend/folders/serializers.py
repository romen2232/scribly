from rest_framework import serializers
from .models import Folders

class FoldersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folders
        fields = ['id', 'folder_name', 'folder_description', 'folder_image', 
                  'folder_created', 'favorite', 'folder_parent', 'depth']

    def create(self, validated_data):
        folder = Folders.objects.create(**validated_data)
        folder.save()
        return folder
