from rest_framework import serializers
from .models import Escribly_api

class Escribly_apiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escribly_api
        fields = '__all__'