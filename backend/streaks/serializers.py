from rest_framework import serializers
from .models import Streaks

class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streaks
        fields = ['id', 'user', 'streak', 'streak_start_date', 'streak_current_date', 'streak_end_date']

    def create(self, validated_data):
        streak = Streaks.objects.create(**validated_data)
        streak.save()
        return streak
