
from rest_framework import serializers
from .models import LeaderboardUser

class LeaderboardUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaderboardUser
        fields = ['leaderboard', 'user', 'leaderboard_update_date', 'leaderboard_score']
