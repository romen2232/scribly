from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Lessons_users
from lessons.serializers import LessonsSerializer
from users.serializers import UserSerializer


class Lessons_usersSerializer(serializers.ModelSerializer):
    lesson = LessonsSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Lessons_users
        fields = '__all__'  # or a list of field names


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        # token['custom_field'] = 'custom_value'

        return token
