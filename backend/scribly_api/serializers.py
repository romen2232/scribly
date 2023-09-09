from rest_framework import serializers
from .models import Scribly_api

class Scribly_apiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scribly_api
        fields = '__all__'