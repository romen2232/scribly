from rest_framework import serializers
from .models import Escribly

class EscriblySerializer(serializers.ModelSerializer):
    class Meta:
        model = Escribly
        fields = ['id', 'escribly_name', 'escribly_description', 'escribly_image']
        
    def create(self, validated_data):
        escribly_name = validated_data['escribly_name']
        escribly_description = validated_data['escribly_description']
        escribly_image = self.context['request'].FILES.get('escribly_image')
        
        escribly = Escribly.objects.create(escribly_name=escribly_name, escribly_description=escribly_description, escribly_image=escribly_image)
        
        escribly.save()
        
        return escribly

