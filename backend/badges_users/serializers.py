from rest_framework import serializers
from .models import Badges_users

class BadgeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badges_users
        fields = ['badge', 'user', 'earned_date']
    def create(self, validated_data):
        badge = validated_data['badge']
        user = validated_data['user']
        
        badge_user = Badges_users.objects.create(badge=badge, user=user)
        badge_user.save()
        
        return badge_user
    
    def get(self, validated_data):
        badge = validated_data['badge']
        user = validated_data['user']
        badge_user = Badges_users.objects.get(badge=badge, user=user)
        
        return badge_user
    
