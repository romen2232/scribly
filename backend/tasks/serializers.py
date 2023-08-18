from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Tasks
from lessons.models import Lessons

from lessons.serializers import LessonsSerializer

class TasksSerializer(serializers.ModelSerializer):
    
    lesson = LessonsSerializer(read_only=True)
    lesson = serializers.PrimaryKeyRelatedField( queryset= Lessons.objects.all(), write_only=True)
    class Meta:
        model = Tasks
        fields = '__all__'  # or a list of field names
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        lesson_serializer = LessonsSerializer(
            instance.lesson, context=self.context)
       
        representation['lesson'] = lesson_serializer.data
        
        return representation

    def create(self, validated_data):
        task_name = validated_data['task_name']
        task_description = validated_data['task_description']
        
        task_points = validated_data['task_points']
        type = validated_data['type']
        
        text = validated_data['text']
        
        
        lesson = validated_data['lesson']

        task = Tasks.objects.create(
            task_name=task_name, task_description=task_description, task_points=task_points, type=type, text=text, lesson=lesson)

        task.save()

        return task
