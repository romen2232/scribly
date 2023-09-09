from rest_framework import serializers
from .models import Scribly

class ScriblySerializer(serializers.ModelSerializer):
    class Meta:
        model = Scribly
        fields = ['id', 'scribly_name', 'scribly_description', 'scribly_image']
        
    def create(self, validated_data):
        scribly_name = validated_data['scribly_name']
        scribly_description = validated_data['scribly_description']
        scribly_image = self.context['request'].FILES.get('scribly_image')
        
        scribly = Scribly.objects.create(scribly_name=scribly_name, scribly_description=scribly_description, scribly_image=scribly_image)
        
        scribly.save()
        
        return scribly

