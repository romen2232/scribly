
from rest_framework import serializers
from .models import TaskUser

class TaskUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskUser
        fields = ['task', 'user', 'content', 'task_end_date', 'earned_points']
