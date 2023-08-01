from rest_framework import serializers
from .models import Follows

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follows
        fields = ['follower', 'followed', 'follow_date']
    def create(self, validated_data):
        follow = Follows.objects.create(**validated_data)
        follow.save()
        return follow