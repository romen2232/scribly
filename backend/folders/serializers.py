
from rest_framework import serializers
from .models import Folder

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ['folder_name', 'folder_description', 'folder_image', 'folder_created', 'favorite', 'folder_parent']
