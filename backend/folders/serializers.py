from rest_framework import serializers
from .models import Folders
from users.serializers import UserSerializer
from users.models import User


class ParentFolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folders
        fields = ['id', 'folder_name', 'folder_description', 'folder_image',
                  'folder_created', 'favorite', 'folder_parent', 'depth']


class FoldersSerializer(serializers.ModelSerializer):
    folder_parent = ParentFolderSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Folders
        fields = ['id', 'folder_name', 'folder_description', 'folder_image',
                  'folder_created', 'favorite', 'folder_parent', 'depth', 'user']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Explicitly set the context for nested serializers
        folder_parent_serializer = ParentFolderSerializer(
            instance.folder_parent, context=self.context)
        user_serializer = UserSerializer(instance.user, context=self.context)
        representation['folder_parent'] = folder_parent_serializer.data
        representation['user'] = user_serializer.data
        return representation

    def create(self, validated_data):
        folder = Folders.objects.create(**validated_data)
        folder.save()
        return folder
