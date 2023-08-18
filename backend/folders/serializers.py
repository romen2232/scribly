from rest_framework import serializers
from .models import Folders
from users.serializers import UserSerializer
from users.models import User
from notes.models import Notes


class ParentFolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folders
        fields = ['id', 'folder_name', 'folder_description', 'folder_image', 
                  'folder_created', 'favorite', 'folder_parent', 'depth', 'user']


class FoldersSerializer(serializers.ModelSerializer):
    folder_parent = ParentFolderSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)
    folder_parent = serializers.PrimaryKeyRelatedField(
        queryset=Folders.objects.all(), write_only=True)

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
        
        folder_parent = validated_data.pop('folder_parent', None)
        depth = 0
        
        
        
        if folder_parent:
            depth = folder_parent.depth + 1
            if depth >= 4:
                raise serializers.ValidationError('Too deep folder')
            validated_data['folder_parent'] = folder_parent
            validated_data['depth'] = depth
            
        user = self.context['request'].user
        
        
        folder = Folders.objects.create(**validated_data)
        folder.save()
        return folder
    
    
class NotesFolderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notes
        fields = ['id', 'note_name']

class FoldersRecursiveSerializer(serializers.ModelSerializer):
    
    subfolders = serializers.SerializerMethodField(source='folders_set')
    notes = serializers.SerializerMethodField()

    class Meta:
        model = Folders
        fields = ['id', 'folder_name', 'folder_description', 'folder_image',
                  'folder_created', 'favorite', 'depth', 'subfolders', 'notes'  ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        representation['notes'] = NotesFolderSerializer(instance.notes_set.all(), many=True).data
        representation['subfolders'] = self.get_subfolders(instance)

        return representation

    def create(self, validated_data):
        
        
        folder = Folders.objects.create(**validated_data)
        folder.save()
        return folder
    
    
    
    
    def get_subfolders(self, obj):
        """Recursively get subfolders."""
        subfolders = Folders.objects.filter(folder_parent=obj)
        return FoldersRecursiveSerializer(subfolders, many=True).data
    
    def get_notes(self, obj):
        """Get notes related to the folder."""
        notes = obj.notes_set.all()
        return NotesFolderSerializer(notes, many=True).data


