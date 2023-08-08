from rest_framework import serializers
from .models import Boosters_users
from boosters.serializers import BoostersSerializer
from users.serializers import UserSerializer


class BoosterUserSerializer(serializers.ModelSerializer):
    booster = BoostersSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Boosters_users
        fields = ['booster', 'user', 'booster_start_date', 'booster_end_date']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Explicitly set the context for nested serializers
        booster_serializer = BoostersSerializer(
            instance.booster, context=self.context)
        user_serializer = UserSerializer(instance.user, context=self.context)

        representation['booster'] = booster_serializer.data
        representation['user'] = user_serializer.data

        return representation

    def create(self, validated_data):
        booster = validated_data['booster']
        user = validated_data['user']

        booster_user = Boosters_users.objects.create(
            booster=booster, user=user)
        booster_user.save()

        return booster_user

    def get(self, validated_data):
        booster = validated_data['booster']
        user = validated_data['user']
        booster_user = Boosters_users.objects.get(booster=booster, user=user)

        return booster_user
