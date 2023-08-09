from rest_framework import serializers
from .models import Streaks
from users.serializers import UserSerializer


class StreakSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Streaks
        fields = ['id', 'user', 'streak', 'streak_start_date',
                  'streak_current_date', 'streak_end_date']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        user_serializer = UserSerializer(instance.user, context=self.context)

        representation['user'] = user_serializer.data

        return representation

    def create(self, validated_data):
        streak = Streaks.objects.create(**validated_data)
        streak.save()
        return streak
