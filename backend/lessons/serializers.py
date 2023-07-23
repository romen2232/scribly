
from rest_framework import serializers
from .models import Lesson

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['lesson_name', 'lesson_description', 'lesson_content', 'lesson_style', 'difficulty']
