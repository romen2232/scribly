from rest_framework import serializers
from .models import Boosters

class BoostersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boosters
        fields = ['id', 'booster_name', 'booster_description', 'booster_image', 'duration', 'multiplier']

    def create(self, validated_data):
        booster_name = validated_data['booster_name']
        booster_description = validated_data['booster_description']
        booster_image = self.context['request'].FILES.get('booster_image')
        duration = validated_data['duration']
        multiplier = validated_data['multiplier']

        booster = Boosters.objects.create(
            booster_name=booster_name, 
            booster_description=booster_description, 
            booster_image=booster_image, 
            duration=duration, 
            multiplier=multiplier
        )
        
        booster.save()
        
        return booster
