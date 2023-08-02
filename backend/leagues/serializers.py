from rest_framework import serializers
from .models import Leagues

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leagues
        fields = ['id', 'league_name', 'league_description', 'league_image']

    def create(self, validated_data):
        league_name = validated_data['league_name']
        league_description = validated_data['league_description']
        league_image = self.context['request'].FILES.get('league_image')

        league = Leagues.objects.create(league_name=league_name, 
                                        league_description=league_description, 
                                        league_image=league_image)

        league.save()

        return league
