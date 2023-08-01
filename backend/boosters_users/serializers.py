from rest_framework import serializers
from .models import Boosters_users

class BoosterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boosters_users
        fields = ['booster', 'user', 'booster_start_date', 'booster_end_date']

    def create(self, validated_data):
        booster = validated_data['booster']
        user = validated_data['user']

        booster_user = Boosters_users.objects.create(booster=booster, user=user)
        booster_user.save()

        return booster_user

    def get(self, validated_data):
        booster = validated_data['booster']
        user = validated_data['user']
        booster_user = Boosters_users.objects.get(booster=booster, user=user)

        return booster_user
