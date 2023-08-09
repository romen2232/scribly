from rest_framework import serializers
from .models import Folders


class ParentFolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folders
        fields = ['id', 'folder_name', 'folder_description', 'folder_image',
                  'folder_created', 'favorite', 'folder_parent', 'depth']


class FoldersSerializer(serializers.ModelSerializer):
    folder_parent = ParentFolderSerializer(read_only=True)

    class Meta:
        model = Folders
        fields = ['id', 'folder_name', 'folder_description', 'folder_image',
                  'folder_created', 'favorite', 'folder_parent', 'depth']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Explicitly set the context for nested serializers
        folder_parent_serializer = ParentFolderSerializer(
            instance.folder_parent, context=self.context)
        representation['folder_parent'] = folder_parent_serializer.data
        return representation

    def create(self, validated_data):
        folder = Folders.objects.create(**validated_data)
        folder.save()
        return folder
