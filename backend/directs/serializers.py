from rest_framework import serializers
from .models import Directs

class DirectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Directs
        fields = ['sender', 'receiver', 'message', 'sent_date']

    def create(self, validated_data):
        direct = Directs.objects.create(**validated_data)
        direct.save()
        return direct
