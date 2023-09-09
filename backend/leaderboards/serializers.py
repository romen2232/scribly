from rest_framework import serializers
from .models import Leaderboards
from leagues.models import Leagues
from leagues.models import Leagues
from leagues.serializers import LeagueSerializer
from users.models import User
from users.models import User


class LeaderboardsSerializer(serializers.ModelSerializer):
    league = LeagueSerializer(read_only=True)
    
    league = serializers.PrimaryKeyRelatedField(
        queryset=Leagues.objects.all(), write_only=True)
    league = LeagueSerializer(read_only=True)
    
    league = serializers.PrimaryKeyRelatedField(
        queryset=Leagues.objects.all(), write_only=True)

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


    def create(self, validated_data):
        
        
        leaderboard = Leaderboards.objects.create(
            **validated_data)
        
        leaderboard.save()
        return leaderboard
    
    
    
class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_staff', 'experience']
        
        
class LeaderboardsSerializerWithUser(serializers.ModelSerializer):
    league = LeagueSerializer(read_only=True)
    user = serializers.SerializerMethodField()
    
    league = serializers.PrimaryKeyRelatedField(
        queryset=Leagues.objects.all(), write_only=True)
    
    
    class Meta:
        model = Leaderboards
        fields = ['id', 'league', 'week_date', 'user']

    def to_representation(self, instance):
        
        representation = super().to_representation(instance)
        # Explicitly set the context for nested serializers
        league_serializer = LeagueSerializer(
            instance.league, context=self.context)
        #user_serializer = UserBasicSerializer(instance.user_set.all(), context=self.context)
        representation['league'] = league_serializer.data
        representation['user'] = user_serializer(instance.user_set.all(), many=True).data
        return representation

    def create(self, validated_data):
        
        
        leaderboard = Leaderboards.objects.create(
            **validated_data)
        
        leaderboard.save()
        return leaderboard
    
    # def get(self, validated_data):
        
    #     league = validated_data['league']
    #     user = validated_data['user']
        
    #     leaderboard = Leaderboards.objects.get(league=league, user=user)

    #     return leaderboard