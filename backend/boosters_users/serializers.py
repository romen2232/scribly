
from rest_framework import serializers
from .models import BoosterUser

class BoosterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoosterUser
        fields = ['booster', 'user', 'booster_start_date', 'booster_end_date']
