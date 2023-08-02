from rest_framework import serializers
from .models import Leaderboards

class LeaderboardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboards
        fields = ['id', 'league', 'week_date']

    def create(self, validated_data):
        leaderboard = Leaderboards.objects.create(**validated_data)
        leaderboard.save()
        return leaderboard
