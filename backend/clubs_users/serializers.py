from rest_framework import serializers
from .models import ClubsUsersConfig

#class Clubs_usersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs_users
        fields = '__all__'