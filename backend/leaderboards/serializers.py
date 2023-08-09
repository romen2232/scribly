from rest_framework import serializers
from .models import Leaderboards
from leagues.serializers import LeagueSerializer


class LeaderboardsSerializer(serializers.ModelSerializer):
    league = LeagueSerializer

    class Meta:
        model = Leaderboards
        fields = ['id', 'league', 'week_date']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Explicitly set the context for nested serializers
        league_serializer = LeagueSerializer(
            instance.league, context=self.context)
        representation['league'] = league_serializer.data

        return representation

    def create(self, validated_data):
        leaderboard = Leaderboards.objects.create(**validated_data)
        leaderboard.save()
        return leaderboard
