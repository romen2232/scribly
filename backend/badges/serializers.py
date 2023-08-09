from rest_framework import serializers
from .models import Badge
from django.conf import settings


class BadgeSerializer(serializers.ModelSerializer):
    badge_image = serializers.SerializerMethodField()

    class Meta:
        model = Badge
        fields = ['id', 'badge_name', 'badge_description',
                  'badge_image', 'badge_goal', 'badge_level', 'badge_color']

    def create(self, validated_data):
        badge_name = validated_data['badge_name']
        badge_description = validated_data['badge_description']
        badge_image = self.context['request'].FILES.get('badge_image')

        badge = Badge.objects.create(
            badge_name=badge_name, badge_description=badge_description, badge_image=badge_image)

        badge.save()

        return badge

    def get_badge_image(self, obj):
        if obj.badge_image:
            return self.context['request'].build_absolute_uri(obj.badge_image.url)
        else:
            return None
