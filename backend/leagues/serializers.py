
from rest_framework import serializers
from .models import League

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ['league_name', 'league_description', 'league_image']
