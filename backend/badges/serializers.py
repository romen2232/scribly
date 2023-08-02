from rest_framework import serializers
from .models import Badge

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'badge_name', 'badge_description', 'badge_image']
        
    def create(self, validated_data):
        badge_name = validated_data['badge_name']
        badge_description = validated_data['badge_description']
        badge_image = self.context['request'].FILES.get('badge_image')
        
        badge = Badge.objects.create(badge_name=badge_name, badge_description=badge_description, badge_image=badge_image)
        
        badge.save()
        
        return badge

