
from rest_framework import serializers
from .models import Streak

class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = ['user', 'streak', 'streak_start_date', 'streak_current_date', 'streak_end_date']
