from rest_framework import serializers
from .models import Tivi

#class TiviSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tivi
        fields = '__all__'