from rest_framework import serializers
from .models import Badges_users
from badges.serializers import BadgeSerializer
from users.serializers import UserSerializer


class BadgeUserSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Badges_users
        fields = ['badge', 'user', 'earned_date', 'badge_progress']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        badge_serializer = BadgeSerializer(
            instance.badge, context=self.context)
        user_serializer = UserSerializer(instance.user, context=self.context)

        representation['badge'] = badge_serializer.data
        representation['user'] = user_serializer.data

        return representation

    def create(self, validated_data):
        badge = validated_data['badge']
        user = validated_data['user']
        badge_progress = validated_data['badge_progress']

        badge_user = Badges_users.objects.create(
            badge=badge, user=user, badge_progress=badge_progress)
        badge_user.save()

        return badge_user

    def get(self, validated_data):
        badge = validated_data['badge']
        user = validated_data['user']
        badge_user = Badges_users.objects.get(badge=badge, user=user)

        return badge_user
