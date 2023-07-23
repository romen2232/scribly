
from rest_framework import serializers
from .models import Lessons_Users

class Lessons_Users_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Lessons_Users
        fields = ['lesson', 'user', 'lesson_start_date', 'percentage_completed']
