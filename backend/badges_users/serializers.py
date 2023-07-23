
from rest_framework import serializers
from .models import BadgeUser

class BadgeUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = BadgeUser
        fields = ['badge', 'user', 'earned_date']
