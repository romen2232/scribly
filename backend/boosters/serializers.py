
from rest_framework import serializers
from .models import Booster

class BoosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booster
        fields = ['booster_name', 'booster_description', 'booster_image', 'duration', 'multiplier']
