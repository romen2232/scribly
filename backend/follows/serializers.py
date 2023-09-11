from rest_framework import serializers
from .models import Follows
from users.serializers import UserSerializer


class FollowSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)
    followed = UserSerializer(read_only=True)
    follower = serializers.PrimaryKeyRelatedField(
        queryset=UserSerializer.Meta.model.objects.all(), write_only=True)
    followed = serializers.PrimaryKeyRelatedField(
        queryset=UserSerializer.Meta.model.objects.all(), write_only=True)

    class Meta:
        model = Follows
        fields = ['follower', 'followed', 'follow_date']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Explicitly set the context for nested serializers
        follower_serializer = UserSerializer(
            instance.follower, context=self.context)
        followed_serializer = UserSerializer(
            instance.followed, context=self.context)
        representation['follower'] = follower_serializer.data
        representation['followed'] = followed_serializer.data
        return representation

    def create(self, validated_data):
        follow = Follows.objects.create(**validated_data)
        follow.save()
        return follow
