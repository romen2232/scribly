from rest_framework import serializers
from .models import Leaderboards_users

class LeaderboardUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboards_users
        fields = ['leaderboard', 'user', 'leaderboard_update_date', 'leaderboard_score']
    
    def create(self, validated_data):
        leaderboard = validated_data['leaderboard']
        user = validated_data['user']
        leaderboard_user = Leaderboards_users.objects.create(leaderboard=leaderboard, user=user)
        leaderboard_user.save()
        return leaderboard_user

    def get(self, validated_data):
        leaderboard = validated_data['leaderboard']
        user = validated_data['user']
        leaderboard_user = Leaderboards_users.objects.get(leaderboard=leaderboard, user=user)
        return leaderboard_user
