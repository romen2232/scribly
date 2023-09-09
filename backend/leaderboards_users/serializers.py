from rest_framework import serializers
from .models import Leaderboards_users
from leaderboards.serializers import LeaderboardsSerializer
from users.serializers import UserSerializer
from users.models import User
from leaderboards.models import Leaderboards    


class LeaderboardUserSerializer(serializers.ModelSerializer):
    leaderboard = LeaderboardsSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    leaderboard = serializers.PrimaryKeyRelatedField(
        queryset=Leaderboards.objects.all(), write_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Leaderboards_users
        fields = ['leaderboard', 'user',
                  'leaderboard_update_date', 'leaderboard_score']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        leaderboard_serializer = LeaderboardsSerializer( 
            instance.leaderboard, context=self.context)
        user_serializer = UserSerializer(instance.user, context=self.context)

        representation['leaderboard'] = leaderboard_serializer.data
        representation['user'] = user_serializer.data

        return representation

    def create(self, validated_data):
        leaderboard = validated_data['leaderboard']
        user = validated_data['user']
        leaderboard_user = Leaderboards_users.objects.create(
            leaderboard=leaderboard, user=user)
        leaderboard_user.save()
        return leaderboard_user

    def get(self, validated_data):
        leaderboard = validated_data['leaderboard']
        user = validated_data['user']
        leaderboard_user = Leaderboards_users.objects.get(
            leaderboard=leaderboard, user=user)
        return leaderboard_user
    
    def update(self, instance, validated_data):
        instance.leaderboard_score = validated_data.get(
            'leaderboard_score', instance.leaderboard_score)
        instance.save()
        return instance
