from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Tasks_users

from tasks.models import Tasks
from users.models import User
from lessons_users.models import Lessons_users

from tasks.serializers import TasksSerializer
from users.serializers import UserSerializer
from lessons_users.serializers import Lessons_usersSerializer


class TasksUserSerializer(serializers.ModelSerializer):
    task = TasksSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    task = serializers.PrimaryKeyRelatedField(
        queryset=Tasks.objects.all(), write_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)
    lesson_user = Lessons_usersSerializer(read_only=True)
    lesson_user = serializers.PrimaryKeyRelatedField(
        queryset=Lessons_users.objects.all(), write_only=True)
  
  
    class Meta:
        model = Tasks_users

        fields = ['task', 'user', 'task_date', 'earned_points', 'answer_note', 'answer_text', 'answer_boolean', 'lesson_user', 'is_completed', 'response_text' ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        task_serializer = TasksSerializer(
            instance.task, context=self.context)
        user_serializer = UserSerializer(instance.user, context=self.context)

        representation['task'] = task_serializer.data
        representation['user'] = user_serializer.data
        representation['lesson_user'] = instance.lesson_user.id
        #oe danger
        return representation

    def create(self, validated_data):


        task_user = Tasks_users.objects.create(
            **validated_data)
        task_user.save()

        return task_user

    def get(self, validated_data):
        task = validated_data['task']
        user = validated_data['user']
        lesson_user = validated_data['lesson_user']
        task_user = Tasks_users.objects.get(task=task, user=user)

        return task_user

