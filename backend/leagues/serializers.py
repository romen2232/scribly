from rest_framework import serializers
from .models import Leagues

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leagues
        fields = ['id', 'league_name', 'league_description', 'league_image']

    def create(self, validated_data):
        

        league = Leagues.objects.create(**validated_data)

        league.save()

        return league
